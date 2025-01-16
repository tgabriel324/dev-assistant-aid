import { cn } from "@/lib/utils";
import { Message } from "./ChatArea";
import { format } from "date-fns";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  // Extract code blocks from message content
  const parts = message.content.split("```");
  const hasCode = parts.length > 1;

  return (
    <div
      className={cn(
        "flex flex-col space-y-2 p-4 rounded-lg",
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-12"
          : "bg-muted mr-12"
      )}
    >
      {hasCode ? (
        parts.map((part, index) => {
          if (index % 2 === 0) {
            // Text content
            return part && <div key={index} className="text-sm">{part}</div>;
          } else {
            // Code block
            const language = part.split("\n")[0];
            const code = part.split("\n").slice(1).join("\n");
            return (
              <div key={index} className="rounded-md overflow-hidden">
                <SyntaxHighlighter
                  language={language || "javascript"}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            );
          }
        })
      ) : (
        <div className="text-sm">{message.content}</div>
      )}
      <div className="text-xs opacity-70">
        {format(message.timestamp, "HH:mm")}
      </div>
    </div>
  );
};

export default ChatMessage;