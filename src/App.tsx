import { useEffect, useState } from 'react';
import { AlertTriangle, LayoutDashboard, Map, MessageSquareCode } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TermDetail } from './components/TermDetail';
import { DashboardView } from './components/DashboardView';
import { RoadmapView } from './components/RoadmapView';
import { SimulatorView } from './components/SimulatorView';
import { ReviewView } from './components/ReviewView';
import { TechnicalText } from './components/TechnicalText';
import { STUDY_TERMS } from './data';
import { getInitialProgress, saveProgress } from './utils/storage';
import { StudyStatus, StudyTerm, UserProgress } from './types';

type ActiveTab = 'dashboard' | 'roadmap' | 'simulator' | 'review';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<StudyTerm | null>(null);
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const totalCount = STUDY_TERMS.length;
  const learnedCount = STUDY_TERMS.filter((term) => progress.termStatus[term.id] === 'aprendido').length;
  const reviewCount = STUDY_TERMS.filter((term) => progress.termStatus[term.id] === 'revisar').length;
  const difficultCount = STUDY_TERMS.filter(
    (term) => progress.termConfidence[term.id] === 1 || progress.termConfidence[term.id] === 2,
  ).length;

  const updateStatus = (termId: string, newStatus: StudyStatus) => {
    setProgress((current) => ({
      ...current,
      termStatus: {
        ...current.termStatus,
        [termId]: newStatus,
      },
    }));
  };

  const updateConfidence = (termId: string, newConfidence: number) => {
    setProgress((current) => ({
      ...current,
      termConfidence: {
        ...current.termConfidence,
        [termId]: newConfidence,
      },
    }));
  };

  const updatePerformance = (questionId: string, rating: 'errei' | 'mais_ou_menos' | 'acertei') => {
    setProgress((current) => ({
      ...current,
      simulatorPerformance: {
        ...current.simulatorPerformance,
        [questionId]: rating,
      },
    }));
  };

  const resetSimulatorPerformance = () => {
    setProgress((current) => ({
      ...current,
      simulatorPerformance: {},
    }));
  };

  const selectTerm = (term: StudyTerm) => {
    setSelectedTerm(term);

    if (!progress.termStatus[term.id] || progress.termStatus[term.id] === 'não estudado') {
      updateStatus(term.id, 'estudando');
    }
  };

  const selectTermById = (termId: string) => {
    const term = STUDY_TERMS.find((item) => item.id === termId);
    if (term) {
      selectTerm(term);
    }
  };

  const goToNextTerm = () => {
    if (!selectedTerm) return;

    const currentIndex = STUDY_TERMS.findIndex((term) => term.id === selectedTerm.id);
    const nextIndex = (currentIndex + 1) % STUDY_TERMS.length;
    selectTerm(STUDY_TERMS[nextIndex]);
  };

  const openReview = () => {
    setActiveTab('review');
    setSelectedTerm(null);
  };

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedTerm(null);
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#05080d] text-neutral-100">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={changeTab}
          learnedCount={learnedCount}
          totalCount={totalCount}
          reviewCount={reviewCount}
          difficultCount={difficultCount}
        />

        <main className={`min-h-0 flex-1 overflow-visible px-4 py-5 md:overflow-y-auto md:px-6 md:py-7 md:pb-9 lg:px-8 ${selectedTerm ? 'pb-8' : 'pb-28'}`}>
          <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-6">
            {selectedTerm ? (
              <TermDetail
                term={selectedTerm}
                status={progress.termStatus[selectedTerm.id] || 'não estudado'}
                confidence={progress.termConfidence[selectedTerm.id] || 0}
                onUpdateStatus={updateStatus}
                onUpdateConfidence={updateConfidence}
                onNext={goToNextTerm}
                onBack={() => setSelectedTerm(null)}
              />
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <DashboardView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    termConfidence={progress.termConfidence}
                    searchQuery={searchQuery}
                    onSelectTerm={selectTerm}
                    onReviewHardTerms={openReview}
                  />
                )}

                {activeTab === 'roadmap' && (
                  <RoadmapView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    onSelectTerm={selectTerm}
                  />
                )}

                {activeTab === 'simulator' && (
                  <SimulatorView
                    simulatorPerformance={progress.simulatorPerformance}
                    onUpdatePerformance={updatePerformance}
                    onResetPerformance={resetSimulatorPerformance}
                    onSelectTermById={selectTermById}
                  />
                )}

                {activeTab === 'review' && (
                  <ReviewView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    termConfidence={progress.termConfidence}
                    onSelectTerm={selectTerm}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {!selectedTerm ? (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#070b10]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-1 px-2 py-2">
            <button
              type="button"
              onClick={() => changeTab('dashboard')}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                activeTab === 'dashboard' ? 'bg-white/[0.08] text-teal-300' : 'text-neutral-400'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Início</span>
            </button>

            <button
              type="button"
              onClick={() => changeTab('roadmap')}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                activeTab === 'roadmap' ? 'bg-white/[0.08] text-teal-300' : 'text-neutral-400'
              }`}
            >
              <Map className="h-5 w-5" />
              <TechnicalText>Roadmap</TechnicalText>
            </button>

            <button
              type="button"
              onClick={() => changeTab('simulator')}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                activeTab === 'simulator' ? 'bg-white/[0.08] text-teal-300' : 'text-neutral-400'
              }`}
            >
              <MessageSquareCode className="h-5 w-5" />
              <span>Simulado</span>
            </button>

            <button
              type="button"
              onClick={() => changeTab('review')}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                activeTab === 'review' ? 'bg-white/[0.08] text-teal-300' : 'text-neutral-400'
              }`}
            >
              <div className="relative">
                <AlertTriangle className="h-5 w-5" />
                {reviewCount + difficultCount > 0 && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold text-neutral-950">
                    {reviewCount + difficultCount}
                  </span>
                )}
              </div>
              <span>Revisões</span>
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
