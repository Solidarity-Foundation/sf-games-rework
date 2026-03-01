# Financial Literacy Game — Design & Implementation Plan

## 1. Overview

An interactive story-driven financial literacy game where players guide characters through real-life financial dilemmas. Each character has a unique background, goals, and a timeline to achieve them. The player makes choices at critical moments, and the game tracks financial state (savings, assets, debt) dynamically based on those choices.

**Two playable characters:**

| | Susheela | Imran |
|---|---|---|
| **Status** | Fully designed (10 scenarios) | Story TBD — placeholder for now |
| **Age at start** | 29 | TBD |
| **Background** | Transwoman, beauty services provider in Bangalore | TBD |
| **Goals** | (1) Priya's education through college, (2) Buy retirement house | TBD |
| **Timeline** | 18 years (age 29 → 47) | TBD |
| **Scenarios** | 10 | TBD |

**Scoring:** +30 (excellent), +10 (moderate), -20 (poor) per scenario. Max possible: 300 points.

---

## 2. Color Palette & Visual Identity

| Element | Color |
|---|---|
| Home screen card | `bg-[#f5d9a8]` (peach) |
| Game background | Dark charcoal `#1a1a2e` to `#16213e` gradient (per wireframes) |
| Card borders | White/cream `#f0e6d3` with rounded corners |
| Accent / buttons | Warm gold `#d4a574` or amber `#f5a623` |
| Positive feedback | Green `#22c55e` |
| Negative feedback | Red/coral `#ef4444` |
| Moderate feedback | Amber `#f59e0b` |
| Text on dark bg | White `#ffffff` and cream `#f0e6d3` |

---

## 3. Screens & Game Flow

### Screen 1: Avatar Selection Screen (`/financial-literacy`)

**Layout (per wireframe image 1):**
- Dark background
- Sticky header with:
  - Home button (left)
  - Title centered: "Financial Literacy Game" / "ಹಣಕಾಸು ಸಾಕ್ಷರತೆ ಆಟ"
  - **Language toggle (right):** EN / ಕನ್ನಡ pill buttons (same pattern as Workplace and PoSH games — stored in Zustand, persists across all screens)
- Subtitle: "Choose your player" / "ನಿಮ್ಮ ಆಟಗಾರನನ್ನು ಆರಿಸಿ"
- Two character cards stacked vertically:

**Susheela's card:**
- Left side: Background info box with rounded border
  - Name: SUSHEELA / ಸುಶೀಲಾ
  - Background info summary (1-2 lines, language-aware)
  - Goals: "Child's education, save for retirement" / "ಮಗುವಿನ ಶಿಕ್ಷಣ, ನಿವೃತ್ತಿಗಾಗಿ ಉಳಿತಾಯ"
  - Timeframe: "18 years" / "18 ವರ್ಷಗಳು"
- Right side: Character portrait (`src/assets/financial/susheela.png`)
- "Select Player" / "ಆಟಗಾರನನ್ನು ಆರಿಸಿ" button at bottom-right of card

**Imran's card (placeholder):**
- Same layout structure
- Grayed out or with "Coming Soon" / "ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ" badge
- Non-interactive until Imran's story is added

**Language toggle behavior:** Same EN / ಕನ್ನಡ pill-button pattern used in Workplace and PoSH games. Language state is stored in Zustand and affects all screens — avatar selection, character detail, scenario text, choices, feedback, results, and review.

---

### Screen 2: Character Detail Screen (`/financial-literacy/character/:characterId`)

**Layout (per wireframe image 2):**
- Dark background
- Left panel: Detailed story box with rounded border
  - Full background narrative
  - Detailed goals with specific amounts
  - Starting financial position (income, expenses breakdown)
  - Community context and family obligations
- Right panel:
  - Character name (large)
  - Full character portrait image (larger than selection screen)
- Bottom-right: "Start Game" and "Go Back" buttons

**Susheela's detail content:**
> Susheela is a 29-year-old transwoman from rural Tamil Nadu who moved to Bangalore at 19 after family rejection. She runs a small beauty services business from home, earning ₹18,000/month. She has informally adopted Priya (7), daughter of a deceased friend, and secretly supports her mother back in the village. She is part of the local hijra community under guru Lakshmi. She is diabetic and needs ₹2,000/month for medication.
>
> **Goals:**
> 1. Support Priya's education through college
> 2. Buy a small house in outskirts of Bengaluru by age 50
>
> **Starting position:** ₹18,000/month income, ₹17,500/month obligations, ₹0 savings

---

### Screen 3: Scenario Screen (`/financial-literacy/scenario/:scenarioId`)

**Layout (per wireframe image 3):**

**Top section (side by side):**
- Left: Scenario illustration (placeholder for now — per-scenario images TBD)
- Right column:
  - Current Score badge (e.g., "Score: 40")
  - Scenario number badge (e.g., "Scenario 3 of 10")
  - Current Savings/Assets box (dynamically updated)
  - Two goal icons side by side:
    - House icon: progress indicator (fill/color based on proximity to house goal)
    - Graduation cap icon: progress indicator (fill/color based on education goal status)

**Middle section:**
- Scenario description text box (with rounded border)
- Dilemma question text box (highlighted, below description)

**Bottom section:**
- "Make Your Choice" button — when tapped, reveals the choice slider
- Choice slider: Shows one choice at a time (A, B, or C)
  - Left arrow to go to previous choice
  - Right arrow to go to next choice
  - Choice text displayed in a bordered card
  - "Select This Choice" / "Lock In" button on the currently visible choice

---

### Screen 4: Feedback Screen (`/financial-literacy/feedback/:scenarioId`)

**Full dedicated screen shown after player locks in a choice.**

**Layout:**
- Character portrait (small) + scenario title at top
- Score change animation:
  - Green up arrow + "+30" for excellent
  - Amber arrow + "+10" for moderate
  - Red down arrow + "-20" for poor
- Updated total score display
- Feedback text box:
  - Choice label (e.g., "You chose: Choice B")
  - Financial impact explanation
  - Updated savings/assets breakdown
  - Educational insight (what this teaches about financial literacy)
- Goal progress update:
  - House icon with updated status
  - Graduation cap icon with updated status
- "Next Scenario" button (or "See Results" on scenario 10)

---

### Screen 5: Results Screen (`/financial-literacy/results`)

- Final score and level title
- Character ending narrative (based on cumulative choices)
- Goal achievement summary:
  - House: Achieved / Partially Achieved / Not Achieved
  - Education: Achieved / Partially Achieved / Not Achieved
- Financial journey timeline (visual summary of all 10 decisions)
- Level badge and message
- "Play Again" and "Review Answers" buttons

---

### Screen 6: Review Screen (`/financial-literacy/review`)

- All 10 scenarios listed with:
  - Scenario title and number
  - Player's choice highlighted
  - Correct (best) choice marked with green badge
  - Points earned/lost per scenario
  - Brief explanation of why the best choice was optimal

---

## 4. Routing Map

```
/financial-literacy                          → Avatar Selection Screen
/financial-literacy/character/:characterId   → Character Detail Screen
/financial-literacy/scenario/:scenarioId     → Scenario Screen (1-10)
/financial-literacy/feedback/:scenarioId     → Feedback Screen (after each choice)
/financial-literacy/results                  → Final Results
/financial-literacy/review                   → Review All Answers
```

---

## 5. File Structure

```
src/
├── pages/financiallit/
│   ├── FinancialLiteracy.tsx       # MODIFY — Avatar Selection Screen (replace ComingSoon)
│   ├── FinancialCharacter.tsx      # NEW — Character Detail Screen
│   ├── FinancialScenario.tsx       # NEW — Scenario Screen (thin wrapper)
│   ├── FinancialFeedback.tsx       # NEW — Feedback Screen (thin wrapper)
│   ├── FinancialResults.tsx        # NEW — Results Screen (thin wrapper)
│   ├── FinancialReview.tsx         # NEW — Review Screen (thin wrapper)
│   └── GameFlow.md                 # EXISTS — Story/scenario source
├── components/financial/
│   ├── AvatarSelectionScreen.tsx    # NEW — Avatar selection UI
│   ├── CharacterDetailScreen.tsx   # NEW — Character detail UI
│   ├── ScenarioScreen.tsx          # NEW — Scenario gameplay UI
│   ├── ChoiceSlider.tsx            # NEW — Swipeable choice carousel
│   ├── FeedbackScreen.tsx          # NEW — Post-choice feedback UI
│   ├── ResultsScreen.tsx           # NEW — Final results UI
│   ├── ReviewScreen.tsx            # NEW — Answer review UI
│   ├── GoalProgressIcons.tsx       # NEW — House + graduation cap indicators
│   ├── SavingsAssetsBox.tsx        # NEW — Current financial state display
│   ├── financialStore.ts           # NEW — Zustand store
│   ├── gamedata.json               # NEW — All scenario data (structured)
│   └── resultlevels.ts             # NEW — Score-to-level calculation
├── assets/financial/
│   ├── susheela.png                # EXISTS — Susheela's portrait
│   ├── house-icon.png              # EXISTS — House goal icon
│   ├── education-icon.png          # EXISTS — Education/graduation cap goal icon
│   ├── imran.png                   # TBD — Imran's portrait (when story is ready)
│   └── scenario-illustrations/     # TBD — Per-scenario images
│       ├── susheela-s1.png
│       ├── susheela-s2.png
│       └── ... (s3-s10)
└── App.tsx                         # MODIFY — Add new routes
```

---

## 6. Zustand Store (`financialStore.ts`)

```typescript
interface FinancialState {
  // Character selection
  selectedCharacter: 'susheela' | 'imran' | null;

  // Game progression
  currentScenario: number;        // 1-10
  completedScenarios: number[];
  gameStarted: boolean;

  // Scoring
  score: number;                  // Cumulative points
  choiceHistory: Record<number, {
    choiceIndex: number;          // 0=A, 1=B, 2=C
    points: number;               // +30, +10, or -20
  }>;

  // Dynamic financial state (Susheela)
  savings: number;                // Current liquid savings in ₹
  monthlyIncome: number;          // Current monthly income
  monthlyExpenses: number;        // Current monthly expenses
  monthlySavingsRate: number;     // income - expenses
  assets: Asset[];                // Land, gold, business, etc.
  debts: Debt[];                  // Active loans/debts
  age: number;                    // Current age in story

  // Goal tracking
  houseGoalProgress: number;      // 0-100%
  educationGoalProgress: number;  // 0-100%
  houseGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';
  educationGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';

  // Language
  language: 'en' | 'kan';

  // Actions
  selectCharacter: (id: 'susheela' | 'imran') => void;
  startGame: () => void;
  resetGame: () => void;
  setLanguage: (lang: 'en' | 'kan') => void;
  makeChoice: (scenarioId: number, choiceIndex: number) => void;
}

interface Asset {
  type: 'land' | 'gold' | 'business' | 'ppf' | 'mutual-fund' | 'rd' | 'fd' | 'emergency-fund';
  label: string;
  value: number;           // Current value in ₹
  acquiredInScenario: number;
}

interface Debt {
  type: 'personal-loan' | 'community-loan' | 'business-loan' | 'education-loan';
  label: string;
  principal: number;
  interestRate: number;    // Annual %
  monthlyEmi: number;
  remainingAmount: number;
  takenInScenario: number;
}
```

---

## 7. Dynamic Financial State — Scenario-by-Scenario Branching

This is the core of the game. Each choice modifies the financial state differently. Below is the complete state transition for every choice in every scenario.

### Starting State (Scenario 1 opens with):
```
savings: 0
monthlyIncome: 18000
monthlyExpenses: 17500
monthlySavingsRate: 500
assets: []
debts: []
age: 29
houseGoalProgress: 0
educationGoalProgress: 5   // Priya is in school
```

---

### Scenario 1: The First Stable Income and Community Obligations

**Age:** 29 | **Time period covered:** ~1.8 years until next scenario

| | Choice A (+10) | Choice B (+30) | Choice C (-20) |
|---|---|---|---|
| **Description** | Take extra sex work for ₹5K more/month | Negotiate obligations, save ₹4K/month | Support everyone, save nothing |
| **Monthly income** | 23,000 (18K + 5K extra) | 18,000 | 18,000 |
| **Monthly expenses** | 19,500 (obligations + Meena ₹2K) | 14,000 (reduced guru ₹1.5K, mother ₹1K, Meena ₹1K) | 19,500 (all obligations + Meena ₹2K) |
| **Monthly savings** | 3,500 (but medical costs rise) | 4,000 | 0 |
| **Savings after 1.8yr** | ~₹60,000 (reduced by extra medical) | ₹86,400 | ₹0 |
| **Health impact** | Medical costs increase to ₹3,000/month | Stable at ₹2,000/month | Stable at ₹2,000/month |
| **Goal impact** | House: slow start. Education: on track | House: good start. Education: on track | House: no progress. Education: at risk |

**Feedback responses:**

**Choice A feedback:**
> "You're working harder to save, but the extra work puts your health at risk. Your diabetes medication costs have already gone up to ₹3,000/month. Sometimes earning more isn't the answer — spending wisely is."
>
> **Financial lesson:** Increasing income through unsafe work can lead to higher medical costs that eat into savings. Negotiate existing obligations first.

**Choice B feedback:**
> "Smart thinking! By respectfully negotiating your obligations, you found ₹4,000/month to save without taking on dangerous work. Guru Lakshmi understood — community support should not come at the cost of your family's future. You still helped Meena with ₹1,000."
>
> **Financial lesson:** Budgeting means prioritizing. Reducing some obligations to create savings capacity is a wise first step toward financial security.

**Choice C feedback:**
> "Your generosity is admirable, but with zero savings, one emergency could push you into debt. Priya's education and your retirement house need a financial foundation. Community duty is important, but so is planning for your own family's future."
>
> **Financial lesson:** Saving even a small amount regularly is the foundation of financial security. Without savings, goals remain dreams.

---

### Scenario 2: The Police Raid and Legal Harassment

**Age:** 30.8 | **Arriving savings:** Depends on Scenario 1 choice

| | Choice A (+10) | Choice B (+30) | Choice C (-20) |
|---|---|---|---|
| **Description** | Pay ₹6K bribe + shop deposit, borrow ₹5K | Pay ₹8K bribe, skip shop, seek legal aid | Refuse bribe, spend ₹15K on lawyer |
| **Savings change** | -₹16,000 (bribe + deposit) | -₹8,000 | -₹15,000 |
| **New debt** | ₹5,000 at 24% annual | None | None |
| **Monthly income** | → ₹30,000 (shop upgrade) | Stays same | Stays same (shop lost) |
| **Monthly expenses** | +₹6,000 rent + loan repayment | Same | Same + ongoing harassment costs |
| **Savings after 1.8yr** | Higher income offsets debt, net positive | Steady saving continues | Depleted, stuck |

**Feedback responses:**

**Choice A feedback:**
> "You got the shop and your income jumped to ₹30,000! But borrowing from a moneylender at 24% interest is expensive — that ₹5,000 loan will cost you ₹6,200 by year end. The shop was a good investment, but the moneylender was not the best way to fund it."
>
> **Financial lesson:** Business investment can be wise, but high-interest borrowing erodes profits. Always compare the cost of borrowing against the expected return.

**Choice B feedback:**
> "Paying the bribe was unfortunate but pragmatic — it removed immediate danger. By seeking free legal aid, you're building long-term protection. Your savings took a small hit but you avoided debt and can continue building steadily. The shop opportunity will come again."
>
> **Financial lesson:** Sometimes protecting what you have is more important than chasing growth. Avoiding debt while maintaining savings capacity is a strong financial position.

**Choice C feedback:**
> "Standing on principle is admirable, but the legal battle has drained your savings and the harassment continues. The lawyer's case could take years, and you lost the shop opportunity. In financial emergencies, pragmatism often serves better than principle."
>
> **Financial lesson:** Legal fights are expensive and unpredictable. Sometimes the financially smart choice is to minimize losses and protect your savings for bigger goals.

---

### Scenario 3: Identity Documents and Banking Access

**Age:** 32.6 | **Arriving savings:** Depends on S1+S2 choices

| | Choice A (+30) | Choice B (-20) | Choice C (+10) |
|---|---|---|---|
| **Description** | Documents ₹12K + borrow ₹8K for mother | Skip docs, ₹13K for family | Docs ₹12K + mother ₹8K + reduced Priya expenses |
| **Savings change** | -₹12,000 | -₹13,000 | -₹22,000 |
| **New debt** | ₹8,000 at 15% (community lender) | None | None |
| **Banking access** | YES — formal banking, Mudra loan eligible | NO — remains excluded | YES — formal banking |
| **Income potential** | Unlocks growth (future income boost) | Capped at current level | Unlocks growth |
| **Family needs** | Mother treated (via loan), Priya adjusted | Both fully met | Both met (Priya reduced) |

**Feedback responses:**

**Choice A feedback:**
> "This is a transformative decision! With proper identity documents, you can finally open a bank account, access government schemes like the Mudra loan, and rent better shop space. The ₹8,000 borrowed for your mother's treatment is at a reasonable 15% — much better than a moneylender. This investment in documents will pay for itself many times over."
>
> **Financial lesson:** Identity documents are a financial asset. Access to formal banking, credit, and government schemes can dramatically increase your earning and saving potential.

**Choice B feedback:**
> "Your family's immediate needs are met, but without proper documents you remain locked out of the formal financial system. No bank account means no safe place for savings, no access to affordable credit, and no government schemes. This keeps you financially vulnerable long-term."
>
> **Financial lesson:** Short-term family needs are important, but investing in access to the financial system (banking, credit, insurance) creates long-term security that benefits the whole family.

**Choice C feedback:**
> "You managed to get the documents AND help your mother, though Priya had to make do with old uniforms and second-hand books. The documents open doors to formal banking and government loans. A balanced approach — not perfect, but practical."
>
> **Financial lesson:** When resources are limited, creative budgeting (second-hand items, adjusted expenses) can help you invest in long-term financial access without completely ignoring immediate needs.

---

### Scenario 4: Building Assets — Gold vs. Real Estate vs. Business

**Age:** 34.4 | **Arriving savings:** ~₹3,50,000 (optimal path)

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | Buy land ₹3L + keep ₹50K emergency | Gold ₹2L + community ₹1L + keep ₹50K | Business ₹2L + gold ₹1L + community ₹50K |
| **Savings change** | -₹3,00,000 | -₹3,00,000 | -₹3,00,000 |
| **New assets** | Land worth ₹3L (appreciating) | Gold ₹2L + community stake | Business equipment ₹2L + gold ₹1L |
| **Emergency fund** | ₹50,000 | ₹50,000 | ₹0 (community contribution isn't liquid) |
| **House goal** | Major progress (land = foundation) | Indirect (gold can be sold) | No direct progress |
| **Income change** | Same | Same | Income increases (better equipment) |

**Feedback responses:**

**Choice A feedback:**
> "Excellent! Buying land directly advances your retirement house goal. Land in Bangalore's outskirts is appreciating — your ₹3 lakh investment could be worth ₹5 lakh or more in a few years. And you kept ₹50,000 as an emergency fund — every financial plan needs a safety net."
>
> **Financial lesson:** Appreciating assets (like land) build wealth over time. Always maintain an emergency fund alongside investments. Align investments with your specific goals.

**Choice B feedback:**
> "Gold is a traditional safe investment, and your community contribution shows solidarity. But gold doesn't directly advance your house goal, and the community building fund, while noble, won't give you a home. Your approach is diversified but your primary goal is delayed."
>
> **Financial lesson:** Diversification is good, but ensure your investments align with your specific goals. Traditional investments (gold) may feel safe but don't always serve your unique needs best.

**Choice C feedback:**
> "More business equipment may increase income, but you've invested nothing toward your house. All your money is in the business and gold — neither is a step toward your retirement home. And with no emergency fund, one crisis could unravel everything."
>
> **Financial lesson:** Over-investing in a single asset (business) creates concentration risk. Without an emergency fund, you're vulnerable. Always balance income-generating investments with goal-specific savings.

---

### Scenario 5: Healthcare Crisis and Insurance Barriers

**Age:** 36.2 | **Assets:** Land + ~₹1,50,000 savings (optimal path)

| | Choice A (+30) | Choice B (-20) | Choice C (+10) |
|---|---|---|---|
| **Description** | ₹1L medical fund + community coop + govt scheme | Private insurance ₹15K/year | Self-insure ₹5K/month separate fund |
| **Savings change** | -₹1,03,000 (fund + coop fee) | -₹15,000/year ongoing | Savings split: ₹5K/month to medical |
| **Protection level** | Strong hybrid coverage | Weak (exclusions for trans care) | Moderate (slow to build) |
| **Monthly savings impact** | Reduced by ₹3K/year coop fee | Reduced by ₹1,250/month | Reduced by ₹5K/month |
| **Emergency readiness** | ₹1L dedicated fund + community support | Depends on insurer honoring claims | Slowly building |

**Feedback responses:**

**Choice A feedback:**
> "This hybrid approach is brilliant! The ₹1 lakh emergency fund gives immediate protection, the community health cooperative provides peer support and shared resources, and the government scheme covers major procedures for free. You've built a safety net that doesn't depend on insurance companies that discriminate against you."
>
> **Financial lesson:** When formal insurance is inaccessible or unreliable, create your own safety net: dedicated emergency funds + community cooperatives + government schemes. A hybrid approach often provides better coverage than any single option.

**Choice B feedback:**
> "The insurance company took your ₹15,000 premium, but read the fine print — 'pre-existing conditions excluded,' 'gender-related treatments not covered.' When you actually need care, they're likely to deny your claim. You're paying for protection you may never receive."
>
> **Financial lesson:** Insurance that excludes your actual health needs is wasted money. Before buying insurance, understand exactly what is and isn't covered. If exclusions match your biggest risks, look for alternatives.

**Choice C feedback:**
> "Self-insuring through a dedicated medical fund is a solid idea, but building it at ₹5,000/month means it'll take 20 months to reach ₹1 lakh. What if an emergency hits before then? The approach is right but the pace is too slow for adequate protection."
>
> **Financial lesson:** Medical self-insurance works, but you need to reach a meaningful amount quickly. Consider combining a smaller dedicated fund with community resources or government schemes for faster coverage.

---

### Scenario 6: Priya's Education and Future Planning

**Age:** 38 | **Assets:** Land (₹5L value) + ₹2,80,000 savings | **Priya is 16**

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | Sell land ₹5L, use ₹3L for education, save ₹10K/month | Keep land, use savings, personal loan ₹3L at 18% | Use savings, Priya works part-time + small loan |
| **Savings change** | Gain ₹5L from land, spend ₹3L | -₹2,80,000 savings | -₹2,80,000 savings |
| **New assets/debts** | No land, ₹2L remaining + rebuilding | Land kept, ₹3L debt at 18% (₹7,500 EMI) | Land kept, small loan, strained relationship |
| **House goal** | Reset — must rebuild from scratch | Land preserved but debt is heavy | Land preserved but slow progress |
| **Education goal** | SECURED for 2.5 years, rest from savings | Funded but with expensive debt | Priya's studies may suffer from part-time work |
| **Monthly savings** | ₹10,000/month restart | Reduced by ₹7,500 EMI | Low, Priya's income supplement uncertain |

**Feedback responses:**

**Choice A feedback:**
> "It's a sacrifice, but Priya's education is secured! The land was worth ₹5 lakh — you can use ₹3 lakh for the first 2.5 years and save ₹10,000/month to cover the rest. Yes, you'll need to rebuild your retirement fund, but an engineer daughter earning well is the best retirement plan. You're investing in the future."
>
> **Financial lesson:** Sometimes sacrificing one goal to secure another is the wisest financial move. Education is an investment with the highest returns — a well-educated child can provide more security than property.

**Choice B feedback:**
> "You kept the land, but a personal loan at 18% interest means you'll pay ₹7,500 every month for years. On ₹42,000 income, that's almost 18% of your earnings going to interest. Both goals are now at risk — the debt could spiral if anything goes wrong."
>
> **Financial lesson:** High-interest personal loans are one of the most expensive ways to borrow. If the interest rate is above 15%, consider other options first — even selling an asset may be cheaper than the total interest paid.

**Choice C feedback:**
> "Asking Priya to work part-time while studying engineering is risky — engineering courses are demanding, and students who work often see their grades suffer. The small loan adds debt to a young person just starting life. This could strain your relationship with Priya and compromise her education."
>
> **Financial lesson:** Don't shift financial burden to the next generation if you have alternatives. A parent's job is to invest in the child's future — not to create debt for them before they even start earning.

---

### Scenario 7: Business Expansion vs. Stability

**Age:** 39.8 | **Savings:** ₹2,40,000 | **Monthly savings rate:** ₹10,000

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | ₹3L down payment (borrow ₹60K from community), ₹5L business loan | Continue saving ₹10K/month, no expansion | Partial expansion ₹2L, no loan |
| **Savings change** | -₹2,40,000 + ₹60K community debt | Unchanged, saving continues | -₹2,00,000 |
| **New debt** | ₹60K at 12% (1 year) + ₹5L at 11% (₹11K EMI/5yr) | None | None |
| **Monthly income** | → ₹70,000 (tripled business) | ₹42,000 (unchanged) | → ₹50,000 (moderate growth) |
| **Net monthly savings** | ~₹25,000 after EMI (much higher) | ₹10,000 | ~₹15,000 |
| **10-year projection** | Could accumulate ₹25-30L | ₹12L (10K × 120 months) | ₹18L (15K × 120 months) |

**Feedback responses:**

**Choice A feedback:**
> "A calculated risk that pays off! The community loan is manageable (₹60,000 at 12% for one year = ₹6,700 total interest), and the business loan at 11% gives you a ₹5L shop space. With income tripling to ₹70,000/month, you can save ₹25,000/month after the EMI. In 8 years, that's potentially ₹25-30 lakh — enough for your retirement house!"
>
> **Financial lesson:** Strategic debt for business expansion can be a wealth multiplier. The key is: will the increased income significantly exceed the loan repayment? If yes, it's a calculated investment, not reckless borrowing.

**Choice B feedback:**
> "Playing it safe means no debt — which is comforting. But at ₹10,000/month savings, you'll have only ₹12 lakh in 10 years. Your retirement house needs ₹20 lakh. The math doesn't add up. Sometimes safety means falling short of your goals."
>
> **Financial lesson:** There's a difference between being cautious and being too conservative. When a business opportunity has strong fundamentals (proven demand, good location), calculated risk can be the safest path to your goals.

**Choice C feedback:**
> "You avoided debt but also avoided the best opportunity. Spending ₹2 lakh on equipment at your current location gives moderate growth (₹50K income) but misses the shop space that could have tripled your business. Half-measures often mean half-results."
>
> **Financial lesson:** Partial investment sometimes gives partial returns. Evaluate opportunities fully — if the fundamentals are strong, committing fully with manageable debt can outperform a cautious half-investment.

---

### Scenario 8: Retirement Corpus Building Strategy

**Age:** 41.6 | **Savings:** ₹2L | **Monthly savings:** ₹25,000 | **8.4 years to retirement**

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | SIP ₹15K + PPF ₹5K + RD ₹5K/month | Land ₹8L + gold ₹5L + FD ₹12L | All in bank RD ₹25K/month |
| **Investment mix** | Diversified growth + safety | Traditional assets | Single safe instrument |
| **8-year projection** | ₹25-30L (market-linked growth) | ~₹25L (land appreciation + gold + FD interest) | ~₹28L (RD interest ~6.5%) |
| **Liquidity** | MF: high, PPF: locked, RD: moderate | Land: low, Gold: moderate, FD: moderate | High |
| **Risk level** | Balanced (MF risk offset by PPF/RD) | Low (but land is illiquid) | Very low (but inflation erodes value) |
| **Real value after inflation** | ₹20-24L (real) | ₹18-20L (real) | ₹20-22L (real, inflation eroded) |

**Feedback responses:**

**Choice A feedback:**
> "Diversification is the key to smart investing! Your SIP in balanced mutual funds can grow 12-15% annually, PPF gives guaranteed 7.1% tax-free returns, and the RD provides a safe liquid cushion. In 8 years, this mix could give you ₹25-30 lakh — enough for your house and medical needs. You've balanced growth with safety."
>
> **Financial lesson:** Don't put all eggs in one basket. A mix of high-growth (mutual funds), safe government-backed (PPF), and liquid (RD) investments creates both growth potential and financial security.

**Choice B feedback:**
> "Land and gold are traditional Indian investments, and there's wisdom in them — they're tangible and feel safe. But land is hard to sell quickly, gold doesn't generate income, and FDs barely beat inflation. Your total of ₹25 lakh may look good on paper but the real purchasing power will be lower."
>
> **Financial lesson:** Traditional assets (gold, land) have a place in your portfolio, but they shouldn't be your only investments. Modern instruments (SIPs, PPF) often provide better returns with more flexibility.

**Choice C feedback:**
> "Bank RDs are safe and predictable, but at 6-7% interest with 6% inflation, your money barely grows in real terms. ₹28 lakh in 8 years sounds good, but adjusted for inflation, it's more like ₹20-22 lakh. Your retirement house will cost ₹20 lakh — leaving almost nothing for medical expenses or living costs."
>
> **Financial lesson:** 'Safe' investments that don't beat inflation are silently losing value. Understanding the difference between nominal returns (the number you see) and real returns (after inflation) is critical for long-term planning.

---

### Scenario 9: Health Crisis and Emergency Fund Test

**Age:** 43.4 | **Retirement corpus:** ₹12L | **Emergency fund:** ₹50K | **Hospital bill:** ₹1,80,000

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | Emergency fund ₹50K + break RD ₹2L + monthly income | Sell mutual funds ₹1.8L | Personal loan ₹1.5L at 16% + emergency fund ₹30K |
| **Savings change** | -₹50K emergency fund, -₹2L RD | -₹1.8L from mutual funds (market value) | -₹30K from emergency fund |
| **Remaining corpus** | ₹8L (MF) + ₹2L (PPF) = ₹10L | ₹6.2L (MF remainder) + ₹2L (PPF) + ₹2L (RD) = ₹10.2L | All investments intact (₹12L) |
| **New debt** | None | None | ₹1.5L at 16% (₹3,500 EMI/month) |
| **Growth potential** | MF + PPF continue growing | Lost MF growth potential | Intact but debt reduces savings capacity |
| **Recovery time** | Rebuild RD and emergency fund | Rebuild MF position (market timing risk) | Debt repayment takes 4-5 years |

**Feedback responses:**

**Choice A feedback:**
> "This is exactly what emergency funds are for! Using your ₹50,000 emergency fund plus breaking the RD (with only a small penalty) covers the hospital bill without touching your growth investments. Your mutual funds (₹8 lakh) and PPF (₹2 lakh) continue growing untouched. You can rebuild the RD and emergency fund from monthly savings."
>
> **Financial lesson:** Emergency funds and liquid investments (RDs) are your first line of defense in a crisis. Breaking a low-return investment (RD) to protect a high-return investment (mutual funds) is smart financial triage.

**Choice B feedback:**
> "Selling mutual funds avoids debt, but you've lost the power of compounding. Those ₹1.8 lakh in mutual funds might have grown to ₹3-4 lakh by retirement. Plus, selling in an emergency often means selling at a low market price — you lose twice. This sets back your retirement goal significantly."
>
> **Financial lesson:** Selling growth investments during emergencies locks in losses. This is why having separate emergency funds and liquid investments is crucial — they protect your long-term investments from short-term crises.

**Choice C feedback:**
> "Your investments are intact, but now you have ₹1.5 lakh in debt at 16% interest — that's ₹3,500/month in EMI for years. This reduces your monthly savings capacity from ₹25,000 to ₹21,500. Over 4-5 years of repayment, you'll pay about ₹30,000 in interest alone. The 'preservation' of your investments costs you dearly."
>
> **Financial lesson:** Taking high-interest loans to avoid touching investments only makes sense if your investment returns significantly exceed the loan interest rate. A 16% loan rate vs. 7% RD return means the loan is far more expensive than breaking the RD.

---

### Scenario 10: Estate Planning and Protecting Priya's Future

**Age:** 45.2 | **Corpus:** ₹16L | **Business:** ₹8L value | **Priya earning:** ₹35K/month

| | Choice A (+30) | Choice B (+10) | Choice C (-20) |
|---|---|---|---|
| **Description** | Adoption ₹40K + Will ₹5K + nominations | Will ₹5K + joint accounts + nominations | Just add nominations (free) |
| **Cost** | ₹45,000 | ₹5,000 | ₹0 |
| **Legal strength** | Strongest — Priya is legally daughter | Strong — Will is enforceable, but adoption gap | Weakest — nominations easily challenged |
| **Risk of challenge** | Very low — blood relatives can't override | Moderate — Will without adoption can be contested | High — blood relatives can claim everything |
| **Priya's protection** | Full legal heir + named in Will | Named in Will + joint account holder | Nominee only — easily overridden |

**Feedback responses:**

**Choice A feedback:**
> "This is the gold standard of estate planning! Formalizing Priya's adoption makes her your legal heir — no court can deny that. The registered Will adds an extra layer of protection, and nominations ensure quick access to accounts. Yes, it costs ₹45,000, but this protects lakhs worth of assets and a lifetime of love."
>
> **Financial lesson:** Estate planning is not just for the wealthy. Without legal documentation (adoption, Will), your assets may go to people who rejected you, not the ones you love. The cost of legal protection is tiny compared to the assets it protects.

**Choice B feedback:**
> "A registered Will is solid legal protection, and making Priya a joint account holder gives her immediate access to bank accounts. But without formal adoption, your biological family could still challenge the Will in court. It might hold up — but it might not. There's a gap in your protection."
>
> **Financial lesson:** Wills are powerful but can be contested. Combining a Will with legal relationship documentation (adoption) creates the strongest protection. Don't leave gaps in your estate planning.

**Choice C feedback:**
> "Nominations are free and easy — but they're also easy to challenge. In Indian law, nominees are custodians, not owners. Your biological family — the same people who rejected you — could file a legal claim and potentially win everything. Priya would be left with nothing after all you built together."
>
> **Financial lesson:** Nominations are NOT inheritance. In Indian law, a nominee holds assets in trust until legal heirs claim them. Without a Will or formal adoption, your biological family may have stronger legal claims than your nominee. Always combine nominations with a registered Will.

---

## 8. Goal Progress Tracking

### House Goal (Retirement Home)

The house goal target is ₹20 lakh (accounting for future appreciation). Progress is calculated as:

```
houseProgress = min(100, (totalAssetsTowardHouse / 2000000) * 100)
```

**Key milestones:**
| Scenario | Optimal path event | Progress |
|---|---|---|
| S1 | Starts saving ₹4K/month | 0% → saving phase |
| S4 | Buys land ₹3L | ~15% |
| S5 | Land appreciating, savings growing | ~20% |
| S6 | Sells land for education — RESET | Back to ~5% |
| S7 | Business expansion, income triples | Rebuilding ~10% |
| S8 | Diversified investment ₹25K/month | Growing ~30% |
| S10 | Corpus ₹16L + business ₹8L = ₹24L total | ~80% (house affordable with loan) |

**Icon:** Uses `src/assets/financial/house-icon.png`. A circular progress ring is drawn around the icon image, filling clockwise as progress increases. Color transitions from gray (0%) through amber (50%) to green (100%). At 100%, a small green checkmark badge overlays the bottom-right corner.

### Education Goal (Priya's College)

```
educationProgress = based on scenario milestones
```

**Key milestones:**
| Scenario | Optimal path event | Progress |
|---|---|---|
| S1-S3 | Priya in school, expenses being covered | 10-20% |
| S4-S5 | Priya growing, school funded | 30-40% |
| S6 | Education funded! Land sold for college | 70% |
| S7-S8 | Priya in college, expenses covered | 80-90% |
| S9-S10 | Priya graduates, gets job! | 100% |

**Icon:** Uses `src/assets/financial/education-icon.png`. Same circular progress ring treatment as the house icon — gray to amber to green, with checkmark badge at 100%.

---

## 9. Results Screen — Level Calculation

### Score Ranges and Levels

| Score Range | Level Title | Level (Kannada) |
|---|---|---|
| 250-300 | Survival Champion | ಬದುಕುಳಿಯುವಿಕೆ ಚಾಂಪಿಯನ್ |
| 200-249 | Resilient Builder | ಸ್ಥಿತಿಸ್ಥಾಪಕ ನಿರ್ಮಾಪಕ |
| 150-199 | Learning to Thrive | ಬೆಳೆಯಲು ಕಲಿಯುತ್ತಿರುವುದು |
| -200 to 149 | Fresh Start Needed | ಹೊಸ ಆರಂಭ ಬೇಕು |

### Ending Narratives (based on total score)

**Survival Champion (250-300):**
> "Susheela reaches age 47 with ₹25 lakh in total wealth. She has bought a small house in the outskirts of Bengaluru with Priya as co-borrower on the loan. Priya is a successful engineer, earning well. Susheela has legally adopted Priya and created a registered Will — her family's future is protected. From ₹18,000/month with no savings to a homeowner and business woman — Susheela's financial journey is one of courage, wisdom, and resilience."

**Resilient Builder (200-249):**
> "Susheela has built a good life — her savings are growing, Priya is educated, and the business is doing well. The retirement house may need a few more years, and there are some gaps in legal protection, but the foundation is strong. With continued smart choices, Susheela's goals are within reach."

**Learning to Thrive (150-199):**
> "Susheela has faced setbacks — some choices didn't work out as planned, and the financial journey has been rockier than it needed to be. But she's learning. The savings are modest, the house goal is delayed, but Priya is moving forward. There's still time to make smarter financial choices."

**Fresh Start Needed (Below 150):**
> "Susheela's financial journey has been difficult. Several choices led to debt, lost savings, or missed opportunities. The house goal is far away, and Priya's future may not be fully secured. But knowledge is power — understanding what went wrong is the first step to making better financial decisions."

### Goal Achievement Summary

On the results screen, display:

| Goal | Achieved? | Criteria |
|---|---|---|
| House for retirement | YES / PARTIAL / NO | Based on accumulated assets vs. ₹20L target |
| Priya's education | YES / PARTIAL / NO | Based on whether S6 choice funded education |
| Financial security | YES / PARTIAL / NO | Based on total corpus and debt status |
| Priya's future protected | YES / NO | Based on S10 choice (adoption + Will) |

---

## 10. Game Data Structure (`gamedata.json`)

Every user-visible string has a `_kan` counterpart for Kannada. The component reads `language` from the Zustand store and picks the appropriate field (e.g., `language === 'kan' ? item.title_kan : item.title`).

### 10.1 Top-level UI strings

```json
{
  "ui": {
    "gameTitle": "Financial Literacy Game",
    "gameTitle_kan": "ಹಣಕಾಸು ಸಾಕ್ಷರತೆ ಆಟ",
    "choosePlayer": "Choose your player",
    "choosePlayer_kan": "ನಿಮ್ಮ ಆಟಗಾರನನ್ನು ಆರಿಸಿ",
    "selectPlayer": "Select Player",
    "selectPlayer_kan": "ಆಟಗಾರನನ್ನು ಆರಿಸಿ",
    "startGame": "Start Game",
    "startGame_kan": "ಆಟ ಪ್ರಾರಂಭಿಸಿ",
    "goBack": "Go Back",
    "goBack_kan": "ಹಿಂದೆ ಹೋಗಿ",
    "makeYourChoice": "Make Your Choice",
    "makeYourChoice_kan": "ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿ",
    "selectThisChoice": "Select This Choice",
    "selectThisChoice_kan": "ಈ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ",
    "confirmChoice": "Are you sure? This cannot be undone.",
    "confirmChoice_kan": "ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದನ್ನು ಹಿಂತಿರುಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    "nextScenario": "Next Scenario",
    "nextScenario_kan": "ಮುಂದಿನ ಸನ್ನಿವೇಶ",
    "seeResults": "See Results",
    "seeResults_kan": "ಫಲಿತಾಂಶ ನೋಡಿ",
    "playAgain": "Play Again",
    "playAgain_kan": "ಮತ್ತೊಮ್ಮೆ ಆಡಿ",
    "reviewAnswers": "Review Answers",
    "reviewAnswers_kan": "ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    "currentSavings": "Current Savings",
    "currentSavings_kan": "ಪ್ರಸ್ತುತ ಉಳಿತಾಯ",
    "monthlyIncome": "Monthly Income",
    "monthlyIncome_kan": "ಮಾಸಿಕ ಆದಾಯ",
    "monthlySavings": "Monthly Savings",
    "monthlySavings_kan": "ಮಾಸಿಕ ಉಳಿತಾಯ",
    "assets": "Assets",
    "assets_kan": "ಆಸ್ತಿಗಳು",
    "debts": "Debts",
    "debts_kan": "ಸಾಲಗಳು",
    "none": "(none)",
    "none_kan": "(ಏನೂ ಇಲ್ಲ)",
    "score": "Score",
    "score_kan": "ಅಂಕ",
    "scenario": "Scenario",
    "scenario_kan": "ಸನ್ನಿವೇಶ",
    "of": "of",
    "of_kan": "ರಲ್ಲಿ",
    "financialLesson": "Financial Lesson",
    "financialLesson_kan": "ಹಣಕಾಸು ಪಾಠ",
    "financialImpact": "Financial Impact",
    "financialImpact_kan": "ಹಣಕಾಸು ಪರಿಣಾಮ",
    "youChose": "You chose",
    "youChose_kan": "ನೀವು ಆರಿಸಿದ್ದು",
    "goalAchievement": "Goal Achievement",
    "goalAchievement_kan": "ಗುರಿ ಸಾಧನೆ",
    "houseGoal": "Retirement House",
    "houseGoal_kan": "ನಿವೃತ್ತಿ ಮನೆ",
    "educationGoal": "Priya's Education",
    "educationGoal_kan": "ಪ್ರಿಯಾಳ ಶಿಕ್ಷಣ",
    "achieved": "Achieved",
    "achieved_kan": "ಸಾಧಿಸಲಾಗಿದೆ",
    "partiallyAchieved": "Partially Achieved",
    "partiallyAchieved_kan": "ಭಾಗಶಃ ಸಾಧಿಸಲಾಗಿದೆ",
    "notAchieved": "Not Achieved",
    "notAchieved_kan": "ಸಾಧಿಸಲಾಗಿಲ್ಲ",
    "comingSoon": "Coming Soon",
    "comingSoon_kan": "ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ",
    "timeframe": "Timeframe",
    "timeframe_kan": "ಸಮಯಾವಧಿ",
    "years": "years",
    "years_kan": "ವರ್ಷಗಳು",
    "correctChoice": "Best Choice",
    "correctChoice_kan": "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ",
    "yourChoice": "Your Choice",
    "yourChoice_kan": "ನಿಮ್ಮ ಆಯ್ಕೆ"
  }
}
```

### 10.2 Character data

```json
{
  "characters": {
    "susheela": {
      "id": "susheela",
      "name": "Susheela",
      "name_kan": "ಸುಶೀಲಾ",
      "age": 29,

      "summaryBackground": "29-year-old transwoman, beauty services provider in Bangalore. Part of local hijra community.",
      "summaryBackground_kan": "29 ವರ್ಷದ ಟ್ರಾನ್ಸ್ ಮಹಿಳೆ, ಬೆಂಗಳೂರಿನಲ್ಲಿ ಸೌಂದರ್ಯ ಸೇವೆ ಒದಗಿಸುವವರು. ಸ್ಥಳೀಯ ಹಿಜ್ರಾ ಸಮುದಾಯದ ಭಾಗ.",

      "detailBackground": "Susheela is a 29-year-old transwoman from rural Tamil Nadu who moved to Bangalore at 19 after family rejection. She runs a small beauty services business from home, earning ₹18,000/month. She has informally adopted Priya (7), daughter of a deceased friend, and secretly supports her mother back in the village. She is part of the local hijra community under guru Lakshmi. She is diabetic and needs ₹2,000/month for medication.",
      "detailBackground_kan": "ಸುಶೀಲಾ ಗ್ರಾಮೀಣ ತಮಿಳುನಾಡಿನ 29 ವರ್ಷದ ಟ್ರಾನ್ಸ್ ಮಹಿಳೆ, ಕುಟುಂಬದ ತಿರಸ್ಕಾರದ ನಂತರ 19 ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಬೆಂಗಳೂರಿಗೆ ಬಂದವರು. ಅವರು ಮನೆಯಿಂದಲೇ ಸಣ್ಣ ಸೌಂದರ್ಯ ಸೇವೆ ವ್ಯವಹಾರ ನಡೆಸುತ್ತಿದ್ದಾರೆ, ತಿಂಗಳಿಗೆ ₹18,000 ಗಳಿಸುತ್ತಿದ್ದಾರೆ. ಅವರು ತೀರಿಹೋದ ಸ್ನೇಹಿತೆಯ ಮಗಳು ಪ್ರಿಯಾ (7) ಳನ್ನು ಅನೌಪಚಾರಿಕವಾಗಿ ದತ್ತು ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ ಮತ್ತು ಹಳ್ಳಿಯಲ್ಲಿರುವ ತಾಯಿಗೆ ರಹಸ್ಯವಾಗಿ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆ. ಗುರು ಲಕ್ಷ್ಮಿ ಅವರ ಅಡಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಹಿಜ್ರಾ ಸಮುದಾಯದ ಭಾಗ. ಅವರಿಗೆ ಮಧುಮೇಹವಿದ್ದು ತಿಂಗಳಿಗೆ ₹2,000 ಔಷಧಕ್ಕೆ ಬೇಕಾಗುತ್ತದೆ.",

      "goals": ["Support Priya's education through college", "Buy small house in outskirts of Bengaluru for retirement by age 50"],
      "goals_kan": ["ಪ್ರಿಯಾಳ ಕಾಲೇಜು ಶಿಕ್ಷಣಕ್ಕೆ ಬೆಂಬಲ", "50 ವಯಸ್ಸಿಗೆ ನಿವೃತ್ತಿಗಾಗಿ ಬೆಂಗಳೂರಿನ ಹೊರವಲಯದಲ್ಲಿ ಸಣ್ಣ ಮನೆ ಖರೀದಿ"],

      "timeline": "18 years",
      "timeline_kan": "18 ವರ್ಷಗಳು",

      "startingIncome": 18000,
      "startingExpenses": 17500,

      "startingExpensesBreakdown": "Rent ₹4,000 | Food & basics ₹5,000 | Diabetes medication ₹2,000 | Guru's contribution ₹3,000 | Mother's support ₹1,500 | Priya's school ₹2,000",
      "startingExpensesBreakdown_kan": "ಬಾಡಿಗೆ ₹4,000 | ಆಹಾರ ಮತ್ತು ಮೂಲ ₹5,000 | ಮಧುಮೇಹ ಔಷಧ ₹2,000 | ಗುರುವಿನ ಕೊಡುಗೆ ₹3,000 | ತಾಯಿಯ ಬೆಂಬಲ ₹1,500 | ಪ್ರಿಯಾಳ ಶಾಲೆ ₹2,000",

      "scenarioCount": 10,
      "portrait": "src/assets/financial/susheela.png"
    },
    "imran": {
      "id": "imran",
      "name": "Imran",
      "name_kan": "ಇಮ್ರಾನ್",
      "available": false,
      "comingSoon": true,
      "comingSoonMessage": "Imran's journey is coming soon!",
      "comingSoonMessage_kan": "ಇಮ್ರಾನ್ ಅವರ ಪ್ರಯಾಣ ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ!"
    }
  }
}
```

### 10.3 Scenario data (1 of 10 shown — all follow this structure)

```json
{
  "scenarios": [
    {
      "id": 1,
      "characterId": "susheela",

      "title": "The First Stable Income and Community Obligations",
      "title_kan": "ಮೊದಲ ಸ್ಥಿರ ಆದಾಯ ಮತ್ತು ಸಮುದಾಯ ಜವಾಬ್ದಾರಿಗಳು",

      "age": 29,
      "timelineYears": 0,

      "description": "After years of unstable work (sex work, street vending, beauty services), Susheela finally has somewhat regular income of ₹18,000/month from her small beauty services business she runs from home. Her total obligations are ₹17,500, leaving only ₹500. Her younger trans friend Meena, who just escaped family violence, needs shelter and support (₹2,000/month). Susheela's guru Lakshmi reminds her that community support is a sacred duty.",
      "description_kan": "ವರ್ಷಗಳ ಅಸ್ಥಿರ ಕೆಲಸದ ನಂತರ (ಲೈಂಗಿಕ ಕೆಲಸ, ಬೀದಿ ವ್ಯಾಪಾರ, ಸೌಂದರ್ಯ ಸೇವೆಗಳು), ಸುಶೀಲಾ ಅಂತಿಮವಾಗಿ ಮನೆಯಿಂದಲೇ ನಡೆಸುವ ಸಣ್ಣ ಸೌಂದರ್ಯ ಸೇವೆ ವ್ಯವಹಾರದಿಂದ ತಿಂಗಳಿಗೆ ₹18,000 ನಿಯಮಿತ ಆದಾಯವನ್ನು ಹೊಂದಿದ್ದಾರೆ. ಒಟ್ಟು ಜವಾಬ್ದಾರಿಗಳು ₹17,500, ₹500 ಮಾತ್ರ ಉಳಿದಿದೆ. ಕುಟುಂಬ ಹಿಂಸೆಯಿಂದ ತಪ್ಪಿಸಿಕೊಂಡ ಕಿರಿಯ ಟ್ರಾನ್ಸ್ ಸ್ನೇಹಿತೆ ಮೀನಾಗೆ ಆಶ್ರಯ ಮತ್ತು ಬೆಂಬಲ ಬೇಕು (₹2,000/ತಿಂಗಳು). ಗುರು ಲಕ್ಷ್ಮಿ ಸಮುದಾಯ ಬೆಂಬಲ ಪವಿತ್ರ ಕರ್ತವ್ಯ ಎಂದು ನೆನಪಿಸುತ್ತಾರೆ.",

      "question": "How should Susheela balance community obligations with building her own financial security for Priya's future?",
      "question_kan": "ಪ್ರಿಯಾಳ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಸ್ವಂತ ಆರ್ಥಿಕ ಭದ್ರತೆ ಕಟ್ಟುವುದರೊಂದಿಗೆ ಸಮುದಾಯ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಸುಶೀಲಾ ಹೇಗೆ ಸಮತೋಲನ ಮಾಡಬೇಕು?",

      "narration": "I am Susheela. I've been working for 10 years now in Bangalore, far from my village...",
      "narration_kan": "ನಾನು ಸುಶೀಲಾ. ನನ್ನ ಹಳ್ಳಿಯಿಂದ ದೂರ ಬೆಂಗಳೂರಿನಲ್ಲಿ 10 ವರ್ಷಗಳಿಂದ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ...",

      "illustration": "TBD — per-scenario image",

      "arrivingState": {
        "savings": 0,
        "monthlyIncome": 18000,
        "monthlyExpenses": 17500,
        "assets": [],
        "debts": []
      },

      "choices": [
        {
          "id": "A",
          "label": "Work More, Save More",
          "label_kan": "ಹೆಚ್ಚು ಕೆಲಸ, ಹೆಚ್ಚು ಉಳಿತಾಯ",

          "description": "Fulfill all obligations (₹500 left), take on extra sex work for ₹5,000 more/month to save — sacrifice health and safety for both community and savings.",
          "description_kan": "ಎಲ್ಲಾ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಪೂರೈಸಿ (₹500 ಉಳಿದಿದೆ), ₹5,000 ಹೆಚ್ಚುವರಿ ಉಳಿಸಲು ಹೆಚ್ಚುವರಿ ಲೈಂಗಿಕ ಕೆಲಸ ಮಾಡಿ — ಸಮುದಾಯ ಮತ್ತು ಉಳಿತಾಯ ಎರಡಕ್ಕೂ ಆರೋಗ್ಯ ಮತ್ತು ಸುರಕ್ಷತೆಯನ್ನು ತ್ಯಾಗ ಮಾಡಿ.",

          "points": 10,

          "financialImpact": {
            "savingsChange": 60000,
            "monthlyIncomeChange": 5000,
            "monthlyExpensesChange": 2000,
            "newAssets": [],
            "newDebts": [],
            "notes": "Health risks increase medical costs to ₹3,000/month",
            "notes_kan": "ಆರೋಗ್ಯ ಅಪಾಯಗಳು ವೈದ್ಯಕೀಯ ವೆಚ್ಚವನ್ನು ₹3,000/ತಿಂಗಳಿಗೆ ಹೆಚ್ಚಿಸುತ್ತವೆ"
          },

          "feedback": "You're working harder to save, but the extra work puts your health at risk. Your diabetes medication costs have already gone up to ₹3,000/month. Sometimes earning more isn't the answer — spending wisely is.",
          "feedback_kan": "ನೀವು ಉಳಿಸಲು ಹೆಚ್ಚು ಶ್ರಮಿಸುತ್ತಿದ್ದೀರಿ, ಆದರೆ ಹೆಚ್ಚುವರಿ ಕೆಲಸ ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ಅಪಾಯಕ್ಕೆ ಒಡ್ಡುತ್ತದೆ. ನಿಮ್ಮ ಮಧುಮೇಹ ಔಷಧ ವೆಚ್ಚ ಈಗಾಗಲೇ ₹3,000/ತಿಂಗಳಿಗೆ ಏರಿದೆ. ಕೆಲವೊಮ್ಮೆ ಹೆಚ್ಚು ಗಳಿಸುವುದು ಉತ್ತರವಲ್ಲ — ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಖರ್ಚು ಮಾಡುವುದು.",

          "financialLesson": "Increasing income through unsafe work can lead to higher medical costs that eat into savings. Negotiate existing obligations first.",
          "financialLesson_kan": "ಅಸುರಕ್ಷಿತ ಕೆಲಸದ ಮೂಲಕ ಆದಾಯ ಹೆಚ್ಚಿಸುವುದು ಹೆಚ್ಚಿನ ವೈದ್ಯಕೀಯ ವೆಚ್ಚಗಳಿಗೆ ಕಾರಣವಾಗಬಹುದು, ಅದು ಉಳಿತಾಯವನ್ನು ತಿನ್ನುತ್ತದೆ. ಮೊದಲು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಮಾತುಕತೆ ಮಾಡಿ."
        },
        {
          "id": "B",
          "label": "Negotiate & Save",
          "label_kan": "ಮಾತುಕತೆ ಮಾಡಿ ಮತ್ತು ಉಳಿಸಿ",

          "description": "Reduce guru contribution to ₹1,500, give mother ₹1,000, support Meena with ₹1,000, save ₹4,000/month — negotiate obligations respectfully while starting savings.",
          "description_kan": "ಗುರುವಿನ ಕೊಡುಗೆಯನ್ನು ₹1,500 ಕ್ಕೆ ಕಡಿಮೆ ಮಾಡಿ, ತಾಯಿಗೆ ₹1,000, ಮೀನಾಗೆ ₹1,000 ಬೆಂಬಲ, ₹4,000/ತಿಂಗಳು ಉಳಿಸಿ — ಉಳಿತಾಯ ಪ್ರಾರಂಭಿಸುವಾಗ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಗೌರವಪೂರ್ವಕವಾಗಿ ಮಾತುಕತೆ ಮಾಡಿ.",

          "points": 30,

          "financialImpact": {
            "savingsChange": 86400,
            "monthlyIncomeChange": 0,
            "monthlyExpensesChange": -3500,
            "newAssets": [],
            "newDebts": [],
            "notes": "Savings ₹4,000/month = ₹48,000/year",
            "notes_kan": "ಉಳಿತಾಯ ₹4,000/ತಿಂಗಳು = ₹48,000/ವರ್ಷ"
          },

          "feedback": "Smart thinking! By respectfully negotiating your obligations, you found ₹4,000/month to save without taking on dangerous work. Guru Lakshmi understood — community support should not come at the cost of your family's future. You still helped Meena with ₹1,000.",
          "feedback_kan": "ಬುದ್ಧಿವಂತ ಯೋಚನೆ! ನಿಮ್ಮ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಗೌರವಪೂರ್ವಕವಾಗಿ ಮಾತುಕತೆ ಮಾಡುವ ಮೂಲಕ, ಅಪಾಯಕಾರಿ ಕೆಲಸ ಮಾಡದೆ ₹4,000/ತಿಂಗಳು ಉಳಿಸಲು ಕಂಡುಕೊಂಡಿರಿ. ಗುರು ಲಕ್ಷ್ಮಿ ಅರ್ಥಮಾಡಿಕೊಂಡರು — ಸಮುದಾಯ ಬೆಂಬಲ ನಿಮ್ಮ ಕುಟುಂಬದ ಭವಿಷ್ಯದ ವೆಚ್ಚದಲ್ಲಿ ಬರಬಾರದು. ನೀವು ಇನ್ನೂ ಮೀನಾಗೆ ₹1,000 ಸಹಾಯ ಮಾಡಿದ್ದೀರಿ.",

          "financialLesson": "Budgeting means prioritizing. Reducing some obligations to create savings capacity is a wise first step toward financial security.",
          "financialLesson_kan": "ಬಜೆಟ್ ಮಾಡುವುದು ಎಂದರೆ ಆದ್ಯತೆ ನೀಡುವುದು. ಉಳಿತಾಯ ಸಾಮರ್ಥ್ಯ ಸೃಷ್ಟಿಸಲು ಕೆಲವು ಜವಾಬ್ದಾರಿಗಳನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು ಆರ್ಥಿಕ ಭದ್ರತೆಯ ಕಡೆಗೆ ಬುದ್ಧಿವಂತ ಮೊದಲ ಹೆಜ್ಜೆ."
        },
        {
          "id": "C",
          "label": "Community First",
          "label_kan": "ಸಮುದಾಯ ಮೊದಲು",

          "description": "Maintain all obligations, support Meena fully, save nothing — community duty above all.",
          "description_kan": "ಎಲ್ಲಾ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಕಾಪಾಡಿ, ಮೀನಾಗೆ ಪೂರ್ಣ ಬೆಂಬಲ, ಏನೂ ಉಳಿಸಬೇಡಿ — ಸಮುದಾಯ ಕರ್ತವ್ಯ ಎಲ್ಲಕ್ಕಿಂತ ಮೇಲು.",

          "points": -20,

          "financialImpact": {
            "savingsChange": 0,
            "monthlyIncomeChange": 0,
            "monthlyExpensesChange": 2000,
            "newAssets": [],
            "newDebts": [],
            "notes": "No savings, goal becomes unreachable",
            "notes_kan": "ಉಳಿತಾಯವಿಲ್ಲ, ಗುರಿ ತಲುಪಲಾಗದಂತಾಗುತ್ತದೆ"
          },

          "feedback": "Your generosity is admirable, but with zero savings, one emergency could push you into debt. Priya's education and your retirement house need a financial foundation. Community duty is important, but so is planning for your own family's future.",
          "feedback_kan": "ನಿಮ್ಮ ಉದಾರತೆ ಶ್ಲಾಘನೀಯ, ಆದರೆ ಶೂನ್ಯ ಉಳಿತಾಯದೊಂದಿಗೆ ಒಂದು ತುರ್ತು ನಿಮ್ಮನ್ನು ಸಾಲಕ್ಕೆ ತಳ್ಳಬಹುದು. ಪ್ರಿಯಾಳ ಶಿಕ್ಷಣ ಮತ್ತು ನಿಮ್ಮ ನಿವೃತ್ತಿ ಮನೆಗೆ ಆರ್ಥಿಕ ಅಡಿಪಾಯ ಬೇಕು. ಸಮುದಾಯ ಕರ್ತವ್ಯ ಮುಖ್ಯ, ಆದರೆ ನಿಮ್ಮ ಕುಟುಂಬದ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಯೋಜಿಸುವುದೂ ಅಷ್ಟೇ ಮುಖ್ಯ.",

          "financialLesson": "Saving even a small amount regularly is the foundation of financial security. Without savings, goals remain dreams.",
          "financialLesson_kan": "ನಿಯಮಿತವಾಗಿ ಸಣ್ಣ ಮೊತ್ತವನ್ನು ಉಳಿಸುವುದು ಆರ್ಥಿಕ ಭದ್ರತೆಯ ಅಡಿಪಾಯ. ಉಳಿತಾಯವಿಲ್ಲದೆ, ಗುರಿಗಳು ಕನಸುಗಳಾಗಿಯೇ ಉಳಿಯುತ್ತವೆ."
        }
      ]
    }
  ]
}
```

**Note:** Scenarios 2–10 follow the identical field structure. Every string field has a `_kan` counterpart. The full `gamedata.json` will contain all 10 scenarios with complete English and Kannada text.

### 10.4 Bilingual field naming convention

| English field | Kannada field | Used in |
|---|---|---|
| `name` | `name_kan` | Character name |
| `summaryBackground` | `summaryBackground_kan` | Avatar selection card |
| `detailBackground` | `detailBackground_kan` | Character detail screen |
| `goals[]` | `goals_kan[]` | Character cards and detail |
| `timeline` | `timeline_kan` | Character cards |
| `startingExpensesBreakdown` | `startingExpensesBreakdown_kan` | Character detail screen |
| `comingSoonMessage` | `comingSoonMessage_kan` | Imran placeholder |
| `title` | `title_kan` | Scenario header |
| `description` | `description_kan` | Scenario body text |
| `question` | `question_kan` | Dilemma question |
| `narration` | `narration_kan` | Audio script / narration box |
| `choices[].label` | `choices[].label_kan` | Choice slider badge |
| `choices[].description` | `choices[].description_kan` | Choice slider body |
| `choices[].feedback` | `choices[].feedback_kan` | Feedback screen main text |
| `choices[].financialLesson` | `choices[].financialLesson_kan` | Feedback screen lesson box |
| `choices[].financialImpact.notes` | `choices[].financialImpact.notes_kan` | Feedback screen impact note |

### 10.5 Result levels

```json
{
  "levels": [
    {
      "min": 250,
      "max": 300,
      "title": "Survival Champion",
      "title_kan": "ಬದುಕುಳಿಯುವಿಕೆ ಚಾಂಪಿಯನ್",
      "message": "Excellent financial decision-making despite systemic exclusion.",
      "message_kan": "ವ್ಯವಸ್ಥಿತ ಹೊರಗಿಡುವಿಕೆಯ ಹೊರತಾಗಿಯೂ ಅತ್ಯುತ್ತಮ ಆರ್ಥಿಕ ನಿರ್ಧಾರ.",
      "endingNarrative": "Susheela reaches age 47 with ₹25 lakh in total wealth...",
      "endingNarrative_kan": "ಸುಶೀಲಾ ₹25 ಲಕ್ಷ ಒಟ್ಟು ಸಂಪತ್ತಿನೊಂದಿಗೆ 47 ವಯಸ್ಸನ್ನು ತಲುಪುತ್ತಾರೆ..."
    },
    {
      "min": 200,
      "max": 249,
      "title": "Resilient Builder",
      "title_kan": "ಸ್ಥಿತಿಸ್ಥಾಪಕ ನಿರ್ಮಾಪಕ",
      "message": "Good financial literacy while navigating discrimination.",
      "message_kan": "ತಾರತಮ್ಯವನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡುವಾಗ ಉತ್ತಮ ಹಣಕಾಸು ಸಾಕ್ಷರತೆ.",
      "endingNarrative": "Susheela has built a good life — her savings are growing...",
      "endingNarrative_kan": "ಸುಶೀಲಾ ಉತ್ತಮ ಜೀವನ ಕಟ್ಟಿಕೊಂಡಿದ್ದಾರೆ — ಉಳಿತಾಯ ಬೆಳೆಯುತ್ತಿದೆ..."
    },
    {
      "min": 150,
      "max": 199,
      "title": "Learning to Thrive",
      "title_kan": "ಬೆಳೆಯಲು ಕಲಿಯುತ್ತಿರುವುದು",
      "message": "Building financial knowledge against barriers.",
      "message_kan": "ಅಡೆತಡೆಗಳ ವಿರುದ್ಧ ಹಣಕಾಸು ಜ್ಞಾನ ಕಟ್ಟುತ್ತಿರುವುದು.",
      "endingNarrative": "Susheela has faced setbacks — some choices didn't work out...",
      "endingNarrative_kan": "ಸುಶೀಲಾ ಹಿನ್ನಡೆಗಳನ್ನು ಎದುರಿಸಿದ್ದಾರೆ — ಕೆಲವು ಆಯ್ಕೆಗಳು ಫಲ ನೀಡಲಿಲ್ಲ..."
    },
    {
      "min": -200,
      "max": 149,
      "title": "Fresh Start Needed",
      "title_kan": "ಹೊಸ ಆರಂಭ ಬೇಕು",
      "message": "Significant financial education needed to overcome systemic obstacles.",
      "message_kan": "ವ್ಯವಸ್ಥಿತ ಅಡೆತಡೆಗಳನ್ನು ಜಯಿಸಲು ಗಮನಾರ್ಹ ಹಣಕಾಸು ಶಿಕ್ಷಣ ಅಗತ್ಯ.",
      "endingNarrative": "Susheela's financial journey has been difficult...",
      "endingNarrative_kan": "ಸುಶೀಲಾ ಅವರ ಆರ್ಥಿಕ ಪ್ರಯಾಣ ಕಷ್ಟಕರವಾಗಿದೆ..."
    }
  ]
}
```

### 10.6 Component-level language helper pattern

All components read language from the Zustand store and pick the correct field:

```typescript
const { language } = useFinancialStore();
const t = (en: string, kan: string) => language === 'kan' ? kan : en;

// Usage in component:
<h1>{t(scenario.title, scenario.title_kan)}</h1>
<p>{t(choice.feedback, choice.feedback_kan)}</p>
<span>{t(ui.score, ui.score_kan)}: {score}</span>
```

---

## 11. Choice Slider Component

The choice slider is a key UI element that presents options one at a time:

**Behavior:**
1. Initially hidden — user sees "Make Your Choice" button
2. On tap, slides up from bottom revealing Choice A
3. Left/right arrows (or swipe) navigate between A, B, C
4. Dot indicators show current position (e.g., ● ○ ○)
5. Each choice card shows:
   - Choice letter (A, B, C) as badge
   - Short label (e.g., "Negotiate & Save")
   - Full description text
   - "Select This Choice" button
6. After selecting, confirmation prompt: "Are you sure? This cannot be undone."
7. On confirm → navigate to Feedback Screen

---

## 12. Savings/Assets Display Box

Shows on the scenario screen's right panel:

```
┌─────────────────────────┐
│ Current Savings: ₹86,400│
│ Monthly Income: ₹18,000 │
│ Monthly Savings: ₹4,000 │
├─────────────────────────┤
│ Assets:                 │
│  🏠 Land — ₹3,00,000   │
│  💰 Emergency — ₹50,000│
├─────────────────────────┤
│ Debts:                  │
│  (none)                 │
└─────────────────────────┘
```

Updates dynamically after each choice.

---

## 13. Appwrite Analytics Integration

Follow the same pattern as Workplace Etiquette game:

**On game completion (results screen):**
- Save to `game_sessions` collection:
  - `game_id`: `'financial-literacy'`
  - `character_id`: `'susheela'` or `'imran'`
  - `played_at`: ISO timestamp
  - `score`: final cumulative score
  - `level`: level title string
  - `total_questions`: 10
  - `correct_answers`: count of +30 choices
  - `duration_seconds`: optional

- Save to `game_answers` collection (10 records):
  - `session_id`: from above
  - `question_id`: scenario ID (1-10)
  - `answer_index`: 0, 1, or 2 (for A, B, C)
  - `points_earned`: +30, +10, or -20

---

## 14. Implementation Order

1. **Create Zustand store** (`financialStore.ts`) with all state and actions
2. **Create game data JSON** (`gamedata.json`) with all 10 scenarios, choices, feedback, and financial impacts
3. **Create result levels** (`resultlevels.ts`)
4. **Build Avatar Selection Screen** — replace ComingSoon
5. **Build Character Detail Screen**
6. **Build Scenario Screen** with savings/assets box and goal icons
7. **Build Choice Slider** component
8. **Build Feedback Screen** with score animation and financial lesson
9. **Build Results Screen** with level, goals, and ending narrative
10. **Build Review Screen**
11. **Add routes** to App.tsx
12. **Integrate Appwrite** analytics on completion
13. **Import existing assets** — `susheela.png`, `house-icon.png`, `education-icon.png` from `src/assets/financial/`

---

## 15. Packages Needed

No new packages — the project already has:
- `zustand` (state management)
- `react-router-dom` (routing)
- `lucide-react` (icons including House, GraduationCap, ChevronLeft, ChevronRight)
- `tailwindcss` (styling)

---

## 16. Existing Assets

| File | Description |
|---|---|
| `src/assets/financial/susheela.png` | Susheela's character portrait |
| `src/assets/financial/house-icon.png` | House goal progress icon |
| `src/assets/financial/education-icon.png` | Education/graduation cap goal progress icon |

## 17. Open Items

- [ ] Imran's character story and 10 scenarios (to be written by content team)
- [ ] Imran's portrait illustration (`src/assets/financial/imran.png`)
- [ ] Kannada translations for all scenario text, choices, feedback, and lessons
- [ ] Scenario illustration images (10 per character, to be placed in `src/assets/financial/scenario-illustrations/`)
- [ ] Audio narration recordings (optional, per GameFlow.md scripts)
