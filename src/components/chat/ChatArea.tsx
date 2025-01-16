import { Agent } from "@/types";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import { useChat } from "@/hooks/useChat";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  code?: string;
  language?: string;
}

interface ChatAreaProps {
  agent: Agent;
  className?: string;
}

const ChatArea = ({ agent, className }: ChatAreaProps) => {
  const { messages, isLoading, sendMessage } = useChat(agent);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <ChatHeader agent={agent} />
      <ChatMessageList messages={messages} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatArea;