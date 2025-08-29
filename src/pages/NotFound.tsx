import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full bg-card border-border text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-brand-highlight mb-4">404</CardTitle>
          <h1 className="text-2xl font-bold text-white">Página não encontrada</h1>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button 
            asChild
            className="bg-brand-highlight hover:opacity-90"
          >
            <a href="/">Voltar ao Hub</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
