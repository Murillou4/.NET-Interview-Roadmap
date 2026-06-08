import React, { useState, useEffect } from 'react';
import { StudyTerm, StudyStatus } from '../types';
import {
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronLeft,
  AlertTriangle,
  Flame,
  Code,
  Sparkles,
  Award,
  ThumbsUp
} from 'lucide-react';

interface TermDetailProps {
  term: StudyTerm;
  status: StudyStatus;
  confidence: number;
  onUpdateStatus: (termId: string, newStatus: StudyStatus) => void;
  onUpdateConfidence: (termId: string, newConfidence: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TermDetail: React.FC<TermDetailProps> = ({
  term,
  status,
  confidence,
  onUpdateStatus,
  onUpdateConfidence,
  onNext,
  onBack
}) => {
  // Reset quiz selection state when changing terms
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'interview' | 'code' | 'quiz'>('info');

  useEffect(() => {
    setSelectedOption(null);
    setQuizAnswered(false);
    setActiveTab('info');
  }, [term]);

  const handleSelectOption = (index: number) => {
    if (quizAnswered) return;
    setSelectedOption(index);
    setQuizAnswered(true);
    
    // Automatically flag as studied or studying upon taking the quiz
    if (status === 'não estudado') {
      onUpdateStatus(term.id, 'estudando');
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'básico':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'intermediário':
        return 'bg-orange-400/10 text-orange-400 border-orange-450/20';
      case 'avançado':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto my-4 transition-all animate-fadeIn font-sans">
      {/* Header Bar */}
      <div className="bg-slate-950 p-6 border-b border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-slate-900 text-slate-300 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Voltar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-bold font-mono tracking-wider uppercase border px-2 py-0.5 rounded-full ${getDifficultyColor(term.level)}`}>
                {term.level}
              </span>
              <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-850 px-2.5 py-0.5 rounded-full">
                {term.category}
              </span>
              {status === 'aprendido' && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3 h-3" /> Aprendido
                </span>
              )}
              {status === 'revisar' && (
                <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/25 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3" /> Revisar
                </span>
              )}
              {status === 'estudando' && (
                <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/25 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold animate-pulse">
                  <Flame className="w-3 h-3 text-sky-400" /> Estudando
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-slate-150 tracking-tight">{term.name}</h2>
          </div>
        </div>

        {/* Confidence ratings selector */}
        <div className="flex flex-col items-start md:items-end gap-1 font-sans">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Confiança Técnico (1 a 5)</p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() => onUpdateConfidence(term.id, stars)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs border transition-all cursor-pointer ${
                  confidence >= stars
                    ? 'bg-sky-500 text-slate-950 border-sky-500 transform scale-110 shadow-md shadow-sky-550/10'
                    : 'bg-slate-955 text-slate-400 border-slate-800 hover:text-slate-100 hover:border-slate-700'
                }`}
                title={`Confiança ${stars}/5`}
              >
                {stars}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-slate-500 font-mono">
            {confidence === 0 && 'Clique para avaliar'}
            {confidence === 1 && '1 - Não sei explicar na entrevista'}
            {confidence === 2 && '2 - Lembro do nome em parte'}
            {confidence === 3 && '3 - Sei usar no dia a dia'}
            {confidence === 4 && '4 - Explico bem na sabatina'}
            {confidence === 5 && '5 - Dou aula sobre o conceito'}
          </p>
        </div>
      </div>

      {/* Tabs navigation content */}
      <div className="flex border-b border-slate-850 bg-slate-950">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3.5 text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'info'
              ? 'text-sky-400 border-b-2 border-sky-500 bg-slate-900/40'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Conceito Básico
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`flex-1 py-3.5 text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'interview'
              ? 'text-sky-400 border-b-2 border-sky-500 bg-slate-900/40'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Award className="w-4 h-4" /> Na Entrevista
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-3.5 text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'code'
              ? 'text-sky-400 border-b-2 border-sky-500 bg-slate-900/40'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Code className="w-4 h-4" /> Uso Prático & Código
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-3.5 text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'quiz'
              ? 'text-sky-400 border-b-2 border-sky-500 bg-slate-900/40'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Desafio Rápido
        </button>
      </div>

      {/* Dynamic Tab Body content */}
      <div className="p-6 md:p-8 space-y-6">
        {activeTab === 'info' && (
          <div className="space-y-6 animate-fadeIn">
            {/* O Que É? */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850">
              <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                1. O que é?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{term.simpleExplanation}</p>
            </div>

            {/* Pra Que Serve? */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850">
              <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                2. Pra que serve no Backend?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{term.interviewExplanation}</p>
            </div>

            {/* Quando usar */}
            <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850/60">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">Quando usar em projetos?</h4>
              <p className="text-xs text-slate-450 leading-relaxed">{term.whenToUse}</p>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Como Responder na Entrevista */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-5 rounded-xl border-l-4 border-orange-500 border-t border-r border-b border-slate-850">
              <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-orange-400" />
                3. Resposta Direta & Natural (Júnior)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "{term.shortInterviewAnswer}"
              </p>
            </div>

            {/* Resposta Mais Forte / Pleno */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-5 rounded-xl border-l-4 border-sky-400 border-t border-r border-b border-slate-850">
              <h3 className="text-xs font-bold text-sky-450 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                4. Resposta de Impacto / Pleno (+ Termos Técnicos)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {term.betterInterviewAnswer}
              </p>
            </div>

            {/* Erros comuns a se evitar */}
            <div className="bg-orange-500/5 p-5 rounded-xl border border-orange-500/15">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-orange-400" /> Erros clássicos para evitar citar na sabatina:
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                {term.commonErrors.map((err, i) => (
                  <li key={i} className="leading-relaxed">{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between animate-fadeIn">
              <h3 className="text-xs font-bold text-sky-450 uppercase tracking-widest font-mono">
                Exemplo do Mundo Real (.NET C#)
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">C# strongly-typed</span>
            </div>

            <div className="bg-slate-955 p-5 rounded-xl border border-slate-850 overflow-x-auto">
              <pre className="text-xs md:text-sm font-mono text-sky-400 leading-relaxed">
                <code>{term.practicalExample}</code>
              </pre>
            </div>

            {/* Explaining code simply */}
            <div className="p-4 bg-slate-950/40 rounded-lg">
              <p className="text-xs text-slate-450">
                <strong>Análise em português simples:</strong> Observe que o código foca na assinatura direta e limpa do termo. No .NET, evitamos escrever enormes blocos de boilerplate. Integramos tudo no fluxo com injeções limpas de dependências.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 p-5 rounded-xl border border-sky-500/15">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-sky-400" />
                <h4 className="text-sm font-bold text-slate-100">Mini Quiz - Teste seus conhecimentos:</h4>
              </div>
              <p className="text-slate-200 text-sm mb-5 font-semibold">
                {term.quiz.question}
              </p>

              {/* Quiz option list */}
              <div className="space-y-3">
                {term.quiz.options.map((option, index) => {
                  let optionStyle = 'bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-950 hover:text-slate-100';
                  
                  if (quizAnswered) {
                    if (index === term.quiz.answerIndex) {
                      // Correct option always highlighted green
                      optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold';
                    } else if (selectedOption === index) {
                      // Wrong selected option highlighted red
                      optionStyle = 'bg-orange-500/20 border-orange-500 text-orange-400';
                    } else {
                      // Neutral unselected options
                      optionStyle = 'bg-slate-950/30 border-slate-850 text-slate-650 line-through opacity-55';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`w-full p-4 rounded-xl text-left text-xs md:text-sm border transition-all duration-150 flex items-center justify-between cursor-pointer ${optionStyle}`}
                      disabled={quizAnswered}
                    >
                      <span>{option}</span>
                      {quizAnswered && index === term.quiz.answerIndex && (
                        <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold font-mono">Gabarito</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Explainer (Shows up once answered) */}
              {quizAnswered && (
                <div className="mt-5 p-4 bg-slate-900 border border-slate-800 rounded-xl animate-fadeIn">
                  <p className="text-xs font-bold font-mono uppercase text-sky-400 mb-1">Explicação do Professor:</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {term.quiz.explanation}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {selectedOption === term.quiz.answerIndex ? (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md font-bold">✓ Resposta Correta! Mandou bem.</span>
                    ) : (
                      <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md font-bold">✗ Resposta Incorreta! Faz parte, veja a explicação e avance.</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls containing Status Checkboxes & Next Slide Button */}
      <div className="bg-slate-950 p-6 border-t border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Progress marking buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onUpdateStatus(term.id, 'aprendido')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
              status === 'aprendido'
                ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <CheckCircle className="w-4 h-4" /> Marcar como aprendido
          </button>
          
          <button
            onClick={() => onUpdateStatus(term.id, 'revisar')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
              status === 'revisar'
                ? 'bg-orange-500 text-slate-950 border-orange-500 shadow-lg'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" /> Marcar para revisar
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onBack}
            className="text-xs font-bold text-slate-400 hover:text-slate-100 px-4 py-2 transition-colors cursor-pointer"
          >
            Focar na Categoria
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-450 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
          >
            Próximo Termo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
