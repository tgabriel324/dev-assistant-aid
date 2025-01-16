import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { executeCode, supportedLanguages } from "@/services/codeExecutor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodePreviewProps {
  className?: string;
  code?: string;
}

const CodePreview = ({ className, code = "" }: CodePreviewProps) => {
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleExecuteCode = async () => {
    setIsRunning(true);
    try {
      const result = await executeCode(code, selectedLanguage);
      if (result.error) {
        setOutput(`Error: ${result.error}`);
        toast.error("Code execution failed");
      } else {
        setOutput(result.output || "Code executed successfully (no output)");
        toast.success("Code executed successfully");
      }
    } catch (error) {
      console.error("Code execution error:", error);
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error("Failed to execute code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Tabs defaultValue="code" className="flex-1">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages.map(lang => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExecuteCode}
              disabled={isRunning || !code}
            >
              {isRunning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="ml-2">Run</span>
            </Button>
          </div>
        </div>

        <TabsContent value="code" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <SyntaxHighlighter
                language={selectedLanguage}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="preview" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="rounded-lg border p-4">
                <div id="preview-container"></div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="console" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
              {output || "No output yet. Run the code to see results."}
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodePreview;