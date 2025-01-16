import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { Message } from "./ChatArea";

interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;