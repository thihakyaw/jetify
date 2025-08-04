# ✈️ Jetify - Smart Travel Calculator

A sophisticated jet lag calculator that provides research-based recommendations to help travelers minimize jet lag effects and optimize their sleep schedules.

## ✨ Features

- **Smart Validation**: Detects impossible flights and provides humorous feedback
- **Research-Based Algorithm**: Uses circadian rhythm science for accurate recommendations
- **Jet Lag Severity Assessment**: Categorizes jet lag from none to severe with recovery time estimates
- **Personalized Sleep Plans**: Creates gradual adjustment schedules based on travel direction
- **Light Exposure Therapy**: Provides specific advice for optimal light exposure timing
- **Flight Strategy**: Tailored sleep recommendations during your flight
- **Calendar Export**: Generate .ics files for Google Calendar/Outlook integration
- **Comprehensive Timezone Support**: 80+ timezones worldwide
- **Funny Suggestions**: Entertaining messages for unusual sleep schedules and impossible flights

## 🧠 Smart Algorithm

The calculator includes:
- **Flight Duration Validation**: Detects unrealistic flight times and provides helpful feedback
- **Circadian Rhythm Analysis**: Considers eastward vs westward travel difficulty
- **Recovery Time Estimation**: Calculates realistic recovery periods based on timezone shifts
- **Light Therapy Recommendations**: Direction-specific advice for optimal light exposure
- **Gradual Sleep Adjustment**: Research-backed pre-travel preparation plans (max 1-1.5 hours/day)

## 🚀 Running the Project Locally

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thihakyaw/jetify.git
   cd jetify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Create React App
- **Calendar Integration**: ICS file generation

## 📚 How It Works

1. **Input Your Details**: Enter departure and arrival times with timezones, plus your normal sleep schedule
2. **Smart Analysis**: The algorithm validates your flight and calculates timezone differences
3. **Personalized Plan**: Receive a customized sleep adjustment plan starting days before travel
4. **Flight Strategy**: Get specific recommendations for sleeping during your flight
5. **Recovery Guidance**: Understand your jet lag severity and expected recovery time
6. **Light Therapy**: Follow direction-specific light exposure advice
7. **Calendar Export**: Export your plan to your preferred calendar app

## 🎯 Use Cases

- **Business Travelers**: Optimize productivity by minimizing jet lag impact
- **Vacation Planning**: Start your trip feeling refreshed and ready
- **Long-Haul Flights**: Strategic planning for 12+ hour journeys
- **Frequent Flyers**: Develop consistent routines for regular travel
- **Time Zone Warriors**: Master the art of rapid adaptation

## 🧪 Validation Features

The app intelligently detects and provides humorous feedback for:
- **Impossible flights** (negative duration, unrealistic routes)
- **Suspicious timing** (extremely long flights for short distances)
- **Excessive sleep schedules** (12+ hours of sleep)
- **Ultra long-haul flights** (15+ hours with entertainment suggestions)

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.tsx           # App entry point
│   ├── index.css           # Global styles
│   ├── jetlagCalculator.ts # Core calculation engine
│   └── JetLagCalculator.tsx # Main React component
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **AI Development**: Powered by Claude Sonnet 3.5, showcasing advanced AI-assisted development
- **Project Orchestration**: [thihakyaw](https://github.com/thihakyaw)
- **Research Foundation**: Based on circadian rhythm and jet lag research from travel medicine studies

## 📬 Contact

**Thiha Kyaw** - [GitHub Profile](https://github.com/thihakyaw)

Project Link: [https://github.com/thihakyawjetify](https://github.com/thihakyaw/jetify)

---

*Happy travels! ✈️ May your journeys be jet lag-free and your sleep schedules optimized.*
