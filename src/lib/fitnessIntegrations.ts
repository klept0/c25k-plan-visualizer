import { UserProfile, WorkoutSession } from '@/types/user';
import { WeekProgram } from '@/data/fullC25kProgram';

export interface FitnessExportData {
  platform: 'strava' | 'runkeeper' | 'garmin' | 'applehealth' | 'intervals' | 'googlefit';
  format: 'tcx' | 'gpx' | 'fit' | 'csv' | 'json';
  data: any;
  filename: string;
}

export interface StravaActivity {
  name: string;
  type: 'Run';
  start_date_local: string;
  elapsed_time: number;
  description: string;
  distance?: number;
  trainer: boolean;
}

export interface GarminActivity {
  activityName: string;
  activityType: 'running';
  startTimeGMT: string;
  duration: number;
  description: string;
  distance?: number;
}

export interface IntervalsWorkout {
  start_date_local: string;
  type: 'Run';
  name: string;
  description: string;
  moving_time: number;
  elapsed_time: number;
  distance?: number;
  trainer: boolean;
  intervals?: Array<{
    type: 'work' | 'rest';
    duration: number;
    target_type: 'pace' | 'hr';
    description: string;
  }>;
}

// Strava Integration
export const exportToStrava = async (
  session: WorkoutSession,
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const activity: StravaActivity = {
    name: `C25K Week ${session.week} Day ${session.day}`,
    type: 'Run',
    start_date_local: session.startTime.toISOString(),
    elapsed_time: Math.round((session.endTime?.getTime() || Date.now()) - session.startTime.getTime()) / 1000,
    description: generateWorkoutDescription(session),
    trainer: true // Most C25K workouts are structured
  };

  return {
    platform: 'strava',
    format: 'json',
    data: activity,
    filename: `strava_c25k_w${session.week}d${session.day}.json`
  };
};

// Garmin Connect Integration
export const exportToGarmin = async (
  session: WorkoutSession,
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const activity: GarminActivity = {
    activityName: `C25K Week ${session.week} Day ${session.day}`,
    activityType: 'running',
    startTimeGMT: session.startTime.toISOString(),
    duration: Math.round((session.endTime?.getTime() || Date.now()) - session.startTime.getTime()) / 1000,
    description: generateWorkoutDescription(session)
  };

  return {
    platform: 'garmin',
    format: 'json',
    data: activity,
    filename: `garmin_c25k_w${session.week}d${session.day}.json`
  };
};

// Intervals.icu Integration
export const exportToIntervals = async (
  session: WorkoutSession,
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const workout: IntervalsWorkout = {
    start_date_local: session.startTime.toISOString(),
    type: 'Run',
    name: `C25K W${session.week}D${session.day}`,
    description: generateWorkoutDescription(session),
    moving_time: calculateMovingTime(session),
    elapsed_time: Math.round((session.endTime?.getTime() || Date.now()) - session.startTime.getTime()) / 1000,
    trainer: true,
    intervals: session.intervals.map((interval, index) => ({
      type: interval.type === 'run' ? 'work' : 'rest',
      duration: interval.actualDuration || parseDurationToSeconds(interval.duration.toString()),
      target_type: 'pace',
      description: `${interval.type} interval ${index + 1}`
    }))
  };

  return {
    platform: 'intervals',
    format: 'json',
    data: workout,
    filename: `intervals_c25k_w${session.week}d${session.day}.json`
  };
};

// Apple Health Integration (HealthKit CSV format)
export const exportToAppleHealth = async (
  sessions: WorkoutSession[],
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const csvData = sessions.map(session => ({
    'Start Date': session.startTime.toISOString(),
    'End Date': (session.endTime || new Date()).toISOString(),
    'Workout Activity Type': 'HKWorkoutActivityTypeRunning',
    'Duration (min)': Math.round(((session.endTime?.getTime() || Date.now()) - session.startTime.getTime()) / 60000),
    'Total Distance (km)': estimateDistance(session),
    'Total Energy Burned (kcal)': estimateCalories(session, userProfile),
    'Source Name': 'C25K Training App',
    'Source Version': '1.0',
    'Device': 'C25K App',
    'Creation Date': session.startTime.toISOString(),
    'Notes': `C25K Week ${session.week} Day ${session.day} - ${generateWorkoutDescription(session)}`
  }));

  return {
    platform: 'applehealth',
    format: 'csv',
    data: csvData,
    filename: 'apple_health_c25k_workouts.csv'
  };
};

// Google Fit Integration
export const exportToGoogleFit = async (
  sessions: WorkoutSession[],
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const fitData = sessions.map(session => ({
    dataSourceId: 'c25k_training_app',
    application: {
      packageName: 'com.c25k.training',
      version: '1.0',
      name: 'C25K Training'
    },
    session: {
      id: session.id,
      name: `C25K Week ${session.week} Day ${session.day}`,
      description: generateWorkoutDescription(session),
      startTimeMillis: session.startTime.getTime(),
      endTimeMillis: session.endTime?.getTime() || Date.now(),
      modifiedTimeMillis: Date.now(),
      activityType: 8, // Running activity type in Google Fit
      application: {
        packageName: 'com.c25k.training'
      }
    },
    dataset: [
      {
        dataSourceId: 'c25k_training_app:distance',
        point: [{
          startTimeNanos: session.startTime.getTime() * 1000000,
          endTimeNanos: (session.endTime?.getTime() || Date.now()) * 1000000,
          dataTypeName: 'com.google.distance.delta',
          value: [{
            fpVal: estimateDistance(session) * 1000 // Convert km to meters
          }]
        }]
      }
    ]
  }));

  return {
    platform: 'googlefit',
    format: 'json',
    data: fitData,
    filename: 'google_fit_c25k_data.json'
  };
};

// RunKeeper Integration
export const exportToRunKeeper = async (
  sessions: WorkoutSession[],
  userProfile: UserProfile
): Promise<FitnessExportData> => {
  const runKeeperData = sessions.map(session => ({
    type: 'Running',
    start_time: session.startTime.toISOString(),
    total_time: Math.round(((session.endTime?.getTime() || Date.now()) - session.startTime.getTime()) / 1000),
    total_distance: estimateDistance(session) * 1000, // Convert to meters
    notes: `C25K Week ${session.week} Day ${session.day} - ${generateWorkoutDescription(session)}`,
    source: 'C25K Training App'
  }));

  return {
    platform: 'runkeeper',
    format: 'json',
    data: runKeeperData,
    filename: 'runkeeper_c25k_activities.json'
  };
};

// Generate comprehensive workout plan for all platforms
export const exportCompleteProgram = async (
  userProfile: UserProfile,
  platform: 'strava' | 'garmin' | 'intervals'
): Promise<FitnessExportData> => {
  const program = generateProgramSchedule(userProfile);
  
  switch (platform) {
    case 'strava':
      return {
        platform: 'strava',
        format: 'json',
        data: program.map(workout => ({
          name: workout.name,
          type: 'Run',
          start_date_local: workout.scheduledDate,
          description: workout.description,
          trainer: true
        })),
        filename: 'strava_c25k_complete_program.json'
      };
    
    case 'garmin':
      return {
        platform: 'garmin',
        format: 'json',
        data: program.map(workout => ({
          activityName: workout.name,
          activityType: 'running',
          scheduledDate: workout.scheduledDate,
          description: workout.description,
          estimatedDuration: workout.duration * 60
        })),
        filename: 'garmin_c25k_complete_program.json'
      };
    
    case 'intervals':
      return {
        platform: 'intervals',
        format: 'json',
        data: {
          name: `${userProfile.name}'s C25K Program`,
          description: 'Complete 9-week Couch to 5K training program',
          workouts: program.map(workout => ({
            name: workout.name,
            planned_date: workout.scheduledDate,
            description: workout.description,
            intervals: workout.intervals
          }))
        },
        filename: 'intervals_c25k_complete_program.json'
      };
    
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};

// Helper functions
const generateWorkoutDescription = (session: WorkoutSession): string => {
  const runIntervals = session.intervals.filter(i => i.type === 'run').length;
  const walkIntervals = session.intervals.filter(i => i.type === 'walk').length;
  return `${runIntervals} running intervals, ${walkIntervals} walking intervals. Completed: ${session.completed ? 'Yes' : 'No'}`;
};

const calculateMovingTime = (session: WorkoutSession): number => {
  return session.intervals
    .filter(i => i.type === 'run' && i.completed)
    .reduce((total, interval) => total + (interval.actualDuration || parseDurationToSeconds(interval.duration.toString())), 0);
};

const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(' ');
  const value = parseInt(parts[0]);
  const unit = parts[1];
  
  if (unit.includes('min')) {
    return value * 60;
  } else if (unit.includes('sec')) {
    return value;
  }
  return value * 60; // default to minutes
};

const estimateDistance = (session: WorkoutSession): number => {
  // Estimate distance based on running time (assuming 6 mph / 10 km/h average pace for beginners)
  const runningTime = session.intervals
    .filter(i => i.type === 'run' && i.completed)
    .reduce((total, interval) => total + parseDurationToSeconds(interval.duration.toString()), 0);
  
  return (runningTime / 3600) * 10; // 10 km/h average pace, result in km
};

const estimateCalories = (session: WorkoutSession, userProfile: UserProfile): number => {
  // Basic calorie estimation: 1 calorie per kg per km
  const distance = estimateDistance(session);
  return Math.round(distance * userProfile.weight);
};

const generateProgramSchedule = (userProfile: UserProfile): Array<{
  name: string;
  scheduledDate: string;
  description: string;
  duration: number;
  intervals: any[];
}> => {
  const startDate = new Date();
  const schedule: any[] = [];
  let currentDate = new Date(startDate);
  
  // This would be populated with the full program schedule
  // For now, returning a sample structure
  return [
    {
      name: 'C25K Week 1 Day 1',
      scheduledDate: currentDate.toISOString(),
      description: '8 intervals of 1 min run, 90 sec walk',
      duration: 30,
      intervals: []
    }
  ];
};

// Download function for all platforms
export const downloadFitnessExport = (exportData: FitnessExportData): void => {
  let content: string;
  let mimeType: string;
  
  switch (exportData.format) {
    case 'json':
      content = JSON.stringify(exportData.data, null, 2);
      mimeType = 'application/json';
      break;
    case 'csv':
      content = convertToCSV(exportData.data);
      mimeType = 'text/csv';
      break;
    default:
      content = JSON.stringify(exportData.data, null, 2);
      mimeType = 'application/json';
  }
  
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = exportData.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const convertToCSV = (data: any[]): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
};