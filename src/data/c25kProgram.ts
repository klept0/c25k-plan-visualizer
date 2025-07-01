
export const c25kProgram = [
  {
    week: 1,
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ].concat(Array(7).fill([
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ]).flat()).slice(0, 16),
        cooldown: "5 min slow walk",
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ].concat(Array(7).fill([
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ]).flat()).slice(0, 16),
        cooldown: "5 min slow walk",
        completed: true
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ].concat(Array(7).fill([
          { type: 'run' as const, duration: '1 min' },
          { type: 'walk' as const, duration: '90 sec' }
        ]).flat()).slice(0, 16),
        cooldown: "5 min slow walk",
        completed: true
      }
    ]
  },
  {
    week: 2,
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '2 min' },
          { type: 'run' as const, duration: '90 sec' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      }
    ]
  },
  {
    week: 3,
    workouts: [
      {
        day: 1,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      },
      {
        day: 2,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      },
      {
        day: 3,
        warmup: "5 min brisk walk",
        intervals: [
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' },
          { type: 'run' as const, duration: '90 sec' },
          { type: 'walk' as const, duration: '90 sec' },
          { type: 'run' as const, duration: '3 min' },
          { type: 'walk' as const, duration: '3 min' }
        ],
        cooldown: "5 min slow walk",
        completed: false
      }
    ]
  }
];
