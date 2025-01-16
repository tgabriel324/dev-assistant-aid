import { Agent } from "@/types";

interface ChatHeaderProps {
  agent: Agent;
}

const ChatHeader = ({ agent }: ChatHeaderProps) => {
  return (
    <div className="border-b p-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <agent.icon className="w-5 h-5" />
        {agent.name}
      </h2>
      <p className="text-sm text-muted-foreground">{agent.description}</p>
    </div>
  );
};

export default ChatHeader;