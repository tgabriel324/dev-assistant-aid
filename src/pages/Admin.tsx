import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Key, Settings, Database, Bot } from "lucide-react";

const Admin = () => {
  const [openAIKey, setOpenAIKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [modelName, setModelName] = useState(localStorage.getItem("ai_model") || "gpt-4");
  const [maxTokens, setMaxTokens] = useState(localStorage.getItem("max_tokens") || "2048");

  const saveSettings = (section: string) => {
    switch (section) {
      case "api":
        localStorage.setItem("openai_api_key", openAIKey);
        localStorage.setItem("ai_model", modelName);
        localStorage.setItem("max_tokens", maxTokens);
        break;
      // Add more cases for other settings sections
    }
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>
        <h1 className="text-2xl font-bold">Configurações do Projeto</h1>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Configurações IA
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Banco de Dados
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de API</CardTitle>
              <CardDescription>
                Configure suas chaves de API e integrações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai_key">OpenAI API Key</Label>
                <Input
                  id="openai_key"
                  type="password"
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo IA</Label>
                <Input
                  id="model"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="gpt-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_tokens">Máximo de Tokens</Label>
                <Input
                  id="max_tokens"
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(e.target.value)}
                  placeholder="2048"
                />
              </div>
              <Button onClick={() => saveSettings("api")}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de IA</CardTitle>
              <CardDescription>
                Ajuste os parâmetros dos modelos de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Banco de Dados</CardTitle>
              <CardDescription>
                Gerencie suas conexões com banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações gerais do projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;