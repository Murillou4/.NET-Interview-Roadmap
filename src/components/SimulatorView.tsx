import React, { useState, useEffect } from 'react';
import { SimulatorQuestion } from '../types';
import { SIMULATOR_QUESTIONS } from '../data/simulator';
import {
  HelpCircle,
  Award,
  BookOpen,
  Shuffle,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Trophy,
  Undo
} from 'lucide-react';

interface SimulatorViewProps {
  simulatorPerformance: Record<string, 'errei' | 'mais_ou_menos' | 'acertei'>;
  onUpdatePerformance: (questionId: string, performance: 'errei' | 'mais_ou_menos' | 'acertei') => void;
  onSelectTermById: (termId: string) => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  simulatorPerformance,
  onUpdatePerformance,
  onSelectTermById
}) => {
  // Simulator State
  const [currentQuestion, setCurrentQuestion] = useState<SimulatorQuestion>(SIMULATOR_QUESTIONS[0]);
  const [userDraft, setUserDraft] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Stats calculation
  const totalQuestions = SIMULATOR_QUESTIONS.length;
  const answeredKeys = Object.keys(simulatorPerformance);
  const answeredCount = answeredKeys.length;
  
  const acerteiCount = answeredKeys.filter((k) => simulatorPerformance[k] === 'acertei').length;
  const maisOuMenosCount = answeredKeys.filter((k) => simulatorPerformance[k] === 'mais_ou_menos').length;
  const erreiCount = answeredKeys.filter((k) => simulatorPerformance[k] === 'errei').length;

  const scorePercent = answeredCount > 0 ? Math.round(((acerteiCount + maisOuMenosCount * 0.5) / answeredCount) * 100) : 0;

  // Set randomized initial question
  const handleShuffleQuestion = () => {
    const unvisited = SIMULATOR_QUESTIONS.filter((q) => !simulatorPerformance[q.id]);
    const pool = unvisited.length > 0 ? unvisited : SIMULATOR_QUESTIONS;
    
    // Pick one that is different from current if possible
    let nextQ = pool[Math.floor(Math.random() * pool.length)];
    if (nextQ.id === currentQuestion.id && SIMULATOR_QUESTIONS.length > 1) {
      const remainingQ = SIMULATOR_QUESTIONS.filter((q) => q.id !== currentQuestion.id);
      nextQ = remainingQ[Math.floor(Math.random() * remainingQ.length)];
    }
    
    setCurrentQuestion(nextQ);
    setUserDraft('');
    setShowAnswer(false);
    setLastAction(null);
  };

  const handleRatePerformance = (rating: 'errei' | 'mais_ou_menos' | 'acertei') => {
    onUpdatePerformance(currentQuestion.id, rating);
    setLastAction(`Avaliado como: ${rating === 'acertei' ? 'Acertei' : rating === 'mais_ou_menos' ? 'Mais ou menos' : 'Errei'}`);
    
    // Auto advance hint or toast
    setTimeout(() => {
      // Opt-in automatic progression or show success
    }, 500);
  };

  const handleResetScores = () => {
    if (confirm('Deseja mesmo resetar todo o seu histórico do Simulado de Entrevistas?')) {
      // clear performance
      SIMULATOR_QUESTIONS.forEach(q => {
        onUpdatePerformance(q.id, undefined as any);
      });
      setUserDraft('');
      setShowAnswer(false);
    }
  };
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Board Statistics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-sky-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">RESPONDIDAS</span>
            <span className="text-xl font-bold font-mono text-slate-100">{answeredCount}/{totalQuestions}</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">CONFIRMADAS</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{acerteiCount}</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <AlertTriangle className="w-8 h-8 text-orange-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">RAZOÁVEL</span>
            <span className="text-xl font-bold font-mono text-orange-400">{maisOuMenosCount}</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <Trophy className="w-8 h-8 text-orange-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">APROVEITAMENTO</span>
            <span className="text-xl font-bold font-mono text-slate-100">{scorePercent}%</span>
          </div>
        </div>
      </div>

      {/* Main card simulator arena */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative">
        <div className="flex items-center justify-between gap-4 border-b border-slate-850 pb-4 flex-wrap">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded">SIMULADO TÉCNICO</span>
            <span className="text-xs text-slate-450 block mt-1">Categoria: {currentQuestion.category}</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleShuffleQuestion}
              className="px-4 py-2 bg-slate-850 hover:bg-sky-500 hover:text-slate-950 text-slate-200 border border-slate-750 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              id="btn-shuffle-question"
            >
              <Shuffle className="w-4 h-4" /> Próxima Pergunta
            </button>
            
            {answeredCount > 0 && (
              <button
                onClick={handleResetScores}
                className="px-3 py-2 bg-transparent text-slate-500 hover:text-orange-450 rounded-xl text-xs font-mono tracking-tight transition-colors cursor-pointer"
                title="Reset histórico"
              >
                Resetar Dados
              </button>
            )}
          </div>
        </div>

        {/* The Question Text */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-855 space-y-2">
          <h3 className="text-sky-400 font-bold text-[10px] uppercase font-mono tracking-widest flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-400" /> Pergunta do Entrevistador:
          </h3>
          <p className="text-slate-100 text-lg font-black leading-snug font-sans">
            "{currentQuestion.question}"
          </p>
        </div>

        {/* Textbox writing training drafting */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 font-mono">Escreva ou esquematize mentalmente sua resposta:</label>
            <span className="text-[10px] text-slate-500 font-mono">Simulador local</span>
          </div>
          <textarea
            value={userDraft}
            onChange={(e) => setUserDraft(e.target.value)}
            disabled={showAnswer}
            placeholder="Rascunhe aqui os termos chaves que você falaria na entrevista... (ex: Tipo de referência, Garbage collector...)"
            rows={4}
            className="w-full bg-slate-955 text-slate-100 border border-slate-850 hover:border-slate-750 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl outline-none p-4 text-sm transition-colors placeholder:text-slate-650 font-mono"
            id="draft-textarea"
          />
        </div>

        {/* View answer reveal trigger */}
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full bg-sky-500 hover:bg-sky-450 text-slate-950 p-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg"
            id="btn-reveal-answer"
          >
            <Eye className="w-4 h-4" /> Revelar Resposta Ideal e Critérios
          </button>
        ) : (
          <div className="space-y-6 pt-2 animate-fadeIn border-t border-slate-850">
            
            {/* Ideal short answers */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/80">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-1.5">Análise Curta (Direto ao ponto)</h4>
              <p className="text-slate-200 text-sm italic">"{currentQuestion.idealShortAnswer}"</p>
            </div>

            {/* Ideal complete answers */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/80">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-1.5">Gabarito Completo (Resposta Plena)</h4>
              <p className="text-slate-200 text-sm leading-relaxed">{currentQuestion.idealCompleteAnswer}</p>
            </div>

            {/* Checklists checkup */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850/85 space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-450">Pontos chave que esperam ouvir de você:</h4>
              <ul className="space-y-1.5 text-xs text-slate-305">
                {currentQuestion.expectedPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Self evaluation controls rate */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-xs font-bold text-slate-100 font-mono">Como foi seu desempenho nessa resposta?</h4>
                <p className="text-[10px] text-slate-500 font-mono">Seja honesto para calibrar seu progresso de estudo no localStorage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleRatePerformance('errei')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    simulatorPerformance[currentQuestion.id] === 'errei'
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/25 shadow-sm'
                      : 'bg-transparent text-slate-450 border-slate-850 hover:text-orange-410 hover:border-orange-500/20'
                  }`}
                  id="rate-fail"
                >
                  <XCircle className="w-4 h-4" /> Errei a resposta
                </button>

                <button
                  onClick={() => handleRatePerformance('mais_ou_menos')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    simulatorPerformance[currentQuestion.id] === 'mais_ou_menos'
                      ? 'bg-orange-400/10 text-orange-400 border-orange-400/25'
                      : 'bg-transparent text-slate-450 border-slate-850 hover:text-orange-410 hover:border-orange-400/25'
                  }`}
                  id="rate-[#F59E0B]"
                >
                  <AlertTriangle className="w-4 h-4" /> Lembrei Mais ou Menos
                </button>

                <button
                  onClick={() => handleRatePerformance('acertei')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    simulatorPerformance[currentQuestion.id] === 'acertei'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                      : 'bg-transparent text-slate-450 border-slate-850 hover:text-[#22C55E] hover:border-emerald-500/20'
                  }`}
                  id="rate-success"
                >
                  <CheckCircle className="w-4 h-4" /> Dominei e acertei!
                </button>
              </div>

              {/* Feedback and next prompt warning */}
              {lastAction && (
                <div className="mt-3 text-center">
                  <p className="text-xs text-sky-400 font-semibold flex items-center justify-center gap-1">
                    🎉 {lastAction}! Clique em "Próxima Pergunta" acima para testar outra.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Recommended study bypass suggestion */}
      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
        <p className="text-xs text-slate-500 text-center">
          <strong>Quer estudar a teoria deste assunto?</strong> Você pode pesquisar o nome correspondente no campo de busca ou no painel de categorias para abrir o card de revisão contendo o mini quiz interativo!
        </p>
      </div>
    </div>
  );
};
