import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
} from 'lucide-react';
import { STUDY_CATEGORIES } from '../data/categories';
import { StudyStatus, StudyTerm } from '../types';

interface DashboardViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  termConfidence: Record<string, number>;
  searchQuery: string;
  onSelectTerm: (term: StudyTerm) => void;
  onReviewHardTerms: () => void;
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

export const DashboardView: React.FC<DashboardViewProps> = ({
  terms,
  termStatus,
  termConfidence,
  searchQuery,
  onSelectTerm,
  onReviewHardTerms,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = terms.filter((term) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    return (
      term.name.toLowerCase().includes(query) ||
      term.category.toLowerCase().includes(query) ||
      term.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      term.simpleExplanation.toLowerCase().includes(query)
    );
  });

  const totalCount = terms.length;
  const learnedCount = terms.filter((term) => termStatus[term.id] === 'aprendido').length;
  const reviewingCount = terms.filter((term) => termStatus[term.id] === 'revisar').length;
  const progressPercent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;
  const hasStartedStudying = terms.some((term) => {
    const status = termStatus[term.id];
    return status && status !== 'não estudado';
  });

  const recommendedTerm =
    terms.find((term) => !termStatus[term.id] || termStatus[term.id] === 'não estudado' || termStatus[term.id] === 'estudando') ||
    terms[0];

  const currentCategoryTerms = selectedCategory
    ? filteredTerms.filter((term) => term.category === selectedCategory)
    : filteredTerms;

  const getCategoryStats = (category: string) => {
    const categoryTerms = terms.filter((term) => term.category === category);
    const learnedInCategory = categoryTerms.filter((term) => termStatus[term.id] === 'aprendido').length;
    const percent = categoryTerms.length > 0 ? Math.round((learnedInCategory / categoryTerms.length) * 100) : 0;

    return {
      total: categoryTerms.length,
      learned: learnedInCategory,
      percent,
    };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(22rem,0.75fr)]">
        <article className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-7">
          <div className="grid gap-6 min-[1800px]:grid-cols-[minmax(0,1fr)_minmax(20rem,22rem)] min-[1800px]:items-end">
            <div className="min-w-0 space-y-4">
              <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                Sessão atual
              </span>
              <div className="space-y-3">
                <h2 className="max-w-3xl text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  Estudo de backend sem ruído
                </h2>
                <p className="max-w-2xl text-pretty text-sm leading-6 text-neutral-400">
                  Abra um termo, marque o estado e siga adiante. O painel fica curto de propósito.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onSelectTerm(recommendedTerm)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-teal-400/25 bg-teal-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-teal-300 active:scale-[0.99] sm:px-5"
                  id="btn-recommended-term"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {hasStartedStudying ? 'Continuar estudo' : 'Iniciar estudos'}
                </button>

                <button
                  type="button"
                  onClick={onReviewHardTerms}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/[0.06] active:scale-[0.99] sm:px-5"
                  id="btn-review-hard-terms-hero"
                >
                  <RotateCcw className="h-4 w-4" />
                  Ver difíceis
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 min-[1800px]:min-w-[20rem]">
              <div className="min-h-[5.75rem] rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-3.5">
                <p className="text-[10px] uppercase leading-4 tracking-[0.1em] text-neutral-500">Progresso</p>
                <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-neutral-100">{progressPercent}%</p>
              </div>

              <div className="min-h-[5.75rem] rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-3.5">
                <p className="text-[10px] uppercase leading-4 tracking-[0.1em] text-emerald-300">Aprendidos</p>
                <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-emerald-300">{learnedCount}</p>
              </div>

              <div className="min-h-[5.75rem] rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-3.5">
                <p className="text-[10px] uppercase leading-4 tracking-[0.1em] text-amber-300">Em revisão</p>
                <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-amber-300">{reviewingCount}</p>
              </div>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 xl:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Próximo termo</p>
              <h3 className="text-lg font-extrabold tracking-tight text-neutral-100">{recommendedTerm.name}</h3>
              <p className="line-clamp-3 text-pretty text-sm leading-6 text-neutral-400">{recommendedTerm.simpleExplanation}</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="max-w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-300">
              {recommendedTerm.category}
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-300">
              Nível {recommendedTerm.level}
            </span>
            {termConfidence[recommendedTerm.id] ? (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-300">
                Confiança {termConfidence[recommendedTerm.id]}/5
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onSelectTerm(recommendedTerm)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/[0.06] active:scale-[0.99]"
          >
            Abrir termo
            <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </section>

      <section className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-300" />
            <h3 className="text-lg font-bold tracking-tight text-neutral-100">Categorias de estudo</h3>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-neutral-400">
            Clique em um bloco para ver os termos dele. Se houver pesquisa ativa, a lista fica ainda mais direta.
          </p>
        </div>

        <button
          type="button"
          onClick={onReviewHardTerms}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/15 active:scale-[0.99] md:self-auto"
          id="btn-review-hard-terms"
        >
          <Clock className="h-4 w-4" />
          Revisar termos difíceis
        </button>
      </section>

      {searchQuery ? (
        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 xl:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              Resultado da pesquisa ({filteredTerms.length})
            </p>
            <Search className="h-4 w-4 text-neutral-500" />
          </div>

          {filteredTerms.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="mx-auto h-10 w-10 text-neutral-600" />
              <p className="mt-4 text-sm font-semibold text-neutral-200">Nenhum termo bateu com a busca.</p>
              <p className="mt-2 text-sm text-neutral-500">Tente algo como class, async ou join.</p>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {filteredTerms.map((term) => {
                const status = termStatus[term.id] || 'não estudado';

                return (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => onSelectTerm(term)}
                    className="group flex h-full min-h-[11.5rem] flex-col justify-between rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-4 text-left transition hover:border-teal-400/25 hover:bg-white/[0.04]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-bold text-neutral-100">{term.name}</h4>
                          <p className="text-[11px] uppercase leading-4 tracking-[0.1em] text-neutral-500">{term.category}</p>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${getStatusStyles(status)}`}>
                          {status}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-6 text-neutral-400">{term.simpleExplanation}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-mono uppercase">Nível {term.level}</span>
                      <span className="inline-flex items-center gap-1 text-teal-300">
                        Abrir
                        <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            {STUDY_CATEGORIES.map((category) => {
              const stats = getCategoryStats(category);
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? null : category)}
                  className={`min-h-[9.5rem] rounded-2xl border p-4 text-left transition duration-200 ${
                    isSelected
                      ? 'border-teal-400/25 bg-teal-400/10'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="text-pretty text-sm font-semibold leading-5 text-neutral-100">{category}</p>
                      <p className="text-[11px] uppercase leading-4 tracking-[0.1em] text-neutral-500">
                        {stats.learned}/{stats.total} termos
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/[0.08] bg-neutral-950/70 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-neutral-300">
                      {stats.percent}%
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-900">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        stats.percent === 100 ? 'bg-emerald-400' : stats.percent > 0 ? 'bg-teal-400' : 'bg-transparent'
                      }`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Progresso</span>
                    <span className="inline-flex items-center gap-1 text-teal-300">
                      {isSelected ? 'Ocultar' : 'Ver termos'}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedCategory ? (
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 xl:p-7">
              <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Filtro ativo</p>
                  <h4 className="text-pretty text-base font-bold text-neutral-100">{selectedCategory}</h4>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-neutral-300 transition hover:bg-white/[0.06]"
                >
                  Limpar filtro
                </button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                {currentCategoryTerms.map((term) => {
                  const status = termStatus[term.id] || 'não estudado';
                  const confidence = termConfidence[term.id] || 0;

                  return (
                    <button
                      key={term.id}
                      type="button"
                      onClick={() => onSelectTerm(term)}
                      className="flex h-full min-h-[11.5rem] flex-col justify-between rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-4 text-left transition hover:border-teal-400/25 hover:bg-white/[0.04]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 space-y-1">
                            <h5 className="text-sm font-bold text-neutral-100">{term.name}</h5>
                            <p className="text-[11px] uppercase leading-4 tracking-[0.1em] text-neutral-500">{term.category}</p>
                          </div>
                          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${getStatusStyles(status)}`}>
                            {status}
                          </span>
                        </div>

                        <p className="line-clamp-2 text-sm leading-6 text-neutral-400">{term.simpleExplanation}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs text-neutral-500">
                        <span className="font-mono uppercase">Nível {term.level}</span>
                        <span className="inline-flex items-center gap-1 text-teal-300">
                          {confidence > 0 ? `Confiança ${confidence}/5` : 'Abrir'}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
};
