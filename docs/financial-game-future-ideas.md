# Financial Literacy Game — Future Development Ideas

## 1. Priya Cannot Finish Her Studies

### Concept
Scenario 6, Choice C ("Share burden with Priya") currently hints that "studies may suffer" but has no real downstream consequence. This idea makes that consequence explicit and felt.

### Changes Required

**Scenario 6 — Choice C (harden the consequence)**
- Update the description to explicitly state: Priya cannot afford years 3 and 4 of engineering, and drops out with a diploma after year 2.
- The situation text and feedback should make this feel real and emotionally weighted — not just a financial note.

**Scenario 10 — Add a `conditionalImpact` for S6=C**
- S10 currently has Priya graduating as an engineer (₹35,000/month, contributing ₹20,000/month to household).
- If S6=C: Priya works as a junior technician (₹20,000/month, contributes only ₹5,000/month).
- S10's situation text should reflect this: "Priya, who had to drop out in her third year, works as a junior technician..."
- This makes the estate-planning scenario significantly harder — the income boost players were relying on doesn't materialise.

### Why This Works
The consequence lands at exactly the right moment — S10, when the player most needs financial support. Players who invested properly in Priya's education feel the difference directly. It also adds emotional weight: the cost of under-investing in a child's future isn't just financial.

---

## 2. Land Not Secured — Retirement Consequences

### Concept
The only early land-buying window is Scenario 4-A (₹3L). Missing it should have compounding, painful consequences throughout the game.

### Changes Required

**Scenario 6 — Close the best branch**
- Choice A ("Sell land for Priya's education") becomes unavailable if no land was bought in S4.
- This forces the player into the loan path (S6-B) or the debt-burden path (S6-C) — both harder outcomes.
- This can be implemented as a `minimumAsset` gate or a `conditionalAvailability` flag on S6-A.

**Scenario 8 — Harder savings gate**
- Choice B ("Land + gold + FD") requires ₹25L in savings (land is ₹8L, bought here at a much higher price than the ₹3L S4 opportunity).
- If no land was bought in S4, the player must pay this premium. The minimum savings threshold is already punishing — without the S4 head start, reaching ₹25L is very difficult.

**Scenario 10 — Retirement housing insecurity**
- If the player arrives at S10 with no land asset, add a `conditionalImpact`:
  - Monthly rent expense: ₹8,000/month (ongoing in retirement).
  - Update S10's situation text to reflect housing vulnerability: Susheela has no home of her own going into retirement.
- This makes the retirement corpus calculations significantly worse and gives the player a tangible sense of what it means to have missed that window 16 years earlier.

### Why This Works
The land-buying opportunity in S4 is already a good mechanic (time-limited, requires savings discipline). These additions create a proper cascade: missing it doesn't just mean "no land" — it closes a door in S6, raises the cost in S8, and creates an ongoing drain in S10. The compounding nature of the penalty mirrors how real financial decisions work.

---

## 3. Difficulty Levels (Easy / Medium / Hard)

### Concept
A difficulty setting chosen before the game starts (at AvatarSelectionScreen or a new dedicated screen). **Medium = current game as-is.** Easy and Hard adjust specific numbers across scenarios without changing the story or the number of scenarios.

### Levers That Change by Difficulty

**Starting conditions (Scenario 1)**
| | Easy | Medium | Hard |
|---|---|---|---|
| Starting savings | ₹5,000 | ₹0 | ₹0, plus ₹3,000 existing debt (old loan) |
| S1 monthly surplus after all expenses | ~₹1,500 | ~₹500 | ~₹0 (expenses start at ₹18,000 = full income) |

**Savings gates (`minimumSavings`)**
- Easy: All thresholds reduced by 20% (e.g., S4-A land gate: ₹2.4L instead of ₹3L)
- Hard: All thresholds raised by 20% (e.g., S4-A land gate: ₹3.6L; S2-A: ₹19.2K instead of ₹16K)

**Loan interest rates**
- Easy: All rates reduced (moneylender 18% → 15%; personal loan 18% → 14%; business loan 11% → 9%)
- Hard: All rates increased (moneylender 24% stays; personal loan 18% → 22%; hospital loan 16% → 20%)

**Shock events (Hard only)**
Hard mode adds one unavoidable expense event — a small shock injected into the situation text of an existing scenario. Two candidates:
- **S3 (Identity Documents)**: A landlord dispute requires ₹5,000 to resolve, regardless of choice made.
- **S7 (Business Expansion)**: A break-in at the parlour causes ₹20,000 in uninsured equipment damage before the S7 choice is presented.

These are not extra scenarios — they are `hardModeShock` fields on the scenario that the store applies as a savings deduction before revealing choices.

**Consequence severity**
- Easy: If Priya drops out (S6-C), she still earns ₹28,000 and contributes ₹12,000/month in S10.
- Hard: If Priya drops out (S6-C), she earns ₹18,000 and contributes nothing (keeping all earnings for her own survival).

**Scoring adjustments**
- No change to the +30/+10/-20 point system per choice.
- The result level thresholds shift slightly: on Hard, achieving "Resilient Builder" (200+) is a genuine achievement; on Easy, "Survival Champion" (250+) is more attainable.

### UX — Where Difficulty Is Set
A difficulty selector screen after AvatarSelection and CharacterDetail, before Scenario 1. Three buttons: Easy / Medium / Hard, with a one-line description of what changes:
- Easy: "More breathing room — slightly higher income and lower interest rates."
- Medium: "The real game. No adjustments."
- Hard: "Tighter margins, higher rates, and one unexpected crisis."

### Implementation Approach

**Option A — Multiplier approach (simpler)**
Store a `difficulty` value (`easy | medium | hard`) in the Zustand store. The store applies a multiplier when evaluating `minimumSavings` gates and `interestRate` on debts. No changes to `gamedata.json`.

**Option B — Override approach (more flexible)**
Add optional `easy` and `hard` override blocks to each scenario/choice in `gamedata.json`. Medium = default values. The store picks the right block at runtime based on the selected difficulty. Allows surgical per-scenario tuning.

**Recommended**: Start with Option A (multiplier) since it requires no `gamedata.json` restructuring. Add per-scenario overrides only if playtesting reveals specific scenarios need fine-tuning on a given difficulty.

---

## 4. Raise Engineering Fees and Add Explicit Diploma Path (S6 Revision)

### Concept
Engineering college currently costs ₹5 lakh — exactly equal to the land value, making Choice A (sell land) a clean one-to-one swap that feels too tidy. Raising the fee to **₹10 lakh** over 4 years creates real tension: the land covers only half, forcing every choice to involve either debt or compromise. At the same time, introduce a **diploma path** as an explicit, honourable choice — Priya choosing a 3-year polytechnic diploma (₹2–3 lakh total) rather than a 4-year engineering degree. This replaces the current S6-C "share burden" choice, which is vague and whose consequences are only felt as a hidden downstream penalty.

### Priya's Dream — Making the Goal Explicit
The situation text in S6 must establish clearly that **engineering is Priya's dream**, not just a general desire to study further. The opening line should name it: *"Priya has dreamed of becoming an engineer since she was a child. She has received admission to an engineering college — the fees are ₹10 lakh over 4 years."* This ensures the player understands what is at stake before they choose. If Priya ends up with a diploma or drops out, the emotional weight of the compromise lands correctly because the original dream was made concrete.

### Revised Scenario 6 Setup
- Engineering fee: **₹10 lakh over 4 years** (₹2.5L/year)
- Land is worth **₹5 lakh** at this point (bought at ₹3L in S4, now appreciated)
- Diploma course: **₹2.5 lakh over 3 years** (polytechnic, full-time — no part-time work needed)
- Priya is not legally Susheela's daughter, so formal bank education loans remain difficult

### Revised Choices

**Choice A — Sell land + cooperative/trust loan (excellent, +30)**
Sell land for ₹5L. The land sale covers the first 2 years of engineering. Susheela joins a local women's credit cooperative and takes a ₹5L loan at 10% interest (₹8,000 EMI, 60 months) for the remaining 2 years. Priya completes a full engineering degree. Land asset removed; manageable debt added.

- `savingsChange`: +₹0 (land proceeds go directly to fees)
- `assetRemovals`: `["land"]`
- `newDebts`: cooperative/trust loan ₹5L at 10%, EMI ₹8,000, clears by S9
- Monthly expenses: +₹8,000 (EMI)
- S10 outcome: Priya is a qualified engineer, earning ₹35,000/month, contributes ₹20,000/month to household
- **Gate — `requiredAsset: "land"`**: Choice A is unavailable if Susheela does not own land (nothing to sell).
- **Gate — `minimumSurplus: 8000`**: Choice A is unavailable if current monthly surplus is below ₹8,000 — Susheela cannot afford the EMI after selling land.

**Choice B — Sell land, fund diploma track (moderate, +10)**
Sell land for ₹5L. Rather than stretching into debt, Susheela and Priya agree that a polytechnic diploma (₹2.5L, 3 years) is a realistic, debt-free path. ₹2.5L goes to diploma fees; the remaining ₹2.5L stays in savings. Priya studies full-time, no part-time work, and completes her diploma. Land asset removed; no new debt.

- `savingsChange`: +₹250,000 (land ₹5L − diploma ₹2.5L)
- `assetRemovals`: `["land"]`
- `newDebts`: none
- Monthly expenses: unchanged
- S10 outcome: Priya works as a junior engineer/technician earning ₹22,000/month, contributes ₹10,000/month to household
- **Gate — `requiredAsset: "land"`**: Choice B is unavailable if Susheela does not own land — there is nothing to sell to fund the diploma.

**Choice C — Keep land, take high-interest loan, Priya works part-time (poor, −20)**
Keep land. Use all current savings plus a personal loan of ₹5L at 18% interest (₹12,500 EMI) to fund the first half of engineering. Priya works part-time evenings to contribute. Studies suffer — she falls behind, misses exams, and by year 3 cannot keep up. She drops out without completing the degree.

- `savingsChange`: 0 (`spendAllSavings: true`)
- `spendAllSavings`: true
- `newDebts`: personal loan ₹5L at 18%, EMI ₹12,500
- Monthly expenses: +₹12,500 (EMI)
- S10 outcome: Priya did not complete engineering, works in informal sector earning ₹15,000/month, contributes ₹10,000/month to household (keeps ₹5,000 for herself)
- **Gate — `minimumSurplus: 12500`**: Choice C is unavailable if current monthly surplus is below ₹12,500 — Susheela cannot sustain the high-interest EMI.

### Three S10 Outcome Tracks
This revision creates three clean, meaningfully different outcomes in S10:

| S6 choice | Priya's qualification | S10 monthly contribution |
|---|---|---|
| A (engineering + loan) | B.E. engineer | ₹20,000/month (keeps ₹15,000) |
| B (diploma, no debt) | Polytechnic diploma | ₹10,000/month (keeps ₹12,000) |
| C (dropout) | No qualification | ₹10,000/month (keeps ₹5,000) |

The S10 situation text should reflect the chosen track explicitly (via `conditionalImpacts` keyed to `S6=A`, `S6=B`, `S6=C`).

### Education Goal Ring Progress
The existing goals ring in ScenarioScreen tracks progress toward Susheela's goals. Priya's engineering should be registered as a named goal with a defined completion target. The ring progress should reflect the S6 outcome:

| S6 choice | Goal ring state | Display |
|---|---|---|
| A (engineering completed) | 100% | Full ring, filled colour |
| B (diploma — original goal was engineering) | 50% | Half ring |
| C (dropout — goal failed) | 0% | Empty ring (or ring removed entirely) |

The 50% state for the diploma path is intentional: Priya got *a* qualification, but the original goal — engineering — was not achieved. This communicates that even a "decent" outcome is a partial miss relative to what was hoped for.

### Results Page Badge — Priya the Engineer
On the ResultsScreen, add a special achievement badge for completing Priya's engineering degree (S6=A), similar to the existing badge for successfully buying land for the retirement home. Suggested display:

- **Badge label:** "Priya the Engineer"
- **Icon:** mortar board / graduation cap
- **Condition:** `choiceHistory.S6 === 'A'`
- **Badge description:** "You invested fully in Priya's dream. She graduated as a qualified engineer."

If S6=B (diploma), show a softer note — not a badge, but a line in the results summary: *"Priya completed a diploma. Her dream of engineering was only partly fulfilled."*

If S6=C (dropout), show: *"Priya was unable to complete her studies. The financial pressure was too great."*

This mirrors how the land badge works: it rewards the player for making the harder, more forward-looking choice — and makes the cost of the easier choices visible at the end.

### Relationship to Idea 1
This revision **supersedes Idea 1** (Priya Cannot Finish Her Studies). The diploma path and the dropout path are now first-class explicit choices rather than a hidden downstream consequence of a vague "share burden" option. Idea 1 can be retired once this is implemented.

### S10 Situation Text — Exact Changes Required

S10's situation text is generated dynamically in `getSituationText()` inside `ScenarioScreen.tsx` (not stored in `gamedata.json`). The Priya sentence currently reads:

> *"Priya is now graduating and starting her first job (₹35,000/month; contributing ₹20,000/month to the household)."*

This must be replaced with a conditional block keyed to `choiceHistory[6]?.choiceId` (S6):

**S6=A (engineering):**
> *"Priya fulfilled her dream — she graduated as a B.E. engineer and has started her first job (₹35,000/month; contributing ₹20,000/month to the household, keeping ₹15,000 for herself)."*

**S6=B (diploma):**
> *"Priya completed a polytechnic diploma — not the engineering degree she dreamed of, but a real qualification. She works as a junior technician (₹22,000/month; contributing ₹10,000/month to the household, keeping ₹12,000 for herself)."*

**S6=C (dropout):**
> *"Priya was unable to complete her engineering degree — the financial pressure forced her to drop out. She works in the informal sector (₹15,000/month; contributing ₹10,000/month to the household, keeping ₹5,000 for herself)."*

### S10 gamedata.json — monthlyIncomeChange Must Be Conditional

All three S10 choices (A, B, C) currently hardcode `"monthlyIncomeChange": 20000`. This must become path-dependent:

- Set base `"monthlyIncomeChange": 0` on all three choices
- Add `conditionalImpacts` to each choice:
  ```json
  "conditionalImpacts": [
    {
      "condition": { "scenarioId": 6, "choiceId": "A" },
      "monthlyIncomeChange": 20000,
      "notes": "Priya graduated as B.E. engineer — contributes ₹20,000/month to household."
    },
    {
      "condition": { "scenarioId": 6, "choiceId": "B" },
      "monthlyIncomeChange": 10000,
      "notes": "Priya completed polytechnic diploma — contributes ₹10,000/month to household."
    },
    {
      "condition": { "scenarioId": 6, "choiceId": "C" },
      "monthlyIncomeChange": 10000,
      "notes": "Priya dropped out — earns ₹15,000/month in informal sector, contributes ₹10,000/month to household, keeps ₹5,000 for herself."
    }
  ]
  ```

### Implementation Notes
- Update `situation` text in S6 to name Priya's dream explicitly and state the fee as ₹10 lakh
- Update `assetValueUpdates` for land to ₹5L (no change — already correct)
- Replace all three S6 choices in `gamedata.json`
- Update S10 `getSituationText()` in `ScenarioScreen.tsx` with the three Priya clauses above
- Update S10 choices in `gamedata.json`: set base `monthlyIncomeChange: 0`, add `conditionalImpacts` for S6=A and S6=B
- Add a named goal `"priya-engineering"` to the goals list; its ring progress is driven by S6 outcome: 100% (A), 50% (B), 0% (C)
- On ResultsScreen: add "Priya the Engineer" badge when `S6=A`; add outcome summary lines for `S6=B` and `S6=C`
- `minimumSurplus` gates on A and C use the existing gate mechanism (already supported by the store and ScenarioScreen)
- `requiredAsset` gate on A and B is **new** — a `requiredAsset` field on a choice needs to be added to the store's gate-checking logic (similar to how `minimumSavings` works, but checks `assets.some(a => a.type === requiredAsset)` instead)

---

## Implementation Notes

Idea 4 (S6 revision) supersedes Idea 1 and uses only existing store mechanics — it should be implemented first.

Idea 2 (land cascade) uses the existing `conditionalImpacts` and `minimumSavings` mechanisms — no new store architecture is needed.

For the S6-A land gate in Idea 2 (unavailable if no land), a new `requiredAsset` field on a choice may need to be added to the store's gate-checking logic.

For difficulty levels (Idea 3), start with the multiplier approach — add a `difficulty` field to the Zustand store and apply it when evaluating `minimumSavings` gates and loan interest rates.

**Priority order:**
1. **S6 revision (Idea 4)** — raises fees to ₹10L, adds explicit diploma path, three clean S10 tracks. Implement this before anything else.
2. Difficulty levels (Idea 3) — highest leverage after S6 is solid, affects the whole game.
3. Priya studies consequence (Idea 1) — superseded by Idea 4; retire once Idea 4 is done.
4. Land cascade (Idea 2) — more changes across S6, S8, S10, but uses existing mechanics.
