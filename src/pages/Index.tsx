import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { agents } from "@/data/agents";
import { useState } from "react";
import ChatArea from "@/components/chat/ChatArea";
import CodePreview from "@/components/preview/CodePreview";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/5 px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">AI Dev Assistant</h2>
              <Link 
                to="/admin" 
                className="p-2 hover:bg-accent rounded-md"
                title="Configurações"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Agentes</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {agents.map((agent) => (
                    <SidebarMenuItem key={agent.id}>
                      <SidebarMenuButton
                        onClick={() => setSelectedAgent(agent)}
                        isActive={selectedAgent.id === agent.id}
                        tooltip={agent.description}
                      >
                        <agent.icon className="mr-2" />
                        <span>{agent.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 overflow-hidden">
          <ChatArea agent={selectedAgent} className="w-1/2 border-r" />
          <CodePreview className="w-1/2" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;