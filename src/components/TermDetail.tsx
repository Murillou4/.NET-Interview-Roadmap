import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle,
  ChevronLeft,
  Clock,
  Code,
  HelpCircle,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import { StudyStatus, StudyTerm } from '../types';

interface TermDetailProps {
  term: StudyTerm;
  status: StudyStatus;
  confidence: number;
  onUpdateStatus: (termId: string, newStatus: StudyStatus) => void;
  onUpdateConfidence: (termId: string, newConfidence: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const getStatusStyles = (status: StudyStatus) => {
  switch (status) {
    case 'aprendido':
      return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300';
    case 'revisar':
      return 'border-amber-400/25 bg-amber-400/10 text-amber-300';
    case 'estudando':
      return 'border-teal-400/25 bg-teal-400/10 text-teal-300';
    default:
      return 'border-white/[0.08] bg-white/[0.03] text-neutral-400';
  }
};

export const TermDetail: React.FC<TermDetailProps> = ({
  term,
  status,
  confidence,
  onUpdateStatus,
  onUpdateConfidence,
  onNext,
  onBack,
}) => {
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

    if (status === 'não estudado') {
      onUpdateStatus(term.id, 'estudando');
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl animate-fadeIn">
      <div className="border-b border-white/[0.08] p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-white/[0.06] hover:text-neutral-100"
              title="Voltar"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>

            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${getStatusStyles(status)}`}>
                {status}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-neutral-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
                {term.level}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-neutral-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
                {term.category}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Termo em foco</p>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{term.name}</h2>
              <p className="max-w-3xl text-sm leading-6 text-neutral-400">
                Estude em blocos curtos. Cada aba mantém o conteúdo direto para não cansar no celular.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-4 md:min-w-[20rem]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Confiança técnica</p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onUpdateConfidence(term.id, value)}
                  className={`flex h-10 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                    confidence >= value
                      ? 'border-teal-400/25 bg-teal-400 text-neutral-950'
                      : 'border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:border-white/[0.12] hover:text-neutral-100'
                  }`}
                  title={`Confiança ${value}/5`}
                  aria-label={`Confiança ${value} de 5`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-neutral-500">
              {confidence === 0 && 'Toque para avaliar.'}
              {confidence === 1 && '1 - ainda não consigo explicar.'}
              {confidence === 2 && '2 - lembro do nome e pouco mais.'}
              {confidence === 3 && '3 - uso no dia a dia.'}
              {confidence === 4 && '4 - explico com segurança.'}
              {confidence === 5 && '5 - consigo ensinar o conceito.'}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`inline-flex min-w-max items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'info' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Resumo
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`inline-flex min-w-max items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'interview' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            <Award className="h-4 w-4" />
            Entrevista
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex min-w-max items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'code' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            <Code className="h-4 w-4" />
            Código
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`inline-flex min-w-max items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'quiz' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Quiz
          </button>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        {activeTab === 'info' ? (
          <div className="space-y-4 animate-fadeIn">
            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">1. O que é?</p>
              <p className="mt-3 text-sm leading-6 text-neutral-300">{term.simpleExplanation}</p>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">2. Pra que serve?</p>
              <p className="mt-3 text-sm leading-6 text-neutral-300">{term.interviewExplanation}</p>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Quando usar</p>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{term.whenToUse}</p>
            </section>
          </div>
        ) : null}

        {activeTab === 'interview' ? (
          <div className="space-y-4 animate-fadeIn">
            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Pergunta comum</p>
              <p className="mt-3 text-sm leading-6 text-neutral-200">{term.interviewQuestion}</p>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-amber-300" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">Resposta curta</p>
              </div>
              <p className="mt-3 text-sm leading-6 italic text-neutral-300">"{term.shortInterviewAnswer}"</p>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-teal-300" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">Resposta de impacto</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-neutral-300">{term.betterInterviewAnswer}</p>
            </section>

            <section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-300" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">Erros comuns</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                {term.commonErrors.map((error, index) => (
                  <li key={index} className="flex gap-2 leading-6">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        {activeTab === 'code' ? (
          <div className="space-y-4 animate-fadeIn">
            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">Exemplo real</p>
                <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">C# strongly typed</span>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#071018] p-4 text-sm leading-6 text-teal-200">
                <code>{term.practicalExample}</code>
              </pre>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Leitura rápida</p>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                O exemplo acima mostra o caminho mais curto para apresentar o conceito sem enfeite. A ideia é fixar a
                estrutura e não decorar a parede de boilerplate.
              </p>
            </section>
          </div>
        ) : null}

        {activeTab === 'quiz' ? (
          <div className="space-y-4 animate-fadeIn">
            <section className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-teal-300" />
                <h3 className="text-sm font-semibold text-neutral-100">Mini quiz</h3>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-neutral-200">{term.quiz.question}</p>

              <div className="mt-5 space-y-3">
                {term.quiz.options.map((option, index) => {
                  let optionStyle = 'border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:border-teal-400/25 hover:text-neutral-100';

                  if (quizAnswered) {
                    if (index === term.quiz.answerIndex) {
                      optionStyle = 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300';
                    } else if (selectedOption === index) {
                      optionStyle = 'border-amber-400/25 bg-amber-400/10 text-amber-300';
                    } else {
                      optionStyle = 'border-white/[0.06] bg-neutral-950/40 text-neutral-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectOption(index)}
                      disabled={quizAnswered}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left text-sm transition ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {quizAnswered && index === term.quiz.answerIndex ? (
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                          Gabarito
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {quizAnswered ? (
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">Explicação</p>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">{term.quiz.explanation}</p>
                  <div className="mt-4">
                    {selectedOption === term.quiz.answerIndex ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Resposta correta
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Resposta incorreta
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/[0.08] p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onUpdateStatus(term.id, 'aprendido')}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                status === 'aprendido'
                  ? 'border-emerald-400/25 bg-emerald-400 text-neutral-950'
                  : 'border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06]'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              Marcar como aprendido
            </button>

            <button
              type="button"
              onClick={() => onUpdateStatus(term.id, 'revisar')}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                status === 'revisar'
                  ? 'border-amber-400/25 bg-amber-400 text-neutral-950'
                  : 'border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06]'
              }`}
            >
              <Clock className="h-4 w-4" />
              Marcar para revisar
            </button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-white/[0.06]"
            >
              Voltar à lista
            </button>

            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-teal-400/25 bg-teal-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-teal-300 active:scale-[0.99]"
            >
              Próximo termo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
