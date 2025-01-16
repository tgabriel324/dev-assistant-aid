import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodePreviewProps {
  className?: string;
}

const CodePreview = ({ className }: CodePreviewProps) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Tabs defaultValue="code" className="flex-1">
        <div className="border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="code">Código</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <pre className="p-4">
              <code className="text-sm">
                // O código gerado aparecerá aqui
              </code>
            </pre>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="preview" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="rounded-lg border p-4 text-center text-muted-foreground">
                Preview do código aparecerá aqui
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodePreview;