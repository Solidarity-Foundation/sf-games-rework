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
	const choice = !s6GoldPath ? baseChoice : (() => {
		const i = lastChoice.choiceIndex;
		if (i === 0) return { ...baseChoice,
			label: 'Sell gold for education',
			label_kan: 'ಶಿಕ್ಷಣಕ್ಕೆ ಚಿನ್ನ ಮಾರಿ',
			description: `Sell gold jewelry for ${goldAmount}, use it for Priya's education — prioritize Priya's future.`,
			description_kan: `${goldAmount_kan} ಚಿನ್ನ ಮಾರಿ, ಪ್ರಿಯಾ ಶಿಕ್ಷಣಕ್ಕೆ ಬಳಸಿ — ಪ್ರಿಯಾ ಭವಿಷ್ಯಕ್ಕೆ ಆದ್ಯತೆ.`,
		};
		if (i === 1) return { ...baseChoice,
			label: 'Keep gold, take loan',
			label_kan: 'ಚಿನ್ನ ಇಟ್ಟು, ಸಾಲ ತೆಗೆಯಿರಿ',
			description: `Keep gold, use all current savings, take personal loan of ₹3 lakh at 18% interest (₹7,500 EMI) — try to preserve investments.`,
			description_kan: `ಚಿನ್ನ ಇಟ್ಟು, ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, 18% ಬಡ್ಡಿಯಲ್ಲಿ ₹3 ಲಕ್ಷ ಸಾಲ (₹7,500 EMI).`,
		};
		if (i === 2) return { ...baseChoice,
			description: "Use all current savings, ask Priya to work part-time and take a small education loan — share the burden, keep gold.",
			description_kan: 'ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, ಪ್ರಿಯಾ ಅರೆಕಾಲಿಕ ಕೆಲಸ ಮಾಡಲು ಕೇಳಿ — ಚಿನ್ನ ಇಟ್ಟುಕೊಳ್ಳಿ.',
		};
		return baseChoice;
	})();

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
	const immediateSpend = !fi.spendAllSavings && (fi.savingsChange ?? 0) < 0 ? Math.abs(fi.savingsChange) : 0;

	// Savings breakdown: base carried forward + 24-month accumulation
	const baseCarried = Math.max(0, savings - monthlySurplus * 24);

	// Interpolate dynamic placeholders in notes
	const interpolate = (text: string) => text.replace('{remaining}', fmt(baseCarried));
	const newDebtItems = fi.newDebts ?? [];
	const hasExpenseChanges = expenseChange !== 0 || immediateSpend > 0 || newDebtItems.length > 0 || fi.spendAllSavings;

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
					<div className="text-xs text-white/50 uppercase tracking-wide mb-3">{t('Your Choice', 'ನಿಮ್ಮ ಆಯ್ಕೆ')}</div>
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
					{fi.newAssets && fi.newAssets.length > 0 && (
						<div className="mt-3 border-t border-white/15 pt-3">
							<div className="text-xs text-white/50 mb-2">{t('Assets acquired:', 'ಪಡೆದ ಆಸ್ತಿ:')}</div>
							<div className="flex flex-wrap gap-2">
								{fi.newAssets.map((a, i) => (
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
								{expenseChange > 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('New monthly expense', 'ಹೊಸ ಮಾಸಿಕ ವೆಚ್ಚ')}</span>
										<span className="text-sm font-semibold text-red-400">+{fmt(expenseChange)}/mo</span>
									</div>
								)}
								{expenseChange < 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('Monthly expense reduced', 'ಮಾಸಿಕ ವೆಚ್ಚ ಕಡಿಮೆ')}</span>
										<span className="text-sm font-semibold text-green-400">{fmt(expenseChange)}/mo</span>
									</div>
								)}
								{immediateSpend > 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">
											{t('Deducted from savings upfront', 'ಉಳಿತಾಯದಿಂದ ಮುಂಚಿತವಾಗಿ ಕಳೆಯಲಾಗಿದೆ')}
										</span>
										<span className="text-sm font-semibold text-orange-400">−{fmt(immediateSpend)}</span>
									</div>
								)}
								{fi.spendAllSavings && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-white/70">{t('All savings spent', 'ಎಲ್ಲಾ ಉಳಿತಾಯ ಖರ್ಚಾಯ್ತು')}</span>
										<span className="text-sm font-semibold text-orange-400">{t('Savings wiped', 'ಉಳಿತಾಯ ಶೂನ್ಯ')}</span>
									</div>
								)}
								{newDebtItems.map((d, i) => (
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
					{fi.notes && (
						<div className="mt-3 border-t border-white/15 pt-3">
							<p className="text-sm text-white/55 italic">{interpolate(t(fi.notes, fi.notes_kan ?? fi.notes))}</p>
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
