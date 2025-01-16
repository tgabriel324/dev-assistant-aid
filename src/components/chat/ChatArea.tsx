import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Agent } from "@/types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";
import { saveConversation, loadConversation } from "@/services/conversation";

interface ChatAreaProps {
  agent: Agent;
  className?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  code?: string;
  language?: string;
}

const ChatArea = ({ agent, className }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = loadConversation(agent.id);
    if (savedMessages.length > 0) {
      setMessages(savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, [agent.id]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveConversation(agent.id, updatedMessages);
    setIsLoading(true);

    try {
      const systemPrompt = `You are ${agent.name}. ${agent.description}. 
        Respond with both explanation and code examples when relevant. 
        Use markdown code blocks with appropriate language tags for code examples.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: "user", content }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      saveConversation(agent.id, finalMessages);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <agent.icon className="w-5 h-5" />
          {agent.name}
        </h2>
        <p className="text-sm text-muted-foreground">{agent.description}</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatArea;