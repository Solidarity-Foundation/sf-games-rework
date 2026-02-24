# Workplace Etiquette Game - Intro Screen & Floor Plan Implementation

## Context

The Workplace Etiquette game is one of 4 educational games in the SF Games platform. It currently shows a "Coming Soon" placeholder. The wireframe document (`src/pages/workplaceetiquette/workplace_game_wireframe.md`) and game data (`src/components/workplace/gamedata.json` — 10 bilingual questions) are already in place. This plan covers building:

1. **Intro/Welcome Screen** at `/workplace-etiquette` (replacing ComingSoon)
2. **Isometric Office Floor Plan Screen** at `/workplace-etiquette/game` (rendered with PixiJS)

Game state will be managed with Zustand. Image placeholders will be used for logo and illustration.

---

## Packages to Install

```bash
pnpm add pixi.js zustand
```

- **pixi.js** (v8) — for rendering the isometric office floor plan canvas
- **zustand** (v5) — lightweight state management for game progression, shared between React UI and PixiJS canvas

---

## File Structure (New & Modified)

```
src/
├── components/workplace/
│   ├── gamedata.json                    # EXISTS - 10 questions
│   ├── WorkplaceIntroScreen.tsx         # NEW - Intro/welcome screen
│   ├── WorkplaceFloorPlan.tsx           # NEW - React wrapper for PixiJS canvas
│   ├── WorkplaceFloorPlanCanvas.ts      # NEW - Pure PixiJS drawing logic
│   ├── roomConfig.ts                    # NEW - Room definitions & positions
│   └── workplaceStore.ts               # NEW - Zustand store
├── pages/workplaceetiquette/
│   ├── WorkplaceEtiquette.tsx           # MODIFY - Render WorkplaceIntroScreen
│   └── WorkplaceGame.tsx                # NEW - Thin wrapper for floor plan
└── App.tsx                              # MODIFY - Add /workplace-etiquette/game route
```

---

## Implementation Steps

### Step 1: Install packages
```bash
pnpm add pixi.js zustand
```

### Step 2: Create Zustand store (`workplaceStore.ts`)

State shape:
- `gameStarted: boolean`
- `currentRoomIndex: number` (0-9, which room is currently active)
- `completedRooms: Set<string>` (room IDs that are done)
- `answers: Map<number, number>` (questionId → selected option index)
- `score: number` (starts at 10, +1 correct, -1 wrong)
- `language: 'en' | 'kan'`

Actions: `startGame()`, `resetGame()`, `setLanguage()`, `completeRoom(roomId, questionId, answerIndex, points)`

### Step 3: Create room configuration (`roomConfig.ts`)

Defines the 10 interactive rooms (mapped to 10 questions) and 4 decorative rooms (Manager Office 2, 3 Washrooms). Each room has:
- `id`, `name`, `name_kan`, `questionId`, `sequenceIndex`
- Isometric grid position (`isoX`, `isoY`, `width`, `height`)
- `color` (hex), `interactive` flag

Room sequence (matching wireframe section 3.3):
1. Workspace A → Q1 (Multicultural Communication)
2. Workspace B → Q2 (Body Language)
3. Team Pod 1 → Q3 (Professional Greetings)
4. Team Pod 2 → Q10 (Basic Courtesy)
5. Small Meeting Room → Q5 (Meeting Interruption)
6. Conference Room → Q9 (Meeting Leadership)
7. Reception Area → Q7 (Meeting Behavior)
8. Seating/Waiting Area → Q8 (Workplace Harassment)
9. Kitchen/Lunch Area → Q4 (Accountability)
10. Manager Office 1 → Q6 (Missed Deadlines)

### Step 4: Create Intro Screen (`WorkplaceIntroScreen.tsx`)

Layout (per wireframe section 4.1):
- Sticky header with Home button (reuses existing pattern from `NewspaperFrontPage.tsx`)
- Light blue background (`bg-[#dce8f5]`)
- White centered card containing:
  - Company logo placeholder (gray box with `Building2` Lucide icon)
  - Title: "Workplace Etiquette Challenge"
  - Language toggle (EN / KAN) — stored in Zustand
  - Welcome paragraph text (bilingual)
  - Office illustration placeholder (gray box with `Briefcase` icon)
  - Game rules summary (4 bullet points)
  - "Start Game" button → calls `startGame()`, navigates to `/workplace-etiquette/game`

### Step 5: Modify `WorkplaceEtiquette.tsx` page

Replace `ComingSoon` import with `WorkplaceIntroScreen`.

### Step 6: Create PixiJS floor plan canvas (`WorkplaceFloorPlanCanvas.ts`)

Pure PixiJS logic (no React). Exports `initFloorPlanCanvas()`, `updateFloorPlanCanvas()`, `destroyFloorPlanCanvas()`.

**Isometric projection:**
```
toIso(gridX, gridY) = {
  x: (gridX - gridY) * (TILE_WIDTH / 2),
  y: (gridX + gridY) * (TILE_HEIGHT / 2)
}
```

Each room is drawn as an isometric parallelogram using PixiJS v8 `Graphics.poly().fill().stroke()`.

**Room visual states:**
| State | Fill | Overlay |
|-------|------|---------|
| Locked | Gray (#c0c0c0), alpha 0.4 | Lock icon text |
| Current | Full color, pulsing glow animation via ticker | Subtle glow outline |
| Completed | Full color | Green checkmark drawn with Graphics |

**Room labels:** PixiJS `Text` centered on each room diamond, language-aware.

**Click handling:** Current room has `eventMode = 'static'`, `cursor = 'pointer'`. Click triggers callback to React (for future question modal). Locked/completed rooms are not clickable.

**Initialization:** PixiJS v8 uses async `app.init()`. Guard against React StrictMode double-mount with a ref flag.

### Step 7: Create React wrapper (`WorkplaceFloorPlan.tsx`)

- Sticky header with Home button and title
- Progress bar: "Room X/10" with visual progress indicator
- `<div ref={canvasRef}>` that mounts the PixiJS canvas
- `useEffect` to init PixiJS on mount, destroy on unmount
- Second `useEffect` to sync Zustand state changes → PixiJS `updateFloorPlanCanvas()`

### Step 8: Create page wrapper (`WorkplaceGame.tsx`)

Thin wrapper: `const WorkplaceGame = () => <WorkplaceFloorPlan />;`

### Step 9: Update routing (`App.tsx`)

Add: `<Route path="/workplace-etiquette/game" element={<WorkplaceGame />} />`

---

## Key Files to Reference

- `src/components/posh/NewspaperFrontPage.tsx` — pattern for intro screen structure (header, language toggle, start button)
- `src/components/workplace/gamedata.json` — the 10 questions mapped to rooms
- `src/pages/workplaceetiquette/WorkplaceEtiquette.tsx` — currently renders ComingSoon, will be modified
- `src/App.tsx` — routing, needs new route added

---

## Verification

1. Run `pnpm dev` and navigate to `/workplace-etiquette`
2. Confirm intro screen renders with title, placeholder images, welcome text, and "Start Game" button
3. Toggle language between EN/KAN and verify text changes
4. Click "Start Game" — should navigate to `/workplace-etiquette/game`
5. Confirm isometric floor plan renders with all rooms visible
6. First room (Workspace A) should be highlighted/glowing; remaining 9 rooms grayed with lock icons
7. Decorative rooms (Manager Office 2, Washrooms) visible but not interactive
8. Room labels display correctly in selected language
9. Click on the current room — should log room ID to console (question modal is future work)
10. Verify responsive behavior: canvas resizes on window resize, layout works on mobile viewport
