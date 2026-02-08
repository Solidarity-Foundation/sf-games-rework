# SF Games 2026

An interactive educational gaming platform by **Solidarity Foundation** featuring multiple awareness and skill-building games for workplace safety, inclusion, and financial literacy.

## About This Project

SF Games provides engaging, interactive educational experiences designed to promote awareness and build critical workplace skills. Currently featuring a comprehensive **PoSH (Prevention of Sexual Harassment)** awareness game, with upcoming modules for:

- **Inclusion & Diversity**
- **Financial Literacy**
- **Workplace Etiquette**

Each game includes its own gameplay mechanics, scoring system, and visual design. All player progress and analytics are tracked in SQLite for performance insights.

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

# Start the development server
pnpm dev
# or
npm run dev
```

The app will be available at **http://localhost:8080**

## How to Play

### Home Screen
When you launch the app, you'll see a grid of game cards:
- Click any game card to start playing
- Click **Analytics Dashboard** to view game statistics

### PoSH (Prevention of Sexual Harassment) Game

**Game Structure:**
1. **Landing Page** — Introduction with game rules and objectives
2. **Page 1** — First set of awareness questions with game statistics
3. **Page 2** — Additional questions and scoring

**Gameplay:**
- Read each question and scenario carefully
- Answer based on your understanding of harassment prevention
- Your score updates with each response
- Navigate between pages to progress through the game

**Scoring:**
- Start with **10 points**
- Correct answer: **+1 point**
- Wrong answer: **-1 point**

**Navigation:**
- Use the **home button** (top-left) to return to the game selection screen
- Use **Previous/Next buttons** to navigate between game pages

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
- **Database:** SQLite (via sql.js for browser)
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

All game sessions are tracked locally using SQLite (sql.js). Future versions will include:
- Player score history
- Completion rates per game
- Time-based analytics
- Performance insights

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

- [ ] Complete Inclusion & Diversity game
- [ ] Complete Financial Literacy game
- [ ] Complete Workplace Etiquette game
- [ ] Backend analytics dashboard
- [ ] User authentication and profiles
- [ ] Leaderboards and achievements
- [ ] Mobile app version

## License

This project is created by **Solidarity Foundation**.

## Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the Solidarity Foundation team.

---

**Get Started:** Run `pnpm dev` and visit http://localhost:8080 to launch the games!
