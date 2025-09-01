import { useState } from "react";
import Login from "@/components/Login";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Diagnostic from "@/components/Diagnostic";
import Laboratory from "@/components/Laboratory";
import Library from "@/components/Library";
import Community from "@/components/Community";
import Ranking from "@/components/Ranking";
import Admin from "@/components/Admin";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  progress?: {
    pilar1: 'completed' | 'in_progress' | 'not_started';
    pilar2: 'completed' | 'in_progress' | 'not_started';
    pilar3: 'completed' | 'in_progress' | 'not_started';
    pilar4: 'completed' | 'in_progress' | 'not_started';
  };
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('diagnostico');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'progresso':
        return <Dashboard user={user} onNavigate={handleTabChange} />;
      case 'diagnostico':
        return <Diagnostic />;
      case 'laboratorio':
        return <Laboratory />;
      case 'biblioteca':
        return <Library />;
      case 'comunidade':
        return <Community user={user} />;
      case 'ranking':
        return <Ranking />;
      case 'admin':
        return user.isAdmin ? <Admin /> : <Dashboard user={user} onNavigate={handleTabChange} />;
      default:
        return <Dashboard user={user} onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation 
        currentTab={activeTab} 
        onTabChange={handleTabChange} 
        isAdmin={user.isAdmin}
      />
      
      <main className="flex-grow container mx-auto px-6 py-8 md:py-12">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;