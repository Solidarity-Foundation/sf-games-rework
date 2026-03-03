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

## Implementation Notes

Ideas 1 and 2 use the existing `conditionalImpacts` and `minimumSavings` mechanisms — no new store architecture is needed.

For the S6-A land gate (unavailable if no land), a new `requiredAsset` field on a choice may need to be added to the store's gate-checking logic.

For difficulty levels (Idea 3), start with the multiplier approach — add a `difficulty` field to the Zustand store and apply it when evaluating `minimumSavings` gates and loan interest rates.

**Priority order:**
1. Difficulty levels — highest leverage, affects the whole game.
2. Priya studies consequence — lighter lift, high emotional impact.
3. Land cascade — more changes across S6, S8, S10, but uses existing mechanics.
