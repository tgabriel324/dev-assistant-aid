import { Brain, Code2, Layout, Network, Settings, Database, Shield, Cpu, Bot, Globe, Lock, Cloud } from "lucide-react";
import { Agent } from "@/types";

export const agents: Agent[] = [
  {
    id: "ui-ux",
    name: "UI/UX Designer",
    icon: Layout,
    description: "Especialista em design de interfaces e experiência do usuário, com foco em acessibilidade e usabilidade."
  },
  {
    id: "frontend",
    name: "Frontend Dev",
    icon: Code2,
    description: "Desenvolvimento frontend com React, TypeScript e frameworks modernos."
  },
  {
    id: "backend",
    name: "Backend Dev",
    icon: Network,
    description: "Especialista em APIs RESTful, GraphQL e arquitetura de microsserviços."
  },
  {
    id: "database",
    name: "Database Engineer",
    icon: Database,
    description: "Modelagem de dados, otimização de queries e gerenciamento de bancos de dados."
  },
  {
    id: "security",
    name: "Security Expert",
    icon: Shield,
    description: "Segurança de aplicações, autenticação e autorização."
  },
  {
    id: "architect",
    name: "Solution Architect",
    icon: Brain,
    description: "Arquitetura de sistemas distribuídos e soluções escaláveis."
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    icon: Settings,
    description: "CI/CD, containerização e infraestrutura como código."
  },
  {
    id: "ai",
    name: "AI Engineer",
    icon: Cpu,
    description: "Integração de IA, machine learning e processamento de linguagem natural."
  },
  {
    id: "chatbot",
    name: "Chatbot Specialist",
    icon: Bot,
    description: "Desenvolvimento de chatbots e assistentes virtuais inteligentes."
  },
  {
    id: "web3",
    name: "Web3 Developer",
    icon: Globe,
    description: "Desenvolvimento de aplicações descentralizadas e smart contracts."
  },
  {
    id: "auth",
    name: "Auth Specialist",
    icon: Lock,
    description: "Implementação de sistemas de autenticação e autorização seguros."
  },
  {
    id: "cloud",
    name: "Cloud Architect",
    icon: Cloud,
    description: "Arquitetura e implementação de soluções em nuvem."
  }
];