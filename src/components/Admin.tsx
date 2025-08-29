import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import KpiChart from "@/components/KpiChart";

const Admin = () => {
  const { toast } = useToast();

  // Mock data that updates
  const [kpis, setKpis] = useState({
    totalUsers: 4,
    totalBlueprints: 6,
    totalPosts: 2
  });

  const [blueprints, setBlueprints] = useState([
    { id: 1, title: 'Agente de Diagnóstico', type: 'gpt', content: 'Blueprint para diagnóstico...' },
    { id: 2, title: 'Análise Contra-Guru', type: 'prompt', content: 'Prompt estratégico...' }
  ]);

  const [labTools, setLabTools] = useState<Array<{id: string, title: string, description: string, placeholder: string}>>([
    { id: 'prompt-creator', title: 'Criadora de Prompts', description: 'IA para criar prompts estratégicos', placeholder: 'Descreva seu objetivo...' },
    { id: 'negotiator', title: 'A Negociadora', description: 'IA para scripts de negociação', placeholder: 'Insira o cenário...' }
  ]);

  const [users] = useState([
    { id: 1, name: 'Joyce', email: 'joyce@engenheiras.com', isAdmin: true },
    { id: 2, name: 'Jaqueline', email: 'jaqueline@cliente.com', isAdmin: false },
    { id: 3, name: 'Ana', email: 'ana@cliente.com', isAdmin: false },
    { id: 4, name: 'Beatriz', email: 'beatriz@cliente.com', isAdmin: false }
  ]);

  // Form states
  const [blueprintForm, setBlueprintForm] = useState({
    title: '',
    content: '',
    type: 'gpt'
  });

  const [labToolForm, setLabToolForm] = useState({
    title: '',
    description: '',
    placeholder: ''
  });

  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  });

  const handleBlueprintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlueprint = {
      id: blueprints.length + 1,
      ...blueprintForm
    };
    const updatedBlueprints = [...blueprints, newBlueprint];
    setBlueprints(updatedBlueprints);
    setBlueprintForm({ title: '', content: '', type: 'gpt' });
    
    // Update KPI
    setKpis(prev => ({ ...prev, totalBlueprints: updatedBlueprints.length }));
    
    toast({
      title: "Blueprint adicionado!",
      description: "O novo blueprint foi salvo na biblioteca.",
    });
  };

  const handleLabToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTool = {
      id: `${labToolForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      ...labToolForm
    };
    const updatedTools = [...labTools, newTool];
    setLabTools(updatedTools);
    
    // Save to localStorage for persistence
    localStorage.setItem('labTools', JSON.stringify(updatedTools));
    
    setLabToolForm({ title: '', description: '', placeholder: '' });
    toast({
      title: "IA do Lab adicionada!",
      description: "A nova ferramenta foi adicionada ao laboratório.",
    });
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Usuária criada!",
      description: `Nova usuária adicionada: ${userForm.email}`,
    });
    setUserForm({ email: '', password: '' });
  };

  const handleDeleteBlueprint = (id: number) => {
    const updatedBlueprints = blueprints.filter(b => b.id !== id);
    setBlueprints(updatedBlueprints);
    
    // Update KPI
    setKpis(prev => ({ ...prev, totalBlueprints: updatedBlueprints.length }));
    
    toast({
      title: "Blueprint removido",
      description: "O blueprint foi removido da biblioteca.",
    });
  };

  const handleDeleteLabTool = (id: string) => {
    const updatedTools = labTools.filter(t => t.id !== id);
    setLabTools(updatedTools);
    
    // Update localStorage
    localStorage.setItem('labTools', JSON.stringify(updatedTools));
    
    toast({
      title: "IA removida",
      description: "A ferramenta foi removida do laboratório.",
    });
  };

  return (
    <div className="text-center max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Painel de Administrador
      </h2>
      <p className="text-muted-foreground mb-8">
        Gerencie e analise a saúde do seu ecossistema.
      </p>

      <Tabs defaultValue="kpis" className="text-left">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="kpis">Dashboard de KPIs</TabsTrigger>
          <TabsTrigger value="blueprints">Gerenciar Blueprints</TabsTrigger>
          <TabsTrigger value="lab">Gerenciar IAs do Lab</TabsTrigger>
          <TabsTrigger value="users">Gerenciar Usuárias</TabsTrigger>
        </TabsList>

        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuárias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{kpis.totalUsers}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Blueprints na Biblioteca</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{kpis.totalBlueprints}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Posts na Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{kpis.totalPosts}</p>
              </CardContent>
            </Card>
          </div>
          <KpiChart />
        </TabsContent>

        <TabsContent value="blueprints">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Blueprint</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlueprintSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="blueprint-title">Título</Label>
                    <Input
                      id="blueprint-title"
                      value={blueprintForm.title}
                      onChange={(e) => setBlueprintForm({...blueprintForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueprint-content">Conteúdo</Label>
                    <Textarea
                      id="blueprint-content"
                      value={blueprintForm.content}
                      onChange={(e) => setBlueprintForm({...blueprintForm, content: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="blueprint-type">Tipo</Label>
                    <Select value={blueprintForm.type} onValueChange={(value) => setBlueprintForm({...blueprintForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt">Blueprint de GPT</SelectItem>
                        <SelectItem value="prompt">Prompt Estratégico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-brand-highlight hover:opacity-90">
                    Salvar Blueprint
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blueprints Existentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {blueprints.map(blueprint => (
                    <div key={blueprint.id} className="flex justify-between items-center bg-muted p-2 rounded">
                      <span className="text-sm">{blueprint.title}</span>
                      <Button
                        onClick={() => handleDeleteBlueprint(blueprint.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar IA do Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLabToolSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="lab-tool-title">Título da IA</Label>
                    <Input
                      id="lab-tool-title"
                      value={labToolForm.title}
                      onChange={(e) => setLabToolForm({...labToolForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lab-tool-description">Descrição</Label>
                    <Textarea
                      id="lab-tool-description"
                      value={labToolForm.description}
                      onChange={(e) => setLabToolForm({...labToolForm, description: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lab-tool-placeholder">Texto de Exemplo</Label>
                    <Input
                      id="lab-tool-placeholder"
                      value={labToolForm.placeholder}
                      onChange={(e) => setLabToolForm({...labToolForm, placeholder: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-brand-highlight hover:opacity-90">
                    Salvar IA
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IAs do Laboratório</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {labTools.map(tool => (
                    <div key={tool.id} className="flex justify-between items-center bg-muted p-2 rounded">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{tool.title}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                      <Button
                        onClick={() => handleDeleteLabTool(tool.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Usuária</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="new-user-email">Email da Usuária</Label>
                    <Input
                      id="new-user-email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-user-password">Senha Temporária</Label>
                    <Input
                      id="new-user-password"
                      type="text"
                      value={userForm.password}
                      onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-brand-highlight hover:opacity-90">
                    Criar Usuária
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usuárias Cadastradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {users.map(user => (
                    <div key={user.id} className="flex justify-between items-center bg-muted p-3 rounded">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      {user.isAdmin && (
                        <span className="text-xs bg-brand-highlight text-white px-2 py-1 rounded">
                          Admin
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;