import React from 'react';
import { BookOpen, CheckCircle2, Cloud, CloudOff, Loader2, Search, X } from 'lucide-react';
import { TechnicalText } from './TechnicalText';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  driveSyncConfigured: boolean;
  driveSyncConnected: boolean;
  driveSyncStatus: string;
  driveSyncBusy: boolean;
  onConnectDriveSync: () => void;
  onDisconnectDriveSync: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  driveSyncConfigured,
  driveSyncConnected,
  driveSyncStatus,
  driveSyncBusy,
  onConnectDriveSync,
  onDisconnectDriveSync,
}) => {
  return (
    <header className="z-50 border-b border-white/[0.08] bg-[#05080d]/92 backdrop-blur-xl md:sticky md:top-0">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-3 px-4 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 md:py-2 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
            <BookOpen className="h-[1.15rem] w-[1.15rem]" />
          </div>

          <div className="flex min-w-0 items-center gap-2.5">
            <TechnicalText
              as="h1"
              className="truncate text-base font-extrabold leading-tight tracking-tight text-neutral-100 md:text-lg"
            >
              .NET Interview Roadmap
            </TechnicalText>
            <span className="hidden shrink-0 rounded-full border border-teal-400/20 bg-teal-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-300 sm:inline-flex">
              Júnior a Pleno
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:max-w-[42rem] md:flex-row md:items-center md:justify-end">
          <div className="relative w-full md:max-w-[30rem] md:shrink-0">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              placeholder="Pesquisar termo, categoria ou exemplo"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 w-full rounded-xl border border-white/[0.08] bg-neutral-950/80 pl-10 pr-12 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-teal-400/70 focus:ring-4 focus:ring-teal-400/15"
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

          <div className="flex items-center gap-2 md:shrink-0">
            <button
              type="button"
              onClick={driveSyncConnected ? onDisconnectDriveSync : onConnectDriveSync}
              disabled={!driveSyncConfigured || driveSyncBusy}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-neutral-950/80 px-3 text-xs font-semibold text-neutral-200 transition hover:border-teal-400/40 hover:text-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
              title={!driveSyncConfigured ? 'Configure VITE_GOOGLE_CLIENT_ID para ativar o sync' : driveSyncStatus}
            >
              {driveSyncBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : driveSyncConnected ? (
                <CloudOff className="h-4 w-4" />
              ) : (
                <Cloud className="h-4 w-4" />
              )}
              <span>{driveSyncConnected ? 'Sair do Drive' : 'Google Drive'}</span>
            </button>

            <span className="hidden max-w-[14rem] items-center gap-1 truncate text-[11px] text-neutral-400 lg:inline-flex">
              {driveSyncConnected ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-300" /> : null}
              <span className="truncate">{driveSyncStatus}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
