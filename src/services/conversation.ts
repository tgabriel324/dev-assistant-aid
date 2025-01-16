import { Message } from "@/components/chat/ChatArea";

export const saveConversation = (agentId: string, messages: Message[]) => {
  localStorage.setItem(`conversation_${agentId}`, JSON.stringify(messages));
};

export const loadConversation = (agentId: string): Message[] => {
  const saved = localStorage.getItem(`conversation_${agentId}`);
  return saved ? JSON.parse(saved) : [];
};

export const clearConversation = (agentId: string) => {
  localStorage.removeItem(`conversation_${agentId}`);
};