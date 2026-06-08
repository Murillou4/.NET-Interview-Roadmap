import React from 'react';
import { ArrowRight, CheckCircle, Compass, Lock, Unlock } from 'lucide-react';
import { ROADMAP_STEPS } from '../data/categories';
import { StudyStatus, StudyTerm } from '../types';

interface RoadmapViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  onSelectTerm: (term: StudyTerm) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ terms, termStatus, onSelectTerm }) => {
  const isStepUnlocked = (stepIndex: number) => {
    if (stepIndex === 0) return true;

    const previousStep = ROADMAP_STEPS[stepIndex - 1];
    return previousStep.termIds.some((termId) => termStatus[termId] && termStatus[termId] !== 'não estudado');
  };

  const nextTargetStep =
    ROADMAP_STEPS.find((step) => {
      const learnedInStep = step.termIds.filter((termId) => termStatus[termId] === 'aprendido').length;
      return learnedInStep < step.termIds.length;
    }) || ROADMAP_STEPS[0];

  return (
    <div className="space-y-5 animate-fadeIn">
      <section className="flex flex-col gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">
            Cronograma recomendado
          </span>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-teal-300" />
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Trilha evolutiva do C#</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-neutral-400">
            Estude em ordem curta. Cada etapa mostra o que abrir agora e quanto falta para fechar o bloco.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Foco atual sugerido</p>
          <p className="mt-2 text-sm font-semibold text-neutral-100">{nextTargetStep.title}</p>
          <p className="mt-1 text-xs text-neutral-500">Tempo estimado: {nextTargetStep.recommendedDuration}</p>
        </div>
      </section>

      <div className="space-y-4 border-l border-white/[0.08] pl-4 md:pl-8">
        {ROADMAP_STEPS.map((step, index) => {
          const unlocked = isStepUnlocked(index);
          const stepTerms = terms.filter((term) => step.termIds.includes(term.id));
          const totalTermsCount = step.termIds.length;
          const learnedTermsCount = step.termIds.filter((termId) => termStatus[termId] === 'aprendido').length;
          const percentDone = totalTermsCount > 0 ? Math.round((learnedTermsCount / totalTermsCount) * 100) : 0;
          const isComplete = learnedTermsCount === totalTermsCount && totalTermsCount > 0;

          return (
            <article key={step.id} className="relative">
              <div
                className={`absolute -left-[1.45rem] top-5 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold ${
                  isComplete
                    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                    : unlocked
                      ? 'border-teal-400/25 bg-teal-400/10 text-teal-300'
                      : 'border-white/[0.08] bg-neutral-950/80 text-neutral-500'
                }`}
              >
                {isComplete ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>

              <div
                className={`rounded-3xl border p-5 md:p-6 ${
                  isComplete
                    ? 'border-emerald-400/20 bg-emerald-400/[0.06]'
                    : unlocked
                      ? 'border-white/[0.08] bg-white/[0.03]'
                      : 'border-white/[0.06] bg-white/[0.02] opacity-70'
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Etapa {step.id}</span>
                      <span className="rounded-full border border-white/[0.08] bg-neutral-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
                        {step.recommendedDuration}
                      </span>
                      {!unlocked ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                          <Lock className="h-3 w-3" />
                          Bloqueado
                        </span>
                      ) : isComplete ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                          <CheckCircle className="h-3 w-3" />
                          Concluído
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                          <Unlock className="h-3 w-3" />
                          Liberado
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-neutral-100">{step.title}</h3>
                    <p className="max-w-3xl text-sm leading-6 text-neutral-400">{step.description}</p>
                  </div>

                  <div className="min-w-[9rem] space-y-2">
                    <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
                      <span className="font-mono tabular-nums">
                        {learnedTermsCount}/{totalTermsCount}
                      </span>
                      <span className="font-mono tabular-nums text-neutral-100">{percentDone}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-900">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isComplete ? 'bg-emerald-400' : 'bg-teal-400'
                        }`}
                        style={{ width: `${percentDone}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Termos desta etapa</p>

                  <div className="flex flex-wrap gap-2">
                    {stepTerms.length === 0 ? (
                      <span className="text-sm text-neutral-500">Termos ainda em construção.</span>
                    ) : (
                      stepTerms.map((term) => {
                        const status = termStatus[term.id] || 'não estudado';
                        const isStudied = status !== 'não estudado';

                        return (
                          <button
                            key={term.id}
                            type="button"
                            onClick={() => onSelectTerm(term)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition ${
                              status === 'aprendido'
                                ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                                : status === 'revisar'
                                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                                  : status === 'estudando'
                                    ? 'border-teal-400/20 bg-teal-400/10 text-teal-300'
                                    : 'border-white/[0.08] bg-neutral-950/70 text-neutral-300 hover:border-teal-400/25 hover:text-teal-300'
                            }`}
                          >
                            {term.name}
                            <span className="text-[10px] text-neutral-500">({term.level})</span>
                            {isStudied ? <ArrowRight className="h-3.5 w-3.5" /> : null}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
