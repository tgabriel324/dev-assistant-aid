import { cn } from "@/lib/utils";
import { Message } from "./ChatArea";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 p-4 rounded-lg",
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-12"
          : "bg-muted mr-12"
      )}
    >
      <div className="text-sm">{message.content}</div>
      <div className="text-xs opacity-70">
        {format(message.timestamp, "HH:mm")}
      </div>
    </div>
  );
};

export default ChatMessage;