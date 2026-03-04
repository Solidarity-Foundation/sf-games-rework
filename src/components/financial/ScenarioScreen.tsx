import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { useFinancialStore, computeLoanTermMonths } from './financialStore';
import CrisisScreen from './CrisisScreen';
import gamedata from './gamedata.json';
import houseIcon from '@/assets/financial/house-icon.png';
import educationIcon from '@/assets/financial/education-icon.png';
import goldcoinsIcon from '@/assets/financial/goldcoins-icon.png';
import medicalIcon from '@/assets/financial/medical-icon.png';
import growthFundsIcon from '@/assets/financial/growth-funds-icon.png';
import equipmentIcon from '@/assets/financial/equipment-icon.png';
import communityBuildingIcon from '@/assets/financial/community-building-icon.png';
import emiIcon from '@/assets/financial/emi-icon.png';
import s1 from '@/assets/financial/s1.webp';
import s2 from '@/assets/financial/s2.webp';
import s3 from '@/assets/financial/s3.webp';
import s4 from '@/assets/financial/s4.webp';
import s5 from '@/assets/financial/s5.webp';
import s6 from '@/assets/financial/s6.webp';
import s7 from '@/assets/financial/s7.webp';
import s8 from '@/assets/financial/s8.webp';
import s9 from '@/assets/financial/s9.webp';
import s10 from '@/assets/financial/s10.webp';

const SCENARIO_IMAGES = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

type GameScenario = (typeof gamedata.scenarios)[number];
type GameChoice = GameScenario['choices'][number];

const fmt = (n: number) => {
	if (n < 0) return `-₹${Math.abs(n).toLocaleString('en-IN')}`;
	return `₹${n.toLocaleString('en-IN')}`;
};

const SCENARIO_ACCENT_COLORS = [
	'#2563eb',
	'#7c3aed',
	'#db2777',
	'#ea580c',
	'#16a34a',
	'#0891b2',
	'#9333ea',
	'#dc2626',
	'#d97706',
	'#059669',
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
	const size = 92;
	const strokeWidth = 7;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const filled = (progress / 100) * circumference;

	const glowColor =
		status === 'achieved'
			? '#4ade80'
			: status === 'at-risk'
				? '#f87171'
				: status === 'in-progress'
					? '#60a5fa'
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
				<div className="absolute inset-0 flex items-center justify-center" style={{ padding: strokeWidth + 2 }}>
					<img src={icon} alt={label} className="w-12 h-12 object-contain" style={{ opacity: 0.95 }} />
				</div>
			</div>
			<div className="text-[10px] text-white/50 text-center leading-none">{label}</div>
		</div>
	);
};

const ScenarioScreen = () => {
	const navigate = useNavigate();
	const {
		currentScenario,
		gameStarted,
		completedScenarios,
		choiceHistory,
		savings,
		monthlyIncome,
		monthlyExpenses,
		expenseBreakdown,
		assets,
		debts,
		houseGoalProgress,
		educationGoalProgress,
		houseGoalStatus,
		educationGoalStatus,
		score,
		age,
		language,
		setLanguage,
		makeChoice,
		revertLastChoice,
	} = useFinancialStore();

	const [selectedChoice, setSelectedChoice] = useState(0);
	const [showExpenses, setShowExpenses] = useState(false);
	const [showAssets, setShowAssets] = useState(false);

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	if (!gameStarted) return <Navigate to="/financial-literacy" replace />;
	if (completedScenarios.length === 10) return <Navigate to="/financial-literacy/results" replace />;

	const scenario = gamedata.scenarios.find((s) => s.id === currentScenario) as GameScenario | undefined;
	if (!scenario) return <Navigate to="/financial-literacy" replace />;

	const baseChoices = scenario.choices as GameChoice[];
	const monthlySurplus = monthlyIncome - monthlyExpenses;

	// Apply scenario-level assetValueUpdates for display only (e.g. land appreciation in S6)
	// so the appreciated value is visible before the player makes a choice.
	const displayAssets = assets.map((a) => {
		const upd = (scenario.assetValueUpdates ?? []).find((u) => u.type === a.type);
		return upd ? { ...a, value: upd.value } : a;
	});
	const totalAssets = displayAssets.reduce((sum, a) => sum + a.value, 0);

	// Hard gate: if monthly expenses exceed income AND savings can't cover the 24-month shortfall,
	// the player must sell an asset or go back before proceeding.
	if (monthlySurplus < 0 && savings + monthlySurplus * 24 < 0) {
		return <CrisisScreen displayAssets={displayAssets} />;
	}
	const assetIcons: { src: string; key: string }[] = [];
	if (displayAssets.some((a) => a.type === 'land')) assetIcons.push({ src: houseIcon, key: 'land' });
	if (displayAssets.some((a) => a.type === 'gold')) assetIcons.push({ src: goldcoinsIcon, key: 'gold' });
	if (displayAssets.some((a) => a.type === 'business-equipment')) assetIcons.push({ src: equipmentIcon, key: 'equip' });
	if (displayAssets.some((a) => a.type === 'community-stake'))
		assetIcons.push({ src: communityBuildingIcon, key: 'cb' });
	if (displayAssets.some((a) => a.type === 'emergency-fund')) assetIcons.push({ src: medicalIcon, key: 'ef' });
	if (displayAssets.some((a) => ['mutual-fund', 'rd', 'fd'].includes(a.type)))
		assetIcons.push({ src: growthFundsIcon, key: 'growth' });
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
				en: `Priya has dreamed of becoming an engineer since she was a child. She has received admission to an engineering college — the fees are ₹10 lakh over 4 years. Susheela has gold jewelry worth ${goldAmount}. But Priya is not legally Susheela's daughter, making education loans difficult.`,
				kan: `ಪ್ರಿಯಾ ಚಿಕ್ಕಂದಿನಿಂದಲೂ ಎಂಜಿನಿಯರ್ ಆಗಬೇಕೆಂದು ಕನಸು ಕಾಣುತ್ತಿದ್ದಾಳೆ. ಅವಳು ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿಗೆ ಪ್ರವೇಶ ಪಡೆದಿದ್ದಾಳೆ — 4 ವರ್ಷಗಳಲ್ಲಿ ₹10 ಲಕ್ಷ ಶುಲ್ಕ. ಸುಶೀಲಾ ಬಳಿ ${goldAmount_kan} ಮೌಲ್ಯದ ಚಿನ್ನದ ಆಭರಣವಿದೆ. ಪ್ರಿಯಾ ಕಾನೂನಾತ್ಮಕವಾಗಿ ಸುಶೀಲಾಳ ಮಗಳಲ್ಲ, ಶಿಕ್ಷಣ ಸಾಲ ಕಷ್ಟ.`,
			};
		}
		// S6: land path (S4-A) — show appreciated land value from assetValueUpdates
		if (scenario.id === 6) {
			const landUpdate = (scenario.assetValueUpdates ?? []).find((u) => u.type === 'land');
			const landOriginal = assets.find((a) => a.type === 'land');
			const landDisplayValue = landUpdate ? landUpdate.value : (landOriginal?.value ?? 0);
			const landBoughtValue = landOriginal?.value ?? 300000;
			return {
				en: `Priya has dreamed of becoming an engineer since she was a child. She has received admission to an engineering college — the fees are ₹10 lakh over 4 years. Susheela's land is now worth ${fmt(landDisplayValue)} (bought at ${fmt(landBoughtValue)}). But Priya is not legally Susheela's daughter, making education loans difficult.`,
				kan: `ಪ್ರಿಯಾ ಚಿಕ್ಕಂದಿನಿಂದಲೂ ಎಂಜಿನಿಯರ್ ಆಗಬೇಕೆಂದು ಕನಸು ಕಾಣುತ್ತಿದ್ದಾಳೆ. ಅವಳು ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿಗೆ ಪ್ರವೇಶ ಪಡೆದಿದ್ದಾಳೆ — 4 ವರ್ಷಗಳಲ್ಲಿ ₹10 ಲಕ್ಷ ಶುಲ್ಕ. ಸುಶೀಲಾಳ ಭೂಮಿ ಈಗ ${fmt(landDisplayValue)} ಮೌಲ್ಯ (${fmt(landBoughtValue)}ಕ್ಕೆ ಖರೀದಿಸಿದ). ಪ್ರಿಯಾ ಕಾನೂನಾತ್ಮಕವಾಗಿ ಸುಶೀಲಾಳ ಮಗಳಲ್ಲ, ಶಿಕ್ಷಣ ಸಾಲ ಕಷ್ಟ.`,
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
				en: `Susheela's business is doing well. She earns ${fmt(monthlyIncome)}/month and can save ${fmt(surplus)}/month after expenses. She has ${fmt(savings)} in savings and ${yearsToRetirement} years until retirement. How she saves now matters: cash loses to inflation, land can't be quickly liquidated, gold earns nothing on its own. A mix of physical and financial assets gives her both stability and flexibility when it matters most.`,
				kan: `ಸುಶೀಲಾ ${fmt(monthlyIncome)}/ತಿಂಗಳು ಸಂಪಾದಿಸುತ್ತಿದ್ದಾಳೆ, ${fmt(surplus)}/ತಿಂಗಳು ಉಳಿಸಬಹುದು. ${fmt(savings)} ಉಳಿತಾಯವಿದೆ, ${yearsToRetirement} ವರ್ಷ ನಿವೃತ್ತಿಗೆ ಉಳಿದಿದೆ. ಈಗ ಹೇಗೆ ಉಳಿಸುತ್ತಾಳೆ ಎಂಬುದು ಮುಖ್ಯ: ನಗದು ಹಣದುಬ್ಬರಕ್ಕೆ ಸೋಲುತ್ತದೆ, ಭೂಮಿ ತುರ್ತಿನಲ್ಲಿ ಬೇಗ ಮಾರಲಾಗದು, ಚಿನ್ನ ಆದಾಯ ತರುವುದಿಲ್ಲ. ಭೌತಿಕ ಮತ್ತು ಆರ್ಥಿಕ ಆಸ್ತಿಗಳ ಮಿಶ್ರಣ ಸ್ಥಿರತೆ ಮತ್ತು ನಮ್ಯತೆ ಎರಡನ್ನೂ ನೀಡುತ್ತದೆ.`,
			};
		}


		// S9: dynamic situation — list current assets and bill amount
		if (scenario.id === 9) {
			const nonLandAssets = assets.filter((a) =>
				['mutual-fund', 'ppf', 'rd', 'fd', 'gold', 'emergency-fund', 'equipment', 'community-building'].includes(a.type),
			);
			const landAsset9 = assets.find((a) => a.type === 'land');
			const assetSummary = [
				...nonLandAssets.map((a) => `${a.label} (${fmt(a.value)})`),
				...(landAsset9 ? [`land worth ${fmt(landAsset9.value)}`] : []),
			].join(', ');
			const assetSummary_kan = [
				...nonLandAssets.map((a) => `${(a as typeof a & { label_kan?: string }).label_kan ?? a.label} (${fmt(a.value)})`),
				...(landAsset9 ? [`ಭೂಮಿ ${fmt(landAsset9.value)}`] : []),
			].join(', ');
			return {
				en: `Susheela collapses at work — severe diabetic complication. The hospital requires ₹5,00,000 immediately. She has ${fmt(savings)} in savings${assetSummary ? ` and holds: ${assetSummary}` : ''}.`,
				kan: `ಸುಶೀಲಾ ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಕುಸಿದಳು — ತೀವ್ರ ಮಧುಮೇಹ ತೊಡಕು. ಆಸ್ಪತ್ರೆಗೆ ತಕ್ಷಣ ₹5,00,000 ಬೇಕು. ${fmt(savings)} ಉಳಿತಾಯವಿದೆ${assetSummary_kan ? ` ಮತ್ತು: ${assetSummary_kan}` : ''}.`,
			};
		}

		// S10: fully dynamic — reflect actual financial state reached by the player
		if (scenario.id === 10) {
			const surplus = monthlyIncome - monthlyExpenses;
			const totalAssetValue = assets.reduce((s, a) => s + a.value, 0);
			const landAsset = assets.find((a) => a.type === 'land');

			// Financial health summary
			const financialHealth =
				surplus >= 20000
					? { en: 'Her finances are in strong shape', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಉತ್ತಮವಾಗಿದೆ' }
					: surplus >= 5000
						? { en: 'Her finances are stable but modest', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಸ್ಥಿರವಾಗಿದೆ' }
						: { en: 'Her finances are tight', kan: 'ಅವಳ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಕಠಿಣವಾಗಿದೆ' };

			// House / land comment
			const houseComment = landAsset
				? {
						en: `She owns land worth ${fmt(landAsset.value)} — a foundation for her retirement home.`,
						kan: `ಅವಳ ಬಳಿ ${fmt(landAsset.value)} ಮೌಲ್ಯದ ಭೂಮಿ ಇದೆ — ನಿವೃತ್ತಿ ಮನೆಗೆ ಆಧಾರ.`,
					}
				: {
						en: 'She has not yet secured land for her retirement home — that goal remains unmet.',
						kan: 'ನಿವೃತ್ತಿ ಮನೆಗೆ ಭೂಮಿ ಇನ್ನೂ ಖರೀದಿಸಿಲ್ಲ — ಆ ಗುರಿ ಇನ್ನೂ ಬಾಕಿ ಇದೆ.',
					};

			// Priya's outcome depends on S6 choice
			const s6Choice = choiceHistory[6]?.choiceId;
			const priyaClause =
				s6Choice === 'A'
					? {
							en: `Priya fulfilled her dream — she graduated as a B.E. engineer and has started her first job (₹35,000/month; contributing ₹20,000/month to the household, keeping ₹15,000 for herself).`,
							kan: `ಪ್ರಿಯಾ ತನ್ನ ಕನಸು ಈಡೇರಿಸಿಕೊಂಡಳು — ಅವಳು B.E. ಎಂಜಿನಿಯರ್ ಆಗಿ ಪದವಿ ಪಡೆದಿದ್ದಾಳೆ ಮತ್ತು ಮೊದಲ ಉದ್ಯೋಗ ಪ್ರಾರಂಭಿಸಿದ್ದಾಳೆ (₹35,000/ತಿಂಗಳು; ₹20,000 ಮನೆಗೆ, ₹15,000 ತನಗೆ).`,
						}
					: s6Choice === 'B'
					? {
							en: `Priya completed a polytechnic diploma — not the engineering degree she dreamed of, but a real qualification. She works as a junior technician (₹22,000/month; contributing ₹10,000/month to the household, keeping ₹12,000 for herself).`,
							kan: `ಪ್ರಿಯಾ ಪಾಲಿಟೆಕ್ನಿಕ್ ಡಿಪ್ಲೊಮಾ ಮುಗಿಸಿದ್ದಾಳೆ — ಅವಳ ಕನಸಿನ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿಯಲ್ಲ, ಆದರೆ ನಿಜವಾದ ಅರ್ಹತೆ. ಅವಳು ಜೂನಿಯರ್ ತಂತ್ರಜ್ಞೆಯಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾಳೆ (₹22,000/ತಿಂಗಳು; ₹10,000 ಮನೆಗೆ, ₹12,000 ತನಗೆ).`,
						}
					: {
							en: `Priya was unable to complete her engineering degree — the financial pressure forced her to drop out. She works in the informal sector (₹15,000/month; contributing ₹10,000/month to the household, keeping ₹5,000 for herself).`,
							kan: `ಪ್ರಿಯಾ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿ ಮುಗಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ — ಆರ್ಥಿಕ ಒತ್ತಡ ಅವಳನ್ನು ಬಿಡಲು ಒತ್ತಾಯಿಸಿತು. ಅವಳು ಅನೌಪಚಾರಿಕ ವಲಯದಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾಳೆ (₹15,000/ತಿಂಗಳು; ₹10,000 ಮನೆಗೆ, ₹5,000 ತನಗೆ).`,
						};

			return {
				en: `${financialHealth.en} — she earns ${fmt(monthlyIncome)}/month, spends ${fmt(monthlyExpenses)}/month, and saves ${fmt(surplus)}/month. She has ${fmt(savings)} in savings and ${totalAssetValue > 0 ? fmt(totalAssetValue) + ' in assets' : 'no significant assets'}. ${houseComment.en} ${priyaClause.en} But Priya's adoption was never legally formalized — if something happens to Susheela, her biological family could legally claim everything.`,
				kan: `${financialHealth.kan} — ${fmt(monthlyIncome)}/ತಿಂಗಳು ಸಂಪಾದನೆ, ${fmt(monthlyExpenses)}/ತಿಂಗಳು ಖರ್ಚು, ${fmt(surplus)}/ತಿಂಗಳು ಉಳಿತಾಯ. ${fmt(savings)} ಉಳಿತಾಯ, ${totalAssetValue > 0 ? fmt(totalAssetValue) + ' ಆಸ್ತಿ' : 'ಗಮನಾರ್ಹ ಆಸ್ತಿ ಇಲ್ಲ'}. ${houseComment.kan} ${priyaClause.kan} ಆದರೆ ದತ್ತು ಕಾನೂನಾತ್ಮಕಗೊಂಡಿಲ್ಲ — ಸುಶೀಲಾಗೆ ಏನಾದರೂ ಆದರೆ ಜೈವಿಕ ಕುಟುಂಬ ಎಲ್ಲವನ್ನೂ ಪಡೆಯಬಹುದು.`,
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

	// S6 dynamic choices: A and B use gamedata.json text directly; only C needs overrides
	// Dynamic EMI for S6 Choice C land path: 18% over 120 months on shortfall after spending all savings
	const s6DynamicEmiC = (() => {
		if (scenario.id !== 6) return 0;
		const shortfall = Math.max(0, 1_000_000 - savings);
		if (shortfall <= 0) return 0;
		const r = 0.015;
		const n = 120;
		return Math.round((shortfall * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
	})();
	// Gold path variables for S6 Choice C: sell gold → loan for remainder
	const s6GoldValue = s6GoldPath ? (s4Choice === 'B' ? 200_000 : 100_000) : 0;
	const s6GoldLoanAmt = s6GoldPath ? 1_000_000 - s6GoldValue : 0;
	const s6GoldEmi = s6GoldLoanAmt > 0 ? (() => {
		const r = 0.015; const n = 120;
		return Math.round((s6GoldLoanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
	})() : 0;

	const choices: GameChoice[] =
		scenario.id !== 6
			? baseChoices
			: (baseChoices.map((c, i) => {
					// Choice C: gold path → sell gold + loan for remainder; land path → spend all savings + shortfall loan
					if (i === 2) {
						if (s6GoldPath)
							return {
								...c,
								label: 'Sell gold, high-interest loan',
								label_kan: 'ಚಿನ್ನ ಮಾರಿ, ಹೆಚ್ಚು ಬಡ್ಡಿ ಸಾಲ',
								description: `Sell gold (${goldAmount}), use proceeds toward the ₹10 lakh engineering fees. Take a high-interest personal loan of ${fmt(s6GoldLoanAmt)} at 18% over 10 years (EMI ${fmt(s6GoldEmi)}/month) for the remainder. Priya works part-time evenings to contribute and her studies suffer as a result. She eventually falls behind and DROPS OUT.`,
								description_kan: `ಚಿನ್ನ (${goldAmount_kan}) ಮಾರಿ ₹10 ಲಕ್ಷ ಶುಲ್ಕಕ್ಕೆ ಬಳಸಿ. ಉಳಿದ ${fmt(s6GoldLoanAmt)} ಕ್ಕೆ 18% ಹೆಚ್ಚು ಬಡ್ಡಿ ಸಾಲ (EMI ${fmt(s6GoldEmi)}/ತಿ, 10 ವರ್ಷ). ಪ್ರಿಯಾ ಸಂಜೆ ಅರೆಕಾಲಿಕ ಕೆಲಸ ಮಾಡುತ್ತಾಳೆ ಮತ್ತು ಅಧ್ಯಯನ ಹಾಳಾಗುತ್ತದೆ. ಅಂತಿಮವಾಗಿ ಓದು ಬಿಟ್ಟಳು (DROPS OUT).`,
								minimumSurplus: s6GoldEmi,
							};
						return {
						...c,
						description:
							s6DynamicEmiC > 0
								? `Keep land. Spend all savings toward the ₹10 lakh engineering fees — the remaining shortfall is covered by a high-interest personal loan at 18% over 10 years (EMI ${fmt(s6DynamicEmiC)}/month). Priya works part-time evenings to contribute and her studies suffer as a result. She eventually falls behind and DROPS OUT.`
								: c.description,
						...(s6DynamicEmiC > 0 && { minimumSurplus: s6DynamicEmiC }),
					}; // land path: dynamic EMI injected into description
					}
					return c;
				}) as GameChoice[]);

	// Dynamic S7-A description: drop "borrow shortfall" clause when savings are sufficient
	const s7Choices: GameChoice[] =
		scenario.id !== 7
			? choices
			: (choices.map((c, i) => {
					if (i === 0) {
						if (savings >= 300000)
							return {
								...c,
								description:
									'Make ₹3 lakh down payment from savings, take ₹5 lakh loan at 11% — grow business aggressively. Income rises by ₹25,000/month.',
								description_kan: '₹3 ಲಕ್ಷ ಡೌನ್ ಪೇಮೆಂಟ್ ಉಳಿತಾಯದಿಂದ, ₹5 ಲಕ್ಷ 11% ಸಾಲ — ₹25,000/ತಿಂ ಆದಾಯ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
							};
						// savings < ₹3L: community loan is needed — update text to remove "if needed"
						return {
							...c,
							description:
								'Make ₹3 lakh down payment (borrow shortfall from community at 12%), take ₹5 lakh loan at 11% — grow business aggressively. Income rises by ₹25,000/month.',
							description_kan:
								'₹3 ಲಕ್ಷ ಡೌನ್ ಪೇಮೆಂಟ್ (12% ಸಮುದಾಯ ಸಾಲದಿಂದ ಕೊರತೆ ತುಂಬಿ), ₹5 ಲಕ್ಷ 11% ಸಾಲ — ₹25,000/ತಿಂ ಆದಾಯ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
						};
					}
					return c;
				}) as GameChoice[]);

	// Dynamic S8-B text: no-land → offer retirement plot; has-land → gold + FD only
	const s8Choices: GameChoice[] =
		scenario.id !== 8
			? s7Choices
			: (s7Choices.map((c, i) => {
					const hasLand = assets.some((a) => a.type === 'land');
					if (i === 1 && !hasLand)
						return {
							...c,
							label: 'Buy land for retirement home',
							label_kan: 'ನಿವೃತ್ತಿ ಮನೆಗೆ ಭೂಮಿ ಖರೀದಿ',
							description:
								'Buy ₹12 lakh plot for retirement home — ₹8 lakh down payment from savings + ₹4 lakh loan at 12% (₹10,000 EMI/month). Fulfils your house goal.',
							description_kan:
								'₹12 ಲಕ್ಷ ನಿವೇಶನ ಖರೀದಿ — ₹8 ಲಕ್ಷ ಡೌನ್ ಪೇಮೆಂಟ್ + ₹4 ಲಕ್ಷ 12% ಸಾಲ (₹10,000 EMI/ತಿಂಗಳು). ಮನೆ ಗುರಿ ಈಡೇರುತ್ತದೆ.',
							minimumSavings: 800000,
							minimumSurplus: 10000,
						} as GameChoice;
					if (i === 1 && hasLand)
						return {
							...c,
							label: 'Gold + Fixed Deposit',
							label_kan: 'ಚಿನ್ನ + ಸ್ಥಿರ ಠೇವಣಿ',
							description:
								'Invest ₹5 lakh in gold and ₹12 lakh in Fixed Deposit — traditional wealth preservation alongside your existing land.',
							description_kan: '₹5 ಲಕ್ಷ ಚಿನ್ನ ಮತ್ತು ₹12 ಲಕ್ಷ FD — ಹೊರತಿರುವ ಭೂಮಿಯ ಜೊತೆ ಸಾಂಪ್ರದಾಯಿಕ ಸಂಪತ್ತು ರಕ್ಷಣೆ.',
							minimumSavings: 1700000,
						} as GameChoice;
					return c;
				}) as GameChoice[]);

	// Dynamic choice text for S9 — descriptions depend on assets the player actually holds
	const s9Choices: GameChoice[] =
		scenario.id !== 9
			? s8Choices
			: (s8Choices.map((c, i) => {
					const landAsset9 = assets.find((a) => a.type === 'land');
					const nonLandAssets9 = assets.filter((a) => !['land'].includes(a.type) && a.value > 0 &&
						['mutual-fund', 'ppf', 'rd', 'fd', 'gold', 'emergency-fund', 'equipment', 'community-building'].includes(a.type));
					const nonLandProceeds = nonLandAssets9.reduce((sum, a) => sum + a.value, 0);
					const nonLandShortfall = Math.max(0, 500000 - nonLandProceeds);
					const nlR = 0.20 / 12; const nlN = 60;
					const nlEmi = nonLandShortfall > 0
						? Math.round(nonLandShortfall * nlR * Math.pow(1 + nlR, nlN) / (Math.pow(1 + nlR, nlN) - 1))
						: 0;

					// Choice A: Pay from savings
					if (i === 0) {
						return {
							...c,
							description: `Pay the full ₹5,00,000 hospital bill directly from savings. You currently have ${fmt(savings)} in savings.`,
							description_kan: `₹5,00,000 ಆಸ್ಪತ್ರೆ ಬಿಲ್ ನೇರವಾಗಿ ಉಳಿತಾಯದಿಂದ ಪಾವತಿಸಿ. ಪ್ರಸ್ತುತ ಉಳಿತಾಯ: ${fmt(savings)}.`,
						} as GameChoice;
					}

					// Choice B: Sell land
					if (i === 1) {
						if (landAsset9) {
							const proceeds9 = landAsset9.value;
							const leftover = proceeds9 - 500000;
							return {
								...c,
								description: leftover >= 0
									? `Sell land (${fmt(proceeds9)}) to cover the ₹5 lakh bill. ${leftover > 0 ? fmt(leftover) + ' stays in savings.' : 'Proceeds cover the bill exactly.'}`
									: `Sell land (${fmt(proceeds9)}) toward the ₹5 lakh bill — ${fmt(Math.abs(leftover))} short.`,
								description_kan: leftover >= 0
									? `ಭೂಮಿ (${fmt(proceeds9)}) ಮಾರಿ ₹5 ಲಕ್ಷ ಬಿಲ್ ಭರಿಸಿ. ${leftover > 0 ? fmt(leftover) + ' ಉಳಿತಾಯದಲ್ಲಿ ಉಳಿಯುತ್ತದೆ.' : 'ಮೊತ್ತ ಬಿಲ್ ಭರಿಸ್ತದೆ.'}`
									: `ಭೂಮಿ (${fmt(proceeds9)}) ಮಾರಿ ₹5 ಲಕ್ಷ ಬಿಲ್ಗೆ — ${fmt(Math.abs(leftover))} ಕೊರತೆ.`,
							} as GameChoice;
						}
						// No land — choice will be locked, show static text
						return c;
					}

					// Choice C: Liquidate non-land assets + loan
					if (i === 2) {
						if (nonLandAssets9.length > 0) {
							const assetList = nonLandAssets9.map((a) => `${a.label} (${fmt(a.value)})`).join(', ');
							return {
								...c,
								description: `Sell: ${assetList} (${fmt(nonLandProceeds)} total).${nonLandShortfall > 0 ? ` Remaining ${fmt(nonLandShortfall)} covered by loan @20% (EMI ${fmt(nlEmi)}/month, 5 years).` : ' Bill fully covered — no loan needed.'}`,
								description_kan: `ಮಾರಿ: ${assetList} (${fmt(nonLandProceeds)} ಮೊತ್ತ).${nonLandShortfall > 0 ? ` ಉಳಿದ ${fmt(nonLandShortfall)} @20% ಸಾಲ (EMI ${fmt(nlEmi)}/ತಿಂ, 5 ವರ್ಷ).` : ' ಬಿಲ್ ಪೂರ್ಣ ಭರಿತದೆ — ಸಾಲ ಬೇಡ.'}`,
							} as GameChoice;
						}
						// No non-land assets — choice will be locked, show static text
						return c;
					}

					return c;
				}) as GameChoice[]);


	const choice = s9Choices[selectedChoice];
	const surplusLocked =
		(choice as typeof choice & { minimumSurplus?: number }).minimumSurplus !== undefined
			? monthlySurplus < ((choice as typeof choice & { minimumSurplus?: number }).minimumSurplus ?? 0)
			: false;
	const assetLocked =
		(choice as typeof choice & { requiredAsset?: string }).requiredAsset !== undefined
			? !assets.some((a) => a.type === (choice as typeof choice & { requiredAsset?: string }).requiredAsset)
			: false;
	const nonLandAssetLocked =
		(choice as typeof choice & { requiredNonLandAsset?: boolean }).requiredNonLandAsset === true
			? !assets.some((a) => a.type !== 'land' && a.value > 0)
			: false;
	const choiceLocked =
		((choice as typeof choice & { minimumSavings?: number }).minimumSavings ?? 0) > savings ||
		surplusLocked ||
		assetLocked ||
		nonLandAssetLocked;
	const allChoicesLocked = s9Choices.every((c) => {
		const sLocked = ((c as typeof c & { minimumSavings?: number }).minimumSavings ?? 0) > savings;
		const spLocked =
			(c as typeof c & { minimumSurplus?: number }).minimumSurplus !== undefined
				? monthlySurplus < ((c as typeof c & { minimumSurplus?: number }).minimumSurplus ?? 0)
				: false;
		const aLocked =
			(c as typeof c & { requiredAsset?: string }).requiredAsset !== undefined
				? !assets.some((a) => a.type === (c as typeof c & { requiredAsset?: string }).requiredAsset)
				: false;
		return sLocked || spLocked || aLocked;
	});

	const handleConfirm = () => {
		makeChoice(currentScenario, selectedChoice);
		navigate('/financial-literacy/feedback');
	};

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			{/* ── Header ── */}
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0e1e3f]/95 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={20} />
				</button>
				<span className="text-[#e8b84b] text-sm font-semibold">{t('Financial Literacy', 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ')}</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-xs px-3 py-1 rounded border border-white/35 hover:bg-white/15 transition-colors">
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col p-4 gap-3 max-w-5xl mx-auto w-full">
				{/* ── Top bar: Restart | Scenario dots | Score ── */}
				<div className="flex items-center justify-between gap-3">
					{/* Restart button */}
					<button
						onClick={() => navigate('/financial-literacy')}
						className="w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 hover:bg-white/15 transition-colors flex flex-col items-center justify-center gap-0.5 flex-shrink-0">
						<ArrowLeft size={16} className="text-white/70" />
						<div className="text-[9px] text-white/70 uppercase tracking-wide leading-tight text-center font-sans">
							{t('Restart', 'ಮರು')}
						</div>
						<div className="text-[9px] text-white/70 uppercase tracking-wide leading-tight text-center font-sans">
							{t('Game', 'ಆಟ')}
						</div>
					</button>

					{/* Scenario dot sequence */}
					<div className="hidden md:flex flex-1 items-center justify-center">
						<div className="flex items-center">
							{Array.from({ length: 10 }, (_, i) => {
								const sNum = i + 1;
								const isActive = sNum === currentScenario;
								return (
									<div key={sNum} className="flex items-center">
										<div
											className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[10px] ${
												isActive ? 'bg-red-500 text-white' : 'bg-[#e8b84b] text-[#0e1e3f]'
											}`}>
											S{sNum}
										</div>
										{sNum < 10 && <div className="w-4 h-0.5 bg-white/70" />}
									</div>
								);
							})}
						</div>
					</div>

					{/* Score + Scene (Scene only on mobile) */}
					<div className="flex gap-2 flex-shrink-0">
						<div className="md:hidden w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 flex flex-col items-center justify-center">
							<div className="text-[10px] text-white/50 uppercase tracking-wide leading-none mb-1 font-sans">
								{t('Scene', 'ಸನ್ನಿ')}
							</div>
							<div className="text-xl font-bold text-white leading-none">
								{currentScenario}
								<span className="text-xs text-white/40">/10</span>
							</div>
						</div>
						<div className="w-16 h-16 bg-[#162d5c] rounded-xl border border-white/20 flex flex-col items-center justify-center">
							<div className="text-[10px] text-white/50 uppercase tracking-wide leading-none mb-1 font-sans">
								{t('Score', 'ಅಂಕ')}
							</div>
							<div className="text-xl font-bold text-[#e8b84b] leading-none">{score}</div>
						</div>
					</div>
				</div>

				{/* ── Illustration (50%) + Right panel (50%) ── */}
				<div className="flex flex-col md:flex-row gap-3">
					{/* Scenario illustration — 50% */}
					<div className="w-full md:w-1/2 rounded-xl overflow-hidden flex flex-col bg-[#e8b84b]">
						<img src={SCENARIO_IMAGES[currentScenario - 1]} alt={scenario.title} className="w-full object-cover" />
						<div className="px-3 py-2 text-sm font-semibold text-center leading-snug text-[#0e1e3f]">
							{t(scenario.title, (scenario as GameScenario & { title_kan?: string }).title_kan ?? scenario.title)}
						</div>
					</div>

					{/* Right panel — 50%: finances + goals */}
					<div className="w-full md:w-1/2 flex flex-col gap-2">
						{/* Financial stats — teal */}
						<div className="flex-1 bg-[#0b4e4e] rounded-xl p-3 border border-teal-700/45">
							<div className="text-[11px] text-teal-300 uppercase tracking-wide mb-2 font-sans">
								{(() => {
									const yrs = (currentScenario - 1) * 2;
									return (
										<span className="flex items-center gap-1.5 flex-wrap">
											{yrs === 0
												? t('Current Finances', 'ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಸ್ಥಿತಿ')
												: t('Finances After', 'ನಂತರ ಆರ್ಥಿಕ ಸ್ಥಿತಿ')}
											<span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
												{yrs === 0 ? 'YEAR 0' : `${yrs} YRS`}
											</span>
										</span>
									);
								})()}
							</div>
							<div className="space-y-1.5">
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/75">{t('Income / mo', 'ಆದಾಯ / ತಿಂ')}</span>
									<span className="text-sm font-semibold text-green-400">{fmt(monthlyIncome)}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/75">{t('Savings', 'ಉಳಿತಾಯ')}</span>
									<span className="text-sm font-semibold">{fmt(savings)}</span>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-white/75">{t('Expenses / mo', 'ವೆಚ್ಚ / ತಿಂ')}</span>
										<div className="flex items-center gap-1">
											<span className="text-sm font-semibold text-red-400">{fmt(monthlyExpenses)}</span>
											<button
												onClick={() => setShowExpenses((v) => !v)}
												className="text-white/60 hover:text-white/70 transition-colors"
												aria-label="Toggle expense breakdown">
												<ChevronDown size={14} className={`transition-transform ${showExpenses ? 'rotate-180' : ''}`} />
											</button>
										</div>
									</div>
									{showExpenses && (
										<div className="mt-1.5 ml-1 space-y-1 border-l border-red-400/25 pl-2">
											{expenseBreakdown
												.filter((item) => item.amount > 0)
												.map((item) => {
													const linkedDebt = debts.find(
														(d) => (d as typeof d & { expenseKey?: string }).expenseKey === item.key,
													);
													const clearScenario = linkedDebt
														? linkedDebt.takenInScenario +
															Math.ceil(
																computeLoanTermMonths(
																	linkedDebt.principal,
																	linkedDebt.interestRate,
																	linkedDebt.monthlyEmi,
																) / 24,
															) -
															1
														: null;
													return (
														<div key={item.key} className="flex justify-between items-center gap-1">
															<span className="text-xs text-white/55 flex items-center gap-1">
																{t(item.label, item.label_kan)}
																{clearScenario !== null &&
																	(clearScenario <= 10 ? (
																		<span className="text-[10px] text-orange-400/70 font-medium">
																			clears S{clearScenario}
																		</span>
																	) : (
																		<span className="text-[10px] text-yellow-400/70 font-medium">
																			ongoing past game
																		</span>
																	))}
															</span>
															<span className="text-xs text-red-400/90">{fmt(item.amount)}</span>
														</div>
													);
												})}
											<div className="text-[10px] text-white/60 pt-0.5 italic">
												{t('Rent & food rise 2%/yr', 'ಬಾಡಿಗೆ & ಆಹಾರ 2%/ವರ್ಷ ಹೆಚ್ಚುತ್ತದೆ')}
											</div>
										</div>
									)}
								</div>
								<div className="flex justify-between items-center border-t border-teal-700/30 pt-1.5">
									<span className="text-sm text-white/75">{t('Surplus / mo', 'ಉಳಿಕೆ / ತಿಂ')}</span>
									<span className={`text-sm font-semibold ${monthlySurplus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
										{monthlySurplus >= 0 ? '+' : ''}
										{fmt(monthlySurplus)}
									</span>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-white/75">{t('Assets', 'ಆಸ್ತಿ')}</span>
										<div className="flex items-center gap-1">
											<span className="text-sm font-semibold text-blue-300">
												{totalAssets > 0 ? fmt(totalAssets) : '—'}
											</span>
											{totalAssets > 0 && (
												<button
													onClick={() => setShowAssets((v) => !v)}
													className="text-white/50 hover:text-white/70 transition-colors"
													aria-label="Toggle asset breakdown">
													<ChevronDown size={14} className={`transition-transform ${showAssets ? 'rotate-180' : ''}`} />
												</button>
											)}
										</div>
									</div>
									{showAssets && (
										<div className="mt-1.5 ml-1 space-y-1 border-l border-blue-400/25 pl-2">
											{displayAssets.map((asset, i) => (
												<div key={i} className="flex justify-between items-center">
													<span className="text-xs text-white/65">{asset.label}</span>
													<span className="text-xs text-blue-300/80">{fmt(asset.value)}</span>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-white/75">{t('Debt', 'ಸಾಲ')}</span>
									<span className={`text-sm font-semibold ${totalDebt > 0 ? 'text-orange-400' : 'text-white/50'}`}>
										{totalDebt > 0 ? fmt(totalDebt) : '—'}
									</span>
								</div>
							</div>
						</div>

						{/* Goals + Assets+EMI row */}
						<div className="flex gap-2">
							{/* Goal rings */}
							<div className="flex-1 bg-[#411489] rounded-xl border border-purple-700/45 p-3">
								<div className="text-[10px] text-purple-300 uppercase tracking-wide mb-2 text-center font-sans">
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
							{/* Right column: Assets + EMI */}
							{(assetIcons.length > 0 || debts.length > 0) && (
								<div className="flex-1 flex flex-col gap-2">
									{/* Assets box */}
									{assetIcons.length > 0 && (
										<div
											className={`bg-[#690968] rounded-xl border border-purple-200/20 ${debts.length > 0 ? 'p-2' : 'p-3 flex-1'} flex flex-col`}>
											<div className="text-[10px] text-pink-300 uppercase tracking-wide mb-2 text-center font-sans">
												{t('Assets', 'ಆಸ್ತಿ')}
											</div>
											<div
												className={`flex-1 flex flex-wrap ${debts.length > 0 ? 'gap-1' : 'gap-2'} items-center justify-center`}>
												{assetIcons.map(({ src, key }) => (
													<div key={key} className="rounded-xl p-[2px] border border-purple-200/30">
														<img
															src={src}
															alt={key}
															className={`${debts.length > 0 ? 'w-8 h-8' : 'w-10 h-10'} object-contain`}
														/>
													</div>
												))}
											</div>
										</div>
									)}
									{/* EMI box */}
									{debts.length > 0 && (
										<div
											className={`bg-[#5c1a1a] rounded-xl border border-red-500/40 ${assetIcons.length > 0 ? 'p-2' : 'p-3 flex-1'} flex flex-col`}>
											<div className="text-[10px] text-red-300 uppercase tracking-wide mb-2 text-center font-sans">
												{t('EMI', 'EMI')}
											</div>
											<div className="flex flex-wrap gap-1 items-center justify-center">
												{debts.map((_, i) => (
													<div key={i} className="rounded-xl p-[2px] border border-red-500/30">
														<img src={emiIcon} alt="EMI" className="w-8 h-8 object-contain" />
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* ── Scenario description — navy ── */}
				<div className="bg-[#0237a3] rounded-xl p-4 border border-blue-600/40">
					<div className="text-xs text-blue-300/100 uppercase tracking-wide mb-2 font-sans">
						{t('Scenario', 'ಸನ್ನಿವೇಶ')}
					</div>
					<p className="text-base leading-relaxed text-white/90">{t(situationText.en, situationText.kan)}</p>
				</div>

				{/* ── Dilemma — amber ── */}
				<div className="bg-[#623100] rounded-xl p-4 border border-amber-600/50">
					<div className="text-xs text-amber-400/75 uppercase tracking-wide mb-2 font-sans">
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
						<span className="text-sm text-white/75 uppercase tracking-wide text-center w-full font-sans">
							{t('Make Your Choice', 'ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿ')}
						</span>
					</div>

					<div className="flex items-stretch gap-3">
						<button
							onClick={() => setSelectedChoice((selectedChoice - 1 + s9Choices.length) % s9Choices.length)}
							className="p-3 rounded-xl bg-[#1e4083] border border-white/20 hover:bg-white/15 flex-shrink-0 self-center"
							aria-label="Previous choice">
							<ChevronLeft size={22} />
						</button>

						<div className="flex-1 bg-[#1e4083] rounded-xl border border-[#e8b84b]/35 p-4 min-h-32">
							<div className="mb-2 flex items-center justify-between gap-2">
								<span className="text-2xl font-bold text-[#e8b84b]">{choice.id}</span>
								{choiceLocked && (
									<span className="text-xs bg-red-600 text-white rounded px-2 py-0.5 shrink-0">
										{nonLandAssetLocked
											? t('No assets to sell for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಮಾರಲು ಆಸ್ತಿ ಇಲ್ಲ')
											: assetLocked
											? t('Land required for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಭೂಮಿ ಬೇಕು')
											: surplusLocked
											? t(
													`Needs ₹${((choice as typeof choice & { minimumSurplus?: number }).minimumSurplus ?? 0).toLocaleString('en-IN')}/mo surplus`,
													`₹${((choice as typeof choice & { minimumSurplus?: number }).minimumSurplus ?? 0).toLocaleString('en-IN')}/ತಿಂ ಉಳಿಕೆ ಬೇಕು`,
												)
											: t(
													`Needs ₹${((choice as typeof choice & { minimumSavings?: number }).minimumSavings ?? 0).toLocaleString('en-IN')} savings`,
													`₹${((choice as typeof choice & { minimumSavings?: number }).minimumSavings ?? 0).toLocaleString('en-IN')} ಉಳಿತಾಯ ಬೇಕು`,
												)}
									</span>
								)}
							</div>
							<div className="text-base font-semibold mb-2 text-white">
								{t(choice.label, (choice as GameChoice & { label_kan?: string }).label_kan ?? choice.label)}
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
							className="p-3 rounded-xl bg-[#1e4083] border border-white/20 hover:bg-white/15 flex-shrink-0 self-center"
							aria-label="Next choice">
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
							<p className="text-sm text-red-300 mb-3 font-sans">
								{t(
									"You don't have enough savings for any choice. Go back and reconsider your previous decision.",
									'ಯಾವ ಆಯ್ಕೆಗೂ ಸಾಕಷ್ಟು ಉಳಿತಾಯವಿಲ್ಲ. ಹಿಂದಿನ ನಿರ್ಧಾರ ಮರು-ಪರಿಶೀಲಿಸಿ.',
								)}
							</p>
							<button
								onClick={revertLastChoice}
								className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition-colors text-sm font-sans">
								{t('← Go Back & Reconsider', '← ಹಿಂದೆ ಹೋಗಿ ಮರು-ಪರಿಶೀಲಿಸಿ')}
							</button>
						</div>
					)}

					{/* Confirm button */}
					<button
						onClick={handleConfirm}
						disabled={choiceLocked}
						className={`w-full py-4 rounded-xl font-bold text-base transition-colors ${choiceLocked ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-[#e8b84b] text-[#0e1e3f] hover:bg-[#f5c842]'}`}>
						{choiceLocked
							? nonLandAssetLocked
								? t('No assets available to sell', 'ಮಾರಲು ಆಸ್ತಿ ಇಲ್ಲ')
								: assetLocked
								? t('Need land asset for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಭೂಮಿ ಆಸ್ತಿ ಬೇಕು')
								: surplusLocked
								? t('Need more monthly surplus for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಹೆಚ್ಚಿನ ಮಾಸಿಕ ಉಳಿಕೆ ಬೇಕು')
								: t('Not enough savings for this choice', 'ಈ ಆಯ್ಕೆಗೆ ಸಾಕಷ್ಟು ಉಳಿತಾಯವಿಲ್ಲ')
							: t('Confirm Choice', 'ಆಯ್ಕೆ ದೃಢೀಕರಿಸಿ')}
					</button>
					{/* Always-available back link — lets player escape a dead end by going back multiple levels */}
					{completedScenarios.length > 0 && !allChoicesLocked && (
						<button
							onClick={revertLastChoice}
							className="w-full py-2 text-xs text-white/45 hover:text-white/60 transition-colors text-center font-sans">
							{t('← Reconsider previous decision', '← ಹಿಂದಿನ ನಿರ್ಧಾರ ಮರು-ಪರಿಶೀಲಿಸಿ')}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ScenarioScreen;
