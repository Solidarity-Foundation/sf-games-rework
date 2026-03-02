import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import gamedata from './gamedata.json';

export interface Asset {
	type: 'land' | 'gold' | 'business' | 'business-equipment' | 'ppf' | 'mutual-fund' | 'rd' | 'fd' | 'emergency-fund' | 'community-stake';
	label: string;
	value: number;
	acquiredInScenario: number;
}

export interface ExpenseItem {
	key: string;
	label: string;
	label_kan: string;
	amount: number;
}

export interface Debt {
	type: 'personal-loan' | 'community-loan' | 'business-loan' | 'education-loan' | 'moneylender';
	label: string;
	principal: number;
	interestRate: number;
	monthlyEmi: number;
	remainingAmount: number;
	takenInScenario: number;
	expenseKey?: string;
}

interface ChoiceRecord {
	choiceIndex: number; // 0=A, 1=B, 2=C
	choiceId: string;    // "A", "B", "C"
	points: number;
}

// ── gamedata types ────────────────────────────────────────────────────────────

type AssetType = Asset['type'];
type DebtType = Debt['type'];

interface GameDataAsset {
	type: AssetType;
	label: string;
	value: number;
}

interface GameDataDebt {
	type: DebtType;
	label: string;
	principal: number;
	interestRate: number;
	monthlyEmi: number;
	expenseKey?: string;
}

interface ExpenseItemChange {
	key: string;
	label?: string;
	label_kan?: string;
	newAmount: number;
}

interface ConditionalImpact {
	condition: { scenarioId: number; choiceId: string };
	monthlyIncomeChange?: number;
	monthlyExpensesChange?: number;
	savingsChange?: number;
}

interface AssetValueChange {
	type: AssetType;
	change: number;
}

interface AssetValueUpdate {
	type: AssetType;
	value: number;
}

interface RdConversion {
	annualRate: number;
	years: number;
	monthlyContribution: number;
}

interface FinancialImpact {
	savingsChange: number;
	monthlyIncomeChange: number;
	monthlyExpensesChange: number;
	newAssets: GameDataAsset[];
	newDebts: GameDataDebt[];
	conditionalImpacts?: ConditionalImpact[];
	expenseItemChanges?: ExpenseItemChange[];
	assetRemovals?: AssetType[];
	assetValueChanges?: AssetValueChange[];
	spendAllSavings?: boolean;
	rdConversion?: RdConversion;
}

interface GameChoice {
	id: string;
	label: string;
	description: string;
	points: number;
	minimumSavings?: number;
	minimumSurplus?: number;
	financialImpact: FinancialImpact;
}

interface GameScenario {
	id: number;
	title: string;
	situation: string;
	question: string;
	minimumSavings?: number;
	assetValueUpdates?: AssetValueUpdate[];
	choices: GameChoice[];
}

// ── state snapshot (for revert) ───────────────────────────────────────────────

interface FinancialSnapshot {
	savings: number;
	monthlyIncome: number;
	monthlyExpenses: number;
	expenseBreakdown: ExpenseItem[];
	assets: Asset[];
	debts: Debt[];
	age: number;
	score: number;
	houseGoalProgress: number;
	educationGoalProgress: number;
	houseGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';
	educationGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';
}

// ── store state ───────────────────────────────────────────────────────────────

interface FinancialState {
	// Character selection
	selectedCharacter: 'susheela' | 'imran' | null;

	// Game progression
	currentScenario: number; // 1-10
	completedScenarios: number[];
	gameStarted: boolean;

	// Scoring
	score: number;
	choiceHistory: Record<number, ChoiceRecord>;

	// Dynamic financial state
	savings: number;
	monthlyIncome: number;
	monthlyExpenses: number;
	expenseBreakdown: ExpenseItem[];
	assets: Asset[];
	debts: Debt[];
	age: number;

	// Goal tracking
	houseGoalProgress: number; // 0-100
	educationGoalProgress: number; // 0-100
	houseGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';
	educationGoalStatus: 'not-started' | 'in-progress' | 'at-risk' | 'achieved';

	// Language
	language: 'en' | 'kan';

	// Snapshots for revert
	stateSnapshots: Record<number, FinancialSnapshot>;

	// Actions
	selectCharacter: (id: 'susheela' | 'imran') => void;
	startGame: () => void;
	resetGame: () => void;
	setLanguage: (lang: 'en' | 'kan') => void;
	makeChoice: (scenarioId: number, choiceIndex: number) => void;
	revertLastChoice: () => void;
}

// ── starting state ────────────────────────────────────────────────────────────

const SUSHEELA_START = {
	savings: 0,
	monthlyIncome: 18000,
	monthlyExpenses: 17500,
	expenseBreakdown: [
		{ key: 'rent',      label: 'Rent',               label_kan: 'ಬಾಡಿಗೆ',              amount: 4000 },
		{ key: 'food',      label: 'Food & basics',      label_kan: 'ಆಹಾರ ಮತ್ತು ಮೂಲ',      amount: 5000 },
		{ key: 'medication',label: 'Medication',         label_kan: 'ಔಷಧಿ',                amount: 2000 },
		{ key: 'guru',      label: 'Guru Dakshina',      label_kan: 'ಗುರು ದಕ್ಷಿಣೆ',         amount: 3000 },
		{ key: 'mother',    label: 'Support for mother', label_kan: 'ತಾಯಿ ಬೆಂಬಲ',          amount: 1500 },
		{ key: 'priya',     label: "Priya's education",  label_kan: 'ಪ್ರಿಯಾ ಶಿಕ್ಷಣ',        amount: 2000 },
	] as ExpenseItem[],
	assets: [] as Asset[],
	debts: [] as Debt[],
	age: 30,
	houseGoalProgress: 0,
	educationGoalProgress: 5,
	houseGoalStatus: 'not-started' as const,
	educationGoalStatus: 'in-progress' as const,
};

// ── helpers ───────────────────────────────────────────────────────────────────

/** Future value of a recurring deposit: existing principal + monthly contributions */
function computeRdFutureValue(
	principal: number,
	annualRate: number,
	monthlyContribution: number,
	years: number,
): number {
	const months = years * 12;
	const r = annualRate / 12;
	const principalFV = principal * Math.pow(1 + r, months);
	const contributionFV = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
	return Math.round(principalFV + contributionFV);
}

/** Total months to fully repay a loan (amortisation formula) */
export function computeLoanTermMonths(principal: number, annualRate: number, monthlyEmi: number): number {
	if (monthlyEmi <= 0) return Infinity;
	const r = annualRate / 1200; // monthly rate
	if (r === 0) return Math.ceil(principal / monthlyEmi);
	const ratio = (principal * r) / monthlyEmi;
	if (ratio >= 1) return Infinity; // EMI too small to cover interest
	return Math.ceil(-Math.log(1 - ratio) / Math.log(1 + r));
}

function computeGoalProgress(
	assets: Asset[],
	scenarioId: number,
	choiceId: string,
	prevEduProgress: number,
): {
	house: number;
	houseStatus: FinancialState['houseGoalStatus'];
	edu: number;
	eduStatus: FinancialState['educationGoalStatus'];
} {
	// House goal: binary — 100% if Susheela owns any land, 0% otherwise
	const hasLand = assets.some(a => a.type === 'land');
	const houseProgress = hasLand ? 100 : 0;

	let houseStatus: FinancialState['houseGoalStatus'] = 'not-started';
	if (houseProgress >= 100) houseStatus = 'achieved';
	if (scenarioId >= 9 && !hasLand) houseStatus = 'at-risk';

	// Education goal: milestone-driven
	let eduProgress = prevEduProgress;
	if (scenarioId === 1) eduProgress = choiceId === 'C' ? 5 : 15;
	if (scenarioId === 2) eduProgress = prevEduProgress + (choiceId === 'C' ? 0 : 5);
	if (scenarioId === 3) eduProgress = prevEduProgress + (choiceId === 'A' ? 10 : 5);
	if (scenarioId === 4) eduProgress = prevEduProgress + 10;
	if (scenarioId === 5) eduProgress = prevEduProgress + 5;
	if (scenarioId === 6) {
		if (choiceId === 'A') eduProgress = 70;
		else if (choiceId === 'B') eduProgress = 55;
		else eduProgress = 45;
	}
	if (scenarioId === 7) eduProgress = Math.min(90, prevEduProgress + 10);
	if (scenarioId === 8) eduProgress = Math.min(90, prevEduProgress + 5);
	if (scenarioId === 9) eduProgress = Math.min(95, prevEduProgress + 5);
	if (scenarioId === 10) eduProgress = 100;

	eduProgress = Math.min(100, eduProgress);

	let eduStatus: FinancialState['educationGoalStatus'] = 'not-started';
	if (eduProgress >= 100) eduStatus = 'achieved';
	else if (eduProgress >= 30) eduStatus = 'in-progress';
	if (scenarioId >= 6 && eduProgress < 50) eduStatus = 'at-risk';

	return { house: houseProgress, houseStatus, edu: eduProgress, eduStatus };
}

// ── store ─────────────────────────────────────────────────────────────────────

export const useFinancialStore = create<FinancialState>()(persist((set, get) => ({
	selectedCharacter: null,
	currentScenario: 1,
	completedScenarios: [],
	gameStarted: false,
	score: 0,
	choiceHistory: {},
	stateSnapshots: {},
	...SUSHEELA_START,
	language: 'en',

	selectCharacter: (id) => set({ selectedCharacter: id }),

	startGame: () =>
		set({
			gameStarted: true,
			currentScenario: 1,
			completedScenarios: [],
			score: 0,
			choiceHistory: {},
			stateSnapshots: {},
			...SUSHEELA_START,
		}),

	resetGame: () =>
		set({
			selectedCharacter: null,
			gameStarted: false,
			currentScenario: 1,
			completedScenarios: [],
			score: 0,
			choiceHistory: {},
			stateSnapshots: {},
			...SUSHEELA_START,
		}),

	setLanguage: (lang) => set({ language: lang }),

	makeChoice: (scenarioId: number, choiceIndex: number) => {
		const state = get();

		const scenarios = (gamedata as { scenarios: GameScenario[] }).scenarios;
		const scenario = scenarios.find(s => s.id === scenarioId);
		if (!scenario) return;

		const choice = scenario.choices[choiceIndex];
		if (!choice) return;

		// Save snapshot of current state before applying this choice (used by revertLastChoice)
		const snapshot: FinancialSnapshot = {
			savings: state.savings,
			monthlyIncome: state.monthlyIncome,
			monthlyExpenses: state.monthlyExpenses,
			expenseBreakdown: [...state.expenseBreakdown],
			assets: [...state.assets],
			debts: [...state.debts],
			age: state.age,
			score: state.score,
			houseGoalProgress: state.houseGoalProgress,
			educationGoalProgress: state.educationGoalProgress,
			houseGoalStatus: state.houseGoalStatus,
			educationGoalStatus: state.educationGoalStatus,
		};

		const fi = choice.financialImpact;
		const choiceId = choice.id; // "A", "B", or "C"
		const points = choice.points;

		// 1. Apply scenario-level assetValueUpdates (e.g. land appreciation in S6)
		const workingAssets = [...state.assets];
		for (const upd of scenario.assetValueUpdates ?? []) {
			const i = workingAssets.findIndex(a => a.type === upd.type);
			if (i >= 0) workingAssets[i] = { ...workingAssets[i], value: upd.value };
		}
		// Debt array — initialised early so special cases (8b, 11b) can push to it
		const newDebts: Debt[] = [...state.debts];

		// 2. Starting savings — zero out if spendAllSavings
		let newSavings = fi.spendAllSavings ? 0 : state.savings;

		// 3. Apply immediate savingsChange
		newSavings += fi.savingsChange;

		// 4. Income and expenses
		let newIncome = state.monthlyIncome + fi.monthlyIncomeChange;
		let newExpenses = state.monthlyExpenses + fi.monthlyExpensesChange;

		// 5. Apply path-dependent conditionalImpacts
		for (const ci of fi.conditionalImpacts ?? []) {
			const prev = state.choiceHistory[ci.condition.scenarioId];
			if (prev?.choiceId === ci.condition.choiceId) {
				if (ci.monthlyIncomeChange) newIncome += ci.monthlyIncomeChange;
				if (ci.savingsChange) newSavings += ci.savingsChange;
			}
		}

		// 5b. Update expense breakdown — must happen before accumulation so
		//     monthlyExpenses is always derived from the authoritative item list.
		const workingBreakdown = [...state.expenseBreakdown];
		for (const change of (fi.expenseItemChanges as ExpenseItemChange[] | undefined) ?? []) {
			const idx = workingBreakdown.findIndex(item => item.key === change.key);
			if (idx >= 0) {
				workingBreakdown[idx] = { ...workingBreakdown[idx], amount: change.newAmount };
			} else {
				workingBreakdown.push({
					key: change.key,
					label: change.label ?? change.key,
					label_kan: change.label_kan ?? change.key,
					amount: change.newAmount,
				});
			}
		}
		// Reconcile: expense breakdown is the single source of truth
		newExpenses = workingBreakdown.reduce((sum, item) => sum + item.amount, 0);

		// 5c. Annual inflation: rent, shop-rent, and food increase by 2%/year.
		//     Each scenario spans 2 years → multiply by 1.02² ≈ 1.0404 per scenario.
		const INFLATION_KEYS = ['rent', 'shop-rent', 'food'];
		for (const key of INFLATION_KEYS) {
			const idx = workingBreakdown.findIndex(item => item.key === key);
			if (idx >= 0 && workingBreakdown[idx].amount > 0) {
				workingBreakdown[idx] = {
					...workingBreakdown[idx],
					amount: Math.round(workingBreakdown[idx].amount * Math.pow(1.02, 2)),
				};
			}
		}
		newExpenses = workingBreakdown.reduce((sum, item) => sum + item.amount, 0);

		// 6. Auto-accumulate (income − expenses) × 24 months
		//    Skipped when rdConversion is present (RD handles the full accumulation)
		if (!fi.rdConversion) {
			newSavings += (newIncome - newExpenses) * 24;
		}

		// 7. Add new assets (overwrite if same type already exists)
		for (const a of fi.newAssets) {
			const i = workingAssets.findIndex(x => x.type === a.type);
			if (i >= 0) workingAssets.splice(i, 1);
			workingAssets.push({ type: a.type, label: a.label, value: a.value, acquiredInScenario: scenarioId });
		}

		// 8. Remove assets (e.g. land sold in S6A, emergency-fund + RD broken in S9A)
		for (const type of fi.assetRemovals ?? []) {
			const i = workingAssets.findIndex(a => a.type === type);
			if (i >= 0) workingAssets.splice(i, 1);
		}

		// 8b. S6-A special case: if player chose S4-B/C (gold instead of land),
		//     sell gold for education instead of land. Adjust savings surplus.
		if (scenarioId === 6 && choiceId === 'A') {
			const s4 = state.choiceHistory[4];
			if (s4 && s4.choiceId !== 'A') {
				const goldIdx = workingAssets.findIndex(a => a.type === 'gold');
				if (goldIdx >= 0) {
					// Gold proceeds go directly to education — no surplus to savings
					// Cancel the base +₹2L that assumed land sale (₹5L - ₹3L education)
					newSavings -= 200000;
					workingAssets.splice(goldIdx, 1);
					// Take education loan for the remaining cost after gold proceeds
					// S4-B: gold ₹2L → loan ₹3L @18%, EMI ₹7,500
					// S4-C: gold ₹1L → loan ₹4L @18%, EMI ₹10,000
					const goldValue = s4.choiceId === 'B' ? 200000 : 100000;
					const loanPrincipal = 500000 - goldValue;
					const emi = s4.choiceId === 'B' ? 7500 : 10000;
					newSavings -= emi * 24; // account for 24 months of EMI
					workingBreakdown.push({
						key: 'loan-emi-edu-priya',
						label: 'Education loan EMI (Priya)',
						label_kan: 'ಪ್ರಿಯಾ ಶಿಕ್ಷಣ ಸಾಲ EMI',
						amount: emi,
					});
					newExpenses += emi;
					newDebts.push({
						type: 'education-loan',
						label: 'Education loan (Priya)',
						principal: loanPrincipal,
						interestRate: 18,
						monthlyEmi: emi,
						remainingAmount: loanPrincipal,
						takenInScenario: scenarioId,
						expenseKey: 'loan-emi-edu-priya',
					});
				}
			}
		}

		// 8c. S9-C special case: if emergency fund exists, the ₹30K deposit
		//     comes from the fund, not general savings. Cancel the base
		//     savingsChange: -30000 and deduct from the fund asset instead.
		if (scenarioId === 9 && choiceId === 'C') {
			const efIdx = workingAssets.findIndex(a => a.type === 'emergency-fund');
			if (efIdx >= 0) {
				newSavings += 30000; // cancel the -30000 from fi.savingsChange
				workingAssets[efIdx] = {
					...workingAssets[efIdx],
					value: Math.max(0, workingAssets[efIdx].value - 30000),
				};
			}
		}

		// 8d. S6-B special case: if savings ≥ ₹2L, deduct exactly ₹2L instead of all savings.
		//     ₹3L loan + ₹2L savings = ₹5L education cost. spendAllSavings already zeroed
		//     newSavings; add back the unspent portion.
		if (scenarioId === 6 && choiceId === 'B' && state.savings >= 200000) {
			newSavings += state.savings - 200000;
		}

		// 8e. S6-C special case: if savings ≥ ₹5L, Susheela can fully fund Priya's education
		//     from savings with no loan and no burden on Priya. Deduct exactly ₹5L.
		if (scenarioId === 6 && choiceId === 'C' && state.savings >= 500000) {
			newSavings += state.savings - 500000;
		}

		// 8f. S8-B special case (no land): buy ₹12L retirement plot instead of land+gold+FD.
		//     Step 7 already added land ₹8L, gold ₹5L, FD ₹12L — replace those with land ₹12L.
		//     Base savingsChange was -₹25L; correct to -₹8L down + 24mo × ₹10K EMI.
		if (scenarioId === 8 && choiceId === 'B') {
			const hadLand = state.assets.some(a => a.type === 'land');
			if (!hadLand) {
				const originalGold = state.assets.find(a => a.type === 'gold');
				// Remove assets added in step 7 for this choice (land ₹8L, gold ₹5L, FD ₹12L)
				for (let i = workingAssets.length - 1; i >= 0; i--) {
					if (workingAssets[i].acquiredInScenario === scenarioId) workingAssets.splice(i, 1);
				}
				// Restore any gold the player already owned before this choice
				if (originalGold) workingAssets.push({ ...originalGold });
				// Add land at ₹12L for retirement home
				workingAssets.push({ type: 'land', label: 'Plot for retirement home', value: 1200000, acquiredInScenario: scenarioId });
				// Correct savings: undo -₹25L base, apply -₹8L down, subtract 24mo of ₹10K EMI
				newSavings += 2500000 - 800000 - 10000 * 24;
				// Add EMI to expense breakdown and running total
				workingBreakdown.push({
					key: 'loan-emi-land-s8',
					label: 'Land loan EMI',
					label_kan: 'ಭೂಮಿ ಸಾಲ EMI',
					amount: 10000,
				});
				newExpenses += 10000;
				// Add debt
				newDebts.push({
					type: 'personal-loan',
					label: 'Land loan (retirement plot)',
					principal: 400000,
					interestRate: 12,
					monthlyEmi: 10000,
					remainingAmount: 400000,
					takenInScenario: scenarioId,
					expenseKey: 'loan-emi-land-s8',
				});
			} else {
				// Has land: step 7 overwrote existing land with ₹8L — restore original, keep gold+FD only
				const originalLand = state.assets.find(a => a.type === 'land');
				const s8LandIdx = workingAssets.findIndex(a => a.type === 'land' && a.acquiredInScenario === scenarioId);
				if (s8LandIdx >= 0) workingAssets.splice(s8LandIdx, 1);
				if (originalLand) workingAssets.push({ ...originalLand });
				// Correct savings: undo -₹25L base, apply -₹17L (gold ₹5L + FD ₹12L)
				newSavings += 2500000 - 1700000;
			}
		}

		// 8g. S9-A special case: if no emergency fund AND no RD, full ₹1.8L comes from savings.
		//     Base savingsChange -₹84K assumes fund + RD covered the rest; correct to -₹180K.
		if (scenarioId === 9 && choiceId === 'A') {
			const hadEf = state.assets.some(a => a.type === 'emergency-fund');
			const hadRd = state.assets.some(a => a.type === 'rd');
			if (!hadEf && !hadRd) {
				newSavings -= (180000 - 84000); // correct total deduction from -84K to -180K
			}
		}

		// 8h. S9-B special case: if no mutual fund, replace MF liquidation with
		//     ₹1L from savings + ₹80K loan @12% (EMI ₹4K/mo).
		if (scenarioId === 9 && choiceId === 'B') {
			const hasMF = workingAssets.some(a => a.type === 'mutual-fund');
			if (!hasMF) {
				newSavings -= 100000; // ₹1L immediate payment
				newSavings -= 4000 * 24; // correct 24-month accumulation (step 6 ran without this EMI)
				workingBreakdown.push({
					key: 'loan-emi-hospital-s9b',
					label: 'Hospital loan EMI',
					label_kan: 'ಆಸ್ಪತ್ರೆ ಸಾಲ EMI',
					amount: 4000,
				});
				newExpenses += 4000;
				newDebts.push({
					type: 'personal-loan',
					label: 'Hospital emergency loan',
					principal: 80000,
					interestRate: 12,
					monthlyEmi: 4000,
					remainingAmount: 80000,
					takenInScenario: scenarioId,
					expenseKey: 'loan-emi-hospital-s9b',
				});
			}
		}

		// 8i. S9-C special case: if no MF and player has land, sell land to cover hospital bill.
		//     Cancel the personal loan mechanics from gamedata; credit land proceeds − ₹1.8L.
		if (scenarioId === 9 && choiceId === 'C'
			&& !state.assets.some(a => a.type === 'mutual-fund')
			&& state.assets.some(a => a.type === 'land')) {
			const efExisted = state.assets.some(a => a.type === 'emergency-fund');
			if (!efExisted) {
				newSavings += 30000; // cancel -30K savingsChange (8c did not run)
			} else {
				// 8c ran and deducted 30K from EF — restore it
				const efIdx = workingAssets.findIndex(a => a.type === 'emergency-fund');
				if (efIdx >= 0) workingAssets[efIdx] = { ...workingAssets[efIdx], value: workingAssets[efIdx].value + 30000 };
			}
			// Remove EMI from breakdown + undo its accumulation effect
			const emiIdx = workingBreakdown.findIndex(item => item.key === 'loan-emi-hospital');
			if (emiIdx >= 0) workingBreakdown.splice(emiIdx, 1);
			newExpenses -= 3500;
			newSavings += 3500 * 24; // undo EMI accumulation from step 6
			// Remove land asset and credit proceeds
			const landToSell = state.assets.find(a => a.type === 'land')!;
			const landWIdx = workingAssets.findIndex(a => a.type === 'land');
			if (landWIdx >= 0) workingAssets.splice(landWIdx, 1);
			newSavings += landToSell.value - 180000;
		}

		// 9. Adjust individual asset values (e.g. partial MF sell in S9B)
		for (const avc of fi.assetValueChanges ?? []) {
			const i = workingAssets.findIndex(a => a.type === avc.type);
			if (i >= 0) {
				workingAssets[i] = { ...workingAssets[i], value: Math.max(0, workingAssets[i].value + avc.change) };
			}
		}

		// 10. RD conversion (S8C): all savings + monthly contributions → RD at fixed rate
		if (fi.rdConversion) {
			const { annualRate, years, monthlyContribution } = fi.rdConversion;
			// Principal = savings before spendAllSavings zeroed them (the lump sum going in)
			const rdPrincipal = fi.spendAllSavings ? state.savings : newSavings;
			const rdValue = computeRdFutureValue(rdPrincipal, annualRate, monthlyContribution, years);
			const i = workingAssets.findIndex(a => a.type === 'rd');
			if (i >= 0) workingAssets.splice(i, 1);
			workingAssets.push({ type: 'rd', label: 'Recurring Deposit', value: rdValue, acquiredInScenario: scenarioId });
			newSavings = 0; // everything converted to RD
		}

		// 11. Add new debts (array initialised here; special cases in 8b/11b may have already pushed to it)
		for (const d of fi.newDebts) {
			newDebts.push({ ...d, remainingAmount: d.principal, takenInScenario: scenarioId, expenseKey: d.expenseKey });
		}

		// 11b. S7-A special case: if savings < ₹3L, add a community loan for the shortfall.
		//      Auto-accumulate (step 6) ran with savingsChange: -300000 which may have made
		//      newSavings go negative. Fix: zero out the over-deduction and subtract 24 months
		//      of EMI payments from accumulation so the final savings figure is correct.
		if (scenarioId === 7 && choiceId === 'A' && state.savings < 300000) {
			const shortfall = 300000 - state.savings;
			const r = 0.01; // 12% annual / 12 months
			const n = 24;
			const emi = Math.round(shortfall * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
			// Correct savings: undo over-deduction, subtract 24 months of EMI
			newSavings += (300000 - state.savings) - emi * 24;
			// Record the ongoing EMI in expense breakdown + monthly expenses
			workingBreakdown.push({
				key: 'community-loan-s7-emi',
				label: 'Community loan EMI (down payment)',
				label_kan: 'ಸಮುದಾಯ ಸಾಲ EMI (ಡೌನ್ ಪೇಮೆಂಟ್)',
				amount: emi,
			});
			newExpenses += emi;
			// Add community loan to debts
			newDebts.push({
				type: 'community-loan',
				label: 'Community loan (down payment shortfall)',
				principal: shortfall,
				interestRate: 12,
				monthlyEmi: emi,
				remainingAmount: shortfall,
				takenInScenario: scenarioId,
				expenseKey: 'community-loan-s7-emi',
			});
		}

		// 11c. S9-C land sell path: remove hospital personal loan added in step 11.
		if (scenarioId === 9 && choiceId === 'C'
			&& !state.assets.some(a => a.type === 'mutual-fund')
			&& state.assets.some(a => a.type === 'land')) {
			const hospitalLoanIdx = newDebts.findIndex(d => d.takenInScenario === 9 && d.type === 'personal-loan');
			if (hospitalLoanIdx >= 0) newDebts.splice(hospitalLoanIdx, 1);
		}

		// 12. Expire paid-off debts after this scenario's 24-month period.
		//     At the end of makeChoice(N), a debt from scenario T has had (N−T+1)×24 months paid.
		//     If that meets or exceeds the full amortisation term, remove the debt and its EMI item.
		const paidOffExpenseKeys = new Set<string>();
		const finalDebts = newDebts.filter(d => {
			const monthsPaid = (scenarioId - d.takenInScenario + 1) * 24;
			const term = computeLoanTermMonths(d.principal, d.interestRate, d.monthlyEmi);
			if (monthsPaid >= term) {
				if (d.expenseKey) paidOffExpenseKeys.add(d.expenseKey);
				return false;
			}
			return true;
		});
		const finalBreakdown = workingBreakdown.filter(item => !paidOffExpenseKeys.has(item.key));
		const finalExpenses = finalBreakdown.reduce((sum, item) => sum + item.amount, 0);

		// 13. Advance age (2 years per scenario)
		const newAge = state.age + 2;

		// 14. Compute goal progress
		const clampedSavings = Math.max(0, newSavings);
		const goals = computeGoalProgress(
			workingAssets,
			scenarioId,
			choiceId,
			state.educationGoalProgress,
		);

		set({
			score: state.score + points,
			choiceHistory: { ...state.choiceHistory, [scenarioId]: { choiceIndex, choiceId, points } },
			stateSnapshots: { ...state.stateSnapshots, [scenarioId]: snapshot },
			savings: clampedSavings,
			monthlyIncome: newIncome,
			monthlyExpenses: finalExpenses,
			expenseBreakdown: finalBreakdown,
			assets: workingAssets,
			debts: finalDebts,
			age: newAge,
			houseGoalProgress: goals.house,
			houseGoalStatus: goals.houseStatus,
			educationGoalProgress: goals.edu,
			educationGoalStatus: goals.eduStatus,
			completedScenarios: [...state.completedScenarios, scenarioId],
			currentScenario: scenarioId < 10 ? scenarioId + 1 : scenarioId,
		});
	},

	revertLastChoice: () => {
		const state = get();
		const completed = state.completedScenarios;
		if (completed.length === 0) return;

		const lastScenarioId = completed[completed.length - 1];
		const snapshot = state.stateSnapshots[lastScenarioId];
		if (!snapshot) return;

		const newChoiceHistory = { ...state.choiceHistory };
		delete newChoiceHistory[lastScenarioId];

		const newSnapshots = { ...state.stateSnapshots };
		delete newSnapshots[lastScenarioId];

		set({
			...snapshot,
			currentScenario: lastScenarioId,
			completedScenarios: completed.slice(0, -1),
			choiceHistory: newChoiceHistory,
			stateSnapshots: newSnapshots,
		});
	},
}), {
	name: 'sf-financial-game',
	partialize: (state) => ({
		selectedCharacter: state.selectedCharacter,
		currentScenario: state.currentScenario,
		completedScenarios: state.completedScenarios,
		gameStarted: state.gameStarted,
		score: state.score,
		choiceHistory: state.choiceHistory,
		stateSnapshots: state.stateSnapshots,
		savings: state.savings,
		monthlyIncome: state.monthlyIncome,
		monthlyExpenses: state.monthlyExpenses,
		expenseBreakdown: state.expenseBreakdown,
		assets: state.assets,
		debts: state.debts,
		age: state.age,
		houseGoalProgress: state.houseGoalProgress,
		houseGoalStatus: state.houseGoalStatus,
		educationGoalProgress: state.educationGoalProgress,
		educationGoalStatus: state.educationGoalStatus,
		language: state.language,
	}),
}));
