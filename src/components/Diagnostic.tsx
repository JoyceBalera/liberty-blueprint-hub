import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Diagnostic = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, sender: 'ai' | 'user'}>>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const questions = [
    "Qual é o maior 'ladrão de tempo' no seu negócio hoje? Descreva a tarefa que mais consome sua energia operacional.",
    "Se você pudesse contratar um 'funcionário-robô' perfeito amanhã, qual seria a única função que você delegaria a ele?",
    "Qual é a sua maior frustração com o marketing digital hoje? O que te impede de comunicar sua verdadeira expertise?",
    "O que 'liberdade' realmente significa para você no contexto do seu negócio? Descreva a vida que você está tentando construir."
  ];

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => {
      setMessages([{text: questions[0], sender: 'ai'}]);
    }, 500);
  };

  const handleNext = () => {
    if (!userInput.trim()) return;

    const newAnswers = [...answers, userInput];
    setAnswers(newAnswers);
    setMessages(prev => [...prev, {text: userInput, sender: 'user'}]);
    setUserInput('');
    
    if (currentQuestion < questions.length - 1) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setMessages(prev => [...prev, {text: questions[nextQuestion], sender: 'ai'}]);
      }, 1500);
    } else {
      // Show final analysis
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        const finalMessage = generatePersonalizedPath(newAnswers);
        setMessages(prev => [...prev, {text: finalMessage, sender: 'ai'}]);
        setIsFinished(true);
      }, 2000);
    }
  };

  const generatePersonalizedPath = (userAnswers: string[]) => {
    // Simple analysis based on keywords
    let recommendations = [];
    const combinedAnswers = userAnswers.join(' ').toLowerCase();

    if (combinedAnswers.includes('vendas') || combinedAnswers.includes('cliente')) {
      recommendations.push('Manual de Vendas');
    }
    if (combinedAnswers.includes('atendimento') || combinedAnswers.includes('suporte')) {
      recommendations.push('Manual de Atendimento');
    }
    if (combinedAnswers.includes('processo') || combinedAnswers.includes('operação')) {
      recommendations.push('Manual de Processos');
    }
    if (combinedAnswers.includes('conteúdo') || combinedAnswers.includes('marketing')) {
      recommendations.push('Manual de Conteúdo');
    }

    if (recommendations.length === 0) {
      recommendations = ['Manual de Processos'];
    }

    return `<h3 class="text-lg font-bold mb-4">Sua Trilha da Liberdade Personalizada</h3>
    <p class="mb-4">Com base em suas respostas, sua jornada começa focando nos seguintes pontos críticos:</p>
    <ul class="space-y-3 text-left">
      ${recommendations.map(rec => `
        <li class="border-l-2 border-brand-highlight pl-3">
          <strong>${rec}:</strong>
          <p class="text-muted-foreground text-sm mt-1">
            Este será seu primeiro passo para construir um negócio que funciona sem depender apenas de você.
          </p>
        </li>
      `).join('')}
    </ul>`;
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setUserInput('');
    setMessages([]);
    setIsFinished(false);
    setShowTyping(false);
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Diagnóstico de Partida
      </h2>
      <p className="text-muted-foreground mb-8">
        Este Diagnóstico de IA é o primeiro passo da Engenharia da Liberdade. 
        Responda com sinceridade para mapear os gargalos que roubam seu tempo e sua paz.
      </p>

      <Card className="bg-card/95 border-border/20 backdrop-blur-sm min-h-[500px] flex flex-col shadow-lg">
        <CardContent className="p-6 flex-grow flex flex-col">
          {!isStarted ? (
            <div className="flex-grow flex items-center justify-center">
              <Button 
                onClick={handleStart}
                className="bg-gradient-to-r from-brand-highlight to-brand-accent1 text-white font-bold py-4 px-10 rounded-full text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Iniciar Diagnóstico
              </Button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col">
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 text-left max-h-[350px]">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl max-w-[85%] animate-in fade-in-0 slide-in-from-bottom-1 shadow-sm ${
                      message.sender === 'ai' 
                        ? 'bg-background/80 border border-border/50 text-foreground self-start backdrop-blur-sm' 
                        : 'bg-gradient-to-r from-brand-highlight to-brand-accent1 text-white self-end ml-auto'
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                ))}
                {showTyping && (
                  <div className="p-4 rounded-xl bg-background/80 border border-border/50 max-w-[85%] backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-highlight rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-brand-highlight rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-brand-highlight rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                )}
              </div>
              
              {isStarted && !isFinished && !showTyping && (
                <div className="mt-6 border-t border-border/20 pt-4">
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Digite sua resposta..."
                    rows={3}
                    className="mb-3 bg-background/50 border-border/30 focus:border-brand-highlight/50 resize-none"
                  />
                  <Button 
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-brand-highlight to-brand-accent1 text-white font-semibold py-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Próxima Pergunta
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {isFinished && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleRestart}
            variant="ghost"
            className="text-brand-highlight font-semibold text-sm hover:opacity-80"
          >
            Refazer Diagnóstico
          </Button>
        </div>
      )}
    </div>
  );
};

export default Diagnostic;