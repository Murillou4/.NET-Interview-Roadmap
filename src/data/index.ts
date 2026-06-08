import { STUDY_CATEGORIES, ROADMAP_STEPS } from './categories';
import { TERMS_PART1 } from './termsPart1';
import { TERMS_PART2 } from './termsPart2';
import { TERMS_PART3 } from './termsPart3';
import { SIMULATOR_QUESTIONS } from './simulator';
import { StudyTerm } from '../types';

export const STUDY_TERMS: StudyTerm[] = [
  ...TERMS_PART1,
  ...TERMS_PART2,
  ...TERMS_PART3
];

export {
  STUDY_CATEGORIES,
  ROADMAP_STEPS,
  SIMULATOR_QUESTIONS
};
