export interface DateTimeInput {
  datetime: string; // e.g., "2025-08-06T22:00:00+07:00"
}

export interface SleepSchedule {
  sleepTime: string; // e.g., "23:00"
  wakeTime: string;  // e.g., "07:00"
}

export interface JetLagResult {
  hoursShifted: number;
  direction: "east" | "west" | "none";
  plan: string[];
  flightDuration: number;
  flightSleepPlan: string[];
  isFlightTooLong?: boolean;
  funnySuggestions?: string[];
  isImpossibleFlight?: boolean;
  jetLagSeverity?: "none" | "mild" | "moderate" | "severe";
  recoveryDays?: number;
  lightExposureAdvice?: string[];
}

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const hrs = Math.floor((minutes + 1440) % 1440 / 60);
  const mins = (minutes + 1440) % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function calculateJetLag(
  departure: DateTimeInput,
  arrival: DateTimeInput,
  sleep: SleepSchedule
): JetLagResult {
  // Extract timezone offset from datetime strings
  function extractTimezoneOffset(datetime: string): number {
    const match = datetime.match(/([+-])(\d{2}):(\d{2})$/);
    if (!match) return 0;
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2]);
    const minutes = parseInt(match[3]);
    return sign * (hours + minutes / 60);
  }

  // Enhanced flight duration validation with realistic constraints
  function validateFlightDuration(duration: number, timezoneShift: number): {
    isValid: boolean;
    category: 'impossible' | 'suspicious' | 'long' | 'normal';
    reason?: string;
  } {
    if (duration <= 0) {
      return { isValid: false, category: 'impossible', reason: 'negative_duration' };
    }
    
    // Longest commercial flight is Singapore-Newark at ~18.5 hours
    // But with connections, people might have 24+ hour journeys
    if (duration > 30) {
      return { isValid: false, category: 'impossible', reason: 'too_long' };
    }
    
    // Suspicious: Very long direct flights that don't exist
    if (duration > 20 && Math.abs(timezoneShift) < 12) {
      return { isValid: false, category: 'suspicious', reason: 'unrealistic_route' };
    }
    
    if (duration > 15) {
      return { isValid: true, category: 'long' };
    }
    
    return { isValid: true, category: 'normal' };
  }

  // Calculate jet lag severity based on research
  function calculateJetLagSeverity(timezoneDiff: number): {
    severity: "none" | "mild" | "moderate" | "severe";
    recoveryDays: number;
  } {
    const absDiff = Math.abs(timezoneDiff);
    
    if (absDiff <= 2) {
      return { severity: "none", recoveryDays: 0 };
    } else if (absDiff <= 4) {
      return { severity: "mild", recoveryDays: Math.ceil(absDiff * 0.5) };
    } else if (absDiff <= 8) {
      return { severity: "moderate", recoveryDays: Math.ceil(absDiff * 0.75) };
    } else {
      return { severity: "severe", recoveryDays: Math.ceil(absDiff * 1) };
    }
  }

  // Generate light exposure advice based on direction and timezone
  function generateLightExposureAdvice(direction: string, timezoneShift: number): string[] {
    const advice: string[] = [];
    const absDiff = Math.abs(timezoneShift);
    
    if (absDiff <= 2) {
      advice.push("💡 Minimal jet lag expected - maintain normal light exposure");
      return advice;
    }
    
    if (direction === "east") {
      advice.push("🌅 Eastward travel: Get morning light at destination");
      advice.push("🕶️ Avoid evening light for first 2-3 days");
      advice.push("☀️ Seek bright light 30 min after waking up");
      if (absDiff > 6) {
        advice.push("💡 Consider light therapy device (10,000 lux) for 30 minutes in morning");
      }
    } else if (direction === "west") {
      advice.push("🌆 Westward travel: Get evening light at destination");
      advice.push("🕶️ Avoid morning light for first 2-3 days");
      advice.push("🌙 Stay up later and get light exposure in evening");
      if (absDiff > 6) {
        advice.push("💡 Consider light therapy in late afternoon/early evening");
      }
    }
    
    return advice;
  }

  // Create sophisticated sleep adjustment plan
  function createAdvancedSleepPlan(direction: string, timezoneShift: number, currentSleep: SleepSchedule): string[] {
    const plan: string[] = [];
    const absDiff = Math.abs(timezoneShift);
    
    if (absDiff <= 2) {
      plan.push("✅ Minor timezone change - no pre-adjustment needed");
      plan.push("🛏️ Maintain your normal sleep schedule");
      return plan;
    }
    
    // Calculate optimal shift per day (research shows 1-2 hours max per day)
    const maxShiftPerDay = direction === "east" ? 1 : 1.5; // Westward is easier
    const daysNeeded = Math.ceil(absDiff / maxShiftPerDay);
    const actualDaysAvailable = Math.min(daysNeeded, 5); // Limit to 5 days pre-adjustment
    const shiftPerDay = absDiff / actualDaysAvailable;
    
    plan.push(`🎯 ${direction.toUpperCase()} travel across ${absDiff} time zones`);
    plan.push(`📅 Start adjusting ${actualDaysAvailable} days before departure`);
    plan.push(`⏰ Shift ${shiftPerDay.toFixed(1)} hours per day (${direction === "east" ? "earlier" : "later"})`);
    
    const sleepMins = parseTimeToMinutes(currentSleep.sleepTime);
    const wakeMins = parseTimeToMinutes(currentSleep.wakeTime);
    const shiftDirection = direction === "east" ? -1 : 1;
    
    for (let day = 1; day <= actualDaysAvailable; day++) {
      const adjustedSleepMins = sleepMins + (shiftDirection * shiftPerDay * 60 * day);
      const adjustedWakeMins = wakeMins + (shiftDirection * shiftPerDay * 60 * day);
      
      plan.push(
        `Day ${day}: Sleep ${minutesToTime(adjustedSleepMins)} → Wake ${minutesToTime(adjustedWakeMins)}`
      );
    }
    
    // Add specific advice based on severity
    if (absDiff > 6) {
      plan.push("💊 Consider consulting doctor about melatonin (0.5-3mg, 30min before new bedtime)");
      plan.push("🚫 Avoid alcohol and caffeine 6+ hours before sleep during adjustment");
    }
    
    if (direction === "east" && absDiff > 4) {
      plan.push("🌅 CRITICAL: Get bright light immediately upon waking at destination");
      plan.push("😴 Use blackout curtains/eye mask - darkness is crucial for eastward travel");
    }
    
    return plan;
  }

  // Extract timezone offsets first
  const departureOffset = extractTimezoneOffset(departure.datetime);
  const arrivalOffset = extractTimezoneOffset(arrival.datetime);
  
  const departureDate = new Date(departure.datetime);
  const arrivalDate = new Date(arrival.datetime);
  
  // Calculate actual flight duration accounting for timezone differences
  const flightDuration = (arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60);
  
  // Calculate timezone difference in hours (positive = eastward, negative = westward)
  const timezoneDiff = arrivalOffset - departureOffset;
  const hoursShifted = timezoneDiff;
  const direction = timezoneDiff === 0 ? "none" : timezoneDiff > 0 ? "east" : "west";
  
  // Validate flight duration with smarter logic
  const flightValidation = validateFlightDuration(flightDuration, Math.abs(timezoneDiff));
  
  // Calculate sleep duration for validation
  const sleepMins = parseTimeToMinutes(sleep.sleepTime);
  const wakeMins = parseTimeToMinutes(sleep.wakeTime);
  let sleepDuration = wakeMins - sleepMins;
  if (sleepDuration <= 0) sleepDuration += 1440;
  const sleepHours = sleepDuration / 60;
  
  const funnySuggestions: string[] = [];
  
  // Handle impossible/suspicious flights
  if (!flightValidation.isValid) {
    if (flightValidation.reason === 'negative_duration') {
      funnySuggestions.push(
        "🤨 Hold up! Did you just invent time travel? Your arrival is BEFORE your departure!",
        "⏰ Unless you've mastered the art of time manipulation, this flight is physically impossible.",
        "🚀 Are you flying backwards in time? That's some next-level transportation!",
        "📅 Pro tip: Check your dates again - even the fastest jets can't go back in time!",
        "🎭 This isn't Back to the Future, Doc! Please check your departure and arrival times."
      );
    } else if (flightValidation.reason === 'too_long') {
      funnySuggestions.push(
        "🛳️ Are you sure this isn't a cruise ship? That's longer than any commercial flight!",
        "🗺️ Even with multiple connections, this seems suspiciously long...",
        "🤔 Double-check your dates - you might have selected the wrong arrival day!",
        "✈️ The longest flight in the world is only ~19 hours. This is... ambitious!"
      );
    } else if (flightValidation.reason === 'unrealistic_route') {
      funnySuggestions.push(
        "🤨 This flight duration seems unrealistic for the timezone difference...",
        "🛩️ Are you taking a scenic route via Mars? Check your flight details!",
        "📍 Double-check if you have layovers or if this includes ground transportation time."
      );
    }
    
    return {
      hoursShifted: 0,
      direction: "none",
      plan: [],
      flightDuration,
      flightSleepPlan: [],
      isFlightTooLong: true,
      funnySuggestions,
      isImpossibleFlight: true,
      jetLagSeverity: "none",
      recoveryDays: 0,
      lightExposureAdvice: []
    };
  }
  
  // Check for excessive sleep (moved after impossible flight check)
  if (sleepHours > 12) {
    funnySuggestions.push(
      "😴 Whoa there, Sleeping Beauty! " + sleepHours.toFixed(1) + " hours of sleep? Are you part bear preparing for hibernation?",
      "🛏️ That's not a sleep schedule, that's a lifestyle choice! Maybe consider becoming a professional sleeper?",
      "⏰ Fun fact: You'd be awake for only " + (24 - sleepHours).toFixed(1) + " hours a day. That's barely enough time to eat!",
      "🐨 Even koalas are jealous of your sleep game (they only sleep 18-22 hours... wait, never mind).",
      "💤 Pro tip: With that much sleep, jet lag might actually improve your schedule!"
    );
  }
  
  // Add flight duration humor for long but valid flights
  if (flightValidation.category === 'long') {
    if (flightDuration > 15) {
      funnySuggestions.push(
        "✈️ Ultra long-haul flight! You're basically moving your home address temporarily.",
        "🎬 Perfect time to binge-watch an entire TV series... or two!",
        "🧘‍♀️ You'll have enough time to achieve enlightenment through meditation.",
        "📚 Bring a library - you'll have time to become an expert in any subject!"
      );
    } else if (flightDuration > 12) {
      funnySuggestions.push(
        "✈️ Long haul champion! You're basically a professional passenger now.",
        "📱 Time to finally organize ALL your photos... from 2015 onwards.",
        "🎵 Create the ultimate flight playlist - you'll need about 50 songs!"
      );
    }
  }
  
  // Calculate jet lag severity and recovery time
  const { severity, recoveryDays } = calculateJetLagSeverity(timezoneDiff);
  
  // Generate light exposure advice
  const lightExposureAdvice = generateLightExposureAdvice(direction, timezoneDiff);
  
  // Create sophisticated sleep plan
  const plan = createAdvancedSleepPlan(direction, timezoneDiff, sleep);
  
  // Create flight sleep plan with smarter recommendations
  const flightSleepPlan: string[] = [];
  
  if (flightDuration > 4) {
    flightSleepPlan.push(`✈️ Flight duration: ${flightDuration.toFixed(1)} hours`);
    
    // Determine optimal sleep strategy based on departure/arrival times and timezone shift
    const departureLocalHour = departureDate.getHours();
    const arrivalLocalHour = arrivalDate.getHours();
    
    if (direction === "east" && Math.abs(timezoneDiff) > 3) {
      flightSleepPlan.push("🌅 EASTWARD strategy: Sleep early in flight to align with destination");
      if (flightDuration > 8) {
        flightSleepPlan.push("💤 Sleep in first 1/3 of flight, stay awake 3-4 hours before landing");
        flightSleepPlan.push("☀️ This helps you wake up ready for destination morning");
      }
      flightSleepPlan.push("🚫 Avoid screens 1 hour before your planned sleep time");
    } else if (direction === "west" && Math.abs(timezoneDiff) > 3) {
      flightSleepPlan.push("🌆 WESTWARD strategy: Stay awake longer, sleep in second half");
      if (flightDuration > 8) {
        flightSleepPlan.push("⏰ Stay awake first 4-6 hours, then sleep before arrival");
        flightSleepPlan.push("🌙 This helps extend your day to match destination timezone");
      }
    } else if (Math.abs(timezoneDiff) <= 3) {
      flightSleepPlan.push("😴 Mild timezone change: Sleep according to your normal schedule");
      flightSleepPlan.push("💡 Focus on staying comfortable rather than timezone adjustment");
    } else {
      flightSleepPlan.push("🕐 No timezone change: Maintain your regular sleep pattern");
    }
    
    // Add enhanced flight comfort tips
    flightSleepPlan.push("🛏️ Essential sleep kit: Eye mask, earplugs, neck pillow, blanket");
    flightSleepPlan.push("🚫 Avoid alcohol (dehydrates) and limit caffeine to early flight hours");
    flightSleepPlan.push("💧 Hydrate regularly but not too much before planned sleep");
    
    if (flightDuration > 10) {
      flightSleepPlan.push("🚶‍♂️ Walk every 2 hours when awake to prevent blood clots");
      flightSleepPlan.push("🦵 Do ankle circles and calf stretches during flight");
    }
  } else {
    flightSleepPlan.push("✈️ Short flight: Stay awake, hydrate, and prepare for destination timezone");
  }

  return {
    hoursShifted,
    direction,
    plan,
    flightDuration,
    flightSleepPlan,
    isFlightTooLong: flightValidation.category === 'long',
    funnySuggestions,
    isImpossibleFlight: false,
    jetLagSeverity: severity,
    recoveryDays,
    lightExposureAdvice,
  };
}
