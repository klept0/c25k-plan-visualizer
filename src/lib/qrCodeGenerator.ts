import QRCode from 'qrcode';
import { UserProfile } from '@/types/user';
import { WeekProgram } from '@/data/fullC25kProgram';

export interface QRCodeData {
  type: 'plan' | 'week' | 'workout' | 'progress';
  data: any;
  timestamp: string;
  version: string;
}

export const generatePlanQR = async (profile: UserProfile): Promise<string> => {
  const qrData: QRCodeData = {
    type: 'plan',
    data: {
      name: profile.name,
      fitnessLevel: profile.fitnessLevel,
      age: profile.age,
      goals: profile.goals,
      preferredTime: profile.preferredTime,
      restDays: profile.restDays,
      medicalConditions: profile.medicalConditions
    },
    timestamp: new Date().toISOString(),
    version: '1.0'
  };

  try {
    const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'M',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    });
    return qrString;
  } catch (error) {
    console.error('Error generating plan QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const generateWeekQR = async (week: WeekProgram, userProfile: UserProfile): Promise<string> => {
  const qrData: QRCodeData = {
    type: 'week',
    data: {
      week: week.week,
      title: week.title,
      description: week.description,
      workouts: week.workouts.map(w => ({
        day: w.day,
        duration: w.duration,
        intervals: w.intervals.length,
        tips: w.tips.substring(0, 100) + '...'
      })),
      userName: userProfile.name,
      adaptedFor: {
        age: userProfile.age,
        fitnessLevel: userProfile.fitnessLevel,
        medicalConditions: userProfile.medicalConditions
      }
    },
    timestamp: new Date().toISOString(),
    version: '1.0'
  };

  try {
    const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'M',
      margin: 1,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      },
      width: 200
    });
    return qrString;
  } catch (error) {
    console.error('Error generating week QR code:', error);
    throw new Error('Failed to generate week QR code');
  }
};

export const generateWorkoutQR = async (
  weekNumber: number, 
  dayNumber: number, 
  intervals: any[], 
  userProfile: UserProfile
): Promise<string> => {
  const qrData: QRCodeData = {
    type: 'workout',
    data: {
      week: weekNumber,
      day: dayNumber,
      intervals: intervals.map(i => ({
        type: i.type,
        duration: i.duration,
        description: i.description
      })),
      userName: userProfile.name,
      shareUrl: `${window.location.origin}/workout/${weekNumber}/${dayNumber}`
    },
    timestamp: new Date().toISOString(),
    version: '1.0'
  };

  try {
    const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'L',
      margin: 1,
      color: {
        dark: '#059669',
        light: '#ffffff'
      },
      width: 150
    });
    return qrString;
  } catch (error) {
    console.error('Error generating workout QR code:', error);
    throw new Error('Failed to generate workout QR code');
  }
};

export const generateProgressQR = async (
  userProfile: UserProfile,
  totalWorkouts: number,
  completedWorkouts: number,
  currentWeek: number
): Promise<string> => {
  const progressPercentage = Math.round((completedWorkouts / totalWorkouts) * 100);
  
  const qrData: QRCodeData = {
    type: 'progress',
    data: {
      userName: userProfile.name,
      progress: {
        completed: completedWorkouts,
        total: totalWorkouts,
        percentage: progressPercentage,
        currentWeek: currentWeek
      },
      achievements: `${completedWorkouts} workouts completed`,
      shareMessage: `${userProfile.name} has completed ${progressPercentage}% of their Couch to 5K journey!`,
      shareUrl: `${window.location.origin}/progress/share`
    },
    timestamp: new Date().toISOString(),
    version: '1.0'
  };

  try {
    const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'M',
      margin: 1,
      color: {
        dark: '#7c3aed',
        light: '#ffffff'
      },
      width: 200
    });
    return qrString;
  } catch (error) {
    console.error('Error generating progress QR code:', error);
    throw new Error('Failed to generate progress QR code');
  }
};

export const parseQRData = (qrCodeData: string): QRCodeData | null => {
  try {
    const parsed = JSON.parse(qrCodeData);
    if (parsed.type && parsed.data && parsed.version) {
      return parsed as QRCodeData;
    }
    return null;
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return null;
  }
};

export const downloadQRCode = (qrDataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = qrDataUrl;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareQRCode = async (qrDataUrl: string, title: string, text: string): Promise<void> => {
  if (navigator.share) {
    try {
      // Convert data URL to blob
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'c25k-qr-code.png', { type: 'image/png' });
      
      await navigator.share({
        title: title,
        text: text,
        files: [file]
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
      // Fallback to download
      downloadQRCode(qrDataUrl, 'c25k-share');
    }
  } else {
    // Fallback for browsers without native sharing
    downloadQRCode(qrDataUrl, 'c25k-share');
  }
};