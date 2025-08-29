import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const libraryItems = [
    {
      id: 1,
      slug: 'agente-diagnostico',
      type: 'gpt',
      title: 'Blueprint: Agente de Diagnóstico',
      content: 'Um GPT treinado para conduzir uma consultoria inicial, mapeando as dores e gargalos de um novo cliente. Usa o framework A.I.E. para guiar a conversa.',
      color: 'bg-brand-accent1'
    },
    {
      id: 2,
      slug: 'analise-contra-guru',
      type: 'prompt',
      title: 'Prompt: Análise "Contra-Guru"',
      content: 'Um prompt estratégico para analisar um texto de um concorrente e identificar as "promessas de atalho", gerando contra-argumentos alinhados à filosofia da Engenharia da Liberdade.',
      color: 'bg-brand-accent2'
    },
    {
      id: 3,
      slug: 'agente-suporte',
      type: 'gpt',
      title: 'Blueprint: Agente de Suporte Interno',
      content: 'Treine uma IA com seus processos internos (do seu "Manual de Processos") para responder a dúvidas da sua equipe ou de clientes, liberando seu tempo do suporte repetitivo.',
      color: 'bg-brand-accent1'
    },
    {
      id: 4,
      slug: 'mapeamento-processos',
      type: 'prompt',
      title: 'Prompt: Mapeamento de Processos',
      content: 'Use este prompt para entrevistar a si mesma e extrair os passos de um processo-chave do seu negócio, transformando conhecimento tácito em um fluxo documentado.',
      color: 'bg-brand-accent2'
    },
    {
      id: 5,
      slug: 'gerador-conteudo',
      type: 'gpt',
      title: 'Blueprint: Gerador de Conteúdo Híbrido',
      content: 'Um GPT treinado com a sua voz e seus pilares de conteúdo. Ele recebe uma ideia central e gera rascunhos para YouTube, LinkedIn e Substack, que você então refina com sua camada humana.',
      color: 'bg-brand-accent1'
    },
    {
      id: 6,
      slug: 'kpis-liberdade',
      type: 'prompt',
      title: 'Prompt: Definição de KPIs de Liberdade',
      content: 'Um prompt que te ajuda a definir as métricas que realmente importam para um Negócio Livre: horas salvas, tarefas automatizadas e tempo gasto em atividades estratégicas.',
      color: 'bg-brand-accent2'
    }
  ];

  const filteredItems = libraryItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter || item.slug === searchTerm.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'gpt', label: 'Blueprints de GPTs' },
    { id: 'prompt', label: 'Prompts Estratégicos' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Biblioteca de Blueprints
        </h2>
        <p className="text-muted-foreground">
          O cofre de inteligência das Engenheiras da Liberdade. 
          Use estes blueprints para construir seus próprios ativos de IA.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por palavra-chave..."
          className="flex-grow"
        />
        <div className="flex items-center justify-center gap-2">
          {filters.map(filter => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "secondary"}
              size="sm"
              className={activeFilter === filter.id ? "bg-brand-accent1" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="bg-card border-border hover:border-brand-highlight/50 transition-colors animate-in fade-in-0 slide-in-from-bottom-1">
            <CardHeader>
              <div className="flex items-center mb-3">
                <Badge 
                  className={`text-xs font-semibold uppercase mr-3 ${
                    item.type === 'gpt' ? 'bg-secondary' : 'bg-accent'
                  } text-white`}
                >
                  {item.type === 'gpt' ? 'Blueprint GPT' : 'Prompt'}
                </Badge>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum blueprint encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
};

export default Library;