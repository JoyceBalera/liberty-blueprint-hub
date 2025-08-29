import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (user: any) => void;
}

const USERS = [
  { 
    id: 1, 
    email: 'joyce@engenheiras.com', 
    name: 'Joyce', 
    password: 'liberdade2025', 
    isAdmin: true,
    progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'in_progress', pilar4: 'not_started' }
  },
  { 
    id: 2, 
    email: 'jaqueline@cliente.com', 
    name: 'Jaqueline', 
    password: 'password123', 
    isAdmin: false,
    progress: { pilar1: 'completed', pilar2: 'in_progress', pilar3: 'not_started', pilar4: 'not_started' }
  },
  { 
    id: 3, 
    email: 'ana@cliente.com', 
    name: 'Ana', 
    password: 'password123', 
    isAdmin: false,
    progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'completed', pilar4: 'completed' }
  },
  { 
    id: 4, 
    email: 'beatriz@cliente.com', 
    name: 'Beatriz', 
    password: 'password123', 
    isAdmin: false,
    progress: { pilar1: 'completed', pilar2: 'completed', pilar3: 'completed', pilar4: 'in_progress' }
  },
];

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('joyce@engenheiras.com');
  const [password, setPassword] = useState('liberdade2025');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vinda de volta, ${user.name}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Email ou senha inválidos. Tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Engenheiras<span className="text-brand-highlight">da</span>Liberdade
          </h1>
          <p className="text-muted-foreground mt-2">Acesso ao Hub de Inteligência</p>
        </div>
        
        <Card className="bg-card border-border shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">Entre com suas credenciais</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-highlight hover:opacity-90">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;