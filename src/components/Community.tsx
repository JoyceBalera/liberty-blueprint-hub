import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
}

interface CommunityProps {
  user: User;
}

const Community = ({ user }: CommunityProps) => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: 'Joyce (Fundadora)',
      content: 'Bem-vindas ao Hub, Engenheiras! ✨ Este é o nosso espaço para construir, compartilhar e crescer. Qual é o primeiro ativo de IA que vocês estão planejando construir?'
    },
    {
      id: 2,
      name: 'Jaqueline M.',
      content: 'Terminei o Módulo 1 e meu "Manual de Processos" está tomando forma. É impressionante o quanto de conhecimento estava só na minha cabeça. Já sinto mais clareza!'
    }
  ]);

  const { toast } = useToast();

  const handleSubmitPost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      name: user.name,
      content: postContent
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    
    toast({
      title: "Post publicado!",
      description: "Seu post foi compartilhado com a comunidade.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Comunidade
        </h2>
        <p className="text-muted-foreground">
          Este é o nosso "Circle" proprietário. Um espaço seguro para compartilhar a jornada, 
          tirar dúvidas e construir em conjunto. Aqui, a humanidade está no centro.
        </p>
      </div>

      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <Textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Compartilhe uma vitória, um desafio ou uma pergunta..."
            rows={4}
            className="mb-4"
          />
          <Button 
            onClick={handleSubmitPost}
            className="w-full bg-brand-interactive text-white font-semibold py-2.5 hover:opacity-90"
          >
            Publicar
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="bg-card border-border animate-in fade-in-0 slide-in-from-bottom-1">
            <CardContent className="p-5">
              <div className="flex items-center mb-3">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarFallback className="bg-brand-interactive text-white font-bold">
                    {post.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-white">{post.name}</span>
              </div>
              <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;