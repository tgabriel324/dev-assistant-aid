import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Agent } from "@/types";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface ChatAreaProps {
  agent: Agent;
  className?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatArea = ({ agent, className }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulated AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Como ${agent.name}, posso ajudar você com ${content}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
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