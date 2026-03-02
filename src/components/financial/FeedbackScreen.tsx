import { Navigate, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import gamedata from './gamedata.json';

type GameScenario = (typeof gamedata.scenarios)[number];

const fmt = (n: number) => {
	if (n < 0) return `-₹${Math.abs(n).toLocaleString('en-IN')}`;
	return `₹${n.toLocaleString('en-IN')}`;
};

const FeedbackScreen = () => {
	const navigate = useNavigate();
	const {
		currentScenario,
		choiceHistory,
		completedScenarios,
		savings,
		monthlyIncome,
		monthlyExpenses,
		assets,
		debts,
		score,
		stateSnapshots,
		language,
		setLanguage,
		resetGame,
	} = useFinancialStore();

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	const lastScenarioId = completedScenarios[completedScenarios.length - 1];
	const lastChoice = choiceHistory[lastScenarioId];

	if (!lastScenarioId || !lastChoice) return <Navigate to="/financial-literacy" replace />;

	const scenario = gamedata.scenarios.find((s) => s.id === lastScenarioId) as GameScenario | undefined;
	if (!scenario) return <Navigate to="/financial-literacy" replace />;

	const baseChoice = scenario.choices[lastChoice.choiceIndex];

	// S6 gold path: override choice labels when player chose S4-B/C (gold instead of land)
	const s4Choice = choiceHistory[4]?.choiceId;
	const s6GoldPath = lastScenarioId === 6 && s4Choice && s4Choice !== 'A';
	const goldAmount = s4Choice === 'B' ? '₹2 lakh' : '₹1 lakh';
	const goldAmount_kan = s4Choice === 'B' ? '₹2 ಲಕ್ಷ' : '₹1 ಲಕ್ಷ';
	const choice = !s6GoldPath
		? baseChoice
		: (() => {
				const i = lastChoice.choiceIndex;
				if (i === 0) {
					const loanAmt = s4Choice === 'B' ? '₹3 lakh' : '₹4 lakh';
					const loanAmt_kan = s4Choice === 'B' ? '₹3 ಲಕ್ಷ' : '₹4 ಲಕ್ಷ';
					const emiAmt = s4Choice === 'B' ? '₹7,500' : '₹10,000';
					return {
						...baseChoice,
						label: 'Sell gold for education',
						label_kan: 'ಶಿಕ್ಷಣಕ್ಕೆ ಚಿನ್ನ ಮಾರಿ',
						description: `Sell gold jewelry for ${goldAmount} towards Priya's education; take education loan of ${loanAmt} at 18% (EMI ${emiAmt}) for the remaining amount.`,
						description_kan: `${goldAmount_kan} ಚಿನ್ನ ಮಾರಿ ಪ್ರಿಯಾ ಶಿಕ್ಷಣಕ್ಕೆ; ಉಳಿದ ${loanAmt_kan} @18% ಶಿಕ್ಷಣ ಸಾಲ (EMI ${emiAmt}).`,
					};
				}
				if (i === 1)
					return {
						...baseChoice,
						label: 'Keep gold, take loan',
						label_kan: 'ಚಿನ್ನ ಇಟ್ಟು, ಸಾಲ ತೆಗೆಯಿರಿ',
						description: `Keep gold, use all current savings, take personal loan of ₹3 lakh at 18% interest (₹7,500 EMI) — try to preserve investments.`,
						description_kan: `ಚಿನ್ನ ಇಟ್ಟು, ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, 18% ಬಡ್ಡಿಯಲ್ಲಿ ₹3 ಲಕ್ಷ ಸಾಲ (₹7,500 EMI).`,
					};
				if (i === 2)
					return {
						...baseChoice,
						description:
							'Use all current savings, ask Priya to work part-time and take a small education loan — share the burden, keep gold.',
						description_kan: 'ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, ಪ್ರಿಯಾ ಅರೆಕಾಲಿಕ ಕೆಲಸ ಮಾಡಲು ಕೇಳಿ — ಚಿನ್ನ ಇಟ್ಟುಕೊಳ್ಳಿ.',
					};
				return baseChoice;
			})();

	// S8-B path overrides based on whether player owned land before S8
	const preS8Assets = stateSnapshots[8]?.assets ?? [];
	const s8BNoLand =
		lastScenarioId === 8 &&
		lastChoice.choiceId === 'B' &&
		!preS8Assets.some((a: { type: string }) => a.type === 'land');
	const s8BHasLand =
		lastScenarioId === 8 && lastChoice.choiceId === 'B' && preS8Assets.some((a: { type: string }) => a.type === 'land');
	if (s8BNoLand) {
		(choice as Record<string, unknown>).label = 'Buy land for retirement home';
		(choice as Record<string, unknown>).label_kan = 'ನಿವೃತ್ತಿ ಮನೆಗೆ ಭೂಮಿ ಖರೀದಿ';
		(choice as Record<string, unknown>).description =
			'Buy ₹12 lakh plot for retirement home — ₹8 lakh down payment from savings + ₹4 lakh loan at 12% (₹10,000 EMI/month). Fulfils your house goal.';
		(choice as Record<string, unknown>).description_kan =
			'₹12 ಲಕ್ಷ ನಿವೇಶನ ಖರೀದಿ — ₹8 ಲಕ್ಷ ಡೌನ್ ಪೇಮೆಂಟ್ + ₹4 ಲಕ್ಷ 12% ಸಾಲ (₹10,000 EMI/ತಿಂಗಳು). ಮನೆ ಗುರಿ ಈಡೇರುತ್ತದೆ.';
	}
	if (s8BHasLand) {
		(choice as Record<string, unknown>).label = 'Gold + Fixed Deposit';
		(choice as Record<string, unknown>).label_kan = 'ಚಿನ್ನ + ಸ್ಥಿರ ಠೇವಣಿ';
		(choice as Record<string, unknown>).description =
			'Invest ₹5 lakh in gold and ₹12 lakh in Fixed Deposit — traditional wealth preservation alongside your existing land.';
		(choice as Record<string, unknown>).description_kan =
			'₹5 ಲಕ್ಷ ಚಿನ್ನ ಮತ್ತು ₹12 ಲಕ್ಷ FD — ಹೊರತಿರುವ ಭೂಮಿಯ ಜೊತೆ ಸಾಂಪ್ರದಾಯಿಕ ಸಂಪತ್ತು ರಕ್ಷಣೆ.';
	}

	// S9 path overrides
	const preS9Assets = stateSnapshots[9]?.assets ?? [];
	const s9ANoFundNoRd =
		lastScenarioId === 9 &&
		lastChoice.choiceId === 'A' &&
		!preS9Assets.some((a: { type: string }) => a.type === 'emergency-fund') &&
		!preS9Assets.some((a: { type: string }) => a.type === 'rd');
	const s9BNoMF =
		lastScenarioId === 9 &&
		lastChoice.choiceId === 'B' &&
		!preS9Assets.some((a: { type: string }) => a.type === 'mutual-fund');
	const s9CSellLand =
		lastScenarioId === 9 &&
		lastChoice.choiceId === 'C' &&
		!preS9Assets.some((a: { type: string }) => a.type === 'mutual-fund') &&
		preS9Assets.some((a: { type: string }) => a.type === 'land');
	const preS9LandValue =
		(preS9Assets as Array<{ type: string; value: number }>).find((a) => a.type === 'land')?.value ?? 0;
	if (s9ANoFundNoRd) {
		(choice as Record<string, unknown>).label = 'Cover from savings';
		(choice as Record<string, unknown>).label_kan = 'ಉಳಿತಾಯದಿಂದ ಭರಿಸಿ';
		(choice as Record<string, unknown>).description =
			'Pay the full ₹1,80,000 hospital bill from savings — no emergency fund or RD available.';
		(choice as Record<string, unknown>).description_kan =
			'₹1,80,000 ಆಸ್ಪತ್ರೆ ಬಿಲ್ ಉಳಿತಾಯದಿಂದ ಪಾವತಿ — ತುರ್ತು ನಿಧಿ ಅಥವಾ RD ಲಭ್ಯ ಇಲ್ಲ.';
	}
	const s9AHasEFNoRd =
		lastScenarioId === 9 &&
		lastChoice.choiceId === 'A' &&
		preS9Assets.some((a: { type: string }) => a.type === 'emergency-fund') &&
		!preS9Assets.some((a: { type: string }) => a.type === 'rd');
	const s9ANoEFHasRd =
		lastScenarioId === 9 &&
		lastChoice.choiceId === 'A' &&
		!preS9Assets.some((a: { type: string }) => a.type === 'emergency-fund') &&
		preS9Assets.some((a: { type: string }) => a.type === 'rd');
	if (s9AHasEFNoRd) {
		(choice as Record<string, unknown>).label = 'Use emergency fund';
		(choice as Record<string, unknown>).label_kan = 'ತುರ್ತು ನಿಧಿ ಬಳಸಿ';
	}
	if (s9ANoEFHasRd) {
		(choice as Record<string, unknown>).label = 'Break RD';
		(choice as Record<string, unknown>).label_kan = 'RD ಮುರಿಯಿರಿ';
	}
	if (s9BNoMF) {
		(choice as Record<string, unknown>).label = '₹1L savings + small loan';
		(choice as Record<string, unknown>).label_kan = '₹1L ಉಳಿತಾಯ + ಸಣ್ಣ ಸಾಲ';
		(choice as Record<string, unknown>).description =
			'Paid ₹1,00,000 from savings and took ₹80,000 loan at 12% interest (₹4,000 EMI/month) — covered the emergency with minimal asset impact.';
		(choice as Record<string, unknown>).description_kan =
			'₹1,00,000 ಉಳಿತಾಯದಿಂದ ₹80,000 @12% ಸಾಲ (₹4,000 EMI/ತಿಂ) — ಕನಿಷ್ಠ ಆಸ್ತಿ ಹಾನಿಯೊಂದಿಗೆ ತುರ್ತು ಭರಿಸಲಾಗಿದೆ.';
	}
	if (s9CSellLand) {
		(choice as Record<string, unknown>).label = 'Sell land';
		(choice as Record<string, unknown>).label_kan = 'ಭೂಮಿ ಮಾರಿ';
		(choice as Record<string, unknown>).description =
			`Sold land (${fmt(preS9LandValue)}) to cover ₹1,80,000 hospital bill — no debt needed, but retirement home goal disrupted.`;
		(choice as Record<string, unknown>).description_kan =
			`ಭೂಮಿ (${fmt(preS9LandValue)}) ಮಾರಿ ₹1,80,000 ಆಸ್ಪತ್ರೆ ಬಿಲ್ — ಸಾಲ ಬೇಡ, ನಿವೃತ್ತಿ ಮನೆ ಗುರಿ ಅಡ್ಡಿ.`;
	}

	const fi = choice.financialImpact as typeof choice.financialImpact & {
		notes?: string;
		notes_kan?: string;
		newAssets?: Array<{ label: string; value: number }>;
		newDebts?: Array<{ label: string; monthlyEmi: number }>;
		spendAllSavings?: boolean;
	};

	const isExcellent = lastChoice.points === 30;
	const isPoor = lastChoice.points < 0;
	const allDone = completedScenarios.length === 10;

	const feedbackLabel = isExcellent
		? t('Excellent choice!', 'ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ!')
		: !isPoor
			? t('Reasonable choice', 'ಸಮಂಜಸ ಆಯ್ಕೆ')
			: t('Risky choice', 'ಅಪಾಯಕರ ಆಯ್ಕೆ');

	const scoreColor = isExcellent ? 'text-green-400' : !isPoor ? 'text-yellow-400' : 'text-red-400';
	const bannerBg = isExcellent
		? 'bg-green-900/30 border-green-700/45'
		: !isPoor
			? 'bg-yellow-900/30 border-yellow-700/45'
			: 'bg-red-900/30 border-red-700/45';

	const monthlySurplus = monthlyIncome - monthlyExpenses;
	const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
	const totalDebt = debts.reduce((sum, d) => sum + d.remainingAmount, 0);

	// Expense changes from this choice
	const expenseChange = fi.monthlyExpensesChange ?? 0;

	// S6-B/C savings-sufficient overrides — check pre-choice savings from snapshot
	const preChoiceSavings = stateSnapshots[lastScenarioId]?.savings ?? 0;
	const s6BEnough = lastScenarioId === 6 && lastChoice.choiceId === 'B' && preChoiceSavings >= 200000;
	const s6CEnough = lastScenarioId === 6 && lastChoice.choiceId === 'C' && preChoiceSavings >= 500000;

	const effectiveSpendAllSavings = !!fi.spendAllSavings && !s6BEnough && !s6CEnough;
	const effectiveImmediateSpend = s6BEnough
		? 200000
		: s6CEnough
			? 500000
			: s9ANoFundNoRd
				? 180000
				: s9BNoMF
					? 100000
					: s9CSellLand
						? 0
						: !fi.spendAllSavings && (fi.savingsChange ?? 0) < 0
							? Math.abs(fi.savingsChange)
							: 0;

	// Savings breakdown: base carried forward + 24-month accumulation
	const baseCarried = Math.max(0, savings - monthlySurplus * 24);

	// Interpolate dynamic placeholders in notes
	const interpolate = (text: string) => text.replace('{remaining}', fmt(baseCarried));
	const newDebtItems = fi.newDebts ?? [];
	const effectiveExpenseChange = s9BNoMF ? 4000 : s9CSellLand ? 0 : expenseChange;
	const effectiveNewDebtItems: typeof newDebtItems = s9BNoMF
		? [{ label: 'Hospital loan (₹80K @12%)', label_kan: 'ಆಸ್ಪತ್ರೆ ಸಾಲ (₹80K @12%)', monthlyEmi: 4000 }]
		: s9CSellLand
			? []
			: newDebtItems;
	const hasExpenseChanges =
		effectiveExpenseChange !== 0 ||
		effectiveImmediateSpend > 0 ||
		effectiveNewDebtItems.length > 0 ||
		effectiveSpendAllSavings;

	// For S8-B paths the gamedata newAssets are wrong — override with actual acquired assets
	const displayNewAssets: Array<{ label: string; value: number }> = s8BNoLand
		? [{ label: 'Plot for retirement home', value: 1200000 }]
		: s8BHasLand
			? [
					{ label: 'Gold investment', value: 500000 },
					{ label: 'Fixed Deposit', value: 1200000 },
				]
			: (fi.newAssets ?? []);

	// Override notes for savings-path-dependent scenarios
	const s6AGoldPath = lastScenarioId === 6 && lastChoice.choiceId === 'A' && !!s6GoldPath;
	const s7AEnough = lastScenarioId === 7 && lastChoice.choiceId === 'A' && preChoiceSavings >= 300000;

	const notesOverride = s6BEnough
		? s6GoldPath
			? {
					en: 'Gold kept. ₹2L from savings + ₹3L personal loan @18% (EMI ₹7,500/mo) = ₹5L education funded. High-interest debt, but investments preserved.',
					kan: 'ಚಿನ್ನ ಉಳಿಸಿ. ₹2L ಉಳಿತಾಯ + ₹3L @18% ಸಾಲ (EMI ₹7,500) = ₹5L ಶಿಕ್ಷಣ. ಹೂಡಿಕೆ ಉಳಿದಿದೆ.',
				}
			: {
					en: 'Land kept. ₹2L from savings + ₹3L personal loan @18% (EMI ₹7,500/mo) = ₹5L education funded. High-interest debt, but land preserved.',
					kan: 'ಭೂಮಿ ಉಳಿಸಿ. ₹2L ಉಳಿತಾಯ + ₹3L @18% ಸಾಲ (EMI ₹7,500) = ₹5L ಶಿಕ್ಷಣ. ಭೂಮಿ ಉಳಿದಿದೆ.',
				}
		: s6CEnough
			? s6GoldPath
				? {
						en: "Paid Priya's full education (₹5L) from savings. All investments kept. No loan, no burden on Priya. Savings depleted.",
						kan: '₹5L ಉಳಿತಾಯದಿಂದ ಪ್ರಿಯಾ ಶಿಕ್ಷಣ. ಎಲ್ಲ ಹೂಡಿಕೆ ಉಳಿದಿದೆ. ಸಾಲ ಇಲ್ಲ, ಉಳಿತಾಯ ಖಾಲಿ.',
					}
				: {
						en: "Paid Priya's full education (₹5L) from savings. Land kept. No loan, no burden on Priya. Savings depleted.",
						kan: '₹5L ಉಳಿತಾಯದಿಂದ ಪ್ರಿಯಾ ಶಿಕ್ಷಣ. ಭೂಮಿ ಉಳಿದಿದೆ. ಸಾಲ ಇಲ್ಲ, ಉಳಿತಾಯ ಖಾಲಿ.',
					}
			: s6AGoldPath
				? s4Choice === 'B'
					? {
							en: 'Gold sold ₹2L. Education loan ₹3L @18% (EMI ₹7,500/mo). Gold asset removed.',
							kan: 'ಚಿನ್ನ ₹2L ಮಾರಿ. ₹3L @18% ಶಿಕ್ಷಣ ಸಾಲ (EMI ₹7,500/ತಿಂ). ಚಿನ್ನ ಆಸ್ತಿ ತೆಗೆದಿದೆ.',
						}
					: {
							en: 'Gold sold ₹1L. Education loan ₹4L @18% (EMI ₹10,000/mo). Gold asset removed.',
							kan: 'ಚಿನ್ನ ₹1L ಮಾರಿ. ₹4L @18% ಶಿಕ್ಷಣ ಸಾಲ (EMI ₹10,000/ತಿಂ). ಚಿನ್ನ ಆಸ್ತಿ ತೆಗೆದಿದೆ.',
						}
				: s7AEnough
					? {
							en: 'Down payment ₹3L from savings. Business loan ₹5L @11% (EMI ₹11K). Income +₹25K/mo from expansion.',
							kan: '₹3L ಡೌನ್ ಪೇಮೆಂಟ್ ಉಳಿತಾಯದಿಂದ. ₹5L @11% ಸಾಲ (EMI ₹11K). ₹25K/ತಿಂ ಆದಾಯ ಹೆಚ್ಚಳ.',
						}
					: s8BNoLand
						? {
								en: 'Land ₹12L for retirement home. Down payment ₹8L + loan ₹4L @12% (EMI ₹10K/mo). House goal achieved.',
								kan: 'ನಿವೃತ್ತಿ ಮನೆಗೆ ₹12L ಭೂಮಿ. ₹8L ಡೌನ್ ಪೇಮೆಂಟ್ + ₹4L @12% ಸಾಲ (EMI ₹10K/ತಿಂ). ಮನೆ ಗುರಿ ಸಾಧಿಸಲಾಗಿದೆ.',
							}
						: s8BHasLand
							? {
									en: 'Gold ₹5L + FD ₹12L = ₹17L. Land already owned — preserved.',
									kan: 'ಚಿನ್ನ ₹5L + FD ₹12L = ₹17L. ಭೂಮಿ ಈಗಾಗಲೇ ಇದೆ — ಉಳಿಸಲಾಗಿದೆ.',
								}
							: s9ANoFundNoRd
								? {
										en: 'Medical bill ₹1,80,000 paid from savings. No emergency fund or RD available.',
										kan: '₹1,80,000 ವೈದ್ಯಕೀಯ ಬಿಲ್ ಉಳಿತಾಯದಿಂದ ಪಾವತಿ. ತುರ್ತು ನಿಧಿ ಅಥವಾ RD ಇಲ್ಲ.',
									}
								: s9AHasEFNoRd
									? {
											en: 'Medical bill ₹1,80,000 covered using emergency fund — long-term investments protected.',
											kan: '₹1,80,000 ವೈದ್ಯಕೀಯ ಬಿಲ್ ತುರ್ತು ನಿಧಿಯಿಂದ ಭರಿಸಲಾಗಿದೆ — ದೀರ್ಘಕಾಲೀನ ಹೂಡಿಕೆ ರಕ್ಷಿತ.',
										}
									: s9ANoEFHasRd
										? {
												en: 'Medical bill ₹1,80,000 covered by breaking RD (small penalty) — other investments protected.',
												kan: '₹1,80,000 ವೈದ್ಯಕೀಯ ಬಿಲ್ RD ಮುರಿದು (ಸಣ್ಣ ದಂಡ) ಭರಿಸಲಾಗಿದೆ — ಇತರ ಹೂಡಿಕೆ ರಕ್ಷಿತ.',
											}
										: s9BNoMF
											? {
													en: 'Paid ₹1L from savings. Took ₹80K loan @12% (EMI ₹4K/mo). Hospital bill ₹1.8L covered with minimal asset impact.',
													kan: '₹1L ಉಳಿತಾಯದಿಂದ ₹80K @12% ಸಾಲ (EMI ₹4K/ತಿಂ). ₹1.8L ಆಸ್ಪತ್ರೆ ಬಿಲ್ ಕನಿಷ್ಠ ಆಸ್ತಿ ಹಾನಿಯೊಂದಿಗೆ ಭರಿಸಲಾಗಿದೆ.',
												}
											: s9CSellLand
												? {
														en: `Land sold (${fmt(preS9LandValue)}) — hospital bill ₹1.8L fully covered. No debt. Retirement home goal disrupted.`,
														kan: `ಭೂಮಿ ಮಾರಿ (${fmt(preS9LandValue)}) — ₹1.8L ಆಸ್ಪತ್ರೆ ಬಿಲ್ ಭರಿಸಲಾಗಿದೆ. ಸಾಲ ಇಲ್ಲ. ನಿವೃತ್ತಿ ಮನೆ ಗುರಿ ಅಡ್ಡಿ.`,
													}
												: null;

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0e1e3f]/95 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={20} />
				</button>
				<span className="text-[#e8b84b] text-sm font-semibold">
					{t(`Scenario ${lastScenarioId} Result`, `ಸನ್ನಿವೇಶ ${lastScenarioId} ಫಲಿತಾಂಶ`)}
				</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-xs px-3 py-1 rounded border border-white/35 hover:bg-white/15 transition-colors">
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
				{/* Score banner */}
				<div className={`rounded-xl p-4 border ${bannerBg} flex items-center justify-between`}>
					<div>
						<div className={`text-xl font-bold ${scoreColor}`}>{feedbackLabel}</div>
						<div className="text-sm text-white/65 mt-1">
							{t(scenario.title, (scenario as GameScenario & { title_kan?: string }).title_kan ?? scenario.title)}
						</div>
					</div>
					<div className={`text-3xl font-bold ${scoreColor}`}>
						{lastChoice.points > 0 ? '+' : ''}
						{lastChoice.points}
					</div>
				</div>

				{/* Choice made */}
				<div className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
					<div className="text-xs text-white/70 uppercase tracking-wide mb-3 font-sans">
						{t('Your Choice', 'ನಿಮ್ಮ ಆಯ್ಕೆ')}
					</div>
					<div className="flex items-start gap-3">
						<span className={`text-2xl font-bold mt-0.5 ${scoreColor}`}>{lastChoice.choiceId}</span>
						<div>
							<div className="font-semibold text-base text-white">
								{t(choice.label, (choice as typeof choice & { label_kan?: string }).label_kan ?? choice.label)}
							</div>
							<p className="text-sm text-white/70 mt-1 leading-relaxed">
								{t(
									choice.description,
									(choice as typeof choice & { description_kan?: string }).description_kan ?? choice.description,
								)}
							</p>
						</div>
					</div>
				</div>

				{/* Financial state */}
				<div className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
					<div className="text-xs text-white/50 uppercase tracking-wide mb-3">
						{t("Susheela's Finances — Two Years Later", 'ಸುಶೀಲಾಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ — ಎರಡು ವರ್ಷಗಳ ನಂತರ')}
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
						<div className="flex flex-col gap-0.5">
							<div className="flex justify-between gap-2">
								<span className="text-white/60">{t('Savings', 'ಉಳಿತಾಯ')}</span>
								<span className="font-medium">{fmt(savings)}</span>
							</div>
							<div className="text-xs text-white/35 text-right leading-tight">
								{baseCarried > 0
									? t(
											`${fmt(baseCarried)} carried + ${monthlySurplus >= 0 ? '+' : ''}${fmt(monthlySurplus)}/mo × 24`,
											`${fmt(baseCarried)} ನಿಳಿಕೆ + ${monthlySurplus >= 0 ? '+' : ''}${fmt(monthlySurplus)}/ತಿಂ × 24`,
										)
									: t(
											`${monthlySurplus >= 0 ? '+' : ''}${fmt(monthlySurplus)}/mo × 24 months`,
											`${monthlySurplus >= 0 ? '+' : ''}${fmt(monthlySurplus)}/ತಿಂ × 24 ತಿಂಗಳು`,
										)}
							</div>
						</div>
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Monthly income', 'ಮಾಸಿಕ ಆದಾಯ')}</span>
							<span className="font-medium text-green-400">{fmt(monthlyIncome)}</span>
						</div>
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Monthly expenses', 'ಮಾಸಿಕ ವೆಚ್ಚ')}</span>
							<span className="font-medium text-red-400">{fmt(monthlyExpenses)}</span>
						</div>
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Monthly surplus', 'ಮಾಸಿಕ ಉಳಿಕೆ')}</span>
							<span className={`font-medium ${monthlySurplus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
								{monthlySurplus >= 0 ? '+' : ''}
								{fmt(monthlySurplus)}
							</span>
						</div>
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Total assets', 'ಒಟ್ಟು ಆಸ್ತಿ')}</span>
							<span className="font-medium text-blue-300">{fmt(totalAssets)}</span>
						</div>
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Total debt', 'ಒಟ್ಟು ಸಾಲ')}</span>
							<span className={`font-medium ${totalDebt > 0 ? 'text-orange-400' : 'text-white/30'}`}>
								{totalDebt > 0 ? fmt(totalDebt) : '—'}
							</span>
						</div>
					</div>

					{/* New assets */}
					{displayNewAssets.length > 0 && (
						<div className="mt-3 border-t border-white/15 pt-3">
							<div className="text-xs text-white/50 mb-2">{t('Assets acquired:', 'ಪಡೆದ ಆಸ್ತಿ:')}</div>
							<div className="flex flex-wrap gap-2">
								{displayNewAssets.map((a, i) => (
									<span
										key={i}
										className="text-sm bg-blue-900/35 border border-blue-700/35 rounded px-2 py-1 text-blue-300">
										{a.label} — {fmt(a.value)}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Expense changes from this choice */}
					{hasExpenseChanges && (
						<div className="mt-3 border-t border-red-700/30 pt-3">
							<div className="text-xs text-red-400/75 uppercase tracking-wide mb-2">
								{t('Impact of this choice', 'ಈ ಆಯ್ಕೆಯ ಪರಿಣಾಮ')}
							</div>
							<div className="flex flex-col gap-2">
								{effectiveExpenseChange > 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('New monthly expense', 'ಹೊಸ ಮಾಸಿಕ ವೆಚ್ಚ')}</span>
										<span className="text-sm font-semibold text-red-400">+{fmt(effectiveExpenseChange)}/mo</span>
									</div>
								)}
								{effectiveExpenseChange < 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('Monthly expense reduced', 'ಮಾಸಿಕ ವೆಚ್ಚ ಕಡಿಮೆ')}</span>
										<span className="text-sm font-semibold text-green-400">{fmt(effectiveExpenseChange)}/mo</span>
									</div>
								)}
								{effectiveImmediateSpend > 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">
											{t('Deducted from savings upfront', 'ಉಳಿತಾಯದಿಂದ ಮುಂಚಿತವಾಗಿ ಕಳೆಯಲಾಗಿದೆ')}
										</span>
										<span className="text-sm font-semibold text-orange-400">−{fmt(effectiveImmediateSpend)}</span>
									</div>
								)}
								{effectiveSpendAllSavings && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('All savings spent', 'ಎಲ್ಲಾ ಉಳಿತಾಯ ಖರ್ಚಾಯ್ತು')}</span>
										<span className="text-sm font-semibold text-orange-400">{t('Savings wiped', 'ಉಳಿತಾಯ ಶೂನ್ಯ')}</span>
									</div>
								)}
								{effectiveNewDebtItems.map((d, i) => (
									<div key={i} className="flex items-center justify-between">
										<span className="text-sm text-white/70">
											{d.label} {t('EMI', 'ಇಎಂಐ')}
										</span>
										<span className="text-sm font-semibold text-orange-400">+{fmt(d.monthlyEmi)}/mo</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Notes */}
					{(notesOverride || fi.notes) && (
						<div className="mt-3 border-t border-white/15 pt-3">
							<p className="text-sm text-white/55 italic">
								{notesOverride
									? t(notesOverride.en, notesOverride.kan)
									: interpolate(t(fi.notes!, fi.notes_kan ?? fi.notes!))}
							</p>
						</div>
					)}
				</div>

				{/* Continue */}
				<button
					onClick={() => (allDone ? navigate('/financial-literacy/results') : navigate('/financial-literacy/scenario'))}
					className="w-full py-4 rounded-xl bg-[#e8b84b] text-[#0e1e3f] font-bold text-base hover:bg-[#f5c842] transition-colors">
					{allDone
						? t('See Final Results →', 'ಅಂತಿಮ ಫಲಿತಾಂಶ ನೋಡಿ →')
						: t(`Continue to Scenario ${currentScenario} →`, `ಸನ್ನಿವೇಶ ${currentScenario}ಗೆ ಮುಂದುವರಿಯಿರಿ →`)}
				</button>

				{/* Restart */}
				<button
					onClick={() => {
						resetGame();
						navigate('/financial-literacy');
					}}
					className="w-full py-3 rounded-xl border border-white/25 text-white/55 text-sm hover:bg-white/10 transition-colors">
					{t('↺ Restart Game', '↺ ಆಟ ಮರುಪ್ರಾರಂಭಿಸಿ')}
				</button>
			</div>
		</div>
	);
};

export default FeedbackScreen;
