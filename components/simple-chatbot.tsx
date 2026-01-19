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
  
  // About the owner
  "who": "This portfolio belongs to a cybersecurity professional specializing in penetration testing, security audits, and incident response. They're passionate about protecting digital assets!",
  "about": "CyberShield is a comprehensive cybersecurity portfolio showcasing expertise in penetration testing, security audits, and defensive security measures.",
  "name": "This is a professional cybersecurity portfolio. For specific inquiries, please use the contact information provided!",
  
  // Portfolio content
  "services": "We offer Penetration Testing, Security Audits, Incident Response, and Security Training. Check out the Projects section for detailed case studies!",
  "projects": "You can view our cybersecurity projects in the Projects section. Each showcases real-world security implementations and solutions.",
  "skills": "Core skills include penetration testing, security auditing, secure development (SSDLC), threat modeling, and incident response. All backed by hands-on experience!",
  
  // Technologies
  "tech": "This portfolio uses Next.js 15, React 19, Clerk for authentication, Arcjet for security, and is deployed on Vercel with a PostgreSQL database.",
  "security": "Security is paramount! We use Arcjet for API protection, Clerk for authentication, secure headers, and follow OWASP best practices.",
  
  // Contact
  "contact": "You can reach out through the contact form or check the footer for social media links. Professional inquiries are always welcome!",
  "email": "Please check the Contact section for email and other communication channels.",
  
  // Default
  "default": "I'm here to help! You can ask me about: services, projects, skills, technologies, security features, or how to contact. What interests you?"
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
