# SF Games 2026

An interactive educational gaming platform by **Solidarity Foundation** featuring multiple awareness and skill-building games for workplace safety, inclusion, and financial literacy.

## About This Project

SF Games provides engaging, interactive educational experiences designed to promote awareness and build critical workplace skills. Currently featuring a comprehensive **PoSH (Prevention of Sexual Harassment)** awareness game, with upcoming modules for:

- **Inclusion & Diversity**
- **Financial Literacy**
- **Workplace Etiquette**

Each game includes its own gameplay mechanics, scoring system, and visual design. All player progress and analytics are tracked in **Appwrite cloud database**, enabling cross-device sync and persistent storage for workshop facilitators.

## Quick Start

### Prerequisites

- **Node.js** 16+ and **npm** or **pnpm**
- Git (for cloning the repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/Solidarity-Foundation/sf-games-rework.git
cd sf-games-rework

# Install dependencies
pnpm install
# or
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Appwrite credentials

# Start the development server
pnpm dev
# or
npm run dev
```

The app will be available at **http://localhost:8080**

### Environment Setup

Create a `.env` file in the root directory with your Appwrite credentials:

```env
VITE_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_DATABASE_ID=your-database-id
VITE_GAME_SESSIONS_COLLECTION_ID=game_sessions
VITE_GAME_ANSWERS_COLLECTION_ID=game_answers
```

See `.env.example` for reference.

## How to Play

### Home Screen
When you launch the app, you'll see a grid of game cards:
- Click any game card to start playing
- Click **Analytics Dashboard** to view game statistics

### PoSH (Prevention of Sexual Harassment) Game

**Game Structure:**
1. **Landing Page** — Introduction with game rules and objectives
2. **Page 1** — Questions 1-3 with live score tracking
3. **Page 2** — Questions 4-7 with live score tracking
4. **Page 3** — Questions 8-10 with live score tracking
5. **Results Page** — Final score, achievement level, and question review

**Features:**
- **Bilingual:** Switch between English and Kannada (ಕನ್ನಡ)
- **Achievement Levels:** Champion, Leader, Learner, Beginner based on final score
- **Newspaper Theme:** Classic newspaper layout with serif fonts
- **Progress Tracking:** Must answer all questions on a page to advance
- **Cloud Sync:** Results automatically saved to Appwrite

**Gameplay:**
- Read each scenario and question carefully
- Select your answer (only one choice per question)
- Immediate feedback shows points earned/lost
- Track your current score, questions attempted, and remaining questions
- Must complete all questions on current page before advancing

**Scoring:**
- Start with **10 points**
- Answer choices award different points (+2, +1, -1, -2)
- Final score determines your achievement level

**Navigation:**
- **Home button** (top-left) returns to game selection
- **Previous button** navigates back through pages
- **Next button** advances (enabled only after answering all questions)
- **See Results button** (Page 3) saves to database and shows results
- **Play Again** (Results page) resets and starts over

### Coming Soon Games
- **Inclusion & Diversity** — Build awareness of diversity and inclusion in the workplace
- **Financial Literacy** — Learn essential financial skills and money management
- **Workplace Etiquette** — Master professional workplace behaviors and communication

## Available Commands

```bash
pnpm dev          # Start development server (auto-reload)
pnpm build        # Create production build
pnpm lint         # Run ESLint
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm preview      # Preview production build locally
```

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **UI Components:** shadcn/ui (Radix UI-based)
- **Routing:** React Router 6
- **State Management:** TanStack React Query
- **Backend:** Appwrite (cloud database, Singapore region)
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library

## Project Structure

```
src/
├── pages/              # Page components for each game & section
├── components/         # Reusable UI components
│   ├── posh/          # PoSH game components
│   └── ui/            # shadcn/ui components
├── assets/            # Images and static files
├── App.tsx            # Main app with routing
└── index.css          # Global styles
```

See **CLAUDE.md** for detailed architecture documentation.

## Game Analytics

The **Analytics Dashboard** provides comprehensive insights powered by Appwrite cloud database:

### Features
- **Overall Statistics**
  - Total attempts across all games
  - Most played game by attempts

- **Per-Game Insights**
  - Expandable accordion cards for each game
  - Level distribution (Champion, Leader, Learner, Beginner counts)
  - Correct answer rate and progress visualization

- **Question-by-Question Breakdown**
  - Compact grid showing Q1-Q10
  - Answer distribution (A, B, C, D counts)
  - Correct answer highlighted with green background
  - Question titles from game data

- **Recent Sessions**
  - Table of last 10 completed sessions
  - Shows game type, score, and completion timestamp

- **Filters**
  - Game selector (All Games or specific game)
  - Time range (Last 24h, 7d, 30d, 6m, 1y)

### Benefits for Facilitators
- ✅ **Cross-device sync** — View analytics from any device
- ✅ **Persistent storage** — Data never lost
- ✅ **Real-time updates** — See latest session data immediately
- ✅ **Anonymous tracking** — Only timestamps recorded, no personal data

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Notes

- **Auto-scroll:** Pages automatically scroll to the top when navigating
- **Sticky headers:** Home button is always visible when scrolling
- **Responsive:** Optimized for desktop and tablet screens
- **Type-safe:** Full TypeScript coverage for better development experience

## Contributing

To add new games or features:
1. Create a new folder in `src/pages/` for the game
2. Create game components in `src/components/`
3. Add routes in `src/App.tsx`
4. Update the home screen with the new game card

See **CLAUDE.md** for detailed architectural guidelines.

## Future Roadmap

- [x] Cloud-synced analytics dashboard (Appwrite) ✅
- [x] PoSH game with 10 questions and achievement levels ✅
- [ ] Complete Inclusion & Diversity game
- [ ] Complete Financial Literacy game
- [ ] Complete Workplace Etiquette game
- [ ] User authentication and profiles
- [ ] Leaderboards and competitive features
- [ ] Mobile app version
- [ ] Export analytics to PDF/Excel

## License

This project is created by **Solidarity Foundation**.

## Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the Solidarity Foundation team.

---

**Get Started:** Run `pnpm dev` and visit http://localhost:8080 to launch the games!
