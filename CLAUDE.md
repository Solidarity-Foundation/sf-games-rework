# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (port 8080)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm preview      # Preview production build
```

## Architecture Overview

A multi-game educational platform from Solidarity Foundation with 4 distinct educational games, each with its own gameplay, scoring system, and visual style. All game analytics are stored in SQLite (`sql.js`). The app has a shared home screen for game selection and a comprehensive analytics dashboard.

### Core Structure

**Home Screen** (`/`)
- 2×2 grid of game cards with distinctive colors and labels
- Each card links to its respective game landing page
- Analytics Dashboard card at the bottom
- Mint green background (`#b8f0d0`)
- Sticky header with home button

**Games**

1. **PoSH (Prevention of Sexual Harassment)** — Newspaper-themed awareness game
   - Landing page: `/posh` → newspaper masthead intro with game rules
   - Gameplay pages: `/posh/page-1`, `/posh/page-2` → multi-page newspaper layout
   - Pink/salmon card color on home screen
   - Features: stop harassment awareness image in sidebar, game statistics tracking

2. **Inclusion & Diversity** — Coming Soon
   - Path: `/inclusion-diversity`
   - Placeholder page with "Coming Soon" message
   - Purple card color on home screen

3. **Financial Literacy** — Coming Soon
   - Path: `/financial-literacy`
   - Placeholder page with "Coming Soon" message
   - Peach/orange card color on home screen

4. **Workplace Etiquette** — Coming Soon
   - Path: `/workplace-etiquette`
   - Placeholder page with "Coming Soon" message
   - Light blue card color on home screen

**Analytics Dashboard** (`/analytics`)
- Comprehensive statistics across all games
- Shows aggregated player performance and game metrics
- Placeholder for future implementation
- Light teal/sage card color on home screen

### Routing Map

```
/                              → Home screen (game selection)
/posh                          → PoSH game landing/intro
/posh/page-1                   → PoSH game page 1
/posh/page-2                   → PoSH game page 2
/analytics                     → Analytics dashboard
/inclusion-diversity           → Inclusion & Diversity (coming soon)
/financial-literacy            → Financial Literacy (coming soon)
/workplace-etiquette           → Workplace Etiquette (coming soon)
*                              → 404 Not Found
```

### Directory Structure

```
src/
├── pages/
│   ├── Home.tsx                           # App home (renders HomeScreen)
│   ├── NotFound.tsx                       # 404 page
│   ├── posh/
│   │   ├── PoshLanding.tsx               # Renders NewspaperFrontPage
│   │   ├── PoshGame.tsx                  # Renders NewspaperGamePage
│   │   └── PoshGame2.tsx                 # Renders NewspaperGamePage2
│   ├── analytics/
│   │   └── Analytics.tsx                 # Renders AnalyticsDashboard
│   ├── inclusiondiversity/
│   │   └── InclusionDiversity.tsx        # Renders ComingSoon
│   ├── financiallit/
│   │   └── FinancialLiteracy.tsx         # Renders ComingSoon
│   └── workplaceetiquette/
│       └── WorkplaceEtiquette.tsx        # Renders ComingSoon
├── components/
│   ├── HomeScreen.tsx                    # Game selection grid (2×2 cards + analytics)
│   ├── AnalyticsDashboard.tsx            # Analytics placeholder
│   ├── ComingSoon.tsx                    # Reusable "coming soon" placeholder
│   ├── ScrollToTop.tsx                   # Auto-scroll to top on route change
│   ├── NavLink.tsx
│   ├── posh/
│   │   ├── NewspaperFrontPage.tsx        # PoSH intro (newspaper style with rules, aim, image)
│   │   ├── NewspaperGamePage.tsx         # PoSH page 1 (3 questions in newspaper layout)
│   │   └── NewspaperGamePage2.tsx        # PoSH page 2 (4 questions in alternating layout)
│   └── ui/                               # shadcn/ui components (40+)
├── hooks/
│   └── use-toast.ts
│   └── use-mobile.tsx
├── lib/
│   └── utils.ts                          # cn() utility for class merging
├── assets/
│   ├── posh-coverimage.jpg              # PoSH front cover image
│   └── stop-sexual-harassment.jpg       # PoSH awareness image (sidebar)
├── test/
│   ├── example.test.ts
│   └── setup.ts
├── App.tsx                               # Main app with routes and providers
├── main.tsx                              # Entry point
├── App.css                               # Global styles
└── index.css                             # Tailwind directives
```

### Component Patterns

**Page files** are thin wrappers that render components:
```tsx
// pages/posh/PoshGame.tsx
import NewspaperGamePage from "@/components/posh/NewspaperGamePage";
const PoshGame = () => <NewspaperGamePage />;
export default PoshGame;
```

**Coming Soon pages** use a reusable `ComingSoon` component:
```tsx
// pages/inclusiondiversity/InclusionDiversity.tsx
import ComingSoon from "@/components/ComingSoon";
const InclusionDiversity = () => (
  <ComingSoon title="Inclusion & Diversity" color="bg-[#e8dcf5]" />
);
export default InclusionDiversity;
```

### Styling

- **Framework:** Tailwind CSS 3.4.17
- **Custom theme:** Newspaper aesthetic with serif fonts
  - Masthead: `UnifrakturMaguntia` (decorative)
  - Headlines: `Playfair Display` (elegant serif)
  - Body: `Lora` (readable serif)
- **Color palette:**
  - Home screen background: `#b8f0d0` (mint green)
  - PoSH card: `#f5a8b8` (pink/salmon)
  - Inclusion & Diversity: `#d4bfee` (light purple)
  - Financial Literacy: `#f5d9a8` (peach)
  - Workplace Etiquette: `#d4bfee` (light purple)
  - Analytics: `#c8d8c0` (sage/taupe)
- **Custom classes:** `.newspaper-masthead`, `.newspaper-headline`, `.newspaper-body`, `.text-justify-newspaper`

### State Management

- **Query Client:** TanStack React Query wraps the app for server state management
- **Local state:** Each game component manages its own state (score, questions attempted, etc.)
- **Global providers:** `QueryClientProvider`, `TooltipProvider` (Radix UI)

### Navigation & UX

- **Sticky header:** All pages have a sticky header with home button (`sticky top-0 z-10`)
- **Auto-scroll:** `ScrollToTop` component automatically scrolls to top on route change
- **Game flow:**
  1. Start Game → `/posh/page-1`
  2. Page 1 → Next → `/posh/page-2`
  3. Page 1 → Previous → `/posh` (landing)
  4. Page 2 → Previous → `/posh/page-1`

### Database & Analytics

- **SQLite:** `sql.js` (browser-compatible SQLite compiled to WebAssembly)
- **Installed:** `sql.js` package ready for analytics implementation
- **Tables:** Not yet created; structure TBD based on game data needs
- **Future:** Each game will track scores, attempts, timestamps, user progress per session

### Path Aliasing

```
@ → src/
```
Configured in `vite.config.ts` and `tsconfig.app.json`.

### Testing

- **Framework:** Vitest 3.2.4 with jsdom environment
- **Setup file:** `src/test/setup.ts`
- **Libraries:** @testing-library/react, @testing-library/jest-dom

### Key Dependencies

- **React 18.3.1** + **TypeScript 5.8.3**
- **Vite 5.4.19** (with SWC for faster builds)
- **React Router 6.30.1** (client-side routing)
- **TanStack React Query 5.83.0** (server state)
- **shadcn/ui** (40+ Radix UI-based components)
- **Tailwind CSS 3.4.17** (styling)
- **sql.js** (SQLite in WebAssembly)
- **Recharts 2.15.4** (charts for future analytics)

### Development Notes

- **Type checking:** Loose (no implicit any, no unused parameter checks) for development flexibility
- **ESLint:** Configured for React Hooks and Refresh rules
- **No error handling in non-game code:** Trust framework guarantees; only validate at boundaries
- **Avoid over-engineering:** Keep components simple; no premature abstractions
- **Game-specific styles:** Each game can have its own color theme and layout approach (PoSH uses newspaper; others TBD)
