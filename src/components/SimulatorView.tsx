import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Eye,
  HelpCircle,
  Shuffle,
  Trophy,
  XCircle,
} from 'lucide-react';
import { SIMULATOR_QUESTIONS } from '../data/simulator';
import { SimulatorQuestion } from '../types';

interface SimulatorViewProps {
  simulatorPerformance: Record<string, 'errei' | 'mais_ou_menos' | 'acertei'>;
  onUpdatePerformance: (questionId: string, performance: 'errei' | 'mais_ou_menos' | 'acertei') => void;
  onResetPerformance: () => void;
  onSelectTermById: (termId: string) => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  simulatorPerformance,
  onUpdatePerformance,
  onResetPerformance,
  onSelectTermById,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<SimulatorQuestion>(SIMULATOR_QUESTIONS[0]);
  const [userDraft, setUserDraft] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const relatedTermByQuestionId: Record<string, string> = {
    'class-vs-struct': 'struct',
    'what-is-interface': 'interface',
    'async-await': 'async',
    'what-is-linq': 'linq',
    'ienumerable-iqueryable-list': 'iqueryable',
    'exception-handling': 'exception',
    'dependency-injection': 'injecao-dependencia',
    'what-is-controller': 'controller',
    'what-is-endpoint': 'endpoint',
    'what-is-middleware': 'middleware',
    'http-status-codes': 'response',
    'api-authentication': 'jwt',
    'what-is-jwt': 'jwt',
    'what-is-dto': 'dto',
    'why-not-return-entity': 'entidade',
    'inner-vs-left-join': 'inner-join',
    'what-is-index': 'indice',
    'what-is-transaction': 'transacao',
    'normalization-db': 'normalizacao',
    'what-is-migration': 'migration',
    'what-is-entity-framework': 'dbcontext',
    'query-performance-issues': 'n-plus-1',
  };

  const totalQuestions = SIMULATOR_QUESTIONS.length;
  const answeredKeys = Object.keys(simulatorPerformance);
  const answeredCount = answeredKeys.length;
  const acerteiCount = answeredKeys.filter((key) => simulatorPerformance[key] === 'acertei').length;
  const maisOuMenosCount = answeredKeys.filter((key) => simulatorPerformance[key] === 'mais_ou_menos').length;
  const erreiCount = answeredKeys.filter((key) => simulatorPerformance[key] === 'errei').length;
  const scorePercent =
    answeredCount > 0 ? Math.round(((acerteiCount + maisOuMenosCount * 0.5) / answeredCount) * 100) : 0;

  const handleShuffleQuestion = () => {
    const unvisited = SIMULATOR_QUESTIONS.filter((question) => !simulatorPerformance[question.id]);
    const pool = unvisited.length > 0 ? unvisited : SIMULATOR_QUESTIONS;
    let nextQuestion = pool[Math.floor(Math.random() * pool.length)];

    if (nextQuestion.id === currentQuestion.id && SIMULATOR_QUESTIONS.length > 1) {
      const remainingQuestions = SIMULATOR_QUESTIONS.filter((question) => question.id !== currentQuestion.id);
      nextQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    }

    setCurrentQuestion(nextQuestion);
    setUserDraft('');
    setShowAnswer(false);
    setLastAction(null);
  };

  const handleRatePerformance = (rating: 'errei' | 'mais_ou_menos' | 'acertei') => {
    onUpdatePerformance(currentQuestion.id, rating);
    setLastAction(
      rating === 'acertei' ? 'Avaliado como Acertei' : rating === 'mais_ou_menos' ? 'Avaliado como Mais ou menos' : 'Avaliado como Errei',
    );
  };

  const handleResetScores = () => {
    if (window.confirm('Deseja mesmo apagar o histórico do simulado?')) {
      onResetPerformance();
      setUserDraft('');
      setShowAnswer(false);
      setLastAction(null);
    }
  };

  const performanceForCurrentQuestion = simulatorPerformance[currentQuestion.id];

  return (
    <div className="space-y-5 animate-fadeIn">
      <section className="grid grid-cols-2 gap-3 2xl:grid-cols-4">
        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 shrink-0 text-teal-300" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">Respondidas</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-neutral-100">
                {answeredCount}/{totalQuestions}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 shrink-0 text-emerald-300" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">Acertei</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-emerald-300">{acerteiCount}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 shrink-0 text-amber-300" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">Meio termo</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-amber-300">{maisOuMenosCount}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 shrink-0 text-teal-300" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">Aproveitamento</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-neutral-100">{scorePercent}%</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-7">
        <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-300">
              Simulado técnico
            </span>
            <p className="text-xs uppercase leading-5 tracking-[0.12em] text-neutral-500">Categoria: {currentQuestion.category}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleShuffleQuestion}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/[0.06] active:scale-[0.99]"
              id="btn-shuffle-question"
            >
              <Shuffle className="h-4 w-4" />
              Próxima pergunta
            </button>

            {answeredCount > 0 ? (
              <button
                type="button"
                onClick={handleResetScores}
                className="inline-flex items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/15 active:scale-[0.99]"
                title="Reset histórico"
              >
                Resetar dados
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-teal-300" />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-300">Pergunta do entrevistador</h3>
          </div>
          <p className="mt-3 text-lg font-bold leading-snug text-neutral-100 md:text-xl">
            {currentQuestion.question}
          </p>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-neutral-500">
              Escreva ou esquematize sua resposta
            </label>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-neutral-500">Simulador local</span>
          </div>

          <textarea
            value={userDraft}
            onChange={(event) => setUserDraft(event.target.value)}
            disabled={showAnswer}
            placeholder="Rascunhe aqui os termos que você diria na entrevista..."
            rows={5}
            className="w-full rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-4 text-sm text-neutral-100 outline-none transition focus:border-teal-400/70 focus:ring-4 focus:ring-teal-400/15 placeholder:text-neutral-500 disabled:opacity-70"
            id="draft-textarea"
          />
        </div>

        {!showAnswer ? (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-teal-400/25 bg-teal-400 px-4 py-4 text-sm font-bold text-neutral-950 transition hover:bg-teal-300 active:scale-[0.99]"
            id="btn-reveal-answer"
          >
            <Eye className="h-4 w-4" />
            Revelar resposta ideal
          </button>
        ) : (
          <div className="mt-5 space-y-4 border-t border-white/[0.08] pt-5">
            <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">Resposta curta</p>
              <p className="mt-2 text-sm leading-6 text-neutral-200 italic">"{currentQuestion.idealShortAnswer}"</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">Resposta completa</p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">{currentQuestion.idealCompleteAnswer}</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Pontos que valem ouvir</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                {currentQuestion.expectedPoints.map((point, index) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span className="leading-6">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-neutral-100">Como foi sua resposta?</h4>
                <p className="mt-1 text-xs text-neutral-500">Seja honesto para calibrar seu histórico local.</p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => handleRatePerformance('errei')}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    performanceForCurrentQuestion === 'errei'
                      ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
                      : 'border-white/[0.08] bg-transparent text-neutral-400 hover:border-amber-400/25 hover:text-amber-300'
                  }`}
                  id="rate-fail"
                >
                  <XCircle className="h-4 w-4" />
                  Errei
                </button>

                <button
                  type="button"
                  onClick={() => handleRatePerformance('mais_ou_menos')}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    performanceForCurrentQuestion === 'mais_ou_menos'
                      ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
                      : 'border-white/[0.08] bg-transparent text-neutral-400 hover:border-amber-400/25 hover:text-amber-300'
                  }`}
                  id="rate-partial"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Mais ou menos
                </button>

                <button
                  type="button"
                  onClick={() => handleRatePerformance('acertei')}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    performanceForCurrentQuestion === 'acertei'
                      ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                      : 'border-white/[0.08] bg-transparent text-neutral-400 hover:border-emerald-400/25 hover:text-emerald-300'
                  }`}
                  id="rate-success"
                >
                  <CheckCircle className="h-4 w-4" />
                  Acertei
                </button>
              </div>

              {lastAction ? (
                <p className="mt-4 text-center text-sm font-medium text-teal-300">{lastAction}</p>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <p className="text-center text-sm leading-6 text-neutral-500">
          Quer abrir a teoria deste assunto? Use a busca ou o roadmap e escolha o card do termo para continuar.
        </p>
        {relatedTermByQuestionId[currentQuestion.id] ? (
          <button
            type="button"
            onClick={() => onSelectTermById(relatedTermByQuestionId[currentQuestion.id])}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/[0.06] active:scale-[0.99]"
          >
            Abrir termo relacionado
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </section>
    </div>
  );
};
