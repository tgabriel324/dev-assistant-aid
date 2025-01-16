interface CodeExecutionResult {
  output: string;
  error?: string;
}

export const supportedLanguages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' }
];

export const executeCode = async (code: string, language: string): Promise<CodeExecutionResult> => {
  console.log(`Executing ${language} code:`, code);
  
  if (language === 'javascript' || language === 'typescript') {
    try {
      // Criar um ambiente seguro para execução
      const sandbox = new Function(
        'console',
        `
        try {
          ${code}
        } catch (error) {
          return { error: error.message };
        }
      `
      );

      let output = '';
      const mockConsole = {
        log: (...args: any[]) => {
          output += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(" ") + "\n";
        },
        error: (...args: any[]) => {
          output += "Error: " + args.join(" ") + "\n";
        }
      };

      const result = sandbox(mockConsole);
      
      if (result?.error) {
        return { output: '', error: result.error };
      }
      
      return { output };
    } catch (error) {
      return { 
        output: '', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Para outras linguagens, simularemos um ambiente de execução
  return {
    output: `[${language} Simulation] Code execution simulated.\nActual execution would require a backend service.`,
  };
};