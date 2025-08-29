import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Laboratory = () => {
  const [activeTools, setActiveTools] = useState<{[key: string]: boolean}>({});
  const [toolInputs, setToolInputs] = useState<{[key: string]: string}>({});
  const [toolResults, setToolResults] = useState<{[key: string]: string}>({});
  const [labTools, setLabTools] = useState<Array<{id: string, title: string, description: string, placeholder: string}>>([]);
  const { toast } = useToast();

  // Load lab tools from localStorage or use defaults
  useEffect(() => {
    const stored = localStorage.getItem('labTools');
    const defaultTools = [
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
    
    if (stored) {
      setLabTools(JSON.parse(stored));
    } else {
      setLabTools(defaultTools);
      localStorage.setItem('labTools', JSON.stringify(defaultTools));
    }
  }, []);

  const handleToolSubmit = (toolId: string) => {
    const input = toolInputs[toolId];
    if (!input?.trim()) return;

    setActiveTools({...activeTools, [toolId]: true});

    // Simulate AI processing
    setTimeout(() => {
      let result = '';
      
      if (toolId === 'prompt-creator') {
        result = `**Objetivo:** ${input}

**[CONTEXTO]**
Aja como uma especialista na metodologia "Engenharia da Liberdade".

**[TAREFA]**
Crie um prompt detalhado para o objetivo acima, incluindo seções como [OBJETIVO], [CONTEXTO], [PERSONA DA IA], [TAREFA] e [FORMATO DE SAÍDA].

**[PROMPT GERADO]**

"Você é um especialista em automação de negócios focado na metodologia da Engenharia da Liberdade.

OBJETIVO: ${input}

CONTEXTO: Preciso de uma solução que reduza minha dependência operacional e me permita focar no estratégico.

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
        result = `**Cenário:** ${input}

**[ANÁLISE]**
A objeção "preço" raramente é sobre dinheiro. É sobre valor.

**[SCRIPT]**
1. **Valide:** "Eu entendo completamente sua preocupação."
2. **Reforce o Diferencial:** "A solução do concorrente foca em [X]. O nosso foco é em [Y], que é o que realmente vai te dar [resultado]."
3. **Pergunta de Implicação:** "Pensando a longo prazo, o que custa mais: o investimento agora ou continuar com o problema atual?"

**[FECHAMENTO]**
"Vamos fazer um teste: se em 30 dias você não sentir que recuperou o investimento em tempo poupado, devolvemos 100% do valor. O que acha?"`;
      } else {
        // Handle custom tools
        result = `Resultado gerado para: ${input}

Esta é uma resposta personalizada baseada na ferramenta "${labTools.find(t => t.id === toolId)?.title}".

Análise completa:
- Ponto identificado: ${input}
- Recomendação estratégica baseada na Engenharia da Liberdade
- Próximos passos sugeridos para implementação`;
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