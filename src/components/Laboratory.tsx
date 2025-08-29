import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Laboratory = () => {
  const [activeTools, setActiveTools] = useState<{[key: string]: boolean}>({});
  const [toolInputs, setToolInputs] = useState<{[key: string]: string}>({});
  const [toolResults, setToolResults] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const labTools = [
    {
      id: 'prompt-creator',
      title: 'Criadora de Prompts',
      description: 'Descreva seu objetivo e nossa IA, treinada na metodologia da Engenharia da Liberdade, irá gerar um prompt estratégico para você.',
      placeholder: 'Ex: Preciso de um prompt para analisar um concorrente...'
    },
    {
      id: 'negotiator',
      title: 'A Negociadora',
      description: 'Insira um cenário de negociação ou uma objeção de cliente e nossa IA irá gerar scripts e contra-argumentos para te ajudar a fechar a venda.',
      placeholder: 'Ex: O cliente disse "Está muito caro"...'
    }
  ];

  const handleToolSubmit = (toolId: string) => {
    const input = toolInputs[toolId];
    if (!input?.trim()) return;

    setActiveTools({...activeTools, [toolId]: true});

    // Simulate AI processing
    setTimeout(() => {
      let result = '';
      
      if (toolId === 'prompt-creator') {
        result = `**PROMPT ESTRATÉGICO GERADO:**

"Você é um especialista em [área específica baseada na entrada do usuário]. Sua missão é analisar o seguinte cenário e fornecer insights estratégicos baseados na metodologia da Engenharia da Liberdade.

CONTEXTO: ${input}

INSTRUÇÕES:
1. Identifique os pontos-chave que podem ser automatizados
2. Sugira processos que podem ser documentados
3. Proponha soluções que reduzam dependência manual
4. Forneça próximos passos concretos

FORMATO DE RESPOSTA:
- Análise inicial
- Oportunidades de automação
- Processos a documentar
- Ações recomendadas"`;
      } else if (toolId === 'negotiator') {
        result = `**SCRIPT DE NEGOCIAÇÃO:**

**OBJEÇÃO IDENTIFICADA:** "${input}"

**ESTRATÉGIA DE RESPOSTA:**

🎯 **Reconhecimento e Empatia:**
"Entendo perfeitamente sua preocupação com o investimento. É natural querer ter certeza do valor antes de se comprometer."

💡 **Reframe de Valor:**
"Deixe-me reformular a questão: qual é o custo de continuar fazendo tudo manualmente? Quantas horas por semana você gasta em tarefas que poderiam ser automatizadas?"

📊 **Quebra de Valor:**
"Vamos fazer uma conta rápida: se você economizar apenas 5 horas por semana, quanto isso vale em tempo livre ou capacidade de atender mais clientes?"

🔒 **Fechamento:**
"O investimento se paga em [X] semanas. Depois disso, é lucro puro em tempo e qualidade de vida. Podemos começar na próxima semana?"`;
      }

      setToolResults({...toolResults, [toolId]: result});
      setActiveTools({...activeTools, [toolId]: false});
      
      toast({
        title: "Análise concluída!",
        description: "Sua resposta foi gerada com sucesso.",
      });
    }, 2000);
  };

  const handleInputChange = (toolId: string, value: string) => {
    setToolInputs({...toolInputs, [toolId]: value});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Laboratório de IA
        </h2>
        <p className="text-muted-foreground">
          A oficina das Engenheiras da Liberdade. Use nossas IAs Padrão para acelerar 
          seus processos e obter resultados imediatos, sem precisar construir do zero.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {labTools.map(tool => (
          <Card key={tool.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">{tool.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={toolInputs[tool.id] || ''}
                onChange={(e) => handleInputChange(tool.id, e.target.value)}
                placeholder={tool.placeholder}
                rows={4}
                className="resize-none"
              />
              
              <Button
                onClick={() => handleToolSubmit(tool.id)}
                disabled={activeTools[tool.id] || !toolInputs[tool.id]?.trim()}
                className="w-full bg-brand-highlight hover:opacity-90"
              >
                {activeTools[tool.id] ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  'Gerar Resultado'
                )}
              </Button>

              {toolResults[tool.id] && (
                <Card className="bg-muted/30 border-brand-highlight/20">
                  <CardContent className="p-4">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                      {toolResults[tool.id]}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Laboratory;