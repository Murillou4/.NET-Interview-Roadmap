import { UserProgress, StudyStatus } from '../types';

const STORAGE_KEY = 'dotnet_interview_roadmap_progress';

export const getInitialProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        termStatus: parsed.termStatus || {},
        termConfidence: parsed.termConfidence || {},
        simulatorPerformance: parsed.simulatorPerformance || {}
      };
    }
  } catch (e) {
    console.error('Error reading localStorage progress', e);
  }
  return {
    termStatus: {},
    termConfidence: {},
    simulatorPerformance: {}
  };
};

export const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving localStorage progress', e);
  }
};
