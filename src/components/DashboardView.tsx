import React, { useState } from 'react';
import { StudyTerm, StudyStatus } from '../types';
import { STUDY_CATEGORIES } from '../data/categories';
import {
  CheckCircle,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Lightbulb
} from 'lucide-react';

interface DashboardViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  termConfidence: Record<string, number>;
  searchQuery: string;
  onSelectTerm: (term: StudyTerm) => void;
  onReviewHardTerms: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  terms,
  termStatus,
  termConfidence,
  searchQuery,
  onSelectTerm,
  onReviewHardTerms
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter terms by global search query
  const filteredTerms = terms.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.simpleExplanation.toLowerCase().includes(q)
    );
  });

  // Calculations for stats
  const totalCount = terms.length;
  const learnedList = terms.filter((t) => termStatus[t.id] === 'aprendido');
  const learnedCount = learnedList.length;
  const reviewingCount = terms.filter((t) => termStatus[t.id] === 'revisar').length;
  const studyingCount = terms.filter((t) => termStatus[t.id] === 'estudando').length;
  const progressPercent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  // Next recommended term: first term in the roadmap that is "não estudado" or "estudando"
  const recommendedTerm = terms.find(
    (t) => !termStatus[t.id] || termStatus[t.id] === 'não estudado' || termStatus[t.id] === 'estudando'
  ) || terms[0];

  // Count terms per category
  const getCategoryStats = (category: string) => {
    const catTerms = terms.filter((t) => t.category === category);
    const catTotal = catTerms.length;
    const catLearned = catTerms.filter((t) => termStatus[t.id] === 'aprendido').length;
    const catPercent = catTotal > 0 ? Math.round((catLearned / catTotal) * 100) : 0;
    return { total: catTotal, learned: catLearned, percent: catPercent };
  };

  const currentCategoryTerms = selectedCategory
    ? filteredTerms.filter((t) => t.category === selectedCategory)
    : filteredTerms;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Bento Stats Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main progress card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md">STATUS DA JORNADA</span>
              <h2 className="text-2xl font-black text-slate-50">Preparatório .NET C#</h2>
              <p className="text-xs text-slate-400">Transformando teoria em aprovação técnica para vagas Júnior e Pleno.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
                <span className="text-xs text-slate-500 font-mono block">Progresso</span>
                <span className="text-xl font-bold font-mono text-slate-100">{progressPercent}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
                <span className="text-xs text-emerald-400 font-mono block">Aprendidos</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{learnedCount}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
                <span className="text-xs text-orange-400 font-mono block">A Revisar</span>
                <span className="text-xl font-bold font-mono text-orange-400">{reviewingCount}</span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 flex items-center justify-center">
            {/* Radial progress metric circle */}
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                className="stroke-slate-800 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                className="stroke-sky-500 fill-none transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - progressPercent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-lg font-black text-slate-100 font-mono">{progressPercent}%</span>
          </div>
        </div>

        {/* Next recommended element study shortcut */}
        {recommendedTerm && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between gap-4 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 bg-sky-500/5 rounded-bl-xl border-l border-b border-slate-800">
              <Lightbulb className="w-5 h-5 text-orange-400" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-sky-450 font-mono font-semibold tracking-wider uppercase">Vá de encontro ao próximo assunto:</p>
              <h3 className="text-lg font-black text-slate-100 font-mono leading-tight group-hover:text-sky-400 transition-colors">{recommendedTerm.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{recommendedTerm.simpleExplanation}</p>
              <div className="flex gap-2 pt-1">
                <span className="text-[9px] bg-slate-850 text-slate-300 font-mono px-2 py-0.5 rounded uppercase border border-slate-800">Liv. {recommendedTerm.level}</span>
                <span className="text-[9px] bg-sky-500/10 text-sky-400 font-mono px-2 py-0.5 rounded border border-sky-500/15">{recommendedTerm.category}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTerm(recommendedTerm)}
              className="w-full bg-slate-800 text-slate-100 hover:bg-sky-500 hover:text-slate-950 p-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2 border border-slate-700/55"
              id="btn-recommended-term"
            >
              <Play className="w-4 h-4 fill-current" /> Continuar Estudando
            </button>
          </div>
        )}
      </div>

      {/* Grid Quick Shortcuts and searching */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" /> Categorias Teóricas de Estudos
          </h3>
          <p className="text-xs text-slate-400">Navegue pelas pastas de conteúdo para preparar seu repertório de respostas.</p>
        </div>

        <button
          onClick={onReviewHardTerms}
          className="bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-slate-950 border border-orange-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          id="btn-review-hard-terms"
        >
          <RotateCcw className="w-4 h-4" /> Revisar Termos Difíceis (Confiança 1 ou 2)
        </button>
      </div>

      {/* Categories Grid or searching results list filter */}
      {searchQuery ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs tracking-widest font-mono text-slate-500 uppercase">Resultado da Pesquisa ({filteredTerms.length} termos encontrados):</h4>
          
          {filteredTerms.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Search className="w-10 h-10 text-slate-750 mx-auto" />
              <p className="text-sm text-slate-400 font-bold">Nenhum termo técnico bateu com sua busca.</p>
              <p className="text-xs text-slate-500">Tente buscar por termos mais genéricos como "class", "async" ou "JOIN".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTerms.map((term) => {
                const status = termStatus[term.id] || 'não estudado';
                return (
                  <div
                    key={term.id}
                    onClick={() => onSelectTerm(term)}
                    className="p-4 bg-slate-950 border border-slate-850 rounded-xl hover:border-sky-500/40 hover:bg-slate-900/30 transition-all duration-150 cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-100 font-mono">{term.name}</span>
                      <span className={`text-[9px] font-mono border px-1.5 py-0.2 rounded-full ${
                        status === 'aprendido' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' :
                        status === 'revisar' ? 'bg-orange-500/10 text-orange-400 border-orange-500/25' :
                        status === 'estudando' ? 'bg-sky-500/10 text-sky-400 border-sky-500/25' :
                        'bg-slate-800 text-slate-400 border-slate-700/65'
                      }`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{term.simpleExplanation}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{term.category}</span>
                      <span className="text-sky-450 flex items-center gap-1">Estudar <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Category Grid with progress ratio displays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDY_CATEGORIES.map((category, idx) => {
              const catStats = getCategoryStats(category);
              const isSelected = selectedCategory === category;
              
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCategory(isSelected ? null : category)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-slate-800 border-sky-500 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                  id={`category-card-${idx}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="text-xs font-black font-sans text-slate-100 tracking-tight leading-tight">{category}</h4>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap shrink-0">{catStats.learned}/{catStats.total}</span>
                  </div>

                  {/* Visual Category Progress strip */}
                  <div className="w-full bg-slate-950 border border-slate-850 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        catStats.percent === 100
                          ? 'bg-emerald-500'
                          : catStats.percent > 0
                          ? 'bg-sky-500'
                          : 'bg-transparent'
                      }`}
                      style={{ width: `${catStats.percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-slate-500">Progresso: {catStats.percent}%</span>
                    <span className="text-sky-400 font-bold">
                      {isSelected ? 'Ocultar termos ▲' : 'Ver termos ▼'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded category items drawer list */}
          {selectedCategory && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] text-sky-450 font-mono uppercase tracking-widest font-black">Filtro Ativado</span>
                  <h3 className="text-base font-black text-slate-100">{selectedCategory}</h3>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-slate-400 hover:text-slate-150 border border-slate-800 hover:border-slate-700 px-3 py-1 rounded-lg"
                >
                  Fechar Filtro
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms
                  .filter((t) => t.category === selectedCategory)
                  .map((term) => {
                    const status = termStatus[term.id] || 'não estudado';
                    const confidenceVal = termConfidence[term.id] || 0;
                    
                    return (
                      <div
                        key={term.id}
                        onClick={() => onSelectTerm(term)}
                        className="bg-slate-950 hover:bg-slate-900/60 p-4 border border-slate-800 hover:border-sky-500/40 rounded-xl cursor-pointer transition-all space-y-2 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-slate-100 font-mono leading-tight">{term.name}</span>
                            <span className={`text-[8px] font-bold font-mono border px-1.5 py-0.2 rounded uppercase ${
                              status === 'aprendido' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' :
                              status === 'revisar' ? 'bg-orange-500/10 text-orange-400 border-orange-500/25' :
                              status === 'estudando' ? 'bg-sky-500/10 text-sky-400 border-sky-500/25' :
                              'bg-slate-800 text-slate-400 border-slate-700/65'
                            }`}>
                              {status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{term.simpleExplanation}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-850/50 pt-2 mt-2 text-[10px] text-slate-500">
                          <span className="font-mono text-slate-500 uppercase text-[9px]">Lvl. {term.level}</span>
                          <div className="flex items-center gap-1.5 text-sky-400">
                            {confidenceVal > 0 && (
                              <span className="text-orange-400 font-bold font-mono">★ {confidenceVal}/5</span>
                            )}
                            <span className="font-bold flex items-center gap-0.5">Estudar <ChevronRight className="w-3.5 h-3.5" /></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
