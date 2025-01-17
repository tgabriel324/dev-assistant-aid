import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ConfigForm = () => {
  const [configs, setConfigs] = useState(() => {
    const saved = localStorage.getItem("app_config");
    return saved ? JSON.parse(saved) : {
      apiKey: "",
      modelName: "gpt-4",
      maxTokens: "2048",
      temperature: "0.7"
    };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("app_config", JSON.stringify(configs));
    toast.success("Configuration saved successfully!");
  };

  const handleChange = (key: string, value: string) => {
    setConfigs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="model">Model Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={configs.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure your API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Key</label>
                <Input
                  type="password"
                  value={configs.apiKey}
                  onChange={(e) => handleChange("apiKey", e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model">
          <Card>
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
              <CardDescription>Configure AI model parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model Name</label>
                <Input
                  value={configs.modelName}
                  onChange={(e) => handleChange("modelName", e.target.value)}
                  placeholder="Enter model name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Tokens</label>
                <Input
                  type="number"
                  value={configs.maxTokens}
                  onChange={(e) => handleChange("maxTokens", e.target.value)}
                  placeholder="Enter max tokens"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Temperature</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={configs.temperature}
                  onChange={(e) => handleChange("temperature", e.target.value)}
                  placeholder="Enter temperature"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button type="submit" className="w-full">
        Save Configuration
      </Button>
    </form>
  );
};

export default ConfigForm;