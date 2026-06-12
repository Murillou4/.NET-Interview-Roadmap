import React, { useState } from 'react';
import { AlertTriangle, Award, ChevronRight, Clock, Flame } from 'lucide-react';
import { StudyStatus, StudyTerm } from '../types';
import { TechnicalText } from './TechnicalText';

interface ReviewViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  termConfidence: Record<string, number>;
  onSelectTerm: (term: StudyTerm) => void;
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

export const ReviewView: React.FC<ReviewViewProps> = ({
  terms,
  termStatus,
  termConfidence,
  onSelectTerm,
}) => {
  const [subTab, setSubTab] = useState<'revisar' | 'dificeis'>('revisar');

  const reviewTerms = terms.filter((term) => termStatus[term.id] === 'revisar');
  const difficultTerms = terms.filter((term) => termConfidence[term.id] === 1 || termConfidence[term.id] === 2);

  const activeTerms = subTab === 'revisar' ? reviewTerms : difficultTerms;
  const title =
    subTab === 'revisar' ? 'Caderno de revisões ativas' : 'Zona de treino intenso';
  const description =
    subTab === 'revisar'
      ? 'Termos marcados manualmente como revisão. Abra um card e volte a estudar sem procurar demais.'
      : 'Termos com confiança 1 ou 2. São os pontos que mais valem uma passada extra.';

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="inline-flex max-w-full overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1">
        <button
          type="button"
          onClick={() => setSubTab('revisar')}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            subTab === 'revisar' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
          }`}
        >
          <Clock className="h-4 w-4" />
          Revisar ({reviewTerms.length})
        </button>

        <button
          type="button"
          onClick={() => setSubTab('dificeis')}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            subTab === 'dificeis' ? 'bg-teal-400 text-neutral-950' : 'text-neutral-400 hover:text-neutral-100'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          Difíceis ({difficultTerms.length})
        </button>
      </div>

      <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              {subTab === 'revisar' ? (
                <Clock className="h-5 w-5 text-teal-300" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-300" />
              )}
              <TechnicalText as="h3" className="text-pretty text-lg font-bold tracking-tight text-neutral-100">
                {title}
              </TechnicalText>
            </div>
            <TechnicalText as="p" className="max-w-3xl text-pretty text-sm leading-6 text-neutral-400">
              {description}
            </TechnicalText>
          </div>

          <div className="w-full rounded-2xl border border-white/[0.08] bg-neutral-950/80 px-4 py-3 md:w-40 md:shrink-0">
            <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">Itens na fila</p>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-neutral-100">{activeTerms.length}</p>
          </div>
        </div>

        {activeTerms.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-white/[0.08] bg-neutral-950/60 p-8 text-center">
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border ${
                subTab === 'revisar'
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                  : 'border-teal-400/20 bg-teal-400/10 text-teal-300'
              }`}
            >
              {subTab === 'revisar' ? <Award className="h-6 w-6" /> : <Flame className="h-6 w-6" />}
            </div>
            <h4 className="mt-4 text-sm font-semibold text-neutral-100">
              {subTab === 'revisar' ? 'Nenhum termo pendente de revisão.' : 'Nenhum termo com confiança baixa.'}
            </h4>
            <TechnicalText as="p" className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-500">
              {subTab === 'revisar'
                ? 'Quando quiser separar um assunto para voltar depois, use o botão de revisão dentro do card do termo.'
                : 'Se algo travar, marque a confiança em 1 ou 2 quando estiver no card do termo e ele volta para esta fila.'}
            </TechnicalText>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {activeTerms.map((term) => {
              const status = termStatus[term.id] || 'não estudado';
              const confidence = termConfidence[term.id] || 0;

              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex h-full min-h-[11.5rem] flex-col justify-between rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-4 text-left transition hover:border-teal-400/25 hover:bg-white/[0.04]"
                  id={`${subTab}-term-card-${term.id}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <TechnicalText as="h4" className="text-sm font-bold text-neutral-100">
                          {term.name}
                        </TechnicalText>
                        <TechnicalText as="p" className="text-[11px] uppercase leading-4 tracking-[0.1em] text-neutral-500">
                          {term.category}
                        </TechnicalText>
                      </div>

                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${getStatusStyles(status)}`}>
                        {status}
                      </span>
                    </div>

                    <TechnicalText as="p" className="line-clamp-2 text-sm leading-6 text-neutral-400">
                      {term.simpleExplanation}
                    </TechnicalText>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs text-neutral-500">
                    <span className="font-mono uppercase">Nível {term.level}</span>
                    <span className="inline-flex items-center gap-1 text-teal-300">
                      {subTab === 'dificeis' ? `Confiança ${confidence}/5` : 'Abrir'}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
