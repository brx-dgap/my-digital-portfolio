"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

const botResponses: { [key: string]: string } = {
  // Greetings
  "hello": "Hi there! 👋 I'm the CyberShield Bot. I can tell you about this portfolio and its creator. What would you like to know?",
  "hi": "Hello! 👋 How can I help you learn about CyberShield today?",
  "hey": "Hey! 👋 Ready to explore cybersecurity excellence?",
  "good morning": "Good morning! ☀️ Ready to dive into cybersecurity topics?",
  "good afternoon": "Good afternoon! 🌤️ What can I help you with today?",
  "good evening": "Good evening! 🌙 How can I assist you?",
  
  // About the owner
  "who": "This portfolio belongs to a dedicated cybersecurity professional with expertise in penetration testing, security audits, incident response, and secure development practices. They're passionate about protecting organizations from evolving cyber threats!",
  "about": "CyberShield is a comprehensive cybersecurity portfolio showcasing real-world projects, security implementations, and professional expertise in offensive and defensive security.",
  "name": "This is a professional cybersecurity portfolio. For specific inquiries, please use the contact information provided!",
  "experience": "The portfolio owner has extensive experience in penetration testing, vulnerability assessments, security architecture, and implementing defense-in-depth strategies. Check the Projects section for case studies!",
  "background": "With a strong foundation in both offensive security (pentesting, red team) and defensive measures (blue team, incident response), this professional brings a holistic approach to cybersecurity.",
  
  // Services
  "services": "We offer Penetration Testing, Security Audits, Incident Response, Security Training, and Secure Development Consultation. Each service is tailored to your organization's unique needs!",
  "projects": "You can view detailed cybersecurity projects in the Projects section. Each showcases real-world security implementations, vulnerabilities discovered, and remediation strategies.",
  "skills": "Core skills include: penetration testing, security auditing, secure SDLC implementation, threat modeling, incident response, vulnerability assessment, security architecture, and compliance frameworks (OWASP, NIST).",
  "certifications": "For certification details and professional credentials, please check the About section or reach out via the contact form!",
  
  // Technologies & Tools
  "tech": "This portfolio uses Next.js 15, React 19, TypeScript, Clerk for authentication, Arcjet for API security, PostgreSQL database, and is deployed on Vercel with edge functions.",
  "security": "Security is paramount! We use Arcjet for API protection, Clerk for authentication, secure HTTP headers, CSRF protection, rate limiting, and follow OWASP best practices throughout.",
  "tools": "Security tools expertise includes: Burp Suite, Metasploit, Nmap, Wireshark, Kali Linux, OWASP ZAP, Nessus, and custom scripting for automation.",
  "languages": "Proficient in Python, JavaScript/TypeScript, Bash scripting, SQL, and understanding of C/C++ for exploit development research.",
  
  // Specific Services
  "penetration": "Penetration testing services include web application testing, network infrastructure testing, mobile app security, API security testing, and social engineering assessments. All with detailed reports and remediation guidance.",
  "audit": "Security audits cover compliance assessments (SOC 2, ISO 27001), security architecture reviews, cloud security posture, code review, and risk assessments with actionable recommendations.",
  "incident": "Incident response services provide rapid threat containment, forensic analysis, root cause investigation, evidence preservation, and post-incident security improvements.",
  "training": "Security training includes security awareness for employees, phishing simulation campaigns, secure coding workshops for developers, and incident response drills.",
  
  // Contact & Engagement
  "contact": "You can reach out through the contact form on this site, or check the footer for social media links. Professional inquiries and collaboration opportunities are always welcome!",
  "email": "Please check the Contact section for email and other communication channels.",
  "hire": "Interested in hiring? Great! Please use the contact form to discuss your security needs, project scope, and timeline. Let's protect your organization together!",
  "collaborate": "Collaboration opportunities are welcome! Whether it's a project, research, or knowledge sharing, feel free to reach out via the contact form.",
  
  // Portfolio Specifics
  "newsletter": "Subscribe to our newsletter for the latest cybersecurity insights, threat intelligence updates, security tips, and industry news. Form is at the bottom of the home page!",
  "blog": "The Blog section features articles on cybersecurity trends, threat analysis, security best practices, and technical deep-dives. Stay informed!",
  "resources": "Check out the Resources section for security checklists, implementation guides, and useful tools for improving your security posture.",
  
  // Cybersecurity Topics
  "owasp": "OWASP (Open Web Application Security Project) provides excellent resources. The OWASP Top 10 is essential reading for web security. Implementation guidance is available in the Resources section!",
  "vulnerability": "Vulnerability management involves continuous scanning, risk assessment, prioritization, and remediation. It's a critical component of any security program.",
  "zero day": "Zero-day vulnerabilities are unknown exploits. Defense requires layered security, rapid patching capabilities, threat intelligence monitoring, and incident response readiness.",
  "ransomware": "Ransomware protection requires: regular backups, network segmentation, endpoint protection, user training, and incident response planning. Prevention is key!",
  "phishing": "Phishing awareness training is crucial! Learn to spot suspicious emails, verify sender authenticity, and report potential threats. Check Resources for phishing identification guides.",
  
  // Fun/Personal
  "cat": "You noticed my Siamese friend in the corner! 🐱 That's the portfolio guardian, keeping an eye on everything. Those beautiful blue eyes miss nothing!",
  "guardian": "Yes! The cat watching from the corner is our security guardian. With those watchful eyes, no threat goes unnoticed! 👀",
  
  // Help & Navigation
  "help": "I can answer questions about: services, projects, skills, technologies, security topics, contact info, and portfolio features. What would you like to know?",
  "navigate": "Use the navigation menu at the top to explore: Security Journal, Home, About, Blog, Projects, and Security Plan. Each section has unique content!",
  
  // Thank you & Goodbye
  "thank": "You're welcome! If you have more questions, I'm here to help. Feel free to explore the portfolio! 😊",
  "thanks": "Happy to help! Don't hesitate to ask if you need anything else!",
  "bye": "Goodbye! Stay secure out there! 🛡️ Visit anytime!",
  "goodbye": "See you later! Remember to keep your systems updated! 👋",
  
  // Default
  "default": "Great question! I can help with: services, projects, skills, tech stack, security topics, contact info, and more. Try asking about penetration testing, security audits, or our technology stack! What interests you?"
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  return botResponses.default;
}

export function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! 👋 I'm your CyberShield assistant. Ask me anything about this portfolio!", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botMessage = { text: getBotResponse(input), isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              CyberShield Bot
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
