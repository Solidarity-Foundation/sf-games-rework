import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import gamedata from './gamedata.json';
import houseIcon from '@/assets/financial/house-icon.png';
import educationIcon from '@/assets/financial/education-icon.png';

type GameScenario = (typeof gamedata.scenarios)[number];
type GameChoice = GameScenario['choices'][number];

const fmt = (n: number) => {
	if (n < 0) return `-₹${Math.abs(n).toLocaleString('en-IN')}`;
	return `₹${n.toLocaleString('en-IN')}`;
};

const SCENARIO_ACCENT_COLORS = [
	'#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a',
	'#0891b2', '#9333ea', '#dc2626', '#d97706', '#059669',
];

/** SVG circular progress ring with glow */
const GoalRing = ({
	progress,
	icon,
	label,
	status,
}: {
	progress: number;
	color: string;
	icon: string;
	label: string;
	status: string;
}) => {
	const size = 72;
	const strokeWidth = 5;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const filled = (progress / 100) * circumference;

	const glowColor =
		status === 'achieved' ? '#4ade80'
		: status === 'at-risk' ? '#f87171'
		: status === 'in-progress' ? '#60a5fa'
		: '#ffffff40';

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="relative" style={{ width: size, height: size }}>
				<svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke="rgba(255,255,255,0.15)"
						strokeWidth={strokeWidth}
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={glowColor}
						strokeWidth={strokeWidth}
						strokeDasharray={`${filled} ${circumference}`}
						strokeLinecap="round"
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
						style={{
							filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor}55)`,
							transition: 'stroke-dasharray 0.4s ease',
						}}
					/>
				</svg>
				<div
					className="absolute inset-0 flex items-center justify-center"
					style={{ padding: strokeWidth + 2 }}
				>
					<img src={icon} alt={label} className="w-11 h-11 object-contain" style={{ opacity: 0.95 }} />
				</div>
			</div>
			<div className="text-[10px] text-white/50 text-center leading-none">{label}</div>
		</div>
	);
};

const ScenarioScreen = () => {
	const navigate = useNavigate();
	const {
		currentScenario, gameStarted, completedScenarios, choiceHistory,
		savings, monthlyIncome, monthlyExpenses, expenseBreakdown, assets, debts,
		houseGoalProgress, educationGoalProgress,
		houseGoalStatus, educationGoalStatus,
		score, age, language, setLanguage, makeChoice, revertLastChoice,
	} = useFinancialStore();

	const [selectedChoice, setSelectedChoice] = useState(0);
	const [showExpenses, setShowExpenses] = useState(false);
	const [showAssets, setShowAssets] = useState(false);

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	if (!gameStarted) return <Navigate to="/financial-literacy" replace />;
	if (completedScenarios.length === 10) return <Navigate to="/financial-literacy/results" replace />;

	const scenario = gamedata.scenarios.find(s => s.id === currentScenario) as GameScenario | undefined;
	if (!scenario) return <Navigate to="/financial-literacy" replace />;

	const baseChoices = scenario.choices as GameChoice[];
	const monthlySurplus = monthlyIncome - monthlyExpenses;

	// Apply scenario-level assetValueUpdates for display only (e.g. land appreciation in S6)
	// so the appreciated value is visible before the player makes a choice.
	const displayAssets = assets.map(a => {
		const upd = (scenario.assetValueUpdates ?? []).find(u => u.type === a.type);
		return upd ? { ...a, value: upd.value } : a;
	});
	const totalAssets = displayAssets.reduce((sum, a) => sum + a.value, 0);
	const totalDebt = debts.reduce((sum, d) => sum + d.remainingAmount, 0);
	const accentColor = SCENARIO_ACCENT_COLORS[(currentScenario - 1) % SCENARIO_ACCENT_COLORS.length];

	// ── S6 dynamic text based on S4 choice ──
	const s4Choice = choiceHistory[4]?.choiceId;
	const s6GoldPath = scenario.id === 6 && s4Choice && s4Choice !== 'A';
	const goldAmount = s4Choice === 'B' ? '₹2 lakh' : '₹1 lakh';
	const goldAmount_kan = s4Choice === 'B' ? '₹2 ಲಕ್ಷ' : '₹1 ಲಕ್ಷ';

	const getSituationText = () => {
		const situationKan = (scenario as GameScenario & { situation_kan?: string }).situation_kan ?? scenario.situation;

		// S6: dynamic asset reference based on S4 choice
		if (s6GoldPath) {
			return {
				en: `Priya wants to study engineering (₹5 lakh over 4 years). Susheela has gold jewelry worth ${goldAmount}. But Priya is not legally Susheela's daughter, making education loans difficult.`,
				kan: `ಪ್ರಿಯಾ ಎಂಜಿನಿಯರಿಂಗ್ ಓದಲು ಬಯಸುತ್ತಾಳೆ (4 ವರ್ಷಗಳಲ್ಲಿ ₹5 ಲಕ್ಷ). ಸುಶೀಲಾ ಬಳಿ ${goldAmount_kan} ಮೌಲ್ಯದ ಚಿನ್ನದ ಆಭರಣವಿದೆ. ಪ್ರಿಯಾ ಕಾನೂನಾತ್ಮಕವಾಗಿ ಸುಶೀಲಾಳ ಮಗಳಲ್ಲ, ಶಿಕ್ಷಣ ಸಾಲ ಕಷ್ಟ.`,
			};
		}
		// S6: land path (S4-A) — show appreciated land value from assetValueUpdates
		if (scenario.id === 6) {
			const landUpdate = (scenario.assetValueUpdates ?? []).find(u => u.type === 'land');
			const landOriginal = assets.find(a => a.type === 'land');
			const landDisplayValue = landUpdate ? landUpdate.value : (landOriginal?.value ?? 0);
			const landBoughtValue = landOriginal?.value ?? 300000;
			return {
				en: `Priya wants to study engineering (₹5 lakh over 4 years). Susheela's land is now worth ${fmt(landDisplayValue)} (bought at ${fmt(landBoughtValue)}). But Priya is not legally Susheela's daughter, making education loans difficult.`,
				kan: `ಪ್ರಿಯಾ ಎಂಜಿನಿಯರಿಂಗ್ ಓದಲು ಬಯಸುತ್ತಾಳೆ (4 ವರ್ಷಗಳಲ್ಲಿ ₹5 ಲಕ್ಷ). ಸುಶೀಲಾಳ ಭೂಮಿ ಈಗ ${fmt(landDisplayValue)} ಮೌಲ್ಯ (${fmt(landBoughtValue)}ಕ್ಕೆ ಖರೀದಿಸಿದ). ಪ್ರಿಯಾ ಕಾನೂನಾತ್ಮಕವಾಗಿ ಸುಶೀಲಾಳ ಮಗಳಲ್ಲ, ಶಿಕ್ಷಣ ಸಾಲ ಕಷ್ಟ.`,
			};
		}

		// S7: dynamic current income in situation text
		if (scenario.id === 7) {
			return {
				en: `A shopping complex is offering shop space at ₹8 lakh (₹3 lakh down payment + ₹5 lakh loan at 11%). This could increase her business income by ₹25,000/month on top of her current ${fmt(monthlyIncome)}/month.`,
				kan: `ಒಂದು ಶಾಪಿಂಗ್ ಕಾಂಪ್ಲೆಕ್ಸ್ ₹8 ಲಕ್ಷಕ್ಕೆ ಅಂಗಡಿ ಸ್ಥಳವನ್ನು ನೀಡುತ್ತಿದೆ (₹3 ಲಕ್ಷ ಡೌನ್ ಪೇಮೆಂಟ್ + ₹11% ದರದಲ್ಲಿ ₹5 ಲಕ್ಷ ಸಾಲ). ಇದು ಅವರ ಪ್ರಸ್ತುತ ${fmt(monthlyIncome)}/ತಿಂಗಳ ಆದಾಯಕ್ಕೆ ₹25,000/ತಿಂಗಳು ಹೆಚ್ಚಿಸಬಹುದು.`,
			};
		}

		// S8: dynamic income, surplus, savings, and years-to-retirement
		if (scenario.id === 8) {
			const surplus = monthlyIncome - monthlyExpenses;
			const yearsToRetirement = Math.max(0, 50 - age);
			return {
				en: `Susheela's business is doing well after expansion. She earns ${fmt(monthlyIncome)}/month and after expenses (${fmt(monthlyExpenses)}), she can save ${fmt(surplus)}/month. She has ${fmt(savings)} in savings. ${yearsToRetirement} years until planned retirement. She needs: a house (₹20 lakh in ${yearsToRetirement} years), medical corpus (₹5 lakh), and monthly income post-retirement.`,
				kan: `ಸುಶೀಲಾ ${fmt(monthlyIncome)}/ತಿಂಗಳು ಸಂಪಾದಿಸುತ್ತಿದ್ದಾಳೆ, ${fmt(surplus)}/ತಿಂಗಳು ಉಳಿಸಬಹುದು. ${fmt(savings)} ಉಳಿತಾಯವಿದೆ. ${yearsToRetirement} ವರ್ಷ ನಿವೃತ್ತಿಗೆ ಉಳಿದಿದೆ. ₹20 ಲಕ್ಷ ಮನೆ, ₹5 ಲಕ್ಷ ವೈದ್ಯಕೀಯ ನಿಧಿ ಬೇಕು.`,
			};
		}

		// S9: dynamic corpus description — actual assets depend on S8 choice
		if (scenario.id === 9) {
			const corpusAssets = assets.filter(a => ['mutual-fund', 'ppf', 'rd', 'fd', 'land', 'gold', 'emergency-fund'].includes(a.type));
			const corpusDescription = corpusAssets.length > 0
				? corpusAssets.map(a => `${a.label} (${fmt(a.value)})`).join(', ')
				: 'her savings';
			const corpusDescription_kan = corpusAssets.length > 0
				? corpusAssets.map(a => `${(a as any).label_kan ?? a.label} (${fmt(a.value)})`).join(', ')
				: 'ಅವಳ ಉಳಿತಾಯ';
			return {
				en: `Susheela collapses at work — severe diabetic complication. Hospital bill: ₹1,80,000 (₹30,000 immediate deposit needed). Her retirement corpus consists of: ${corpusDescription}. Some of these may be hard to liquidate quickly.`,
				kan: `ಸುಶೀಲಾ ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಕುಸಿದಳು — ತೀವ್ರ ಮಧುಮೇಹ ತೊಡಕು. ಆಸ್ಪತ್ರೆ ಬಿಲ್: ₹1,80,000 (₹30,000 ತಕ್ಷಣ ಬೇಕು). ಅವಳ ನಿವೃತ್ತಿ ನಿಧಿ: ${corpusDescription_kan}. ಕೆಲವನ್ನು ತ್ವರಿತವಾಗಿ ನಗದು ಮಾಡಲು ಕಷ್ಟವಾಗಬಹುದು.`,
			};
		}

		// S10: fully dynamic — reflect actual financial state reached by the player
		if (scenario.id === 10) {
			const surplus = monthlyIncome - monthlyExpenses;
			const totalAssetValue = assets.reduce((s, a) => s + a.value, 0);
			const landAsset = assets.find(a => a.type === 'land');

			// Financial health summary
			const financialHealth = surplus >= 20000
				? { en: 'Her finances are in strong shape', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಉತ್ತಮವಾಗಿದೆ' }
				: surplus >= 5000
				? { en: 'Her finances are stable but modest', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಸ್ಥಿರವಾಗಿದೆ' }
				: { en: 'Her finances are tight', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಕಠಿಣವಾಗಿದೆ' };

			// House / land comment
			const houseComment = landAsset
				? { en: `She owns land worth ${fmt(landAsset.value)} — a foundation for her retirement home.`, kan: `ಅವಳ ಬಳಿ ${fmt(landAsset.value)} ಮೌಲ್ಯದ ಭೂಮಿ ಇದೆ — ನಿವೃತ್ತಿ ಮನೆಗೆ ಆಧಾರ.` }
				: { en: 'She has not yet secured land for her retirement home — that goal remains unmet.', kan: 'ನಿವೃತ್ತಿ ಮನೆಗೆ ಭೂಮಿ ಇನ್ನೂ ಖರೀದಿಸಿಲ್ಲ — ಆ ಗುರಿ ಇನ್ನೂ ಬಾಕಿ ಇದೆ.' };

			return {
				en: `${financialHealth.en} — she earns ${fmt(monthlyIncome)}/month, spends ${fmt(monthlyExpenses)}/month, and saves ${fmt(surplus)}/month. She has ${fmt(savings)} in savings and ${totalAssetValue > 0 ? fmt(totalAssetValue) + ' in assets' : 'no significant assets'}. ${houseComment.en} Priya is now graduating and starting her first job (₹35,000/month; contributing ₹20,000/month to the household). But Priya's adoption was never legally formalized — if something happens to Susheela, her biological family could legally claim everything.`,
				kan: `${financialHealth.kan} — ${fmt(monthlyIncome)}/ತಿಂಗಳು ಸಂಪಾದನೆ, ${fmt(monthlyExpenses)}/ತಿಂಗಳು ಖರ್ಚು, ${fmt(surplus)}/ತಿಂಗಳು ಉಳಿತಾಯ. ${fmt(savings)} ಉಳಿತಾಯ, ${totalAssetValue > 0 ? fmt(totalAssetValue) + ' ಆಸ್ತಿ' : 'ಗಮನಾರ್ಹ ಆಸ್ತಿ ಇಲ್ಲ'}. ${houseComment.kan} ಪ್ರಿಯಾ ₹35,000/ತಿಂಗಳ ಉದ್ಯೋಗ ಪಡೆದಿದ್ದಾಳೆ (₹20,000 ಮನೆಗೆ). ಆದರೆ ದತ್ತು ಕಾನೂನಾತ್ಮಕಗೊಂಡಿಲ್ಲ — ಸುಶೀಲಾಗೆ ಏನಾದರೂ ಆದರೆ ಜೈವಿಕ ಕುಟುಂಬ ಎಲ್ಲವನ್ನೂ ಪಡೆಯಬಹುದು.`,
			};
		}

		// S4: dynamic income + document status depends on S3 choice
		if (scenario.id === 4) {
			const s3Choice = choiceHistory[3]?.choiceId;
			const hasDocuments = s3Choice !== 'B'; // S3-B skips documents
			const docClause = hasDocuments
				? { en: 'Susheela now has proper documents and her', kan: 'ಸುಶೀಲಾ ಬಳಿ ಈಗ ಸರಿಯಾದ ದಾಖಲೆಗಳಿವೆ ಮತ್ತು ಅವರ' }
				: { en: 'Without formal documents Susheela still runs her', kan: 'ಔಪಚಾರಿಕ ದಾಖಲೆಗಳಿಲ್ಲದಿದ್ದರೂ ಸುಶೀಲಾ ತನ್ನ' };
			return {
				en: `${docClause.en} beauty parlour is thriving (income ${fmt(monthlyIncome)}/month). Priya is 13 and will need college funds soon. She has four investment options: buy land, invest in gold + community fund, or expand the business.`,
				kan: `${docClause.kan} ಬ್ಯೂಟಿ ಪಾರ್ಲರ್ ಅಭಿವೃದ್ಧಿ ಹೊಂದುತ್ತಿದೆ (ಆದಾಯ ${fmt(monthlyIncome)}/ತಿಂಗಳು). ಪ್ರಿಯಾಗೆ 13 ವರ್ಷ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ಕಾಲೇಜು ನಿಧಿಯ ಅಗತ್ಯವಿರುತ್ತದೆ. ಅವರಿಗೆ ನಾಲ್ಕು ಹೂಡಿಕೆ ಆಯ್ಕೆಗಳಿವೆ: ಭೂಮಿ ಖರೀದಿಸುವುದು, ಚಿನ್ನ + ಸಮುದಾಯ ನಿಧಿಯಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡುವುದು ಅಥವಾ ವ್ಯವಹಾರವನ್ನು ವಿಸ್ತರಿಸುವುದು.`,
			};
		}

		return { en: scenario.situation, kan: situationKan };
	};
	const situationText = getSituationText();

	// Dynamic choice text for S6 when player has gold instead of land
	const choices: GameChoice[] = !s6GoldPath
		? baseChoices
		: baseChoices.map((c, i) => {
			if (i === 0) return { ...c,
				label: 'Sell gold for education',
				label_kan: 'ಶಿಕ್ಷಣಕ್ಕೆ ಚಿನ್ನ ಮಾರಿ',
				description: `Sell gold jewelry for ${goldAmount}, use it for Priya's education — prioritize Priya's future.`,
				description_kan: `${goldAmount_kan} ಚಿನ್ನ ಮಾರಿ, ಪ್ರಿಯಾ ಶಿಕ್ಷಣಕ್ಕೆ ಬಳಸಿ — ಪ್ರಿಯಾ ಭವಿಷ್ಯಕ್ಕೆ ಆದ್ಯತೆ.`,
			};
			if (i === 1) return { ...c,
				label: 'Keep gold, take loan',
				label_kan: 'ಚಿನ್ನ ಇಟ್ಟು, ಸಾಲ ತೆಗೆಯಿರಿ',
				description: `Keep gold, use all current savings, take personal loan of ₹3 lakh at 18% interest (₹7,500 EMI) — try to preserve investments.`,
				description_kan: `ಚಿನ್ನ ಇಟ್ಟು, ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, 18% ಬಡ್ಡಿಯಲ್ಲಿ ₹3 ಲಕ್ಷ ಸಾಲ (₹7,500 EMI).`,
			};
			if (i === 2) return { ...c,
				description: "Use all current savings, ask Priya to work part-time and take a small education loan — share the burden, keep gold.",
				description_kan: 'ಎಲ್ಲಾ ಉಳಿತಾಯ ಬಳಸಿ, ಪ್ರಿಯಾ ಅರೆಕಾಲಿಕ ಕೆಲಸ ಮಾಡಲು ಕೇಳಿ — ಚಿನ್ನ ಇಟ್ಟುಕೊಳ್ಳಿ.',
			};
			return c;
		}) as GameChoice[];


	// Dynamic choice text for S9 — descriptions depend on which assets the player actually has
	const s9Choices: GameChoice[] = scenario.id !== 9 ? choices : choices.map((c, i) => {
		const hasEmergencyFund = assets.some(a => a.type === 'emergency-fund');
		const emergencyFund = assets.find(a => a.type === 'emergency-fund');
		const hasRd = assets.some(a => a.type === 'rd');
		const hasMutualFund = assets.some(a => a.type === 'mutual-fund');

		if (i === 0) {
			const parts: string[] = [];
			const parts_kan: string[] = [];
			if (hasEmergencyFund) {
				parts.push(`emergency fund (${fmt(emergencyFund!.value)})`);
				parts_kan.push(`ತುರ್ತು ನಿಧಿ (${fmt(emergencyFund!.value)})`);
			}
			if (hasRd) {
				parts.push('break RD (small penalty)');
				parts_kan.push('RD ಮುರಿಯಿರಿ (ಸಣ್ಣ ದಂಡ)');
			}
			const fundsList = parts.length > 0 ? parts.join(' and ') : 'savings';
			const fundsList_kan = parts_kan.length > 0 ? parts_kan.join(' ಮತ್ತು ') : 'ಉಳಿತಾಯ';
			return { ...c,
				description: `Use ${fundsList} to cover the hospital bill — protect long-term investments.`,
				description_kan: `${fundsList_kan} ಬಳಸಿ ಆಸ್ಪತ್ರೆ ಬಿಲ್ ಪಾವತಿ — ದೀರ್ಘಕಾಲೀನ ಹೂಡಿಕೆ ರಕ್ಷಿಸಿ.`,
			};
		}
		if (i === 1 && !hasMutualFund) {
			return { ...c,
				description: 'Liquidate investments to cover the hospital bill — avoid new debt but reduces retirement corpus.',
				description_kan: 'ಹೂಡಿಕೆ ನಗದು ಮಾಡಿ ಆಸ್ಪತ್ರೆ ಬಿಲ್ ಪಾವತಿ — ಹೊಸ ಸಾಲ ತಪ್ಪಿಸಿ ಆದರೆ ನಿವೃತ್ತಿ ನಿಧಿ ಕಡಿಮೆ.',
			};
		}
		if (i === 2) {
			const depositSource = hasEmergencyFund
				? { en: 'use ₹30,000 from emergency fund for deposit', kan: 'ತುರ್ತು ನಿಧಿಯಿಂದ ₹30,000 ಠೇವಣಿಗೆ' }
				: { en: 'use ₹30,000 from savings for deposit', kan: 'ಉಳಿತಾಯದಿಂದ ₹30,000 ಠೇವಣಿಗೆ' };
			return { ...c,
				description: `Take personal loan of ₹1,50,000 at 16% interest (₹3,500 EMI), ${depositSource.en} — preserve all investments.`,
				description_kan: `16% ₹1,50,000 ವೈಯಕ್ತಿಕ ಸಾಲ (₹3,500 EMI), ${depositSource.kan} — ಎಲ್ಲಾ ಹೂಡಿಕೆ ರಕ್ಷಿಸಿ.`,
			};
		}
		return c;
	}) as GameChoice[];

	const choice = s9Choices[selectedChoice];
	const choiceLocked = (choice.minimumSavings ?? 0) > savings;
	const allChoicesLocked = s9Choices.every(c => (c.minimumSavings ?? 0) > savings);

	const handleConfirm = () => {
		makeChoice(scenario.id, selectedChoice);
		navigate('/financial-literacy/feedback');
	};

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">

			{/* ── Header ── */}
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0e1e3f]/95 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={20} />
				</button>
				<span className="text-[#e8b84b] text-sm font-semibold">
					{t('Financial Literacy', 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ')}
				</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-xs px-3 py-1 rounded border border-white/35 hover:bg-white/15 transition-colors"
				>
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col p-4 gap-3 max-w-5xl mx-auto w-full">

				{/* ── Score + Scenario squares — with intro button on left ── */}
				<div className="flex items-center justify-between">
					<button
						onClick={() => navigate('/financial-literacy')}
						className="w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 hover:bg-white/15 transition-colors flex flex-col items-center justify-center gap-0.5"
					>
						<ArrowLeft size={16} className="text-white/60" />
						<div className="text-[9px] text-white/50 uppercase tracking-wide leading-tight text-center">{t('Restart', 'ಮರು')}</div>
						<div className="text-[9px] text-white/50 uppercase tracking-wide leading-tight text-center">{t('Game', 'ಆಟ')}</div>
					</button>
					<div className="flex gap-2">
						<div className="w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 flex flex-col items-center justify-center">
							<div className="text-[10px] text-white/50 uppercase tracking-wide leading-none mb-1">{t('Score', 'ಅಂಕ')}</div>
							<div className="text-xl font-bold text-[#e8b84b] leading-none">{score}</div>
						</div>
						<div className="w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 flex flex-col items-center justify-center">
							<div className="text-[10px] text-white/50 uppercase tracking-wide leading-none mb-1">{t('Scene', 'ಸನ್ನಿ')}</div>
							<div className="text-xl font-bold text-white leading-none">
								{currentScenario}<span className="text-xs text-white/40">/10</span>
							</div>
						</div>
					</div>
				</div>

				{/* ── Illustration (50%) + Right panel (50%) ── */}
				<div className="flex gap-3">

					{/* Scenario illustration — 50% */}
					<div
						className="w-1/2 rounded-xl flex flex-col items-center justify-center gap-3 p-4 text-white/95"
						style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}70` }}
					>
						<div className="text-4xl">💰</div>
						<div className="text-sm font-semibold text-center leading-snug text-white/90 px-1">
							{t(scenario.title, (scenario as GameScenario & { title_kan?: string }).title_kan ?? scenario.title)}
						</div>
					</div>

					{/* Right panel — 50%: finances + goals */}
					<div className="w-1/2 flex flex-col gap-2">

						{/* Financial stats — teal */}
						<div className="flex-1 bg-[#0a2828] rounded-xl p-3 border border-teal-700/45">
							<div className="text-[10px] text-teal-400/70 uppercase tracking-wide mb-2">
								{(() => {
									const yrs = (currentScenario - 1) * 2;
									return yrs === 0
										? t('Current Finances', 'ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಸ್ಥಿತಿ')
										: t(`Finances After ${yrs} Years`, `${yrs} ವರ್ಷಗಳ ನಂತರ ಆರ್ಥಿಕ ಸ್ಥಿತಿ`);
								})()}
							</div>
							<div className="space-y-1.5">
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/65">{t('Income / mo', 'ಆದಾಯ / ತಿಂ')}</span>
									<span className="text-sm font-semibold text-green-400">{fmt(monthlyIncome)}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/65">{t('Savings', 'ಉಳಿತಾಯ')}</span>
									<span className="text-sm font-semibold">{fmt(savings)}</span>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-white/65">{t('Expenses / mo', 'ವೆಚ್ಚ / ತಿಂ')}</span>
										<div className="flex items-center gap-1">
											<span className="text-sm font-semibold text-red-400">{fmt(monthlyExpenses)}</span>
											<button
												onClick={() => setShowExpenses(v => !v)}
												className="text-white/40 hover:text-white/70 transition-colors"
												aria-label="Toggle expense breakdown"
											>
												<ChevronDown size={14} className={`transition-transform ${showExpenses ? 'rotate-180' : ''}`} />
											</button>
										</div>
									</div>
									{showExpenses && (
										<div className="mt-1.5 ml-1 space-y-1 border-l border-red-400/25 pl-2">
											{expenseBreakdown.filter(item => item.amount > 0).map(item => (
												<div key={item.key} className="flex justify-between items-center">
													<span className="text-xs text-white/45">
														{t(item.label, item.label_kan)}
													</span>
													<span className="text-xs text-red-400/80">{fmt(item.amount)}</span>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="flex justify-between items-center border-t border-teal-700/30 pt-1.5">
									<span className="text-sm text-white/65">{t('Surplus / mo', 'ಉಳಿಕೆ / ತಿಂ')}</span>
									<span className={`text-sm font-semibold ${monthlySurplus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
										{monthlySurplus >= 0 ? '+' : ''}{fmt(monthlySurplus)}
									</span>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-white/65">{t('Assets', 'ಆಸ್ತಿ')}</span>
										<div className="flex items-center gap-1">
											<span className="text-sm font-semibold text-blue-300">{totalAssets > 0 ? fmt(totalAssets) : '—'}</span>
											{totalAssets > 0 && (
												<button
													onClick={() => setShowAssets(v => !v)}
													className="text-white/40 hover:text-white/70 transition-colors"
													aria-label="Toggle asset breakdown"
												>
													<ChevronDown size={14} className={`transition-transform ${showAssets ? 'rotate-180' : ''}`} />
												</button>
											)}
										</div>
									</div>
									{showAssets && (
										<div className="mt-1.5 ml-1 space-y-1 border-l border-blue-400/25 pl-2">
											{displayAssets.map((asset, i) => (
												<div key={i} className="flex justify-between items-center">
													<span className="text-xs text-white/45">{asset.label}</span>
													<span className="text-xs text-blue-300/80">{fmt(asset.value)}</span>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/65">{t('Debt', 'ಸಾಲ')}</span>
									<span className={`text-sm font-semibold ${totalDebt > 0 ? 'text-orange-400' : 'text-white/30'}`}>
										{totalDebt > 0 ? fmt(totalDebt) : '—'}
									</span>
								</div>
							</div>
						</div>

						{/* Goal rings — purple */}
						<div className="bg-[#1a0838] rounded-xl border border-purple-700/45 p-3">
							<div className="text-[10px] text-purple-400/75 uppercase tracking-wide mb-2 text-center">
								{t('Goals', 'ಗುರಿಗಳು')}
							</div>
							<div className="flex justify-around">
								<GoalRing
									progress={houseGoalProgress}
									color="#4ade80"
									icon={houseIcon}
									label={t('Retirement House', 'ನಿವೃತ್ತಿ ಮನೆ')}
									status={houseGoalStatus}
								/>
								<GoalRing
									progress={educationGoalProgress}
									color="#60a5fa"
									icon={educationIcon}
									label={t("Priya's Education", 'ಪ್ರಿಯಾ ಶಿಕ್ಷಣ')}
									status={educationGoalStatus}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* ── Scenario description — navy ── */}
				<div className="bg-[#162d5c] rounded-xl p-4 border border-blue-600/40">
					<div className="text-xs text-blue-300/60 uppercase tracking-wide mb-2">
						{t('Scenario', 'ಸನ್ನಿವೇಶ')}
					</div>
					<p className="text-base leading-relaxed text-white/90">
						{t(situationText.en, situationText.kan)}
					</p>
				</div>

				{/* ── Dilemma — amber ── */}
				<div className="bg-[#2a1500] rounded-xl p-4 border border-amber-600/50">
					<div className="text-xs text-amber-400/75 uppercase tracking-wide mb-2">
						{t('Your Dilemma', 'ನಿಮ್ಮ ಸಂದಿಗ್ಧ')}
					</div>
					<p className="text-base font-medium leading-relaxed text-white/95">
						{t(
							scenario.question,
							(scenario as GameScenario & { question_kan?: string }).question_kan ?? scenario.question,
						)}
					</p>
				</div>

				{/* ── Choice slider ── */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center px-1">
						<span className="text-sm text-white/50 uppercase tracking-wide">
							{t('Make Your Choice', 'ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿ')}
						</span>
					</div>

					<div className="flex items-stretch gap-3">
						<button
							onClick={() => setSelectedChoice((selectedChoice - 1 + s9Choices.length) % s9Choices.length)}
							className="p-3 rounded-xl bg-[#162d5c] border border-white/20 hover:bg-white/15 flex-shrink-0 self-center"
							aria-label="Previous choice"
						>
							<ChevronLeft size={22} />
						</button>

						<div className="flex-1 bg-[#162d5c] rounded-xl border border-[#e8b84b]/35 p-4 min-h-32">
							<div className="mb-2 flex items-center justify-between gap-2">
								<span className="text-2xl font-bold text-[#e8b84b]">{choice.id}</span>
								{choiceLocked && (
									<span className="text-xs bg-red-600 text-white rounded px-2 py-0.5 shrink-0">
										{t(`Needs ₹${(choice.minimumSavings ?? 0).toLocaleString('en-IN')}`, `₹${(choice.minimumSavings ?? 0).toLocaleString('en-IN')} ಬೇಕು`)}
									</span>
								)}
							</div>
							<div className="text-base font-semibold mb-2 text-white">
								{t(
									choice.label,
									(choice as GameChoice & { label_kan?: string }).label_kan ?? choice.label,
								)}
							</div>
							<p className="text-sm text-white/75 leading-relaxed">
								{t(
									choice.description,
									(choice as GameChoice & { description_kan?: string }).description_kan ?? choice.description,
								)}
							</p>
						</div>

						<button
							onClick={() => setSelectedChoice((selectedChoice + 1) % s9Choices.length)}
							className="p-3 rounded-xl bg-[#162d5c] border border-white/20 hover:bg-white/15 flex-shrink-0 self-center"
							aria-label="Next choice"
						>
							<ChevronRight size={22} />
						</button>
					</div>

					{/* Dot indicators */}
					<div className="flex justify-center gap-2">
						{s9Choices.map((_, i) => (
							<button
								key={i}
								onClick={() => setSelectedChoice(i)}
								className={`w-2.5 h-2.5 rounded-full transition-colors ${
									i === selectedChoice ? 'bg-[#e8b84b]' : 'bg-white/30'
								}`}
							/>
						))}
					</div>

				{/* All choices locked — go back banner */}
				{allChoicesLocked && completedScenarios.length > 0 && (
					<div className="bg-red-950/60 border border-red-500/50 rounded-xl p-4 text-center">
						<p className="text-sm text-red-300 mb-3">
							{t(
								'You don\'t have enough savings for any choice. Go back and reconsider your previous decision.',
								'ಯಾವ ಆಯ್ಕೆಗೂ ಸಾಕಷ್ಟು ಉಳಿತಾಯವಿಲ್ಲ. ಹಿಂದಿನ ನಿರ್ಧಾರ ಮರು-ಪರಿಶೀಲಿಸಿ.',
							)}
						</p>
						<button
							onClick={revertLastChoice}
							className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition-colors text-sm"
						>
							{t('← Go Back & Reconsider', '← ಹಿಂದೆ ಹೋಗಿ ಮರು-ಪರಿಶೀಲಿಸಿ')}
						</button>
					</div>
				)}

					{/* Confirm button */}
					<button
						onClick={handleConfirm}
						disabled={choiceLocked}
						className={`w-full py-4 rounded-xl font-bold text-base transition-colors ${choiceLocked ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-[#e8b84b] text-[#0e1e3f] hover:bg-[#f5c842]'}`}
					>
						{choiceLocked
							? t('Not enough savings for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಸಾಕಷ್ಟು ಉಳಿತಾಯವಿಲ್ಲ')
							: t(
								`Confirm Choice ${choice.id}: ${choice.label}`,
								`ಆಯ್ಕೆ ${choice.id} ದೃಢಪಡಿಸಿ`,
							)}
					</button>

					{/* Always-available back link — lets player escape a dead end by going back multiple levels */}
					{completedScenarios.length > 0 && !allChoicesLocked && (
						<button
							onClick={revertLastChoice}
							className="w-full py-2 text-xs text-white/35 hover:text-white/60 transition-colors text-center"
						>
							{t('← Reconsider previous decision', '← ಹಿಂದಿನ ನಿರ್ಧಾರ ಮರು-ಪರಿಶೀಲಿಸಿ')}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ScenarioScreen;
