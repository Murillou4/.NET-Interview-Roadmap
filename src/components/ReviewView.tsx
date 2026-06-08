import React, { useState } from 'react';
import { StudyTerm, StudyStatus } from '../types';
import {
  Clock,
  Star,
  BookOpen,
  ChevronRight,
  Flame,
  Award,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface ReviewViewProps {
  terms: StudyTerm[];
  termStatus: Record<string, StudyStatus>;
  termConfidence: Record<string, number>;
  onSelectTerm: (term: StudyTerm) => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  terms,
  termStatus,
  termConfidence,
  onSelectTerm
}) => {
  const [subTab, setSubTab] = useState<'revisar' | 'dificeis'>('revisar');

  // 1. Marked to revise
  const reviseTerms = terms.filter((t) => termStatus[t.id] === 'revisar');

  // 2. Hard terms (Confidence 1 or 2)
  const difficultTerms = terms.filter(
    (t) => termConfidence[t.id] === 1 || termConfidence[t.id] === 2
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub tabs header */}
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-xl gap-2 max-w-md">
        <button
          onClick={() => setSubTab('revisar')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            subTab === 'revisar'
              ? 'bg-sky-500 text-slate-950'
              : 'text-slate-450 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" /> Marcados para Revisar ({reviseTerms.length})
        </button>

        <button
          onClick={() => setSubTab('dificeis')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            subTab === 'dificeis'
              ? 'bg-sky-500 text-slate-950'
              : 'text-slate-450 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Termos Difíceis ({difficultTerms.length})
        </button>
      </div>

      {subTab === 'revisar' ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Clock className="text-orange-450 w-5 h-5 text-orange-400" /> Caderno de Revisões Ativas
            </h3>
            <p className="text-xs text-slate-400">
              Estes são os termos técnicos que você marcou manualmente utilizando o botão "Marcar para revisar" nos cartões de estudos.
            </p>
          </div>

          {reviseTerms.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Nenhum termo pendente de revisão!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Ótimo trabalho! Você não tem nenhum assunto marcado para revisar. À medida que for estudando as categorias, marque termos que tiver dúvida para reuni-los aqui.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviseTerms.map((term) => (
                <div
                  key={term.id}
                  onClick={() => onSelectTerm(term)}
                  className="p-4 bg-slate-900 hover:bg-slate-950 border border-slate-800 hover:border-orange-500/35 rounded-xl cursor-pointer transition-all space-y-2 relative flex flex-col justify-between"
                  id={`revise-term-card-${term.id}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-100 font-mono leading-tight">{term.name}</h4>
                      <span className="text-[8px] font-mono text-orange-400 border border-orange-500/20 px-1.5 py-0.2 rounded uppercase">Revisar</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{term.simpleExplanation}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-850/50 pt-2 text-[10px] text-slate-500">
                    <span>{term.category}</span>
                    <span className="text-sky-400 font-bold flex items-center gap-0.5">Estudar <ChevronRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <AlertTriangle className="text-orange-400 w-5 h-5" /> Zona de Treino Intenso (Confiança 1 ou 2)
            </h3>
            <p className="text-xs text-slate-400">
              Estes são os termos técnicos nos quais você avaliou seu nível de confiança entre 1 ("Disperso/Não sei falar") ou 2 ("Lembro apenas do nome").
            </p>
          </div>

          {difficultTerms.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mx-auto border border-sky-500/20">
                <Flame className="w-6 h-6 animate-pulse text-sky-450" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Nenhum termo catalogado como difícil!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Excelente! Você não possui termos marcados com confiança baixa (1 ou 2). Conforme for estudando e se deparar com assuntos que gaguejou para explicar, classifique-os com 1 ou 2 estrelas para que eles apareçam nessa seção automaticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {difficultTerms.map((term) => {
                const confVal = termConfidence[term.id] || 0;
                return (
                  <div
                    key={term.id}
                    onClick={() => onSelectTerm(term)}
                    className="p-4 bg-slate-900 hover:bg-slate-950 border border-slate-800 hover:border-orange-500/35 rounded-xl cursor-pointer transition-all space-y-2 relative flex flex-col justify-between"
                    id={`difficult-term-card-${term.id}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-slate-100 font-mono leading-tight">{term.name}</h4>
                        <span className="text-[9px] font-mono font-bold text-orange-400">★ {confVal}/5</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{term.simpleExplanation}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-850/50 pt-2 text-[10px] text-slate-500">
                      <span>{term.category}</span>
                      <span className="text-sky-400 font-bold flex items-center gap-0.5">Estudar <ChevronRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
