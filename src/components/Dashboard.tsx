import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  progress?: {
    pilar1: 'completed' | 'in_progress' | 'not_started';
    pilar2: 'completed' | 'in_progress' | 'not_started';
    pilar3: 'completed' | 'in_progress' | 'not_started';
    pilar4: 'completed' | 'in_progress' | 'not_started';
  };
}

interface DashboardProps {
  user: User;
  onNavigate: (tab: string) => void;
}

const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const defaultProgress = {
    pilar1: 'not_started' as const,
    pilar2: 'not_started' as const,
    pilar3: 'not_started' as const,
    pilar4: 'not_started' as const,
  };

  const progress = user.progress || defaultProgress;

  const pillars = [
    {
      id: 'pilar1',
      title: 'Pilar 1: Protagonismo',
      subtitle: 'Manual de Processos',
      description: 'Documente e organize todos os seus processos internos',
      status: progress.pilar1,
      icon: '⚡',
    },
    {
      id: 'pilar2', 
      title: 'Pilar 2: Inteligência Aplicada',
      subtitle: 'Manual de Atendimento',
      description: 'Sistematize o atendimento aos seus clientes',
      status: progress.pilar2,
      icon: '🧠',
    },
    {
      id: 'pilar3',
      title: 'Pilar 3: Arquitetura de Autonomia',
      subtitle: 'Manual de Vendas',
      description: 'Estruture seu processo comercial do lead ao fechamento',
      status: progress.pilar3,
      icon: '🏗️',
    },
    {
      id: 'pilar4',
      title: 'Pilar 4: Marca Visionária',
      subtitle: 'Manual de Conteúdo',
      description: 'Crie um sistema para produção de conteúdo consistente',
      status: progress.pilar4,
      icon: '🚀',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-brand-highlight';
      case 'not_started': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em Progresso';
      case 'not_started': return 'Não Iniciado';
      default: return 'Não Iniciado';
    }
  };

  const completedCount = Object.values(progress).filter(status => status === 'completed').length;
  const overallProgress = (completedCount / 4) * 100;

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Bem-vinda de volta, <span className="text-brand-highlight">{user.name}</span>!
      </h2>
      <p className="text-muted-foreground mb-10">
        Este é o seu painel de progresso. A cada pilar concluído, você está um passo mais perto de construir o seu Negócio Livre.
      </p>

      <Card className="mb-8 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Progresso Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="mb-4" />
          <p className="text-sm text-muted-foreground">
            {completedCount} de 4 pilares concluídos ({Math.round(overallProgress)}%)
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {pillars.map((pillar) => (
          <Card key={pillar.id} className="bg-card border-border hover:border-brand-highlight/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${getStatusColor(pillar.status)} flex items-center justify-center text-2xl mr-4`}>
                  {pillar.status === 'completed' ? '✓' : 
                   pillar.status === 'in_progress' ? '...' : pillar.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{pillar.title}</h4>
                  <p className="text-sm font-medium text-brand-highlight">{pillar.subtitle}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {pillar.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Status: {getStatusText(pillar.status)}
                </span>
                {pillar.status === 'not_started' && (
                  <Button
                    size="sm"
                    onClick={() => onNavigate('diagnostico')}
                    className="bg-brand-highlight hover:opacity-90"
                  >
                    Começar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;