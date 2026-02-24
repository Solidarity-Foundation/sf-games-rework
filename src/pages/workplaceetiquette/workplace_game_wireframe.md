# Workplace Etiquette Game - Wireframe Document

## 1. Game Overview

### 1.1 Concept

An educational mobile and desktop game designed to teach workplace etiquette through scenario-based learning in an interactive office environment.

### 1.2 Target Audience

- Adults with basic digital literacy
- Working-class professionals in Bangalore/South India
- New employees and team members learning workplace norms

### 1.3 Platform

- Mobile (primary): iOS and Android
- Desktop (secondary): Web-based

### 1.4 Game Genre

Educational quiz game with unlockable progression system

### 1.5 Learning Objectives

- Understand professional communication etiquette
- Recognize appropriate workplace behavior
- Learn conflict resolution and accountability
- Practice cultural sensitivity and respect

---

## 2. Game Setting & Context

### 2.1 Company Profile

**Name:** [To be decided - e.g., "Tasty Bites Foods" or "Snack Express"]
**Business:** Mid-sized packaged snacks company
**Market:** South India
**Size:** 20-30 employees
**Departments:** Production, Sales, Marketing, HR, Admin

### 2.2 Visual Style

- Colorful, friendly office environment
- Indian workplace setting with diverse characters
- Clear, simple graphics suitable for basic digital literacy
- Warm, inviting color palette

---

## 3. Game Mechanics

### 3.1 Core Gameplay Loop

1. Player views office floor plan
2. Clicks on an available/unlocked room
3. Room zooms in to show detailed scene with characters
4. Scenario question appears in speech bubble
5. Player selects from 4 multiple-choice answers
6. Feedback screen shows result with explanation
7. Room is marked as complete
8. Next room unlocks
9. Repeat until all rooms completed

### 3.2 Progression System

- **Linear Unlocking:** Rooms unlock sequentially after completing previous question
- **Starting Point:** Cubicle Cluster 1 (4-person)
- **Visual Feedback:**
  - Locked rooms: Grayed out with lock icon
  - Current room: Highlighted/glowing
  - Completed rooms: Green checkmark overlay

### 3.3 Room Sequence (Suggested)

1. Cubicle Cluster 1 (4-person) - Question 1
2. Cubicle Cluster 2 (4-person) - Question 2
3. Cubicle Cluster 3 (2-person) - Question 3
4. Cubicle Cluster 4 (2-person) - Question 4
5. Small Meeting Room - Question 5
6. Conference Room - Question 6
7. Reception Area - Question 7
8. Seating/Waiting Area - Question 8
9. Kitchen/Lunch Area - Question 9
10. Individual Cabin 1 - Question 10

### 3.4 Scoring/Feedback System

- No penalty for wrong answers (learning-focused)
- Correct answers unlock next room immediately
- Wrong answers show explanation, then allow progression
- Optional: Track correct answers for end summary

---

## 4. Screen Wireframes & Visual Mockups

### 4.1 Welcome/Intro Screen

**Elements:**

- Game title: "Workplace Etiquette Challenge"
- Company logo/name
- Brief context text: "Welcome to [Company Name]! You're starting your first day at our packaged snacks company. Navigate through the office and learn important workplace etiquette by handling real scenarios."
- "Start Game" button
- Settings icon (optional: sound, language)

**Visual:**

- Simple background with office building or company branding
- Friendly, welcoming design

**Visual Mockup:**

```
╔═════════════════════════════════════════╗
║          [Company Logo]                 ║
║                                         ║
║    WORKPLACE ETIQUITE CHALLENGE         ║
║                                         ║
║  ┌─────────────────────────────────┐   ║
║  │  [Illustration: Office building │   ║
║  │   with friendly characters]     │   ║
║  │                                 │   ║
║  └─────────────────────────────────┘   ║
║                                         ║
║  Welcome to Tasty Bites Foods!          ║
║                                         ║
║  You're starting your first day at our  ║
║  packaged snacks company. Navigate      ║
║  through the office and learn important ║
║  workplace etiquette by handling real   ║
║  scenarios.                             ║
║                                         ║
║         ┌─────────────────┐             ║
║         │   START GAME    │             ║
║         └─────────────────┘             ║
║                                         ║
║  ⚙️ Settings                            ║
╚═════════════════════════════════════════╝
```

---

### 4.2 Main Office Floor Plan Screen

**Elements:**

- Top bar:
  - Progress indicator: "X/10 Rooms Completed"
  - Back/Menu button
- Central area: Isometric/top-down office layout showing:
  - 2 Cubicle clusters (4-person each) - labeled "Workspace A" & "Workspace B"
  - 2 Cubicle clusters (2-person each) - labeled "Team Pods"
  - Small Meeting Room - labeled
  - Conference Room - labeled
  - Reception Area - labeled
  - Seating/Waiting Area - labeled
  - Kitchen/Lunch Area - labeled
  - 2 Individual Cabins - labeled "Manager Office 1" & "Manager Office 2"
  - 3 Washrooms - labeled (decorative, not interactive)
- Color coding:
  - Available/Current: Normal colors, slight glow/pulse
  - Locked: Grayed out + lock icon
  - Completed: Normal colors + green checkmark
- Bottom bar (optional):
  - Tips button
  - Sound toggle

**Interaction:**

- Tap/click on available room to enter
- Visual feedback on hover (desktop) or tap (mobile)

**Mobile Adaptation:**

- Pinch-to-zoom functionality for floor plan
- Pan/swipe to navigate large floor plan

**Visual Mockup (Desktop):**

```
╔═══════════════════════════════════════════════════════════════════════╗
║  ☰ Menu                TASTY BITES FOODS OFFICE             0/10 ✓    ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║    ┌──────────┐    ┌──────────┐           ┌─────────────┐           ║
║    │ Manager  │    │ Manager  │           │ Conference  │           ║
║    │ Office 1 │    │ Office 2 │           │    Room     │           ║
║    │   🔒     │    │   🔒     │           │     🔒      │           ║
║    └──────────┘    └──────────┘           └─────────────┘           ║
║                                                                       ║
║    ┌──────────────────────────────┐       ┌─────────────┐           ║
║    │   Workspace A (4-desks)      │       │   Meeting   │           ║
║    │   [💼][💼]                   │       │    Room     │           ║
║    │   [💼][💼]  ✨ GLOW         │       │     🔒      │           ║
║    │   (Available - Start Here!)  │       └─────────────┘           ║
║    └──────────────────────────────┘                                 ║
║                                            ┌─────────────┐           ║
║    ┌──────────────────────────────┐       │  Seating/   │           ║
║    │   Workspace B (4-desks)      │       │  Waiting    │           ║
║    │   [💼][💼]                   │       │    Area     │           ║
║    │   [💼][💼]       🔒          │       │     🔒      │           ║
║    └──────────────────────────────┘       └─────────────┘           ║
║                                                                       ║
║    ┌───────────┐  ┌───────────┐           ┌─────────────┐           ║
║    │Team Pod 1 │  │Team Pod 2 │           │  Reception  │           ║
║    │  [💼][💼] │  │  [💼][💼] │           │    Area     │           ║
║    │    🔒     │  │    🔒     │           │     🔒      │           ║
║    └───────────┘  └───────────┘           └─────────────┘           ║
║                                                                       ║
║                   ┌──────────────┐         [WC] [WC] [WC]            ║
║                   │   Kitchen/   │         (decorative)              ║
║                   │  Lunch Area  │                                   ║
║                   │     🔒       │                                   ║
║                   └──────────────┘                                   ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║            💡 Tips          🔊 Sound: ON          📊 Progress         ║
╚═══════════════════════════════════════════════════════════════════════╝

LEGEND:
✨ = Available/Current (glowing)
🔒 = Locked
✓ = Completed (green checkmark)
💼 = Desk/Workstation
```

**Visual Mockup (Mobile - Portrait):**

```
┌─────────────────────────────┐
│ ☰  OFFICE FLOOR PLAN   0/10 │
├─────────────────────────────┤
│ [Pinch to zoom, swipe to    │
│  navigate]                  │
│                             │
│  ┌────────┐  ┌────────┐    │
│  │Manager │  │Manager │    │
│  │Office 1│  │Office 2│    │
│  │  🔒    │  │  🔒    │    │
│  └────────┘  └────────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │   Workspace A         │  │
│  │   [💼][💼]           │  │
│  │   [💼][💼]  ✨       │  │
│  │   TAP TO START!       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │   Workspace B  🔒     │  │
│  └───────────────────────┘  │
│                             │
│  ┌─────────┐ ┌─────────┐   │
│  │Team Pod │ │Team Pod │   │
│  │   1 🔒  │ │  2 🔒   │   │
│  └─────────┘ └─────────┘   │
│                             │
│  ┌──────────┐ ┌──────────┐ │
│  │ Meeting  │ │Conference│ │
│  │ Room 🔒  │ │ Room 🔒  │ │
│  └──────────┘ └──────────┘ │
│                             │
│  ┌──────────┐ ┌──────────┐ │
│  │Reception │ │ Seating  │ │
│  │ Area 🔒  │ │ Area 🔒  │ │
│  └──────────┘ └──────────┘ │
│                             │
│  ┌────────────────────────┐ │
│  │  Kitchen/Lunch Area 🔒 │ │
│  └────────────────────────┘ │
│                             │
├─────────────────────────────┤
│  💡 Tips  🔊 Sound  📊 Stats │
└─────────────────────────────┘
```

**State Examples:**

**Progress at 3/10:**

```
Top bar shows: "3/10 Rooms Completed"
- Workspace A: ✓ (green checkmark)
- Workspace B: ✓ (green checkmark)
- Team Pod 1: ✓ (green checkmark)
- Team Pod 2: ✨ (currently available, glowing)
- All others: 🔒 (locked, grayed out)
```

---

### 4.3 Room Detail Screen (Scenario View)

**Layout:**

**Top Section:**

- Back arrow (returns to floor plan)
- Room name displayed
- Progress: "Question X of 10"

**Main Visual Area (60% of screen):**

- Close-up illustration of room
- 2-4 Indian characters in workplace attire
- Characters showing relevant body language/actions for scenario
- Furniture and room details in color
- Speech bubble coming from one character presenting the scenario

**Question Section (40% of screen):**

- Scenario text in clear, readable font (English, potential for regional language toggle)
- 4 multiple-choice buttons (A, B, C, D)
- Each button contains full answer text
- Buttons are large enough for easy tapping (mobile-friendly)

**Visual Mockup (Desktop - Question 1 Example):**

```
╔═══════════════════════════════════════════════════════════════════╗
║  ← Back to Office          Workspace A              Question 1/10 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: 4 cubicles with diverse team members]  │    ║
║   │                                                         │    ║
║   │   [Character: Raj - speaking]    [Character 2]         │    ║
║   │   💬 "Yaake guru, nan office-ge                        │    ║
║   │      barthini antha helthe..."                         │    ║
║   │                                                         │    ║
║   │   [Character 3]                  [Character 4]         │    ║
║   │   (confused expression)          (confused expression) │    ║
║   │                                                         │    ║
║   │   [Desks with computers, office supplies visible]      │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Raj is in a multicultural team and uses certain local slang     ║
║  words in unofficial conversations that others don't understand.  ║
║                                                                   ║
║  What should the others do?                                       ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ A  Ask him about the slang and make it a learning          │ ║
║  │    opportunity.                                             │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ B  Demand that he use clear, easier-to-understand language │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ C  Avoid listening to him when he speaks.                   │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ D  Talk over him so that he doesn't use the slang.          │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Visual Mockup (Mobile - Portrait):**

```
┌─────────────────────────────────┐
│ ← Workspace A         Q 1/10    │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │ [Illustration: Cubicles]  │  │
│  │                           │  │
│  │  [Raj speaking with      │  │
│  │   speech bubble]          │  │
│  │   💬 "Yaake guru..."      │  │
│  │                           │  │
│  │  [3 confused colleagues]  │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│ Raj is in a multicultural team  │
│ and uses certain local slang    │
│ words in unofficial             │
│ conversations that others       │
│ don't understand.               │
│                                 │
│ What should the others do?      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ A  Ask him about the slang  │ │
│ │    and make it a learning   │ │
│ │    opportunity.             │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ B  Demand that he use       │ │
│ │    clear, easier-to-        │ │
│ │    understand language      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ C  Avoid listening to him   │ │
│ │    when he speaks.          │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ D  Talk over him so that he │ │
│ │    doesn't use the slang.   │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

**Alternative Question Example (Meeting Room - Question 5):**

```
╔═══════════════════════════════════════════════════════════════════╗
║  ← Back to Office       Small Meeting Room         Question 5/10  ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: 5 people around small conference table] │    ║
║   │                                                         │    ║
║   │   [Person 1 - speaking actively, hand gestures]        │    ║
║   │   💬 "As I was saying about the client feedback..."     │    ║
║   │                                                         │    ║
║   │   [Person 2 - YOU - eager, leaning forward]            │    ║
║   │   💭 (thinking bubble: "I have something important     │    ║
║   │                         to add...")                     │    ║
║   │                                                         │    ║
║   │   [Persons 3, 4, 5 - listening attentively]            │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  You are in a meeting and want to add a point while someone      ║
║  else is speaking. What's the best approach?                      ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ A  Interrupt loudly                                         │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ B  Use a polite phrase like "May I add something here?"    │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ C  Talk over them                                           │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ D  Wait until the meeting ends                              │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Interaction States:**

**Button Hover (Desktop):**

```
┌─────────────────────────────────────────────────────────────┐
│ A  Ask him about the slang and make it a learning          │  ← Slightly darker
│    opportunity.                                             │     background,
└─────────────────────────────────────────────────────────────┘     shadow effect
```

**Button Selected (Tap feedback):**

```
┌─────────────────────────────────────────────────────────────┐
│ ✓ A  Ask him about the slang and make it a learning        │  ← Checkmark appears
│      opportunity.                                           │     briefly before
└─────────────────────────────────────────────────────────────┘     transitioning
```

---

### 4.4 Feedback Screen - Correct Answer

**Layout:**

**Top Section:**

- "✓ Correct!" in green
- Room name

**Main Content:**

- Same room illustration (characters showing positive reaction - thumbs up, smiles)
- Success icon/animation (green checkmark, confetti effect - subtle)
- Text box with explanation:
  - "Why this is correct:" followed by explanation
  - Clear, simple language

**Bottom Section:**

- "Continue" button (large, prominent)

**Visual Mockup (Desktop):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                      ✓ CORRECT!                                   ║
║                    Workspace A                                    ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║                           ⭐ ✨                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: Same room, characters now smiling]      │    ║
║   │                                                         │    ║
║   │   [Raj - happy]           [Character 2 - thumbs up]    │    ║
║   │   💬 "Thank you for       💬 "That's interesting!      │    ║
║   │      asking!"                Let me learn..."          │    ║
║   │                                                         │    ║
║   │   [Character 3 - nodding] [Character 4 - smiling]      │    ║
║   │                                                         │    ║
║   │              [Large green checkmark ✓ overlay]         │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                           ✨ ⭐                                   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ✓ WHY THIS IS CORRECT:                                  │   ║
║   │                                                          │   ║
║   │ Asking about the slang makes it a learning opportunity  │   ║
║   │ and promotes cultural understanding and inclusion in    │   ║
║   │ the workplace. Diversity includes allowing cultural     │   ║
║   │ differences to exist and learning from them. This       │   ║
║   │ approach builds team bonds and creates a respectful,    │   ║
║   │ inclusive environment where everyone feels valued.      │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │    CONTINUE  →       │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Visual Mockup (Mobile - Portrait):**

```
┌─────────────────────────────────┐
│       ✓ CORRECT!                │
│      Workspace A                │
├─────────────────────────────────┤
│           ⭐ ✨                  │
│  ┌───────────────────────────┐  │
│  │ [Illustration: Characters │  │
│  │  showing positive         │  │
│  │  reactions]               │  │
│  │                           │  │
│  │  [Raj smiling]            │  │
│  │  💬 "Thank you!"          │  │
│  │                           │  │
│  │  [Others nodding,         │  │
│  │   thumbs up]              │  │
│  │                           │  │
│  │    [Green checkmark ✓]    │  │
│  │                           │  │
│  └───────────────────────────┘  │
│           ✨ ⭐                  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ✓ WHY THIS IS CORRECT:      │ │
│ │                             │ │
│ │ Asking about the slang      │ │
│ │ makes it a learning         │ │
│ │ opportunity and promotes    │ │
│ │ cultural understanding and  │ │
│ │ inclusion in the workplace. │ │
│ │                             │ │
│ │ Diversity includes allowing │ │
│ │ cultural differences to     │ │
│ │ exist and learning from     │ │
│ │ them.                       │ │
│ └─────────────────────────────┘ │
│                                 │
│    ┌─────────────────────┐      │
│    │   CONTINUE  →       │      │
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

**Animation Sequence:**

1. Screen transitions with fade-in
2. Confetti/sparkle animation (0.5 seconds)
3. Green checkmark scales up
4. Characters animate to show positive reactions
5. Text boxes fade in
6. Continue button pulses gently

**Alternative Correct Answer Example (Question 3):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                      ✓ CORRECT!                                   ║
║                 Small Meeting Room                                ║
╠═══════════════════════════════════════════════════════════════════╣
║                           ⭐ ✨                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: Meeting participants looking pleased]   │    ║
║   │                                                         │    ║
║   │   [Speaker - relieved]    [You - respectful posture]   │    ║
║   │   💬 "Thank you for        💬 "May I add something     │    ║
║   │      letting me finish        here?"                   │    ║
║   │      my point."                                        │    ║
║   │                                                         │    ║
║   │   [Others - nodding approvingly]        [✓ overlay]    │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                           ✨ ⭐                                   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ✓ WHY THIS IS CORRECT:                                  │   ║
║   │                                                          │   ║
║   │ Using a polite phrase like "May I add something here?"  │   ║
║   │ shows respect for the current speaker while still       │   ║
║   │ allowing you to contribute. This maintains a            │   ║
║   │ professional atmosphere and ensures everyone's voice    │   ║
║   │ is heard without disrupting the meeting flow.           │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │    CONTINUE  →       │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### 4.5 Feedback Screen - Wrong Answer

**Layout:**

**Top Section:**

- "Not quite right" or "Incorrect" in orange/yellow (not harsh red)
- Room name

**Main Content:**

- Same room illustration (characters showing neutral/concerned expression)
- Information icon
- Two text boxes:
  1. "Why this answer isn't right:" + explanation of chosen wrong answer
  2. "The correct answer is:" + letter + correct answer text + explanation

**Bottom Section:**

- "Continue" button

**Visual Mockup (Desktop - Wrong Answer "C" Selected):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                   ⚠️ NOT QUITE RIGHT                              ║
║                    Workspace A                                    ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: Same room, characters showing concern]  │    ║
║   │                                                         │    ║
║   │   [Raj - looking isolated]  [Character 2 - uncertain]  │    ║
║   │   💭 (thinking: "Why        💭 "Maybe I should         │    ║
║   │      won't they listen?")       just ignore him..."    │    ║
║   │                                                         │    ║
║   │   [Character 3 - turning    [Character 4 - looking     │    ║
║   │    away]                     uncomfortable]            │    ║
║   │                                                         │    ║
║   │              [Orange info icon ⓘ]                      │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ⚠️ WHY THIS ANSWER ISN'T RIGHT:                         │   ║
║   │                                                          │   ║
║   │ Ignoring someone when they speak is disrespectful and   │   ║
║   │ unprofessional. This behavior creates a hostile work    │   ║
║   │ environment and can make colleagues feel excluded and   │   ║
║   │ undervalued. It damages team relationships and          │   ║
║   │ prevents effective communication.                       │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ✓ THE CORRECT ANSWER IS:                                │   ║
║   │                                                          │   ║
║   │ A) Ask him about the slang and make it a learning       │   ║
║   │    opportunity.                                         │   ║
║   │                                                          │   ║
║   │ BECAUSE: Asking about the slang makes it a learning     │   ║
║   │ opportunity and promotes cultural understanding and     │   ║
║   │ inclusion in the workplace. Diversity includes          │   ║
║   │ allowing cultural differences to exist and learning     │   ║
║   │ from them. This approach builds stronger teams and      │   ║
║   │ creates a respectful, inclusive environment.            │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │    CONTINUE  →       │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Visual Mockup (Mobile - Portrait - Wrong Answer "B" Selected):**

```
┌─────────────────────────────────┐
│   ⚠️ NOT QUITE RIGHT            │
│      Workspace A                │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ [Illustration: Characters │  │
│  │  showing discomfort]      │  │
│  │                           │  │
│  │  [Raj looking defensive]  │  │
│  │  💭 "Why are they         │  │
│  │     demanding I change?"  │  │
│  │                           │  │
│  │  [Others appearing        │  │
│  │   judgmental]             │  │
│  │                           │  │
│  │    [Orange info icon ⓘ]   │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ WHY THIS ISN'T RIGHT:    │ │
│ │                             │ │
│ │ While it is important to    │ │
│ │ use appropriate language,   │ │
│ │ having diversity includes   │ │
│ │ allowing cultural           │ │
│ │ differences to exist and    │ │
│ │ learning from them. It is   │ │
│ │ not appropriate to make a   │ │
│ │ colleague feel indifferent  │ │
│ │ because of how they speak.  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ✓ THE CORRECT ANSWER IS:    │ │
│ │                             │ │
│ │ A) Ask him about the slang  │ │
│ │    and make it a learning   │ │
│ │    opportunity.             │ │
│ │                             │ │
│ │ BECAUSE: This approach      │ │
│ │ promotes cultural           │ │
│ │ understanding and           │ │
│ │ inclusion. Diversity means  │ │
│ │ allowing cultural           │ │
│ │ differences to exist and    │ │
│ │ learning from them.         │ │
│ └─────────────────────────────┘ │
│                                 │
│    ┌─────────────────────┐      │
│    │   CONTINUE  →       │      │
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

**Alternative Wrong Answer Example (Question 6 - Wrong Answer "C"):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                   ⚠️ NOT QUITE RIGHT                              ║
║                  Manager Office 1                                 ║
╠═══════════════════════════════════════════════════════════════════╣
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: Manager's office, tense atmosphere]     │    ║
║   │                                                         │    ║
║   │   [Rajesh - anxious]       [Supervisor - waiting]      │    ║
║   │   💭 "Maybe if I say       💭 "Where is the project    │    ║
║   │      nothing, they'll          update?"                │    ║
║   │      forget..."                                        │    ║
║   │                                                         │    ║
║   │   [Clock on wall showing deadline passed]    [ⓘ]       │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ⚠️ WHY THIS ANSWER ISN'T RIGHT:                         │   ║
║   │                                                          │   ║
║   │ Ignoring the missed deadline and hoping no one notices  │   ║
║   │ is unprofessional and damages credibility. The missed   │   ║
║   │ deadline will likely be noticed, which can severely     │   ║
║   │ damage trust with your team and supervisor. Avoiding    │   ║
║   │ accountability creates bigger problems later.           │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │ ✓ THE CORRECT ANSWER IS:                                │   ║
║   │                                                          │   ║
║   │ A) Take responsibility, inform his supervisor, explain  │   ║
║   │    the reason for the delay, and propose a plan to      │   ║
║   │    complete the project as soon as possible.            │   ║
║   │                                                          │   ║
║   │ BECAUSE: Taking responsibility and communicating        │   ║
║   │ promptly shows integrity and professionalism. By        │   ║
║   │ informing your supervisor and proposing a solution,     │   ║
║   │ you demonstrate accountability and commitment to        │   ║
║   │ making things right. This approach maintains trust and  │   ║
║   │ allows for collaborative problem-solving.               │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │    CONTINUE  →       │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Color Coding:**

- Orange/Yellow (#FF9800) for "Not Quite Right" header
- Orange tint for info icon and "Why This Isn't Right" section
- Green (#4CAF50) for "The Correct Answer" section
- Neutral gray for character thought bubbles showing negative outcomes

---

### 4.6 Completion Screen

**Elements:**

- Congratulatory message: "Well Done! You've completed all scenarios!"
- Summary:
  - "You answered X/10 correctly on first attempt"
  - Key takeaways/learning points (bullet list)
- Company message: "You're now ready to be part of our team at [Company Name]!"
- Buttons:
  - "Review Answers" - return to floor plan with all rooms unlocked
  - "Restart Game" - begin again
  - "Share Certificate" (optional - generates completion certificate)

**Visual Mockup (Desktop):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                        🎉 CONGRATULATIONS! 🎉                     ║
║                                                                   ║
║              You've Completed All Workplace Scenarios!            ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   ┌─────────────────────────────────────────────────────────┐    ║
║   │  [Illustration: Office with all team members           │    ║
║   │   celebrating together]                                │    ║
║   │                                                         │    ║
║   │   [Multiple characters - diverse team, all smiling,    │    ║
║   │    some giving thumbs up, others clapping]             │    ║
║   │                                                         │    ║
║   │   [Banner: "Welcome to the Team!"]                     │    ║
║   │                                                         │    ║
║   │   [Trophy icon] [Star icons around characters]         │    ║
║   │                                                         │    ║
║   └─────────────────────────────────────────────────────────┘    ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │                    YOUR RESULTS                          │   ║
║   │                                                          │   ║
║   │    📊 Score: 8/10 correct on first attempt              │   ║
║   │    ⭐ Excellent understanding of workplace etiquette!    │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │               KEY TAKEAWAYS YOU'VE LEARNED:              │   ║
║   │                                                          │   ║
║   │  ✓ Cultural sensitivity promotes team inclusion         │   ║
║   │  ✓ Clear communication prevents misunderstandings       │   ║
║   │  ✓ Accountability builds trust and credibility          │   ║
║   │  ✓ Respectful interruptions maintain meeting flow       │   ║
║   │  ✓ Professional greetings create positive impressions   │   ║
║   │  ✓ Body language communicates as much as words          │   ║
║   │  ✓ Addressing conflicts promptly prevents escalation    │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │  "You're now ready to be part of our team at            │   ║
║   │   Tasty Bites Foods! You've demonstrated excellent      │   ║
║   │   understanding of professional workplace etiquette."   │   ║
║   │                                                          │   ║
║   │           - From all of us at Tasty Bites Foods         │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║        ┌────────────────────┐    ┌────────────────────┐          ║
║        │  📖 REVIEW ANSWERS │    │  🔄 RESTART GAME   │          ║
║        └────────────────────┘    └────────────────────┘          ║
║                                                                   ║
║                   ┌──────────────────────┐                        ║
║                   │  📜 SHARE CERTIFICATE│                        ║
║                   └──────────────────────┘                        ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Visual Mockup (Mobile - Portrait):**

```
┌─────────────────────────────────┐
│                                 │
│   🎉 CONGRATULATIONS! 🎉        │
│                                 │
│  You've Completed All           │
│  Workplace Scenarios!           │
│                                 │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ [Illustration: Team       │  │
│  │  celebrating together]    │  │
│  │                           │  │
│  │  [Characters smiling,     │  │
│  │   thumbs up, clapping]    │  │
│  │                           │  │
│  │  [Trophy] [Stars]         │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │      YOUR RESULTS           │ │
│ │                             │ │
│ │ 📊 Score: 8/10 correct      │ │
│ │    on first attempt         │ │
│ │                             │ │
│ │ ⭐ Excellent understanding  │ │
│ │    of workplace etiquette!  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │   KEY TAKEAWAYS LEARNED:    │ │
│ │                             │ │
│ │ ✓ Cultural sensitivity      │ │
│ │   promotes inclusion        │ │
│ │                             │ │
│ │ ✓ Clear communication       │ │
│ │   prevents issues           │ │
│ │                             │ │
│ │ ✓ Accountability builds     │ │
│ │   trust                     │ │
│ │                             │ │
│ │ ✓ Respectful interruptions  │ │
│ │   maintain flow             │ │
│ │                             │ │
│ │ ✓ Professional greetings    │ │
│ │   create good impressions   │ │
│ │                             │ │
│ │ ✓ Body language matters     │ │
│ │                             │ │
│ │ ✓ Address conflicts         │ │
│ │   promptly                  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ "You're now ready to be     │ │
│ │ part of our team at Tasty   │ │
│ │ Bites Foods!"               │ │
│ │                             │ │
│ │ - From all of us at         │ │
│ │   Tasty Bites Foods         │ │
│ └─────────────────────────────┘ │
│                                 │
│  ┌────────────────────────┐     │
│  │ 📖 REVIEW ANSWERS      │     │
│  └────────────────────────┘     │
│                                 │
│  ┌────────────────────────┐     │
│  │ 🔄 RESTART GAME        │     │
│  └────────────────────────┘     │
│                                 │
│  ┌────────────────────────┐     │
│  │ 📜 SHARE CERTIFICATE   │     │
│  └────────────────────────┘     │
│                                 │
└─────────────────────────────────┘
```

**Completion Certificate Modal (When "Share Certificate" clicked):**

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                    [X Close]       ║
║   ┌──────────────────────────────────────────────────────────┐    ║
║   │                                                          │    ║
║   │              ┌────────────────────────┐                 │    ║
║   │              │  [Company Logo]        │                 │    ║
║   │              └────────────────────────┘                 │    ║
║   │                                                          │    ║
║   │                CERTIFICATE OF COMPLETION                │    ║
║   │                                                          │    ║
║   │              Workplace Etiquette Training               │    ║
║   │                                                          │    ║
║   │  ═══════════════════════════════════════════════════    │    ║
║   │                                                          │    ║
║   │              This certifies that                        │    ║
║   │                                                          │    ║
║   │              [PARTICIPANT NAME]                         │    ║
║   │                                                          │    ║
║   │        has successfully completed the                   │    ║
║   │        Workplace Etiquette Challenge                    │    ║
║   │                                                          │    ║
║   │        demonstrating excellent understanding of         │    ║
║   │        professional workplace conduct and etiquette     │    ║
║   │                                                          │    ║
║   │              Score: 8/10 (80%)                          │    ║
║   │              Date: December 9, 2025                     │    ║
║   │                                                          │    ║
║   │              ┌─────────────────┐                        │    ║
║   │              │   [Signature]   │                        │    ║
║   │              └─────────────────┘                        │    ║
║   │              Tasty Bites Foods                          │    ║
║   │                                                          │    ║
║   │  ═══════════════════════════════════════════════════    │    ║
║   │                                                          │    ║
║   └──────────────────────────────────────────────────────────┘    ║
║                                                                   ║
║        ┌──────────────────┐          ┌──────────────────┐        ║
║        │  💾 DOWNLOAD PDF │          │  📤 SHARE IMAGE  │        ║
║        └──────────────────┘          └──────────────────┘        ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Alternative Results Display (For Perfect Score):**

```
┌─────────────────────────────────────────┐
│           YOUR RESULTS                  │
│                                         │
│   🏆 PERFECT SCORE! 10/10 🏆           │
│                                         │
│   Outstanding! You answered every       │
│   question correctly on the first       │
│   attempt. You have exceptional         │
│   understanding of workplace etiquette! │
│                                         │
│   ⭐⭐⭐⭐⭐                             │
└─────────────────────────────────────────┘
```

**Review Answers State (After clicking "Review Answers"):**
Returns to the floor plan screen with:

- All rooms unlocked
- All rooms marked with checkmarks
- Small icons showing correct/incorrect on first attempt
- Clicking any room shows the question with the user's answer highlighted and correct answer shown

---

## 5. Question-to-Room Mapping

### Room 1: Cubicle Cluster 1 (4-person workspace)

**Question 1:** Raj using local slang in multicultural team
**Characters:** 4 diverse team members at desks
**Visual:** Open workspace with computers, one person speaking

### Room 2: Cubicle Cluster 2 (4-person workspace)

**Question 2:** Body language - folded arms and avoiding eye contact
**Characters:** 2 people in conversation, one showing closed body language
**Visual:** Cubicle area, focus on the two people

### Room 3: Cubicle Cluster 3 (2-person pod)

**Question 3:** Meena greeting new colleagues with handshake
**Characters:** Meena standing, new colleague, observer
**Visual:** Introduction scene at workspace

### Room 4: Cubicle Cluster 4 (2-person pod)

**Question 10:** Ravi's colleague who never says thank you/please
**Characters:** 2 colleagues, one appearing frustrated/distant
**Visual:** Workspace interaction showing lack of courtesy

### Room 5: Small Meeting Room

**Question 5:** Adding a point while someone else is speaking
**Characters:** 4-5 people around small table, one speaking, player considering interruption
**Visual:** Intimate meeting setting

### Room 6: Conference Room

**Question 9:** Chairperson starts late and skips agenda
**Characters:** 6-8 people around conference table, confused expressions
**Visual:** Formal meeting room, clock showing late time

### Room 7: Reception Area

**Question 7:** Anil falling asleep, someone on phone in meeting
**Characters:** 3-4 people, one sleeping, one on phone, receptionist visible
**Visual:** Reception with seating, meeting visible through glass

### Room 8: Seating/Waiting Area

**Question 8:** Priya experiencing coworker yelling at her
**Characters:** 2 people, one visibly upset, others watching uncomfortably
**Visual:** Waiting area with concerned onlookers

### Room 9: Kitchen/Lunch Area

**Question 4:** Celia falsely accusing subordinate (accountability scenario)
**Characters:** Manager and employee having conversation, others in background
**Visual:** Kitchen with lunch table, coffee area

### Room 10: Individual Cabin (Manager's Office)

**Question 6:** Rajesh missing important deadline
**Characters:** Rajesh and supervisor in office
**Visual:** Manager's cabin with desk, computer, charts on wall

---

## 6. User Interface Elements

### 6.1 Navigation

- **Back Button:** Always visible in top-left (returns to previous screen)
- **Menu/Settings:** Top-right (access sound, language, restart options)
- **Progress Bar:** Shows completion status

### 6.2 Typography

- **Font:** Clear, sans-serif font (e.g., Open Sans, Noto Sans)
- **Sizes:**
  - Headers: 24px (mobile), 32px (desktop)
  - Body text: 16px (mobile), 18px (desktop)
  - Buttons: 18px (mobile), 20px (desktop)
- **Language Support:** English primary, option for Hindi/Kannada

### 6.3 Color Palette (Suggested)

- **Primary:** Warm orange/yellow (friendly, food-related)
- **Secondary:** Teal/blue (professional, trustworthy)
- **Success:** Green (#4CAF50)
- **Warning/Incorrect:** Orange (#FF9800) - not harsh red
- **Neutral:** Grays for locked/inactive elements
- **Background:** Off-white/cream (#F5F5F5)

### 6.4 Button Styles

- **Primary Action:** Solid color, rounded corners, shadow
- **Multiple Choice:** Outlined boxes with radio button, full answer text visible
- **Hover/Active State:** Slight scale increase or color darkening

### 6.5 Icons

- Lock icon for locked rooms
- Checkmark for completed rooms
- Back arrow
- Settings gear
- Information icon
- Sound on/off

---

## 7. Character Design Guidelines

### 7.1 Diversity Representation

- Mix of genders (including non-binary representation where appropriate)
- Various skin tones representing Indian diversity
- Different age groups (20s to 50s)
- Various body types
- Different styles of professional attire (traditional and western)

### 7.2 Character Roles (10 recurring characters across scenarios)

1. **Raj** - Young team member, uses local slang
2. **Meena** - Professional woman, demonstrates good etiquette
3. **Celia** - Manager/supervisor, learns accountability
4. **Anil** - Team member with poor meeting etiquette
5. **Priya** - Employee facing workplace conflict
6. **Rajesh** - Employee dealing with deadline pressure
7. **Ravi** - Observant team member
8. **Chairperson** - Senior manager running meetings
   9-10. **Supporting characters** - Fill out teams and scenarios

### 7.3 Visual Style

- Semi-realistic cartoon style
- Expressive facial features
- Clear body language
- Professional Indian workplace attire

---

## 8. Technical Specifications

### 8.1 Platform Requirements

**Mobile:**

- iOS 12+ and Android 8+
- Screen sizes: 4.7" to 6.7"
- Portrait orientation preferred, landscape supported
- Touch-optimized buttons (minimum 44x44px touch targets)

**Desktop:**

- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Responsive design: 1024px to 1920px width
- Mouse/keyboard navigation

### 8.2 Performance

- Fast loading times (under 3 seconds)
- Smooth transitions between screens
- Optimized images (WebP format where supported)
- Minimal data usage for mobile

### 8.3 Accessibility

- Screen reader support
- High contrast mode option
- Text size adjustment
- Keyboard navigation (desktop)
- Clear focus indicators

### 8.4 File Structure

```
/assets
  /images
    /rooms (floor plan and detail views)
    /characters (individual character sprites)
    /ui (icons, buttons, backgrounds)
  /audio (optional - background music, sound effects)
  /fonts
/data
  questions.json (all scenario data)
  config.json (game settings)
```

---

## 9. Content Structure (questions.json)

```json
{
	"questions": [
		{
			"id": 1,
			"room": "cubicle_cluster_1",
			"room_name": "Office Workspace A",
			"scenario": "Raj is in a multicultural team and uses certain local slang words in unofficial conversations that others don't understand.",
			"question": "What should the others do?",
			"options": [
				{
					"id": "a",
					"text": "Ask him about the slang and make it a learning opportunity.",
					"correct": true
				},
				{
					"id": "b",
					"text": "Demand that he use clear, easier-to-understand language",
					"correct": false
				},
				{
					"id": "c",
					"text": "Avoid listening to him when he speaks.",
					"correct": false
				},
				{
					"id": "d",
					"text": "Talk over him so that he doesn't use the slang.",
					"correct": false
				}
			],
			"feedback": {
				"correct_explanation": "Asking about the slang makes it a learning opportunity and promotes cultural understanding and inclusion in the workplace. Diversity includes allowing cultural differences to exist and learning from them.",
				"wrong_explanations": {
					"b": "While it is important to use appropriate language, having diversity includes allowing cultural differences to exist and learning from them; hence, it is not appropriate to make a colleague feel indifferent because of how they speak.",
					"c": "Ignoring someone when they speak is disrespectful and unprofessional.",
					"d": "Talking over someone is rude and disrupts effective communication. It can create a hostile environment and lead to communication gaps."
				}
			},
			"characters": ["raj", "team_member_1", "team_member_2", "team_member_3"]
		}
		// ... additional questions follow same structure
	]
}
```

---

## 10. Animation & Transitions

### 10.1 Screen Transitions

- **Floor Plan to Room:** Zoom-in effect (300ms)
- **Room to Floor Plan:** Zoom-out effect (300ms)
- **Feedback Screens:** Fade-in (200ms)

### 10.2 Interactive Elements

- **Room Unlock:** Brief glow/pulse animation
- **Correct Answer:** Confetti/sparkle effect (subtle)
- **Button Hover:** Slight scale (1.05x) and color change
- **Character Reactions:** Subtle animation when feedback appears

### 10.3 Loading States

- Simple loading spinner between screens
- Progress indicator during initial load

---

## 11. Audio (Optional Enhancement)

### 11.1 Sound Effects

- Button click/tap sound
- Correct answer chime (pleasant, not jarring)
- Room unlock sound
- Completion celebration sound

### 11.2 Background Music

- Soft, unobtrusive instrumental
- Office/workplace ambience
- Mute toggle easily accessible

---

## 12. Development Phases

### Phase 1: Core Mechanics (MVP)

- Floor plan screen with basic navigation
- 3 sample rooms with questions
- Basic feedback system
- Mobile and desktop responsive layout

### Phase 2: Content Complete

- All 10 questions implemented
- All room graphics finalized
- Character illustrations complete
- Full feedback explanations

### Phase 3: Polish & Enhancement

- Animations and transitions
- Sound effects
- Completion screen and certificates
- Accessibility features
- Language options

### Phase 4: Testing & Launch

- User testing with target audience
- Bug fixes and optimization
- Deployment to app stores/web

---

## 13. Future Enhancements (Post-Launch)

- Additional question sets for replay value
- Different difficulty levels
- Multiplayer/competitive mode
- Integration with HR training programs
- Expanded language support (Tamil, Telugu, Malayalam)
- Workplace scenario creator for companies
- Certificate sharing to LinkedIn

---

## 14. Success Metrics

- Completion rate (% of users finishing all 10 questions)
- Average time spent per question
- Accuracy rate (first-attempt correct answers)
- User retention (replay rate)
- Feedback/rating scores
- Knowledge retention (follow-up quiz after 1 week)

---

## 15. Notes for Developers

### 15.1 Key Considerations

- Ensure speech bubbles are dynamic and adjust to text length
- Implement proper text wrapping for long answers on mobile
- Test thoroughly on devices with basic processing power
- Consider offline mode for low-connectivity areas
- Ensure graceful degradation if images fail to load

### 15.2 Localization Ready

- All text should be externalized for easy translation
- Support for right-to-left languages if expanding
- Cultural sensitivity review for each market

### 15.3 Data Privacy

- No personal data collection required
- Optional: Anonymous usage analytics
- GDPR/data protection compliance

## 16. Additional Screen Mockups

### 16.1 Settings/Menu Screen

**Visual Mockup:**

```
╔═══════════════════════════════════════════╗
║  X Close              SETTINGS            ║
╠═══════════════════════════════════════════╣
║                                           ║
║   AUDIO                                   ║
║   ┌─────────────────────────────────────┐ ║
║   │ Sound Effects:    [●────────○] ON   │ ║
║   └─────────────────────────────────────┘ ║
║   ┌─────────────────────────────────────┐ ║
║   │ Background Music: [○────────●] OFF  │ ║
║   └─────────────────────────────────────┘ ║
║                                           ║
║   LANGUAGE                                ║
║   ┌─────────────────────────────────────┐ ║
║   │ [✓] English                         │ ║
║   │ [ ] हिंदी (Hindi)                   │ ║
║   │ [ ] ಕನ್ನಡ (Kannada)                  │ ║
║   └─────────────────────────────────────┘ ║
║                                           ║
║   ACCESSIBILITY                           ║
║   ┌─────────────────────────────────────┐ ║
║   │ High Contrast Mode:   [○] OFF       │ ║
║   │ Text Size:   [ - ]  Medium  [ + ]   │ ║
║   └─────────────────────────────────────┘ ║
║                                           ║
║   GAME                                    ║
║   ┌─────────────────────────────────────┐ ║
║   │ Reset Progress                      │ ║
║   └─────────────────────────────────────┘ ║
║                                           ║
║   ABOUT                                   ║
║   ┌─────────────────────────────────────┐ ║
║   │ Version 1.0                         │ ║
║   │ © 2025 Tasty Bites Foods            │ ║
║   │ Developed for workplace training    │ ║
║   └─────────────────────────────────────┘ ║
║                                           ║
║         ┌─────────────────┐               ║
║         │   SAVE & CLOSE  │               ║
║         └─────────────────┘               ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

### 16.2 Tips/Help Screen

**Visual Mockup:**

```
╔═══════════════════════════════════════════════════════════════════╗
║  X Close                     TIPS & HELP                          ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   HOW TO PLAY:                                                    ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │                                                          │   ║
║   │ 1. 🏢 Navigate the office floor plan                    │   ║
║   │    Tap or click on available rooms to enter             │   ║
║   │                                                          │   ║
║   │ 2. 📖 Read each workplace scenario                      │   ║
║   │    Carefully consider the situation presented           │   ║
║   │                                                          │   ║
║   │ 3. 🤔 Choose the best response                          │   ║
║   │    Select from 4 multiple-choice options                │   ║
║   │                                                          │   ║
║   │ 4. 💡 Learn from feedback                               │   ║
║   │    Understand why answers are right or wrong            │   ║
║   │                                                          │   ║
║   │ 5. 🔓 Unlock new rooms                                  │   ║
║   │    Progress through all 10 scenarios                    │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   KEY ICONS:                                                      ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │  ✨  Available room (tap to enter)                       │   ║
║   │  🔒  Locked room (complete previous rooms first)         │   ║
║   │  ✓   Completed room                                      │   ║
║   │  💼  Workspace/Desk area                                 │   ║
║   │  ⚙️   Settings menu                                      │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║   LEARNING TIPS:                                                  ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │  • There are no penalties for wrong answers              │   ║
║   │  • Read explanations carefully to learn                  │   ║
║   │  • You can review all answers at the end                 │   ║
║   │  • Take your time with each scenario                     │   ║
║   │  • Think about how you'd handle similar situations       │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │   GOT IT, LET'S GO!  │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### 16.3 Pause/Menu Overlay (During Gameplay)

**Visual Mockup:**

```
┌─────────────────────────────────┐
│  ← BACK TO GAME                 │
├─────────────────────────────────┤
│                                 │
│        GAME PAUSED              │
│                                 │
│   ┌─────────────────────────┐   │
│   │  📖 REVIEW PROGRESS     │   │
│   │                         │   │
│   │  Completed: 3/10        │   │
│   │  Current: Workspace B   │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │  💡 TIPS & HELP         │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │  ⚙️  SETTINGS           │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │  🔄 RESTART GAME        │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │  🏠 EXIT TO MAIN MENU   │   │
│   └─────────────────────────┘   │
│                                 │
│        ┌─────────────┐           │
│        │  CONTINUE   │           │
│        └─────────────┘           │
│                                 │
└─────────────────────────────────┘
```

---

### 16.4 Loading Screen

**Visual Mockup:**

```
┌─────────────────────────────────┐
│                                 │
│    [Company Logo/Icon]          │
│                                 │
│    WORKPLACE ETIQUETTE          │
│       CHALLENGE                 │
│                                 │
│      [Loading spinner]          │
│                                 │
│      Loading...                 │
│                                 │
│  [Progress bar: ▰▰▰▰▰▱▱▱▱▱]    │
│                                 │
│   Preparing your office         │
│   environment...                │
│                                 │
└─────────────────────────────────┘
```

---

### 16.5 Error/Connection Lost Screen

**Visual Mockup:**

```
┌─────────────────────────────────┐
│                                 │
│        ⚠️ OOPS!                │
│                                 │
│   Something went wrong          │
│                                 │
│  ┌───────────────────────────┐  │
│  │ [Illustration: Character  │  │
│  │  looking at broken        │  │
│  │  computer/confused]       │  │
│  └───────────────────────────┘  │
│                                 │
│  We couldn't load the game.     │
│  Please check your internet     │
│  connection and try again.      │
│                                 │
│    ┌─────────────────────┐      │
│    │    TRY AGAIN        │      │
│    └─────────────────────┘      │
│                                 │
│    ┌─────────────────────┐      │
│    │  BACK TO MAIN MENU  │      │
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

---

### 16.6 Confirmation Dialog (Reset Progress)

**Visual Mockup:**

```
╔═══════════════════════════════════════════╗
║                                           ║
║   ⚠️  RESET PROGRESS?                     ║
║                                           ║
║   Are you sure you want to reset your     ║
║   game progress? This will:               ║
║                                           ║
║   • Delete all completed scenarios        ║
║   • Reset your score to 0/10              ║
║   • Return you to the beginning           ║
║                                           ║
║   This action cannot be undone.           ║
║                                           ║
║   ┌─────────────┐   ┌─────────────┐      ║
║   │   CANCEL    │   │  YES, RESET │      ║
║   └─────────────┘   └─────────────┘      ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

### 16.7 First-Time Tutorial Overlay (Optional)

**Shows on first launch, overlaid on floor plan:**

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   [Semi-transparent dark overlay on floor plan]                   ║
║                                                                   ║
║                  👋 WELCOME TO YOUR FIRST DAY!                    ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │                                                          │   ║
║   │  Let's take a quick tour of the office!                 │   ║
║   │                                                          │   ║
║   │  [Spotlight on Workspace A - glowing]                   │   ║
║   │                                                          │   ║
║   │  ⬇️                                                      │   ║
║   │                                                          │   ║
║   │  This is your first workplace scenario.                 │   ║
║   │  Tap on it to begin learning about                      │   ║
║   │  professional workplace etiquette!                      │   ║
║   │                                                          │   ║
║   │  As you complete each scenario, new                     │   ║
║   │  areas of the office will unlock.                       │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │   GOT IT, LET'S GO!  │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
║                  [ ] Don't show this again                        ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### 16.8 Progress Summary (Mid-Game Check-in after 5 questions)

**Visual Mockup:**

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                   🎯 HALFWAY THERE!                               ║
║                                                                   ║
║              You've completed 5 out of 10 scenarios               ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   YOUR PROGRESS SO FAR:                                           ║
║                                                                   ║
║   ┌──────────────────────────────────────────────────────────┐   ║
║   │                                                          │   ║
║   │   📊 Correct on First Attempt: 4/5 (80%)                │   ║
║   │                                                          │   ║
║   │   ⭐ You're doing great!                                 │   ║
║   │                                                          │   ║
║   │   TOPICS COVERED:                                        │   ║
║   │   ✓ Cultural Sensitivity                                │   ║
║   │   ✓ Professional Communication                          │   ║
║   │   ✓ Meeting Etiquette                                   │   ║
║   │   ✓ Greetings & First Impressions                       │   ║
║   │   ✓ Accountability                                      │   ║
║   │                                                          │   ║
║   │   STILL TO LEARN:                                        │   ║
║   │   • Handling Conflicts                                  │   ║
║   │   • Body Language                                       │   ║
║   │   • Team Collaboration                                  │   ║
║   │   • Time Management                                     │   ║
║   │   • Workplace Courtesy                                  │   ║
║   │                                                          │   ║
║   └──────────────────────────────────────────────────────────┘   ║
║                                                                   ║
║                  ┌──────────────────────┐                         ║
║                  │   CONTINUE LEARNING  │                         ║
║                  └──────────────────────┘                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## 17. Responsive Design Examples

### 17.1 Tablet View (Landscape - 1024x768)

The game adapts to show:

- Floor plan takes up 60% of screen width
- Larger touch targets (60px minimum)
- Side-by-side layout for question screens (illustration left, questions right)
- All UI elements scaled appropriately

### 17.2 Small Mobile Screens (320px width)

- Vertical scrolling enabled for longer content
- Collapsible sections for explanations
- Simplified floor plan with less detail but clear labels
- Larger font sizes (minimum 14px for body text)

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Prepared for:** Solidarity Foundation Workplace Etiquette Game Project
