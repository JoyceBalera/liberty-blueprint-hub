interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

const Navigation = ({ currentTab, onTabChange, isAdmin }: NavigationProps) => {
  const tabs = [
    { id: 'progresso', label: 'Meu Progresso' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'laboratorio', label: 'Laboratório' },
    { id: 'biblioteca', label: 'Biblioteca' },
    { id: 'comunidade', label: 'Comunidade' },
    { id: 'ranking', label: 'Ranking' },
  ];

  if (isAdmin) {
    tabs.push({ id: 'admin', label: 'Admin' });
  }

  return (
    <header className="bg-background/50 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white">
            Engenheiras<span className="text-brand-highlight">da</span>Liberdade
          </h1>
          <p className="text-xs text-muted-foreground">Hub de Inteligência</p>
        </div>
        
        <div className="flex space-x-2 sm:space-x-4 border border-border rounded-full p-1 bg-muted">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                currentTab === tab.id
                  ? 'bg-brand-highlight text-white'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;