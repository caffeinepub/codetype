export interface Challenge {
  id: string;
  type: 'daily' | 'weekly' | 'level';
  title: string;
  description: string;
  language: string;
  difficulty: string;
  targetWPM: number;
  targetAccuracy: number;
  duration: number;
  level?: number;
  resetDate?: string;
  badge?: string;
}

function getDailyResetDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getWeeklyResetDate(): string {
  const now = new Date();
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  return nextMonday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const dailyChallenges: Challenge[] = [
  {
    id: 'daily-1',
    type: 'daily',
    title: 'Python Sprint',
    description: 'Type a Python function with 90% accuracy in under 60 seconds.',
    language: 'python',
    difficulty: 'easy',
    targetWPM: 30,
    targetAccuracy: 90,
    duration: 60,
    resetDate: getDailyResetDate(),
    badge: '🐍',
  },
  {
    id: 'daily-2',
    type: 'daily',
    title: 'SQL Query Master',
    description: 'Complete a medium SQL query with at least 85% accuracy.',
    language: 'sql',
    difficulty: 'medium',
    targetWPM: 25,
    targetAccuracy: 85,
    duration: 90,
    resetDate: getDailyResetDate(),
    badge: '🗄️',
  },
  {
    id: 'daily-3',
    type: 'daily',
    title: 'HTML Speedrun',
    description: 'Type an HTML snippet at 35+ WPM with 88% accuracy.',
    language: 'html',
    difficulty: 'easy',
    targetWPM: 35,
    targetAccuracy: 88,
    duration: 60,
    resetDate: getDailyResetDate(),
    badge: '🌐',
  },
];

export const weeklyChallenges: Challenge[] = [
  {
    id: 'weekly-1',
    type: 'weekly',
    title: 'Java Marathon',
    description: 'Type a complex Java class with 92% accuracy. This week\'s hardest challenge!',
    language: 'java',
    difficulty: 'hard',
    targetWPM: 40,
    targetAccuracy: 92,
    duration: 180,
    resetDate: getWeeklyResetDate(),
    badge: '☕',
  },
  {
    id: 'weekly-2',
    type: 'weekly',
    title: 'C Pointer Challenge',
    description: 'Master C pointers and memory management with 90% accuracy.',
    language: 'c',
    difficulty: 'hard',
    targetWPM: 35,
    targetAccuracy: 90,
    duration: 120,
    resetDate: getWeeklyResetDate(),
    badge: '⚡',
  },
  {
    id: 'weekly-3',
    type: 'weekly',
    title: 'Full Stack Sprint',
    description: 'Type HTML/CSS and SQL snippets back-to-back with 88% accuracy.',
    language: 'html',
    difficulty: 'medium',
    targetWPM: 45,
    targetAccuracy: 88,
    duration: 150,
    resetDate: getWeeklyResetDate(),
    badge: '🚀',
  },
];

export const levelChallenges: Challenge[] = [
  { id: 'level-1', type: 'level', level: 1, title: 'Beginner Coder', description: 'Type a simple Python print statement. Perfect for warming up!', language: 'python', difficulty: 'easy', targetWPM: 15, targetAccuracy: 80, duration: 120, badge: '🌱' },
  { id: 'level-2', type: 'level', level: 2, title: 'Variable Typer', description: 'Type variable declarations in Python with basic accuracy.', language: 'python', difficulty: 'easy', targetWPM: 20, targetAccuracy: 82, duration: 90, badge: '📝' },
  { id: 'level-3', type: 'level', level: 3, title: 'Loop Master', description: 'Type a for loop in C with 85% accuracy.', language: 'c', difficulty: 'easy', targetWPM: 25, targetAccuracy: 85, duration: 90, badge: '🔄' },
  { id: 'level-4', type: 'level', level: 4, title: 'Function Writer', description: 'Type a complete function in Python at 28+ WPM.', language: 'python', difficulty: 'medium', targetWPM: 28, targetAccuracy: 85, duration: 90, badge: '⚙️' },
  { id: 'level-5', type: 'level', level: 5, title: 'SQL Apprentice', description: 'Type a JOIN query with 87% accuracy.', language: 'sql', difficulty: 'medium', targetWPM: 30, targetAccuracy: 87, duration: 90, badge: '🗃️' },
  { id: 'level-6', type: 'level', level: 6, title: 'HTML Architect', description: 'Type a complete HTML form with 88% accuracy.', language: 'html', difficulty: 'medium', targetWPM: 35, targetAccuracy: 88, duration: 90, badge: '🏗️' },
  { id: 'level-7', type: 'level', level: 7, title: 'Java Developer', description: 'Type a Java class with methods at 38+ WPM.', language: 'java', difficulty: 'medium', targetWPM: 38, targetAccuracy: 88, duration: 90, badge: '☕' },
  { id: 'level-8', type: 'level', level: 8, title: 'C Expert', description: 'Type complex C code with pointers at 40+ WPM.', language: 'c', difficulty: 'hard', targetWPM: 40, targetAccuracy: 90, duration: 90, badge: '🔧' },
  { id: 'level-9', type: 'level', level: 9, title: 'Algorithm Coder', description: 'Type a Python algorithm with 92% accuracy.', language: 'python', difficulty: 'hard', targetWPM: 45, targetAccuracy: 92, duration: 90, badge: '🧮' },
  { id: 'level-10', type: 'level', level: 10, title: 'Code Grandmaster', description: 'Type the hardest SQL query at 50+ WPM with 95% accuracy!', language: 'sql', difficulty: 'hard', targetWPM: 50, targetAccuracy: 95, duration: 90, badge: '👑' },
];
