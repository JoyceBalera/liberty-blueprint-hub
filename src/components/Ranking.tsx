import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const Ranking = () => {
  const users = [
    { id: 3, name: 'Ana', progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'completed', pilar4: 'completed' } },
    { id: 4, name: 'Beatriz', progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'completed', pilar4: 'in_progress' } },
    { id: 1, name: 'Joyce', progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'in_progress', pilar4: 'not_started' } },
    { id: 2, name: 'Jaqueline', progress: { pilar1: 'completed', pilar2: 'in_progress', pilar3: 'not_started', pilar4: 'not_started' } },
  ];

  const calculatePoints = (progress: any) => {
    let points = 0;
    Object.values(progress).forEach((status: any) => {
      if (status === 'completed') points += 25;
      else if (status === 'in_progress') points += 10;
    });
    return points;
  };

  const calculateProgress = (progress: any) => {
    const completed = Object.values(progress).filter(status => status === 'completed').length;
    return (completed / 4) * 100;
  };

  const rankedUsers = users
    .map(user => ({
      ...user,
      points: calculatePoints(user.progress),
      progressPercent: calculateProgress(user.progress)
    }))
    .sort((a, b) => b.points - a.points);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';  
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Ranking das Engenheiras
      </h2>
      <p className="text-muted-foreground mb-8">
        A jornada é individual, mas o crescimento é coletivo. 
        Veja o progresso e inspire-se com as Engenheiras mais avançadas na Trilha da Liberdade.
      </p>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Leaderboard da Comunidade</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {rankedUsers.map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center p-4 rounded-lg border transition-colors ${
                index === 0 ? 'border-yellow-400 bg-yellow-400/5' :
                index === 1 ? 'border-gray-400 bg-gray-400/5' :
                index === 2 ? 'border-amber-600 bg-amber-600/5' :
                'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 text-2xl mr-4">
                {getRankIcon(index)}
              </div>
              
              <Avatar className="w-10 h-10 mr-4">
                <AvatarFallback className="bg-brand-interactive text-white font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow text-left">
                <h3 className="font-semibold text-white">{user.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <Progress value={user.progressPercent} className="flex-grow max-w-48" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round(user.progressPercent)}% completo
                  </span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-xl font-bold text-brand-highlight">
                  {user.points}
                </div>
                <div className="text-xs text-muted-foreground">
                  pontos
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          <strong>Sistema de Pontuação:</strong> 25 pontos por pilar concluído • 10 pontos por pilar em progresso
        </p>
      </div>
    </div>
  );
};

export default Ranking;