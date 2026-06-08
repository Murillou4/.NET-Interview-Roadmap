import React from 'react';
import {
  LayoutDashboard,
  Map,
  MessageSquareCode,
  AlertCircle,
  HelpCircle,
  Trophy,
  Star
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'roadmap' | 'simulator' | 'review';
  setActiveTab: (tab: 'dashboard' | 'roadmap' | 'simulator' | 'review') => void;
  learnedCount: number;
  totalCount: number;
  reviewCount: number;
  difficultCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  learnedCount,
  totalCount,
  reviewCount,
  difficultCount
}) => {
  interface MenuItem {
    readonly id: 'dashboard' | 'roadmap' | 'simulator' | 'review';
    readonly label: string;
    readonly icon: React.ComponentType<any>;
    readonly desc: string;
    readonly badge?: number;
  }

  const menuItems: readonly MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      desc: 'Área geral e progresso'
    },
    {
      id: 'roadmap',
      label: 'Mapa de Estudos',
      icon: Map,
      desc: 'Trilha guiada C#/.NET'
    },
    {
      id: 'simulator',
      label: 'Simulado de Entrevista',
      icon: MessageSquareCode,
      desc: 'Treine perguntas reais'
    },
    {
      id: 'review',
      label: 'Revisões & Difíceis',
      icon: AlertCircle,
      desc: 'Foco no que gera dúvida',
      badge: reviewCount + difficultCount
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 text-slate-200">
      {/* Sidebar Branding Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sky-400 font-black text-xl font-mono">.NET</span>
          <span className="text-slate-400 text-xs font-mono">ROADMAP v1.0</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase">Seu Ritmo</p>
            <p className="text-xs font-bold text-slate-300">
              {learnedCount === totalCount ? 'Mestre .NET 🎉' : 'Iniciado'}
            </p>
          </div>
          <Trophy className={`w-5 h-5 ${learnedCount > 0 ? 'text-orange-400' : 'text-slate-600'}`} />
        </div>
      </div>

      {/* Menu Options */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 text-left cursor-pointer group ${
                isActive
                  ? 'bg-slate-800 text-sky-400 border-l-4 border-sky-500'
                  : 'text-slate-400 hover:bg-slate-850 hover:text-slate-100 border-l-4 border-transparent'
              }`}
              id={`sidebar-tab-${item.id}`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-200'
                  }`}
                />
                <div>
                  <p className="text-sm font-semibold leading-tight">{item.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight block">{item.desc}</p>
                </div>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-px bg-orange-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Pro Tip Box inside the footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20">
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <h4 className="text-xs font-bold text-slate-200">Dica de Sucesso</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Intercalando estudos técnicos com o <strong>Simulado de Entrevista</strong>, você valida sua memorização corporal e de termos prontificados!
          </p>
        </div>
      </div>
    </aside>
  );
};
