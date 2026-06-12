import React from 'react';
import { AlertCircle, LayoutDashboard, Map, MessageSquareCode, Trophy } from 'lucide-react';
import { TechnicalText } from './TechnicalText';

interface SidebarProps {
  activeTab: 'dashboard' | 'roadmap' | 'simulator' | 'review';
  setActiveTab: (tab: 'dashboard' | 'roadmap' | 'simulator' | 'review') => void;
  learnedCount: number;
  totalCount: number;
  reviewCount: number;
  difficultCount: number;
}

type MenuItem = {
  id: SidebarProps['activeTab'];
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    desc: 'Visão geral da sessão',
    icon: LayoutDashboard,
  },
  {
    id: 'roadmap',
    label: 'Mapa de estudos',
    desc: 'Etapas e blocos de conteúdo',
    icon: Map,
  },
  {
    id: 'simulator',
    label: 'Simulado',
    desc: 'Respostas e autoavaliação',
    icon: MessageSquareCode,
  },
  {
    id: 'review',
    label: 'Revisões',
    desc: 'Pendências e pontos fracos',
    icon: AlertCircle,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  learnedCount,
  totalCount,
  reviewCount,
  difficultCount,
}) => {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/[0.08] bg-white/[0.02] md:flex md:flex-col">
      <div className="space-y-4 border-b border-white/[0.08] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Painel</p>
            <TechnicalText as="p" className="mt-1 text-xl font-extrabold tracking-tight text-neutral-100">
              .NET Roadmap
            </TechnicalText>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
            <Trophy className="h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Estudados</p>
            <p className="mt-2 font-mono text-lg tabular-nums text-neutral-100">{learnedCount}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Pendentes</p>
            <p className="mt-2 font-mono text-lg tabular-nums text-neutral-100">{totalCount - learnedCount}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const badge = item.id === 'review' ? reviewCount + difficultCount : item.badge;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition duration-200 ${
                isActive
                  ? 'border-teal-400/25 bg-teal-400/10 text-teal-200'
                  : 'border-transparent text-neutral-400 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-neutral-100'
              }`}
              id={`sidebar-tab-${item.id}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    isActive ? 'border-teal-400/25 bg-teal-400/10 text-teal-300' : 'border-white/[0.08] bg-white/[0.03] text-neutral-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <TechnicalText as="p" className="text-sm font-semibold leading-tight">
                    {item.label}
                  </TechnicalText>
                  <p className="mt-1 text-xs leading-tight text-neutral-500">{item.desc}</p>
                </div>
              </div>

              {typeof badge === 'number' && badge > 0 ? (
                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-amber-300">
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-4">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Hoje</p>
          <p className="mt-2 text-sm leading-6 text-neutral-300">
            Abra um termo, avalie sua confiança e siga para a próxima etapa sem quebrar o ritmo.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold text-teal-300">
              Revisões {reviewCount}
            </span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
              Difíceis {difficultCount}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
