import React from 'react';
import { Search, BookOpen, Star, HelpCircle, Trophy } from 'lucide-react';

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
  percent
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
          <BookOpen className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-50 tracking-tight flex items-center gap-2">
            .NET Interview Roadmap
            <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-normal">
              Júnior ➔ Pleno
            </span>
          </h1>
          <p className="text-xs text-slate-400">Estude termos técnicos e domine perguntas de entrevistas.</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Pesquisar termos técnicos... (Ex: record)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950 text-slate-200 border border-slate-800 hover:border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none pl-9 pr-4 py-2 text-sm rounded-lg transition-colors placeholder:text-slate-500"
          id="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-100"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Progress pill on mobile header or quick summary desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-orange-400" />
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Progresso Geral</p>
            <p className="text-sm font-bold text-slate-100">
              {learnedCount}/{totalCount} <span className="text-xs text-slate-400">({percent}%)</span>
            </p>
          </div>
        </div>
        <div className="w-24 bg-slate-950 border border-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
