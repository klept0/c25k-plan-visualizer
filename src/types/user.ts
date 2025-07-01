
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  age: number;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  gender: 'male' | 'female' | 'other';
  fitnessLevel: 'beginner' | 'some_experience' | 'active';
  goals: string[];
  medicalConditions: string[];
  preferredTime: string;
  restDays: string[];
  language: 'en' | 'es' | 'fr' | 'de' | 'pt';
  accessibility: {
    highContrast: boolean;
    largeFont: boolean;
    dyslexiaFont: boolean;
    screenReader: boolean;
  };
  preferences: {
    units: 'metric' | 'imperial';
    audioEnabled: boolean;
    notificationsEnabled: boolean;
    weatherIntegration: boolean;
  };
  integrations: {
    stravaEnabled: boolean;
    runkeeperEnabled: boolean;
    garminEnabled: boolean;
    intervalsEnabled: boolean;
    weatherEnabled: boolean;
    appleHealthEnabled: boolean;
    googleFitEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  week: number;
  day: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  intervals: {
    type: 'run' | 'walk';
    duration: number;
    completed: boolean;
    actualDuration?: number;
  }[];
  notes?: string;
  rating?: number;
  weather?: {
    temperature: number;
    condition: string;
    humidity: number;
  };
}

export interface UserProgress {
  userId: string;
  currentWeek: number;
  currentDay: number;
  totalWorkouts: number;
  completedWorkouts: number;
  totalRunningTime: number;
  totalDistance: number;
  achievements: Achievement[];
  weeklyStats: WeeklyStats[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'distance' | 'time' | 'consistency' | 'milestone';
}

export interface WeeklyStats {
  week: number;
  workoutsCompleted: number;
  totalRunningTime: number;
  averagePace?: number;
  notes?: string;
}
