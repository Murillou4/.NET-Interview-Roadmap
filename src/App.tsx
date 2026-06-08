import { useState, useEffect } from 'react';
import { StudyTerm, StudyStatus, UserProgress } from './types';
import { STUDY_TERMS } from './data/index';
import { getInitialProgress, saveProgress } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TermDetail } from './components/TermDetail';
import { DashboardView } from './components/DashboardView';
import { RoadmapView } from './components/RoadmapView';
import { SimulatorView } from './components/SimulatorView';
import { ReviewView } from './components/ReviewView';

// Mobile Navigation Icons
import {
  LayoutDashboard,
  Map,
  MessageSquareCode,
  AlertTriangle,
  Lightbulb,
  Award
} from 'lucide-react';

export default function App() {
  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'simulator' | 'review'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<StudyTerm | null>(null);

  // Local Storage Progress State
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress());

  // Auto-sync with local storage on state update
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Track global learned/unlearned metrics
  const totalCount = STUDY_TERMS.length;
  const learnedCount = STUDY_TERMS.filter((t) => progress.termStatus[t.id] === 'aprendido').length;
  const reviewCount = STUDY_TERMS.filter((t) => progress.termStatus[t.id] === 'revisar').length;
  
  // Difficult Count are terms with confidence 1 or 2
  const difficultCount = STUDY_TERMS.filter(
    (t) => progress.termConfidence[t.id] === 1 || progress.termConfidence[t.id] === 2
  ).length;

  const progressPercent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  // Handler to update study status ('não estudado' | 'estudando' | 'aprendido' | 'revisar')
  const handleUpdateStatus = (termId: string, newStatus: StudyStatus) => {
    setProgress((prev) => {
      const updatedStatus = { ...prev.termStatus, [termId]: newStatus };
      return {
        ...prev,
        termStatus: updatedStatus
      };
    });
  };

  // Handler to update user confidence (1 to 5)
  const handleUpdateConfidence = (termId: string, newConfidence: number) => {
    setProgress((prev) => {
      const updatedConf = { ...prev.termConfidence, [termId]: newConfidence };
      return {
        ...prev,
        termConfidence: updatedConf
      };
    });
  };

  // Handler to update simulator performance
  const handleUpdatePerformance = (questionId: string, rating: 'errei' | 'mais_ou_menos' | 'acertei') => {
    setProgress((prev) => {
      const updatedPerf = { ...prev.simulatorPerformance, [questionId]: rating };
      return {
        ...prev,
        simulatorPerformance: updatedPerf
      };
    });
  };

  // Handler to focus a specific term card
  const handleSelectTerm = (term: StudyTerm) => {
    setSelectedTerm(term);
    
    // Automatically transition to 'estudando' state if it is yet unvisited
    if (!progress.termStatus[term.id] || progress.termStatus[term.id] === 'não estudado') {
      handleUpdateStatus(term.id, 'estudando');
    }
  };

  // Select term by string ID (useful for references)
  const handleSelectTermById = (termId: string) => {
    const found = STUDY_TERMS.find((t) => t.id === termId);
    if (found) {
      handleSelectTerm(found);
    }
  };

  // Sequentially advance study to next term cards
  const handleNextTerm = () => {
    if (!selectedTerm) return;
    const currentIndex = STUDY_TERMS.findIndex((t) => t.id === selectedTerm.id);
    const nextIndex = (currentIndex + 1) % STUDY_TERMS.length;
    handleSelectTerm(STUDY_TERMS[nextIndex]);
  };

  // Trigger from dashboard shortcut
  const handleReviewHardTerms = () => {
    setActiveTab('review');
    setSelectedTerm(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 font-sans antialiased">
      {/* Top Banner Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        learnedCount={learnedCount}
        totalCount={totalCount}
        percent={progressPercent}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side Navigation - Desktop only */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedTerm(null); // Return from detail when navigating tabs
          }}
          learnedCount={learnedCount}
          totalCount={totalCount}
          reviewCount={reviewCount}
          difficultCount={difficultCount}
        />

        {/* Central screen workspace frame */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* If a specific term is being deep studied, show detail card as dominant view */}
            {selectedTerm ? (
              <TermDetail
                term={selectedTerm}
                status={progress.termStatus[selectedTerm.id] || 'não estudado'}
                confidence={progress.termConfidence[selectedTerm.id] || 0}
                onUpdateStatus={handleUpdateStatus}
                onUpdateConfidence={handleUpdateConfidence}
                onNext={handleNextTerm}
                onBack={() => setSelectedTerm(null)}
              />
            ) : (
              // Else, render the active primary tab viewport
              <>
                {activeTab === 'dashboard' && (
                  <DashboardView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    termConfidence={progress.termConfidence}
                    searchQuery={searchQuery}
                    onSelectTerm={handleSelectTerm}
                    onReviewHardTerms={handleReviewHardTerms}
                  />
                )}

                {activeTab === 'roadmap' && (
                  <RoadmapView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    onSelectTerm={handleSelectTerm}
                  />
                )}

                {activeTab === 'simulator' && (
                  <SimulatorView
                    simulatorPerformance={progress.simulatorPerformance}
                    onUpdatePerformance={handleUpdatePerformance}
                    onSelectTermById={handleSelectTermById}
                  />
                )}

                {activeTab === 'review' && (
                  <ReviewView
                    terms={STUDY_TERMS}
                    termStatus={progress.termStatus}
                    termConfidence={progress.termConfidence}
                    onSelectTerm={handleSelectTerm}
                  />
                )}
              </>
            )}

          </div>
        </main>
      </div>

      {/* Floating Bottom Navigator Bar - Mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around z-40 px-2 shadow-2xl">
        <button
          onClick={() => {
            setActiveTab('dashboard');
            setSelectedTerm(null);
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'dashboard' && !selectedTerm ? 'text-sky-400' : 'text-slate-400'
          }`}
          id="mobile-tab-dashboard"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('roadmap');
            setSelectedTerm(null);
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'roadmap' && !selectedTerm ? 'text-sky-400' : 'text-slate-400'
          }`}
          id="mobile-tab-roadmap"
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Roadmap</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('simulator');
            setSelectedTerm(null);
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'simulator' && !selectedTerm ? 'text-sky-400' : 'text-slate-400'
          }`}
          id="mobile-tab-simulator"
        >
          <MessageSquareCode className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Simulado</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('review');
            setSelectedTerm(null);
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'review' && !selectedTerm ? 'text-sky-400' : 'text-slate-400'
          }`}
          id="mobile-tab-review"
        >
          <div className="relative">
            <AlertTriangle className="w-5 h-5" />
            {(reviewCount + difficultCount) > 0 && (
              <span className="absolute -top-1 -right-2 text-[8px] bg-orange-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold font-mono">
                {reviewCount + difficultCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Revisões</span>
        </button>
      </nav>
    </div>
  );
}
