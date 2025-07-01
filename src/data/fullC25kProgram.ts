
// Complete 9-week C25K program based on NHS guidelines
export interface WorkoutInterval {
  type: 'run' | 'walk';
  duration: string;
  description?: string;
}

export interface Workout {
  day: number;
  warmup: string;
  intervals: WorkoutInterval[];
  cooldown: string;
  tips: string;
  duration: number; // total duration in minutes
  completed: boolean;
  safety_notes?: string;
}

export interface WeekProgram {
  week: number;
  title: string;
  description: string;
  workouts: Workout[];
  focus: string;
  safety_reminder: string;
}

export const fullC25kProgram: WeekProgram[] = [
  {
    week: 1,
    title: "Getting Started",
    description: "Begin your journey with alternating running and walking intervals",
    focus: "Building basic endurance and establishing routine",
    safety_reminder: "Start slowly and listen to your body. Hydrate well.",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "Focus on form rather than speed. You should be able to hold a conversation while running.",
        duration: 30,
        completed: false,
        safety_notes: "Stop if you feel pain. Slight breathlessness is normal."
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "Don't worry about speed - consistency is key. Celebrate completing each interval!",
        duration: 30,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '1 min', description: 'Easy jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "Week 1 complete! Your body is already adapting. Rest days are crucial for recovery.",
        duration: 30,
        completed: false
      }
    ]
  },
  {
    week: 2,
    title: "Building Endurance",
    description: "Increase running intervals to 90 seconds",
    focus: "Extending running intervals and building stamina",
    safety_reminder: "Maintain proper hydration and don't skip rest days",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' }
        ],
        cooldown: "5 min slow walk",
        tips: "Longer intervals! Focus on maintaining a steady, comfortable pace throughout.",
        duration: 30,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' }
        ],
        cooldown: "5 min slow walk",
        tips: "Your cardiovascular system is getting stronger. Notice how recovery becomes easier.",
        duration: 30,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '2 min', description: 'Recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' }
        ],
        cooldown: "5 min slow walk",
        tips: "Great progress! You're building the foundation for longer runs ahead.",
        duration: 30,
        completed: false
      }
    ]
  },
  {
    week: 3,
    title: "Mixed Intervals",
    description: "Combination of 90-second and 3-minute running intervals",
    focus: "Introducing longer running segments",
    safety_reminder: "Pay attention to your body's signals during longer intervals",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Warm-up jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "First taste of longer runs! Break the 3-minute intervals into smaller mental chunks.",
        duration: 32,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Warm-up jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "Focus on rhythm and breathing during the longer intervals. You're getting stronger!",
        duration: 32,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '90 sec', description: 'Warm-up jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' },
          { type: 'run', duration: '90 sec', description: 'Steady jog' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Longer steady run' },
          { type: 'walk', duration: '3 min', description: 'Full recovery walk' }
        ],
        cooldown: "5 min slow walk",
        tips: "Milestone achieved! You can now run for 3 minutes straight. Amazing progress!",
        duration: 32,
        completed: false
      }
    ]
  },
  {
    week: 4,
    title: "Stepping Up",
    description: "Longer continuous runs with walking recovery",
    focus: "Building continuous running endurance",
    safety_reminder: "Longer runs require more attention to hydration and pace",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' },
          { type: 'walk', duration: '2.5 min', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Your first 5-minute runs! Pace yourself - it's about endurance, not speed.",
        duration: 35,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' },
          { type: 'walk', duration: '2.5 min', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Notice how your breathing becomes more controlled during longer runs.",
        duration: 35,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' },
          { type: 'walk', duration: '2.5 min', description: 'Recovery walk' },
          { type: 'run', duration: '3 min', description: 'Steady run' },
          { type: 'walk', duration: '90 sec', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Extended run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Halfway through the program! Your endurance is really building now.",
        duration: 35,
        completed: false
      }
    ]
  },
  {
    week: 5,
    title: "Continuous Running",
    description: "First continuous runs without walking breaks",
    focus: "Transitioning to uninterrupted running",
    safety_reminder: "First continuous runs - listen to your body and adjust pace as needed",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '5 min', description: 'Warm-up run' },
          { type: 'walk', duration: '3 min', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Steady run' },
          { type: 'walk', duration: '3 min', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Closing run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Three 5-minute runs with walking breaks. You're building serious endurance!",
        duration: 36,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '8 min', description: 'Extended continuous run' },
          { type: 'walk', duration: '5 min', description: 'Recovery walk' },
          { type: 'run', duration: '8 min', description: 'Extended continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Two 8-minute runs! Focus on maintaining a steady, sustainable pace.",
        duration: 36,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '20 min', description: 'Continuous run - your longest yet!' }
        ],
        cooldown: "5 min slow walk",
        tips: "Incredible! You just ran for 20 minutes straight. This is a major milestone!",
        duration: 30,
        completed: false,
        safety_notes: "First 20-minute run - start conservatively and adjust pace as needed"
      }
    ]
  },
  {
    week: 6,
    title: "Sustained Running",
    description: "Longer continuous runs building towards 25 minutes",
    focus: "Extending continuous running duration",
    safety_reminder: "Longer continuous runs - focus on pace management",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '5 min', description: 'Warm-up run' },
          { type: 'walk', duration: '3 min', description: 'Recovery walk' },
          { type: 'run', duration: '8 min', description: 'Extended run' },
          { type: 'walk', duration: '3 min', description: 'Recovery walk' },
          { type: 'run', duration: '5 min', description: 'Closing run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Mixed intervals to maintain fitness while building endurance base.",
        duration: 39,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '10 min', description: 'Extended run' },
          { type: 'walk', duration: '3 min', description: 'Recovery walk' },
          { type: 'run', duration: '10 min', description: 'Extended run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Two 10-minute runs with a break. You're approaching the final phase!",
        duration: 38,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '25 min', description: 'Long continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "25 minutes of continuous running! You're almost ready for 5K distance.",
        duration: 35,
        completed: false
      }
    ]
  },
  {
    week: 7,
    title: "Final Preparation",
    description: "Preparing for 5K distance with consistent 25-minute runs",
    focus: "Consistency and pace management for 5K distance",
    safety_reminder: "Focus on consistency rather than speed",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '25 min', description: 'Steady continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Consistent 25-minute runs. Focus on finding your sustainable pace.",
        duration: 35,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '25 min', description: 'Steady continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Second 25-minute run this week. Notice how much easier it feels now!",
        duration: 35,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '25 min', description: 'Steady continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Third 25-minute run! You're building the endurance base for 5K.",
        duration: 35,
        completed: false
      }
    ]
  },
  {
    week: 8,
    title: "Building to 5K",
    description: "Extending to 28-30 minutes to reach 5K distance",
    focus: "Reaching and maintaining 5K distance",
    safety_reminder: "You're close to the goal - maintain good form and pace",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '28 min', description: 'Extended run approaching 5K' }
        ],
        cooldown: "5 min slow walk",
        tips: "28 minutes of running! You're very close to completing a full 5K distance.",
        duration: 38,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '28 min', description: 'Extended run approaching 5K' }
        ],
        cooldown: "5 min slow walk",
        tips: "Consistency is key. Your body is adapting to sustained running.",
        duration: 38,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '30 min', description: '5K distance run!' }
        ],
        cooldown: "5 min slow walk",
        tips: "30 minutes of continuous running! You've likely covered 5K distance. Amazing achievement!",
        duration: 40,
        completed: false
      }
    ]
  },
  {
    week: 9,
    title: "5K Achievement",
    description: "Completing and mastering the 5K distance",
    focus: "Consolidating 5K achievement and building confidence",
    safety_reminder: "Celebrate your achievement while maintaining good running habits",
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '30 min', description: '5K continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "You're now a 5K runner! Focus on enjoying the achievement and your new fitness level.",
        duration: 40,
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '30 min', description: '5K continuous run' }
        ],
        cooldown: "5 min slow walk",
        tips: "Second 5K of the week. Notice how your confidence and enjoyment have grown!",
        duration: 40,
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run', duration: '30 min', description: 'Graduation 5K run!' }
        ],
        cooldown: "5 min slow walk",
        tips: "CONGRATULATIONS! You've completed the Couch to 5K program. You're now a runner!",
        duration: 40,
        completed: false,
        safety_notes: "Celebrate your achievement! Consider setting new running goals."
      }
    ]
  }
];
