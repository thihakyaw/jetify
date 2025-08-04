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

export interface Timezone {
  label: string;
  value: string;
  offset: string;
  city: string;
}

export const TIMEZONES: Timezone[] = [
  // UTC-12 to UTC-8
  { label: "UTC-12:00 - Baker Island", value: "-12:00", offset: "-12:00", city: "Baker Island" },
  { label: "UTC-11:00 - American Samoa", value: "-11:00", offset: "-11:00", city: "Pago Pago" },
  { label: "UTC-10:00 - Hawaii (HST)", value: "-10:00", offset: "-10:00", city: "Honolulu" },
  { label: "UTC-09:30 - Marquesas Islands", value: "-09:30", offset: "-09:30", city: "Marquesas" },
  { label: "UTC-09:00 - Alaska (AKST)", value: "-09:00", offset: "-09:00", city: "Anchorage" },
  { label: "UTC-08:00 - Pacific (PST)", value: "-08:00", offset: "-08:00", city: "Los Angeles" },
  { label: "UTC-08:00 - Vancouver", value: "-08:00", offset: "-08:00", city: "Vancouver" },
  
  // UTC-7 to UTC-4
  { label: "UTC-07:00 - Mountain (MST)", value: "-07:00", offset: "-07:00", city: "Denver" },
  { label: "UTC-07:00 - Phoenix", value: "-07:00", offset: "-07:00", city: "Phoenix" },
  { label: "UTC-06:00 - Central (CST)", value: "-06:00", offset: "-06:00", city: "Chicago" },
  { label: "UTC-06:00 - Mexico City", value: "-06:00", offset: "-06:00", city: "Mexico City" },
  { label: "UTC-05:00 - Eastern (EST)", value: "-05:00", offset: "-05:00", city: "New York" },
  { label: "UTC-05:00 - Toronto", value: "-05:00", offset: "-05:00", city: "Toronto" },
  { label: "UTC-05:00 - Lima", value: "-05:00", offset: "-05:00", city: "Lima" },
  { label: "UTC-04:00 - Atlantic", value: "-04:00", offset: "-04:00", city: "Halifax" },
  { label: "UTC-04:00 - Santiago", value: "-04:00", offset: "-04:00", city: "Santiago" },
  
  // UTC-3 to UTC-1
  { label: "UTC-03:30 - Newfoundland", value: "-03:30", offset: "-03:30", city: "St. John's" },
  { label: "UTC-03:00 - Brazil (BRT)", value: "-03:00", offset: "-03:00", city: "São Paulo" },
  { label: "UTC-03:00 - Argentina", value: "-03:00", offset: "-03:00", city: "Buenos Aires" },
  { label: "UTC-02:00 - South Georgia", value: "-02:00", offset: "-02:00", city: "South Georgia" },
  { label: "UTC-01:00 - Azores", value: "-01:00", offset: "-01:00", city: "Azores" },
  { label: "UTC-01:00 - Cape Verde", value: "-01:00", offset: "-01:00", city: "Praia" },
  
  // UTC+0 to UTC+3
  { label: "UTC+00:00 - London (GMT)", value: "+00:00", offset: "+00:00", city: "London" },
  { label: "UTC+00:00 - Dublin", value: "+00:00", offset: "+00:00", city: "Dublin" },
  { label: "UTC+00:00 - Reykjavik", value: "+00:00", offset: "+00:00", city: "Reykjavik" },
  { label: "UTC+01:00 - Paris (CET)", value: "+01:00", offset: "+01:00", city: "Paris" },
  { label: "UTC+01:00 - Berlin", value: "+01:00", offset: "+01:00", city: "Berlin" },
  { label: "UTC+01:00 - Rome", value: "+01:00", offset: "+01:00", city: "Rome" },
  { label: "UTC+01:00 - Madrid", value: "+01:00", offset: "+01:00", city: "Madrid" },
  { label: "UTC+01:00 - Lagos", value: "+01:00", offset: "+01:00", city: "Lagos" },
  { label: "UTC+02:00 - Cairo (EET)", value: "+02:00", offset: "+02:00", city: "Cairo" },
  { label: "UTC+02:00 - Athens", value: "+02:00", offset: "+02:00", city: "Athens" },
  { label: "UTC+02:00 - Helsinki", value: "+02:00", offset: "+02:00", city: "Helsinki" },
  { label: "UTC+02:00 - Johannesburg", value: "+02:00", offset: "+02:00", city: "Johannesburg" },
  { label: "UTC+03:00 - Moscow (MSK)", value: "+03:00", offset: "+03:00", city: "Moscow" },
  { label: "UTC+03:00 - Istanbul", value: "+03:00", offset: "+03:00", city: "Istanbul" },
  { label: "UTC+03:00 - Nairobi", value: "+03:00", offset: "+03:00", city: "Nairobi" },
  
  // UTC+3:30 to UTC+6
  { label: "UTC+03:30 - Tehran", value: "+03:30", offset: "+03:30", city: "Tehran" },
  { label: "UTC+04:00 - Dubai (GST)", value: "+04:00", offset: "+04:00", city: "Dubai" },
  { label: "UTC+04:00 - Baku", value: "+04:00", offset: "+04:00", city: "Baku" },
  { label: "UTC+04:30 - Kabul", value: "+04:30", offset: "+04:30", city: "Kabul" },
  { label: "UTC+05:00 - Karachi (PKT)", value: "+05:00", offset: "+05:00", city: "Karachi" },
  { label: "UTC+05:00 - Tashkent", value: "+05:00", offset: "+05:00", city: "Tashkent" },
  { label: "UTC+05:30 - Mumbai (IST)", value: "+05:30", offset: "+05:30", city: "Mumbai" },
  { label: "UTC+05:30 - Delhi", value: "+05:30", offset: "+05:30", city: "Delhi" },
  { label: "UTC+05:30 - Colombo", value: "+05:30", offset: "+05:30", city: "Colombo" },
  { label: "UTC+05:45 - Kathmandu", value: "+05:45", offset: "+05:45", city: "Kathmandu" },
  { label: "UTC+06:00 - Dhaka (BST)", value: "+06:00", offset: "+06:00", city: "Dhaka" },
  { label: "UTC+06:00 - Almaty", value: "+06:00", offset: "+06:00", city: "Almaty" },
  
  // UTC+6:30 to UTC+9
  { label: "UTC+06:30 - Yangon", value: "+06:30", offset: "+06:30", city: "Yangon" },
  { label: "UTC+07:00 - Bangkok (ICT)", value: "+07:00", offset: "+07:00", city: "Bangkok" },
  { label: "UTC+07:00 - Jakarta", value: "+07:00", offset: "+07:00", city: "Jakarta" },
  { label: "UTC+07:00 - Ho Chi Minh City", value: "+07:00", offset: "+07:00", city: "Ho Chi Minh" },
  { label: "UTC+08:00 - Beijing (CST)", value: "+08:00", offset: "+08:00", city: "Beijing" },
  { label: "UTC+08:00 - Singapore", value: "+08:00", offset: "+08:00", city: "Singapore" },
  { label: "UTC+08:00 - Hong Kong", value: "+08:00", offset: "+08:00", city: "Hong Kong" },
  { label: "UTC+08:00 - Manila", value: "+08:00", offset: "+08:00", city: "Manila" },
  { label: "UTC+08:00 - Perth", value: "+08:00", offset: "+08:00", city: "Perth" },
  { label: "UTC+08:45 - Eucla", value: "+08:45", offset: "+08:45", city: "Eucla" },
  { label: "UTC+09:00 - Tokyo (JST)", value: "+09:00", offset: "+09:00", city: "Tokyo" },
  { label: "UTC+09:00 - Seoul", value: "+09:00", offset: "+09:00", city: "Seoul" },
  
  // UTC+9:30 to UTC+12
  { label: "UTC+09:30 - Adelaide", value: "+09:30", offset: "+09:30", city: "Adelaide" },
  { label: "UTC+09:30 - Darwin", value: "+09:30", offset: "+09:30", city: "Darwin" },
  { label: "UTC+10:00 - Sydney (AEST)", value: "+10:00", offset: "+10:00", city: "Sydney" },
  { label: "UTC+10:00 - Melbourne", value: "+10:00", offset: "+10:00", city: "Melbourne" },
  { label: "UTC+10:00 - Brisbane", value: "+10:00", offset: "+10:00", city: "Brisbane" },
  { label: "UTC+10:30 - Lord Howe Island", value: "+10:30", offset: "+10:30", city: "Lord Howe" },
  { label: "UTC+11:00 - Solomon Islands", value: "+11:00", offset: "+11:00", city: "Honiara" },
  { label: "UTC+11:00 - Nouméa", value: "+11:00", offset: "+11:00", city: "Nouméa" },
  { label: "UTC+12:00 - Auckland (NZST)", value: "+12:00", offset: "+12:00", city: "Auckland" },
  { label: "UTC+12:00 - Fiji", value: "+12:00", offset: "+12:00", city: "Suva" },
  { label: "UTC+12:45 - Chatham Islands", value: "+12:45", offset: "+12:45", city: "Chatham" },
  { label: "UTC+13:00 - Samoa", value: "+13:00", offset: "+13:00", city: "Apia" },
  { label: "UTC+14:00 - Line Islands", value: "+14:00", offset: "+14:00", city: "Kiritimati" }
];

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

// Calendar export functionality
export function generateCalendarEvents(
  result: JetLagResult,
  departureDate: string,
  sleepSchedule: SleepSchedule
): string {
  const events: string[] = [];
  
  // Helper function to format date for ICS
  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  // Helper function to create ICS event
  const createEvent = (
    summary: string,
    description: string,
    startDate: Date,
    endDate: Date,
    uid: string
  ): string => {
    return [
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `UID:${uid}@jetlag-calculator.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      'END:VEVENT'
    ].join('\r\n');
  };

  const baseDate = new Date(departureDate);
  
  // Add pre-travel sleep adjustment events
  if (result.direction !== 'none') {
    for (let i = 1; i <= 2; i++) {
      const adjustmentDate = new Date(baseDate);
      adjustmentDate.setDate(adjustmentDate.getDate() - (3 - i)); // 2 days before, then 1 day before
      
      const sleepShift = result.direction === "east" ? -1 : 1;
      const sleepMins = parseTimeToMinutes(sleepSchedule.sleepTime) + sleepShift * 60 * i;
      const wakeMins = parseTimeToMinutes(sleepSchedule.wakeTime) + sleepShift * 60 * i;
      
      const adjustedSleepTime = minutesToTime(sleepMins);
      const adjustedWakeTime = minutesToTime(wakeMins);
      
      // Sleep time event
      const sleepDateTime = new Date(adjustmentDate);
      const [sleepHour, sleepMin] = adjustedSleepTime.split(':').map(Number);
      sleepDateTime.setHours(sleepHour, sleepMin, 0, 0);
      
      const sleepEndTime = new Date(sleepDateTime);
      sleepEndTime.setMinutes(sleepEndTime.getMinutes() + 15); // 15-minute reminder
      
      events.push(createEvent(
        `💤 Jet Lag Prep - Day ${i} Bedtime`,
        `Go to sleep at ${adjustedSleepTime} to prepare for your trip. This is ${Math.abs(sleepShift * i)} hour${Math.abs(sleepShift * i) !== 1 ? 's' : ''} ${sleepShift > 0 ? 'later' : 'earlier'} than usual.`,
        sleepDateTime,
        sleepEndTime,
        `jetlag-sleep-day${i}-${Date.now()}`
      ));
      
      // Wake time event
      const wakeDate = new Date(adjustmentDate);
      wakeDate.setDate(wakeDate.getDate() + 1); // Next day
      const [wakeHour, wakeMin] = adjustedWakeTime.split(':').map(Number);
      wakeDate.setHours(wakeHour, wakeMin, 0, 0);
      
      const wakeEndTime = new Date(wakeDate);
      wakeEndTime.setMinutes(wakeEndTime.getMinutes() + 15);
      
      events.push(createEvent(
        `☀️ Jet Lag Prep - Day ${i} Wake Up`,
        `Wake up at ${adjustedWakeTime} to prepare for your trip. Get bright light exposure immediately after waking.`,
        wakeDate,
        wakeEndTime,
        `jetlag-wake-day${i}-${Date.now()}`
      ));
    }
  }
  
  // Add travel day reminder
  const travelDate = new Date(baseDate);
  travelDate.setHours(8, 0, 0, 0); // 8 AM reminder
  const travelEndTime = new Date(travelDate);
  travelEndTime.setMinutes(travelEndTime.getMinutes() + 30);
  
  const flightPlanText = result.flightSleepPlan.join('\\n• ');
  
  events.push(createEvent(
    '✈️ Travel Day - Jet Lag Strategy',
    `Today is your travel day! Follow your flight sleep strategy:\\n• ${flightPlanText}`,
    travelDate,
    travelEndTime,
    `jetlag-travel-day-${Date.now()}`
  ));

  // Create full ICS file
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jet Lag Calculator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadCalendarFile(icsContent: string, filename: string = 'jetlag-plan.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
