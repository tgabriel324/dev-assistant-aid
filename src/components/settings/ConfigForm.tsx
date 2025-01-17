import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ConfigForm = () => {
  const [configs, setConfigs] = useState(() => {
    const saved = localStorage.getItem("app_config");
    return saved ? JSON.parse(saved) : {
      apiKey: "",
      modelName: "gpt-4",
      maxTokens: "2048",
      temperature: "0.7",
      databaseUrl: "",
      databaseKey: "",
      theme: "light"
    };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("app_config", JSON.stringify(configs));
    toast.success("Configurações salvas com sucesso!");
  };

  const handleChange = (key: string, value: string) => {
    setConfigs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Configurações do Projeto</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid grid-cols-4 gap-4 mb-6">
              <TabsTrigger value="api">API Keys</TabsTrigger>
              <TabsTrigger value="ia">Configurações IA</TabsTrigger>
              <TabsTrigger value="database">Banco de Dados</TabsTrigger>
              <TabsTrigger value="general">Geral</TabsTrigger>
            </TabsList>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de API</CardTitle>
                  <CardDescription>Configure suas chaves de API e integrações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">OpenAI API Key</label>
                    <Input
                      type="password"
                      value={configs.apiKey}
                      onChange={(e) => handleChange("apiKey", e.target.value)}
                      placeholder="sk-..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ia">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Modelo IA</CardTitle>
                  <CardDescription>Configure os parâmetros do modelo de IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Modelo IA</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={configs.modelName}
                      onChange={(e) => handleChange("modelName", e.target.value)}
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Máximo de Tokens</label>
                    <Input
                      type="number"
                      value={configs.maxTokens}
                      onChange={(e) => handleChange("maxTokens", e.target.value)}
                      placeholder="2048"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temperatura</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={configs.temperature}
                      onChange={(e) => handleChange("temperature", e.target.value)}
                      placeholder="0.7"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Banco de Dados</CardTitle>
                  <CardDescription>Configure as conexões com o banco de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL do Banco</label>
                    <Input
                      value={configs.databaseUrl}
                      onChange={(e) => handleChange("databaseUrl", e.target.value)}
                      placeholder="URL de conexão do banco de dados"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Chave do Banco</label>
                    <Input
                      type="password"
                      value={configs.databaseKey}
                      onChange={(e) => handleChange("databaseKey", e.target.value)}
                      placeholder="Chave de acesso ao banco de dados"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>Configure as opções gerais do projeto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tema</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={configs.theme}
                      onChange={(e) => handleChange("theme", e.target.value)}
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button type="submit" className="w-full">
            Salvar Configurações
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfigForm;