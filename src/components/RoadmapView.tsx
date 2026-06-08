import React from 'react';
import { StudyTerm, StudyStatus } from '../types';
import { ROADMAP_STEPS } from '../data/categories';
import {
  Lock,
  Unlock,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Compass
} from 'lucide-react';

interface RoadmapViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  onSelectTerm: (term: StudyTerm) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  terms,
  termStatus,
  onSelectTerm
}) => {
  // Determine if a step is "unlocked".
  // A step is unlocked if all terms in the previous step are at least marked "aprendido" or "estudando".
  // Let's do a friendly algorithm:
  // Step 1 is always unlocked.
  // Step N is unlocked if Step N-1 has at least 50% progress or if the user has studied at least one term.
  // This is highly motivational!
  const isStepUnlocked = (stepIndex: number): boolean => {
    if (stepIndex === 0) return true;
    const prevStep = ROADMAP_STEPS[stepIndex - 1];
    const prevStepTerms = prevStep.termIds;
    
    // Count how many of those previous terms are 'aprendido' or 'estudando' or 'revisar'
    const completedOrStudiedCount = prevStepTerms.filter(
      (id) => termStatus[id] && termStatus[id] !== 'não estudado'
    ).length;

    return completedOrStudiedCount > 0 || prevStepTerms.length === 0;
  };

  // Find the exact roadmap step that is recommended right now
  // It's the first step where progress is < 100%
  const nextTargetStep = ROADMAP_STEPS.find((step) => {
    const stepTerms = step.termIds;
    const learnedInStep = stepTerms.filter((id) => termStatus[id] === 'aprendido').length;
    return learnedInStep < stepTerms.length;
  }) || ROADMAP_STEPS[0];
  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      {/* Introduction box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] text-sky-400 uppercase tracking-widest font-mono font-bold block">CRONOGRAMA RECOMENDADO</span>
          <h2 className="text-xl font-bold text-slate-50 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-450" /> Trilha Evolutiva do Desenvolvedor C#
          </h2>
          <p className="text-xs text-slate-400">
            Siga esta ordem lógica para consolidar sua base antes de avançar para os conceitos complexos e de nuvem.
          </p>
        </div>

        {nextTargetStep && (
          <div className="bg-slate-950 border border-sky-500/15 p-4 rounded-xl shrink-0 space-y-1 md:text-right">
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Foco Atual Sugerido:</p>
            <p className="text-xs font-black text-slate-100">{nextTargetStep.title}</p>
            <p className="text-[10px] text-slate-500">Estimado: {nextTargetStep.recommendedDuration}</p>
          </div>
        )}
      </div>

      {/* Main timeline listing */}
      <div className="relative pl-4 md:pl-10 space-y-8 border-l-2 border-slate-850 ml-1">
        
        {ROADMAP_STEPS.map((step, index) => {
          const unlocked = isStepUnlocked(index);
          const stepTerms = terms.filter((t) => step.termIds.includes(t.id));
          
          // Calculate stats for this step
          const totalTermsCount = step.termIds.length;
          const learnedTermsCount = step.termIds.filter((id) => termStatus[id] === 'aprendido').length;
          const studyingCount = step.termIds.filter((id) => termStatus[id] === 'estudando').length;
          const percentDone = totalTermsCount > 0 ? Math.round((learnedTermsCount / totalTermsCount) * 100) : 0;
          const isComplete = learnedTermsCount === totalTermsCount && totalTermsCount > 0;

          return (
            <div key={step.id} className="relative group">
              
              {/* Chronological Pin Badge on the absolute left border */}
              <div className={`absolute -left-7 md:-left-[49px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                isComplete
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : !unlocked
                  ? 'bg-slate-950 text-slate-500 border-slate-800'
                  : 'bg-slate-900 text-sky-400 border-sky-500 shadow-md shadow-sky-500/5'
              }`}>
                {isComplete ? <CheckCircle className="w-3.5 h-3.5" /> : step.id}
              </div>

              {/* Box content wrapper info */}
              <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
                isComplete
                  ? 'bg-slate-900/60 border-emerald-500/20'
                  : !unlocked
                  ? 'bg-slate-900/40 border-slate-950/60 opacity-60'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-sm'
              }`}>
                
                {/* Meta block header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-slate-500 font-mono">ETAPA #{step.id}</span>
                      <span className="text-[10px] bg-slate-850 text-slate-400 px-2.5 py-0.2 rounded font-mono uppercase border border-slate-800">etapa: {step.recommendedDuration}</span>
                      
                      {!unlocked && (
                        <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.2 rounded flex items-center gap-0.5 font-mono">
                          <Lock className="w-2.5 h-2.5" /> BLOQUEADO
                        </span>
                      )}
                      {unlocked && !isComplete && (
                        <span className="text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1.5 py-0.2 rounded flex items-center gap-0.5 font-mono">
                          <Unlock className="w-2.5 h-2.5" /> LIBERADO
                        </span>
                      )}
                      {isComplete && (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded flex items-center gap-0.5 font-mono">
                          CONCLUÍDO!
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-100 group-hover:text-sky-400 transition-colors">{step.title}</h3>
                  </div>

                  {/* Percentage ticker on step card */}
                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-450 font-mono">{learnedTermsCount}/{totalTermsCount} termos</span>
                      <span className="text-xs font-black text-slate-100 font-mono">{percentDone}%</span>
                    </div>
                    <div className="w-24 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/80">
                      <div
                        className={`h-full transition-all duration-300 ${isComplete ? 'bg-emerald-500' : 'bg-sky-500'}`}
                        style={{ width: `${percentDone}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">{step.description}</p>

                {/* Sub-lists of Terms bubbles in each page step */}
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">Termos fundamentais desta etapa:</p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stepTerms.length === 0 ? (
                      <span className="text-xs text-slate-600 font-mono">Cadastro de termos em breve...</span>
                    ) : (
                      stepTerms.map((term) => {
                        const status = termStatus[term.id] || 'não estudado';
                        let pillStyle = 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-100 hover:border-slate-750';
                        
                        if (status === 'aprendido') {
                          pillStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-505/20';
                        } else if (status === 'revisar') {
                          pillStyle = 'bg-orange-500/10 text-orange-400 border-orange-500/25 hover:bg-orange-500/20';
                        } else if (status === 'estudando') {
                          pillStyle = 'bg-sky-500/10 text-sky-400 border-sky-500/25 hover:bg-sky-505/20';
                        }

                        return (
                          <button
                            key={term.id}
                            onClick={() => onSelectTerm(term)}
                            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${pillStyle}`}
                          >
                            <span>{term.name}</span>
                            <span className="text-[9px] text-slate-500 opacity-60">({term.level})</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};
