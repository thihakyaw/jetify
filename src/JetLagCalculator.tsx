import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Clock, Moon, Sun, Calendar, ArrowRight, MapPin, Download, CalendarDays } from 'lucide-react';
import { 
  calculateJetLag, 
  TIMEZONES, 
  generateCalendarEvents, 
  downloadCalendarFile,
  type Timezone, 
  type SleepSchedule, 
  type JetLagResult 
} from './jetlagCalculator';

const JetLagCalculator: React.FC = () => {
  const [departureTimezone, setDepartureTimezone] = useState<string>('+00:00');
  const [arrivalTimezone, setArrivalTimezone] = useState<string>('+09:00');
  const [departureDate, setDepartureDate] = useState<string>('2025-08-10');
  const [departureTime, setDepartureTime] = useState<string>('14:00');
  const [arrivalDate, setArrivalDate] = useState<string>('2025-08-11');
  const [arrivalTime, setArrivalTime] = useState<string>('09:00');
  const [sleepTime, setSleepTime] = useState<string>('23:00');
  const [wakeTime, setWakeTime] = useState<string>('07:00');
  const [result, setResult] = useState<JetLagResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const findTimezone = (offset: string): Timezone => {
    return TIMEZONES.find(tz => tz.value === offset) || TIMEZONES[12]; // Default to UTC
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const departureDateTime = `${departureDate}T${departureTime}:00${departureTimezone}`;
    const arrivalDateTime = `${arrivalDate}T${arrivalTime}:00${arrivalTimezone}`;
    
    const sleepSchedule: SleepSchedule = {
      sleepTime,
      wakeTime
    };
    
    const jetLagResult = calculateJetLag(
      { datetime: departureDateTime },
      { datetime: arrivalDateTime },
      sleepSchedule
    );
    
    setResult(jetLagResult);
    setIsCalculating(false);
  };

  const handleExportCalendar = () => {
    if (!result) return;
    
    const sleepSchedule: SleepSchedule = { sleepTime, wakeTime };
    const icsContent = generateCalendarEvents(result, departureDate, sleepSchedule);
    const filename = `jetlag-plan-${departureDate}.ics`;
    downloadCalendarFile(icsContent, filename);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="absolute inset-0 bg-stars opacity-30"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Plane className="text-white text-5xl mr-4" />
              <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Jetify
              </h1>
            </div>
            <p className="text-xl text-gray-300">
              Master your sleep schedule and conquer jet lag with smart preparation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="mr-3" />
                Trip Details
              </h2>

              <div className="space-y-6">
                {/* Departure Section */}
                <div className="space-y-4">
                  <label className="block text-white font-semibold flex items-center">
                    <MapPin className="mr-2 text-green-400" />
                    Departure Location
                  </label>
                  <select
                    value={departureTimezone}
                    onChange={(e) => setDepartureTimezone(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value} className="bg-slate-800 text-white">
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arrival Section */}
                <div className="space-y-4">
                  <label className="block text-white font-semibold flex items-center">
                    <MapPin className="mr-2 text-red-400" />
                    Destination
                  </label>
                  <select
                    value={arrivalTimezone}
                    onChange={(e) => setArrivalTimezone(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value} className="bg-slate-800 text-white">
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travel Date & Time */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold flex items-center">
                    <Calendar className="mr-2 text-blue-400" />
                    Flight Schedule
                  </h3>
                  
                  {/* Departure */}
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Departure</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                      <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  {/* Arrival */}
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Arrival (timezone of the destination)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                      <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Sleep Schedule */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold flex items-center">
                    <Moon className="mr-2 text-purple-400" />
                    Your Sleep Schedule
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Bedtime</label>
                      <input
                        type="time"
                        value={sleepTime}
                        onChange={(e) => setSleepTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Wake Time</label>
                      <input
                        type="time"
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700/50 text-white border border-slate-600/50 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isCalculating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Clock className="mr-2" />
                  )}
                  {isCalculating ? 'Calculating...' : 'Calculate Jet Lag Plan'}
                </motion.button>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Travel Summary */}
              {!result?.isImpossibleFlight && (
                <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <ArrowRight className="mr-2 text-cyan-400" />
                    Travel Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">From:</span>
                      <span className="text-white font-semibold">{findTimezone(departureTimezone).city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">To:</span>
                      <span className="text-white font-semibold">{findTimezone(arrivalTimezone).city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Time Difference:</span>
                      <span className="text-white font-semibold">
                        {Math.abs(parseFloat(arrivalTimezone) - parseFloat(departureTimezone))} hours
                      </span>
                    </div>
                    {result && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Flight Duration:</span>
                        <span className="text-white font-semibold">
                          {result.flightDuration.toFixed(1)} hours
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Results */}
              <AnimatePresence>
                {result && !result.isImpossibleFlight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Sun className="mr-2 text-yellow-400" />
                      Your Jet Lag Plan
                    </h3>
                    
                    <div className="space-y-4">
                      {result.plan.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg ${
                            index === 0 
                              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30' 
                              : 'bg-slate-700/30 border border-slate-600/30'
                          }`}
                        >
                          <p className="text-white">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Funny Suggestions for Long Flights or Excessive Sleep */}
                    {result.funnySuggestions && result.funnySuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 p-4 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-400/30 rounded-lg"
                      >
                        <h4 className="text-pink-400 font-semibold mb-3 flex items-center">
                          {result.isFlightTooLong ? '🎭 Epic Flight Duration Detected!' : '😴 Interesting Sleep Schedule Detected!'}
                        </h4>
                        <div className="space-y-2">
                          {result.funnySuggestions.map((suggestion, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              className="text-gray-200 text-sm"
                            >
                              {suggestion}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Regular Pro Tips */}
                    {result.direction !== 'none' && (!result.funnySuggestions || result.funnySuggestions.length === 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg"
                      >
                        <h4 className="text-yellow-400 font-semibold mb-2">💡 Pro Tips:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Stay hydrated during your flight</li>
                          <li>• Avoid caffeine 6 hours before your new bedtime</li>
                          <li>• Get sunlight exposure at your destination</li>
                          <li>• Consider melatonin supplements (consult your doctor)</li>
                        </ul>
                      </motion.div>
                    )}
                    
                    {/* Calendar Export Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleExportCalendar}
                        className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                      >
                        <CalendarDays className="mr-2 w-5 h-5" />
                        Export to Calendar
                        <Download className="ml-2 w-4 h-4" />
                      </motion.button>
                      <p className="text-gray-400 text-xs mt-2 text-center">
                        Downloads .ics file compatible with Google Calendar, Outlook, Apple Calendar
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Impossible Flight - Show Only Funny Messages */}
              <AnimatePresence>
                {result && result.isImpossibleFlight && result.funnySuggestions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      🤯 Houston, We Have a Problem!
                    </h3>
                    
                    <div className="space-y-3">
                      {result.funnySuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30"
                        >
                          <p className="text-white">{suggestion}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Flight Sleep Plan */}
              <AnimatePresence>
                {result && !result.isImpossibleFlight && result.flightSleepPlan.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Plane className="mr-2 text-blue-400" />
                      Flight Sleep Strategy
                    </h3>
                    
                    <div className="space-y-4">
                      {result.flightSleepPlan.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className={`p-4 rounded-lg ${
                            step.includes('💡') 
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30' 
                              : 'bg-slate-700/30 border border-slate-600/30'
                          }`}
                        >
                          <p className="text-white">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JetLagCalculator;
