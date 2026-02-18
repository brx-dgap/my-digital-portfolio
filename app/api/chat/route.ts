import { NextResponse } from "next/server";
import { z } from "zod";
import { db, blogPosts, projects } from "@/lib/db";
import { desc } from "drizzle-orm";

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1).max(2000),
    })
  ).min(1),
});

const promptInjectionPatterns = [
  /ignore (all|previous) instructions/i,
  /system prompt/i,
  /you are now/i,
  /jailbreak/i,
  /developer mode/i,
];

function isPromptInjection(input: string) {
  return promptInjectionPatterns.some((pattern) => pattern.test(input));
}

async function buildPortfolioContext() {
  try {
    const [latestPosts, latestProjects] = await Promise.all([
      db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(5),
      db.select().from(projects).orderBy(desc(projects.createdAt)).limit(5),
    ]);

    const postsSummary = latestPosts
      .map((post) => `- ${post.title}: ${post.excerpt}`)
      .join("\n");

    const projectsSummary = latestProjects
      .map((project) => `- ${project.title}: ${project.description}`)
      .join("\n");

    return {
      postsSummary: postsSummary || "- No blog posts available yet.",
      projectsSummary: projectsSummary || "- No projects available yet.",
    };
  } catch (error) {
    console.error("Failed to load portfolio data for chat:", error);
    return {
      postsSummary: "- Blog data unavailable right now.",
      projectsSummary: "- Project data unavailable right now.",
    };
  }
}

function buildLocalReply(input: string, context: { postsSummary: string; projectsSummary: string }) {
  const message = input.toLowerCase();
  const contact = "Contact: digapbrix@gmail.com";
  const focus = "Completed ECA Cybersecurity Program (10 weeks): AI security, MCP defense, layered defenses, Kali Linux testing.";

  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(message)) {
    return "Hi! I can answer questions about Brix, projects, blog posts, and this portfolio.";
  }

  if (/\b(name|who are you|about you|about me|bio|background)\b/.test(message)) {
    return `Brix Digap is a 2nd-year IT student and ECA Cybersecurity Program graduate. ${focus}`;
  }

  if (/\b(contact|email|reach|hire)\b/.test(message)) {
    return `You can reach Brix via email. ${contact}`;
  }

  if (/\b(projects|work|portfolio)\b/.test(message)) {
    return `Here are recent projects:\n${context.projectsSummary}`;
  }

  if (/\b(blog|posts|articles)\b/.test(message)) {
    return `Here are recent blog posts:\n${context.postsSummary}`;
  }

  if (/\b(skills|focus|expertise)\b/.test(message)) {
    return `${focus} Ask about projects or blog posts for more details.`;
  }

  return "I can help with projects, blog posts, skills, and contact info. What would you like to know?";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const lastMessage = parsed.data.messages[parsed.data.messages.length - 1];
    if (isPromptInjection(lastMessage.content)) {
      return NextResponse.json({
        reply: "I can help with portfolio questions, but I can’t follow that request. Ask me about projects, skills, or experience instead.",
      });
    }

    const { postsSummary, projectsSummary } = await buildPortfolioContext();
    const localReply = buildLocalReply(lastMessage.content, { postsSummary, projectsSummary });

    return NextResponse.json({ reply: localReply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
