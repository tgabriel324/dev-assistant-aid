import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Brain, Code2, Layout, Network, Settings } from "lucide-react";
import { useState } from "react";
import ChatArea from "@/components/chat/ChatArea";
import CodePreview from "@/components/preview/CodePreview";

const agents = [
  {
    id: "ui-ux",
    name: "UI/UX Designer",
    icon: Layout,
    description: "Design de interfaces e experiência do usuário"
  },
  {
    id: "frontend",
    name: "Frontend Dev",
    icon: Code2,
    description: "Desenvolvimento frontend com React"
  },
  {
    id: "backend",
    name: "Backend Dev",
    icon: Network,
    description: "APIs e banco de dados"
  },
  {
    id: "architect",
    name: "Solution Architect",
    icon: Brain,
    description: "Arquitetura de sistemas"
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    icon: Settings,
    description: "CI/CD e infraestrutura"
  }
];

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/5 px-4 py-2">
            <h2 className="text-lg font-semibold">AI Dev Assistant</h2>
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