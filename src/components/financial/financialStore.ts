import { create } from 'zustand';
import gamedata from './gamedata.json';

export interface Asset {
	type: 'land' | 'gold' | 'business' | 'ppf' | 'mutual-fund' | 'rd' | 'fd' | 'emergency-fund' | 'community-stake';
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

export const useFinancialStore = create<FinancialState>((set, get) => ({
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

		// 11. Add new debts
		const newDebts = [...state.debts];
		for (const d of fi.newDebts) {
			newDebts.push({ ...d, remainingAmount: d.principal, takenInScenario: scenarioId });
		}

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
			monthlyExpenses: newExpenses,
			expenseBreakdown: workingBreakdown,
			assets: workingAssets,
			debts: newDebts,
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
}));
