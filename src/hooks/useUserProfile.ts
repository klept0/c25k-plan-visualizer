import { useState, useEffect } from 'react';
import { UserProfile, WorkoutSession, UserProgress, Achievement } from '@/types/user';

const STORAGE_KEYS = {
  USER_PROFILE: 'c25k_user_profile',
  WORKOUT_SESSIONS: 'c25k_workout_sessions',
  USER_PROGRESS: 'c25k_user_progress'
};

// API base URL - adjust if backend runs on different port
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const profileData = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        const sessionsData = localStorage.getItem(STORAGE_KEYS.WORKOUT_SESSIONS);
        const progressData = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);

        if (profileData) {
          const profile = JSON.parse(profileData);
          profile.createdAt = new Date(profile.createdAt);
          profile.updatedAt = new Date(profile.updatedAt);
          setUserProfile(profile);
        }

        if (sessionsData) {
          const sessions = JSON.parse(sessionsData);
          sessions.forEach((session: WorkoutSession) => {
            session.startTime = new Date(session.startTime);
            if (session.endTime) session.endTime = new Date(session.endTime);
          });
          setWorkoutSessions(sessions);
        }

        if (progressData) {
          const progress = JSON.parse(progressData);
          progress.achievements.forEach((achievement: Achievement) => {
            achievement.unlockedAt = new Date(achievement.unlockedAt);
          });
          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // API helper function
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response;
  };

  // Generate a training plan using the backend API
  const generateTrainingPlan = async (profileData: UserProfile) => {
    try {
      const userForAPI = {
        name: profileData.name,
        age: profileData.age,
        weight: profileData.weight,
        weight_unit: profileData.weightUnit === 'kg' ? 'kg' : 'i',
        gender: profileData.gender,
        start_day: new Date().toISOString(),
        hour: parseInt(profileData.preferredTime.split(':')[0] || '7'),
        minute: parseInt(profileData.preferredTime.split(':')[1] || '0'),
        rest_days: profileData.restDays,
        lang: profileData.language === 'en' ? 'e' : profileData.language,
      };

      const response = await apiCall('/generate-plan', {
        method: 'POST',
        body: JSON.stringify(userForAPI),
      });

      const result = await response.json();
      if (result.success) {
        return result.plan;
      } else {
        throw new Error(result.error || 'Failed to generate plan');
      }
    } catch (error) {
      console.error('Error generating training plan:', error);
      throw error;
    }
  };

  // Export training plan in various formats
  const exportTrainingPlan = async (format: string, profileData: UserProfile) => {
    try {
      // First generate the plan
      const plan = await generateTrainingPlan(profileData);
      
      const exportData = {
        format: format,
        plan: plan,
        user: {
          name: profileData.name,
          age: profileData.age,
          weight: profileData.weight,
          weight_unit: profileData.weightUnit === 'kg' ? 'kg' : 'i',
          gender: profileData.gender,
          start_day: new Date().toISOString(),
          hour: parseInt(profileData.preferredTime.split(':')[0] || '7'),
          minute: parseInt(profileData.preferredTime.split(':')[1] || '0'),
          rest_days: profileData.restDays,
          lang: profileData.language === 'en' ? 'e' : profileData.language,
        }
      };

      const response = await apiCall('/export-plan', {
        method: 'POST',
        body: JSON.stringify(exportData),
      });

      // Handle file download
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
        : `c25k_plan.${format}`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Error exporting training plan:', error);
      throw error;
    }
  };

  // Get available export formats
  const getExportFormats = async () => {
    try {
      const response = await apiCall('/export-formats');
      const result = await response.json();
      if (result.success) {
        return result.formats;
      } else {
        throw new Error(result.error || 'Failed to get export formats');
      }
    } catch (error) {
      console.error('Error getting export formats:', error);
      return {
        'csv': 'Spreadsheet format for Excel, Google Sheets, Numbers',
        'json': 'Structured data format for developers and APIs',
        'ics': 'Calendar format for Apple Calendar, Google Calendar, Outlook',
        'markdown': 'Printable checklist format'
      };
    }
  };

  const saveUserProfile = (profile: UserProfile) => {
    try {
      const updatedProfile = { ...profile, updatedAt: new Date() };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const createUserProfile = (profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    saveUserProfile(newProfile);
    
    // Initialize user progress
    const initialProgress: UserProgress = {
      userId: newProfile.id,
      currentWeek: 1,
      currentDay: 1,
      totalWorkouts: 0,
      completedWorkouts: 0,
      totalRunningTime: 0,
      totalDistance: 0,
      achievements: [],
      weeklyStats: []
    };
    saveUserProgress(initialProgress);
  };

  const saveWorkoutSession = (session: WorkoutSession) => {
    try {
      const updatedSessions = [...workoutSessions, session];
      localStorage.setItem(STORAGE_KEYS.WORKOUT_SESSIONS, JSON.stringify(updatedSessions));
      setWorkoutSessions(updatedSessions);
      
      // Update progress
      if (userProgress) {
        updateUserProgress(session);
      }
    } catch (error) {
      console.error('Error saving workout session:', error);
    }
  };

  const saveUserProgress = (progress: UserProgress) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      setUserProgress(progress);
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  };

  const updateUserProgress = (session: WorkoutSession) => {
    if (!userProgress) return;

    const runningTime = session.intervals
      .filter(interval => interval.type === 'run' && interval.completed)
      .reduce((total, interval) => total + interval.duration, 0);

    const updatedProgress: UserProgress = {
      ...userProgress,
      totalWorkouts: userProgress.totalWorkouts + 1,
      completedWorkouts: session.completed ? userProgress.completedWorkouts + 1 : userProgress.completedWorkouts,
      totalRunningTime: userProgress.totalRunningTime + runningTime,
      currentWeek: session.week,
      currentDay: session.day
    };

    // Check for achievements
    checkAchievements(updatedProgress, session);
    
    saveUserProgress(updatedProgress);
  };

  const checkAchievements = (progress: UserProgress, session: WorkoutSession) => {
    const newAchievements = [];

    // First workout achievement
    if (progress.totalWorkouts === 1) {
      newAchievements.push({
        id: crypto.randomUUID(),
        title: 'First Steps',
        description: 'Completed your first C25K workout!',
        icon: '🎯',
        unlockedAt: new Date(),
        category: 'milestone' as const
      });
    }

    // First week completion
    if (session.week === 1 && session.day === 3 && session.completed) {
      newAchievements.push({
        id: crypto.randomUUID(),
        title: 'Week 1 Champion',
        description: 'Completed your first week of C25K!',
        icon: '🏆',
        unlockedAt: new Date(),
        category: 'milestone' as const
      });
    }

    // First continuous 5-minute run
    if (session.week >= 4 && session.intervals.some(interval => 
      interval.type === 'run' && interval.duration >= 300 && interval.completed
    )) {
      const hasAchievement = progress.achievements.some(a => a.title === '5 Minute Runner');
      if (!hasAchievement) {
        newAchievements.push({
          id: crypto.randomUUID(),
          title: '5 Minute Runner',
          description: 'Ran continuously for 5 minutes!',
          icon: '🏃‍♂️',
          unlockedAt: new Date(),
          category: 'time' as const
        });
      }
    }

    // Add new achievements to progress
    if (newAchievements.length > 0) {
      progress.achievements = [...progress.achievements, ...newAchievements];
    }
  };

  const markWorkoutCompleted = (week: number, day: number) => {
    // This will be used by the workout components to mark completion
    // For now, we'll update the fullC25kProgram data structure
    console.log(`Marking workout completed: Week ${week}, Day ${day}`);
  };

  const exportUserData = () => {
    const exportData = {
      profile: userProfile,
      sessions: workoutSessions,
      progress: userProgress,
      exportedAt: new Date()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `c25k-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return {
    userProfile,
    workoutSessions,
    userProgress,
    loading,
    createUserProfile,
    saveUserProfile,
    saveWorkoutSession,
    markWorkoutCompleted,
    exportUserData,
    // New API-powered functions
    generateTrainingPlan,
    exportTrainingPlan,
    getExportFormats
  };
};
