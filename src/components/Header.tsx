import React from 'react';
import { BookOpen, Search, Trophy, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  learnedCount: number;
  totalCount: number;
  percent: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  learnedCount,
  totalCount,
  percent,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#05080d]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
            <BookOpen className="h-6 w-6" />
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight md:text-xl">.NET Interview Roadmap</h1>
              <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                Júnior a Pleno
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-neutral-400">
              Sessão curta, leitura limpa e foco no que você realmente precisa lembrar na entrevista.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-end xl:w-auto">
          <div className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:grid-cols-[auto,1fr] lg:w-72">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
              <Trophy className="h-5 w-5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Progresso geral</p>
                <p className="font-mono text-sm tabular-nums text-neutral-100">
                  {learnedCount}/{totalCount}
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-neutral-900">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-[11px] text-neutral-500">{percent}% concluído</p>
            </div>
          </div>

          <div className="relative w-full lg:w-[24rem]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              placeholder="Pesquisar termo, categoria ou exemplo"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-2xl border border-white/[0.08] bg-neutral-950/80 py-3 pl-11 pr-16 text-sm text-neutral-100 outline-none transition focus:border-teal-400/70 focus:ring-4 focus:ring-teal-400/15 placeholder:text-neutral-500"
              id="search-input"
              aria-label="Pesquisar termos"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/[0.06] hover:text-neutral-100"
                aria-label="Limpar pesquisa"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
