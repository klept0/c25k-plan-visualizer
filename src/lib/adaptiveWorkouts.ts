import { UserProfile } from '@/types/user';
import { WeekProgram, Workout, WorkoutInterval } from '@/data/fullC25kProgram';
import { fullC25kProgram } from '@/data/fullC25kProgram';

export interface AdaptiveSettings {
  paceReduction: number; // Percentage reduction in intensity
  extraRestTime: number; // Additional rest time in seconds
  maxHeartRate?: number; // Recommended max heart rate
  specialInstructions: string[];
  warmupExtension: number; // Additional warmup time in minutes
  cooldownExtension: number; // Additional cooldown time in minutes
}

export const calculateAdaptiveSettings = (profile: UserProfile): AdaptiveSettings => {
  const settings: AdaptiveSettings = {
    paceReduction: 0,
    extraRestTime: 0,
    specialInstructions: [],
    warmupExtension: 0,
    cooldownExtension: 0
  };

  // Age-based adaptations
  if (profile.age > 50) {
    settings.paceReduction += 10;
    settings.extraRestTime += 30;
    settings.warmupExtension += 2;
    settings.cooldownExtension += 2;
    settings.specialInstructions.push("Extended warmup and cooldown recommended for mature athletes");
    
    if (profile.age > 60) {
      settings.paceReduction += 5;
      settings.extraRestTime += 15;
      settings.specialInstructions.push("Focus on joint mobility and gentle progression");
    }
  }

  // Weight-based adaptations
  const isOverweight = profile.weightUnit === 'kg' ? profile.weight > 85 : profile.weight > 187;
  if (isOverweight) {
    settings.paceReduction += 15;
    settings.extraRestTime += 20;
    settings.specialInstructions.push("Start with a gentle pace to protect joints and build endurance gradually");
  }

  // Fitness level adaptations
  switch (profile.fitnessLevel) {
    case 'beginner':
      settings.paceReduction += 20;
      settings.extraRestTime += 30;
      settings.warmupExtension += 1;
      settings.specialInstructions.push("Take your time - consistency is more important than speed");
      break;
    case 'some_experience':
      settings.paceReduction += 10;
      settings.extraRestTime += 15;
      break;
    case 'active':
      // No additional modifications needed
      break;
  }

  // Medical condition adaptations
  if (profile.medicalConditions.includes('hypertension')) {
    settings.paceReduction += 25;
    settings.extraRestTime += 45;
    settings.warmupExtension += 3;
    settings.cooldownExtension += 3;
    settings.maxHeartRate = Math.round(180 - profile.age); // Conservative heart rate formula
    settings.specialInstructions.push(
      "Monitor blood pressure regularly",
      "Stay well hydrated",
      "Stop immediately if you feel dizzy or short of breath",
      "Consult your doctor before starting",
      "Keep medication accessible during workouts"
    );
  }

  if (profile.medicalConditions.includes('diabetes')) {
    settings.specialInstructions.push(
      "Monitor blood sugar levels before and after exercise",
      "Carry glucose tablets or snacks",
      "Exercise at consistent times when possible"
    );
  }

  if (profile.medicalConditions.includes('asthma')) {
    settings.warmupExtension += 2;
    settings.specialInstructions.push(
      "Keep inhaler accessible",
      "Extended warmup to prepare airways",
      "Exercise in moderate temperatures when possible"
    );
  }

  if (profile.medicalConditions.includes('knee_problems')) {
    settings.paceReduction += 15;
    settings.specialInstructions.push(
      "Focus on soft surfaces when possible",
      "Land midfoot to reduce impact",
      "Stop if you experience knee pain"
    );
  }

  return settings;
};

export const adaptWorkoutProgram = (profile: UserProfile): WeekProgram[] => {
  const settings = calculateAdaptiveSettings(profile);
  const adaptedProgram = JSON.parse(JSON.stringify(fullC25kProgram)) as WeekProgram[];

  adaptedProgram.forEach((week) => {
    week.workouts.forEach((workout) => {
      // Adapt warmup
      if (settings.warmupExtension > 0) {
        const currentWarmup = parseInt(workout.warmup.split(' ')[0]);
        workout.warmup = `${currentWarmup + settings.warmupExtension} min brisk walk`;
      }

      // Adapt cooldown
      if (settings.cooldownExtension > 0) {
        const currentCooldown = parseInt(workout.cooldown.split(' ')[0]);
        workout.cooldown = `${currentCooldown + settings.cooldownExtension} min slow walk`;
      }

      // Adapt intervals
      workout.intervals = workout.intervals.map((interval) => {
        if (interval.type === 'walk' && settings.extraRestTime > 0) {
          const [duration, unit] = interval.duration.split(' ');
          const currentSeconds = unit.includes('min') ? parseInt(duration) * 60 : parseInt(duration);
          const newSeconds = currentSeconds + settings.extraRestTime;
          
          return {
            ...interval,
            duration: newSeconds >= 60 
              ? `${Math.floor(newSeconds / 60)} min ${newSeconds % 60 > 0 ? `${newSeconds % 60} sec` : ''}`
              : `${newSeconds} sec`,
            description: `${interval.description} (extended for recovery)`
          };
        }
        return interval;
      });

      // Update duration
      workout.duration = Math.ceil(workout.duration * (1 + settings.warmupExtension / 10 + settings.cooldownExtension / 10));

      // Add adaptive tips
      if (settings.specialInstructions.length > 0) {
        workout.tips += ` ADAPTIVE NOTES: ${settings.specialInstructions.slice(0, 2).join('. ')}.`;
      }

      // Add safety notes for health conditions
      if (settings.maxHeartRate) {
        workout.safety_notes = (workout.safety_notes || '') + 
          ` Target heart rate should not exceed ${settings.maxHeartRate} BPM.`;
      }
    });

    // Update week description with adaptive information
    if (settings.paceReduction > 0) {
      week.description += ` (Adapted for your profile - focus on gradual progression)`;
    }
  });

  return adaptedProgram;
};

export const getPersonalizedTips = (profile: UserProfile, week: number): string[] => {
  const tips: string[] = [];
  const settings = calculateAdaptiveSettings(profile);

  // Age-specific tips
  if (profile.age > 50) {
    tips.push("Remember that recovery is just as important as the workout itself");
    tips.push("Consider adding gentle stretching or yoga on rest days");
  }

  // Fitness level tips
  if (profile.fitnessLevel === 'beginner') {
    tips.push("You're doing great! Every step counts towards building your fitness");
    tips.push("It's normal to feel tired - your body is adapting to new demands");
  }

  // Week-specific adaptive tips
  if (week <= 3 && settings.paceReduction > 15) {
    tips.push("Take these first weeks slowly - you're building a foundation for life");
  }

  if (week >= 5 && profile.medicalConditions.includes('hypertension')) {
    tips.push("As runs get longer, monitor how you feel more frequently");
  }

  return tips;
};

export const calculateTargetHeartRate = (profile: UserProfile): { min: number; max: number } => {
  const maxHR = profile.medicalConditions.includes('hypertension') 
    ? 180 - profile.age  // Conservative for hypertension
    : 220 - profile.age; // Standard formula

  const settings = calculateAdaptiveSettings(profile);
  
  return {
    min: Math.round(maxHR * 0.6), // 60% for easy pace
    max: settings.maxHeartRate || Math.round(maxHR * 0.8) // 80% for moderate pace
  };
};