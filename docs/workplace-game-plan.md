# Workplace Etiquette Game — Design & Implementation Reference

> **Status:** Fully implemented and live.
> **Last updated:** February 2026

---

## 1. Overview

The **Workplace Etiquette** game is a scenario-based educational game set inside the fictional packaged snacks company **Tasty Bites Foods** (Bengaluru, Karnataka). Players take on the role of a new joiner on their first day and navigate through 10 rooms in the office, each presenting a real workplace scenario. They choose the best response to each scenario and receive immediate contextual feedback.

The game is bilingual — all content is available in **English** and **Kannada**.

**Brand colours:** `#e85d04` → `#f48c06` → `#faa307` (warm orange gradient)
**Background:** `linear-gradient(160deg, #fff8f0, #fef3e2, #e8f4fb)`

---

## 2. Routing

```
/workplace-etiquette                    → Intro / welcome screen
/workplace-etiquette/game               → Office floor plan (room selector)
/workplace-etiquette/question/:roomId   → Individual question screen
/workplace-etiquette/results            → Score & level results
/workplace-etiquette/review             → Full answer review
```

---

## 3. File Structure

### Pages (thin wrappers)

```
src/pages/workplaceetiquette/
├── WorkplaceEtiquette.tsx    → renders WorkplaceIntroScreen
├── WorkplaceGame.tsx         → renders WorkplaceFloorPlan
├── WorkplaceResults.tsx      → renders WorkplaceResults component
└── WorkplaceReview.tsx       → renders WorkplaceReview component
```

### Components

```
src/components/workplace/
├── WorkplaceIntroScreen.tsx      → Intro / welcome screen
├── WorkplaceFloorPlan.tsx        → Office floor plan (image + hotspot overlay)
├── WorkplaceFloorPlanCanvas.ts   → PixiJS isometric canvas (kept as fallback/reference)
├── WorkplaceQuestion.tsx         → Individual question + options + feedback
├── WorkplaceResults.tsx          → Score, level, takeaways, action buttons
├── WorkplaceReview.tsx           → Full review of all 10 answers
├── workplaceStore.ts             → Zustand state management
├── roomConfig.ts                 → Room definitions and sequence
└── gamedata.json                 → 10 bilingual questions
```

### Assets

```
src/assets/workplace/
├── office-floor-plan.png         → Illustrated office top-down floor plan image
├── tasty-bites-logomark-white.png → Logo shown in header / intro card
├── lock-icon.png                 → Lock overlay on incomplete rooms
├── group-photo.webp              → Team celebration photo on results page
├── q1.webp  / q1-correct.webp  / q1-wrong.webp
├── q2.webp  / q2-correct.webp
├── q3.webp  / q3-correct.webp  / q3-wrong.webp
├── q4.webp  / q4-correct.webp  / q4-wrong.webp
├── q5.webp  / q5-correct.webp  / q5-wrong.webp
├── q6.webp  / q6-correct.webp  / q6-wrong.webp
├── q7.webp  / q7-correct.webp  / q7-wrong.webp
├── q8.webp  / q8-correct.webp  / q8-wrong.webp
├── q9.webp  / q9-correct.webp  / q9-wrong.webp
└── q10.webp / q10-correct.webp / q10-wrong.webp
```

> Image keys are **1-based sequence numbers** (the order rooms are visited), not question IDs. See Room Sequence table below.

---

## 4. Room Sequence & Question Mapping

Players visit rooms in a fixed sequence. The sequence order does **not** match the question ID numbering.

| Seq | Room ID               | Room Name         | Question ID | Question Topic                          |
|-----|-----------------------|-------------------|-------------|-----------------------------------------|
| 1   | `workspace-a`         | Workspace A       | Q1          | Multicultural Communication             |
| 2   | `workspace-b`         | Workspace B       | Q2          | Reading Body Language Signals           |
| 3   | `team-pod-1`          | Team Pod 1        | Q3          | Professional Greetings                  |
| 4   | `team-pod-2`          | Team Pod 2        | Q4          | Accountability & Ownership              |
| 5   | `small-meeting-room`  | Meeting Room      | Q5          | Interruptions in Meetings               |
| 6   | `conference-room`     | Conference Room   | Q9          | Meeting Leadership & Facilitation       |
| 7   | `reception-area`      | Reception Area    | Q7          | Managing Visitors & Reception           |
| 8   | `seating-waiting-area`| Waiting Area      | Q8          | Respectful Conduct with Visitors        |
| 9   | `kitchen-lunch-area`  | Lunch Area        | Q10         | Courtesy in Shared Spaces               |
| 10  | `manager-office-1`    | Manager Office    | Q6          | Handling Missed Deadlines               |

> Images are named by sequence number (e.g. Conference Room = seq 6 → `q6.webp`), not by question ID.

### Correct Answer Distribution

Correct answers are deliberately spread across all options to avoid a pattern:

| Seq | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|-----|---|---|---|---|---|---|---|---|---|----|
| Opt | A | B | C | D | B | D | C | D | B | C  |

---

## 5. State Management — `workplaceStore.ts`

Built with **Zustand**. State is in-memory only (no localStorage persistence — game is played in one sitting).

```ts
interface WorkplaceGameState {
  gameStarted: boolean;
  currentRoomIndex: number;      // 0–9, advances after each answer
  completedRooms: string[];      // room IDs that have been answered
  answers: Record<number, number>; // questionId → selected option index
  score: number;                 // starts at 10; +1 correct, −1 wrong
  language: 'en' | 'kan';
}
```

**Actions:**
- `startGame()` — resets all state, sets `gameStarted: true`
- `resetGame()` — resets all state, sets `gameStarted: false`
- `setLanguage(lang)` — switches EN/KAN globally across all screens
- `completeRoom(roomId, questionId, answerIndex, points)` — records answer, adjusts score, increments `currentRoomIndex`

---

## 6. Game Flow

```
Home Screen
    ↓ tap "Workplace Etiquette"
/workplace-etiquette  (Intro Screen)
    — Company branding card (logo + name + location)
    — Welcome text (bilingual)
    — "How to Play" rules
    — Language toggle (EN / ಕನ್ನಡ)
    ↓ "Start Game"
/workplace-etiquette/game  (Floor Plan)
    — Office floor plan image with interactive hotspot overlay
    — 10 room hotspots; only the current room (glowing/pulsing orange) is clickable
    — Completed rooms show a green ✓ overlay
    — Locked rooms show a dark overlay with lock icon
    — Progress bar: "X of 10 rooms completed"
    ↓ tap current room
/workplace-etiquette/question/:roomId  (Question Screen)
    — Dialogue box (initial / correct reaction / wrong reaction)
    — Contextual illustration (changes on answer: default → correct/wrong variant)
    — Question title, scenario description, question prompt
    — 4 options (A–D); tap to select
    — Immediate feedback: green/red styling, feedback text, confetti (correct) or shake (wrong)
    — "Back to Office" button returns to floor plan
    ↓ answer recorded, navigates back to floor plan
    [repeat for rooms 2–10]
    ↓ after room 10
    "See Results" button overlaid on floor plan
/workplace-etiquette/results  (Results Screen)
    — Score in a circular badge
    — Achievement level (see Scoring below)
    — Group photo with "Welcome to the Tasty Bites Team!" banner
    — 7 key learning takeaways
    — Score-aware company message from Tasty Bites
    — Buttons: "Review Answers" → /review · "Restart Game" → /workplace-etiquette
/workplace-etiquette/review  (Answer Review)
    — All 10 answers listed in room-visit order
    — Each card: room number, room name, scenario description, question
    — Selected option highlighted green (correct) or red (wrong)
    — Correct option always shown in light green when player was wrong
    — Feedback text shown for selected option only
```

---

## 7. Screens

### 7.1 Intro Screen — `WorkplaceIntroScreen.tsx`

- Sticky header: gradient orange, company name, language toggle
- **Company branding card:** Tasty Bites logomark + company name + "Bengaluru, Karnataka"
- **Challenge badge:** "Workplace Challenge" pill, main title "Workplace Etiquette Challenge"
- **Welcome card:** Two paragraphs explaining the scenario and approach (bilingual)
- **How to Play card:** 4 rules with Lucide icons (MapPin, Lock, Star, CheckCircle)
  1. 10 rooms, each with a real workplace scenario
  2. Rooms unlock one at a time
  3. Correct: +1 point · Wrong: −1 point
  4. Start with 10 points — aim for the top
- **Start Game button:** orange gradient, calls `startGame()`, navigates to `/workplace-etiquette/game`
- Footer: "© Solidarity Foundation"

### 7.2 Floor Plan — `WorkplaceFloorPlan.tsx`

Uses a **static PNG floor plan** (`office-floor-plan.png`) with a CSS `position: absolute` hotspot overlay — not the PixiJS canvas (see §10 for the canvas file).

**Hotspot positions** are defined as percentages of image width/height and manually tuned to align with the PNG:

```ts
const HOTSPOTS = [
  { roomId: 'workspace-a',         left: 5,    top: 5,     width: 28,   height: 30  },
  { roomId: 'workspace-b',         left: 35,   top: 5,     width: 25,   height: 30  },
  { roomId: 'conference-room',     left: 62,   top: 5.5,   width: 33.5, height: 22  },
  { roomId: 'manager-office-1',    left: 62,   top: 29,    width: 13.5, height: 13.5 },
  { roomId: 'small-meeting-room',  left: 84,   top: 29,    width: 11.5, height: 13.5 },
  { roomId: 'team-pod-1',          left: 4.5,  top: 40.5,  width: 20,   height: 13  },
  { roomId: 'team-pod-2',          left: 30.5, top: 40.5,  width: 18,   height: 13  },
  { roomId: 'kitchen-lunch-area',  left: 61,   top: 44.5,  width: 34.5, height: 20.5 },
  { roomId: 'reception-area',      left: 4.5,  top: 63.25, width: 19,   height: 23  },
  { roomId: 'seating-waiting-area',left: 29,   top: 63,    width: 14,   height: 23.5 },
]
```

**Hotspot visual states:**
| State     | Appearance                                                         |
|-----------|--------------------------------------------------------------------|
| Locked    | Dark slate overlay (`bg-slate-600/45`), lock icon, room label      |
| Current   | Pulsing orange overlay (`animate-pulse-scale`), orange label badge |
| Completed | Green overlay (`bg-green-400/40`), green ✓ icon, green label badge |

**Non-interactive elements:** Two washroom areas are rendered as static labels only (no hotspot interaction).

**See Results button:** Appears centered over the floor plan image when all 10 rooms are completed.

**Header extras:** Language toggle (EN/ಕನ್ನಡ) in the header, persisted to Zustand.

### 7.3 Question Screen — `WorkplaceQuestion.tsx`

- **Header:** "Back to Office" button + room name + "X / 10" counter
- **Dialogue box:** Italic quote box; colour changes based on answer state:
  - Pre-answer: white with orange left border
  - Correct: green tinted (`bg-green-50 border-green-500`)
  - Wrong: red tinted (`bg-red-50 border-red-400`)
  - Content: `dialogue` → `reaction_correct` / `reaction_wrong` on answer
- **Illustration:** WebP image swapped on answer (default → correct variant / wrong variant). Keys in IMAGE_MAP are 1-based sequence numbers (not question IDs).
  - `WRONG_IMAGE_MAP` only has entries for questions that have a wrong-specific image; falls back to default.
- **Question title** (`text-orange-900 font-bold text-lg`)
- **Description card** (white, orange border)
- **Question prompt** (orange gradient background, white text)
- **Options (A–D):**
  - Pre-answer: white cards, hover highlights in orange
  - Selected correct: `bg-green-50 border-green-400`, green badge, CheckCircle2 + feedback text
  - Selected wrong: `bg-red-50 border-red-400`, red badge, XCircle + feedback text, screen shake animation
  - Other options after answer: faded (`opacity-40`)
- **Animations:** `canvas-confetti` on correct answer; CSS `animate-shake` class on wrong answer
- **State guard:** Once answered, option clicks are ignored (`if (selectedIndex !== undefined) return`)
- **Already-completed rooms:** `useWorkplaceStore` checked via `completedRooms`; pre-populates `selectedIndex` from `answers` map so review is possible

### 7.4 Results Screen — `WorkplaceResults.tsx`

- Saves to Appwrite via `saveGameSession()` on mount (ref-guarded against StrictMode double-fire)
  - `gameId: 'workplace-etiquette'`
  - `score`, `level`, `questionsAnswered`, answers array with `pointsEarned`
- **Celebration banner:** emoji + heading based on score tier
- **Group photo:** `group-photo.webp` + orange gradient "Welcome to the Tasty Bites Team!" banner
- **Your Results card:** circular score badge + level name + level message
- **Key Takeaways:** 7 items (bilingual), with green tick bullets
- **Company message:** score-aware quote from Tasty Bites (4 tiers)
- **Buttons:**
  - "Review Answers" → `/workplace-etiquette/review`
  - "Restart Game" → calls `resetGame()`, navigates to `/workplace-etiquette`

### 7.5 Answer Review — `WorkplaceReview.tsx`

- Iterates over `ROOM_SEQUENCE` (room-visit order, not question ID order)
- Each card shows: room number badge, room name, scenario description, question text
- All 4 options displayed with colour-coded badges:
  - Player's selection + correct → green
  - Player's selection + wrong → red
  - Correct option when player was wrong → light green with "✓ Correct answer" label
  - Other options → faded gray
- Feedback text shown only for the player's selected option

---

## 8. Scoring & Achievement Levels

**Starting score:** 10 points
**Correct answer:** +1 (one option per question has `workplacePoints: 1`)
**Wrong answer:** −1 (all other options have `workplacePoints: -1`)
**Score range:** 0 to 20

```
src/components/workplace/resultlevels.ts → calculateWorkplaceLevel(score)
```

| Score     | Level                          |
|-----------|--------------------------------|
| > 19      | Workplace Etiquette Champion   |
| 10 – 19   | Workplace Etiquette Leader     |
| 1 – 9     | Workplace Etiquette Learner    |
| ≤ 0       | Workplace Etiquette Beginner   |

All levels have bilingual `level_kan` and `message_kan` fields.

---

## 9. Game Data — `gamedata.json`

Each question object:

```jsonc
{
  "id": 1,                          // question ID (1–10)
  "dialogue": "...",                // pre-answer narrative (English)
  "dialogue_kan": "...",            // pre-answer narrative (Kannada)
  "reaction_correct": "...",        // dialogue shown after correct answer
  "reaction_correct_kan": "...",
  "reaction_wrong": "...",          // dialogue shown after wrong answer
  "reaction_wrong_kan": "...",
  "title": "...",                   // question title
  "title_kan": "...",
  "description": "...",             // scenario setup paragraph
  "description_kan": "...",
  "question": "...",                // the actual question prompt
  "question_kan": "...",
  "options": [
    {
      "text": "...",
      "text_kan": "...",
      "feedback": "...",            // shown after selection
      "feedback_kan": "...",
      "workplacePoints": 1          // 1 = correct, -1 = wrong
    }
    // × 4 options
  ]
}
```

---

## 10. PixiJS Canvas — `WorkplaceFloorPlanCanvas.ts`

This file implements a full **isometric floor plan renderer** in PixiJS v8. It is present in the codebase but the live floor plan uses the PNG + hotspot approach in `WorkplaceFloorPlan.tsx` instead.

**Isometric projection:**
```
toIso(gridX, gridY) = {
  x: (gridX − gridY) × (TILE_W / 2),   // TILE_W = 80
  y: (gridX + gridY) × (TILE_H / 2),   // TILE_H = 40
}
```

**Exported API:**
- `initFloorPlanCanvas(container, callbacks)` — async; inits PixiJS app, appends canvas, starts ResizeObserver
- `updateFloorPlanCanvas(state)` — call when Zustand state changes; redraws
- `destroyFloorPlanCanvas()` — cleans up app, ticker, ResizeObserver

**Room visual states:**
| State      | Fill                | Overlay                                    |
|------------|---------------------|--------------------------------------------|
| Locked     | Gray `#cccccc`, α=0.45 | Padlock shape drawn with Graphics       |
| Current    | Full room color      | Glow halo (pulsing via ticker), blue dot   |
| Completed  | Full room color      | Green checkmark drawn with Graphics        |
| Decorative | Full room color      | Label only, not interactive                |

**Glow animation:** Uses `app.ticker.add()` with a sine wave on the glow `Graphics` alpha.

**StrictMode guard:** Checks `container.isConnected` after `app.init()` resolves before appending canvas.

---

## 11. Analytics Integration

Workplace Etiquette sessions appear in the **Analytics Dashboard** (`/analytics`) alongside PoSH sessions.

- **Session saving:** `saveGameSession()` called from `WorkplaceResults.tsx` with `gameId: 'workplace-etiquette'`
- **Question breakdown:** `AnalyticsDashboard.tsx` imports `workplaceGameData` and `ROOM_SEQUENCE`; questions are displayed in **room-visit order** (not question ID order), labelled "Room 1–10" with room name and question title
- **Correct answer detection:** uses `workplacePoints > 0` (vs `poshPoints > 0` for PoSH)
- **Levels column:** `session.level` displayed in the Recent Completed Sessions table as an orange badge

---

## 12. Dependencies Added

```bash
pnpm add zustand pixi.js
```

| Package   | Version | Purpose                                   |
|-----------|---------|-------------------------------------------|
| zustand   | v5      | In-memory game state across all screens   |
| pixi.js   | v8      | Isometric canvas (canvas file kept)       |

---

## 13. CSS Animations (in `index.css` / `App.css`)

```css
/* Shake on wrong answer */
@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
.animate-shake { animation: shake 0.4s ease-in-out; }

/* Pulsing scale on current room hotspot */
@keyframes pulse-scale { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.04);opacity:0.8} }
.animate-pulse-scale { animation: pulse-scale 1.4s ease-in-out infinite; }

/* Fade-in-up for dialogue box on answer */
@keyframes fade-in-up { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.animate-fade-in-up { animation: fade-in-up 0.35s ease-out; }
```
