import { Navigate, useNavigate } from 'react-router-dom';
import { Home, Trophy, GraduationCap } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import { getFinancialLevel } from './resultlevels';
import houseIcon from '@/assets/financial/house-icon.png';
import educationIcon from '@/assets/financial/education-icon.png';

const fmt = (n: number) => {
	if (n < 0) return `-₹${Math.abs(n).toLocaleString('en-IN')}`;
	return `₹${n.toLocaleString('en-IN')}`;
};

const ResultsScreen = () => {
	const navigate = useNavigate();
	const {
		score, savings, monthlyIncome, monthlyExpenses, assets, debts,
		houseGoalProgress, educationGoalProgress, houseGoalStatus, educationGoalStatus,
		age, language, setLanguage, resetGame, completedScenarios, choiceHistory,
	} = useFinancialStore();

	const s6EngineerPath = choiceHistory[6]?.choiceId === 'A';
	const s6DiplomaPath = choiceHistory[6]?.choiceId === 'B';
	const s6DropOutPath = choiceHistory[6]?.choiceId === 'C';

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	if (completedScenarios.length < 10) return <Navigate to="/financial-literacy/scenario" replace />;

	const level = getFinancialLevel(score, houseGoalProgress === 100);
	const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
	const totalDebt = debts.reduce((sum, d) => sum + d.remainingAmount, 0);
	const monthlySurplus = monthlyIncome - monthlyExpenses;

	const statusLabel = (s: string) => {
		if (s === 'achieved') return t('Achieved ✓', 'ಸಾಧಿಸಲಾಗಿದೆ ✓');
		if (s === 'in-progress') return t('In Progress', 'ಪ್ರಗತಿಯಲ್ಲಿದೆ');
		if (s === 'at-risk') return t('At Risk ⚠', 'ಅಪಾಯದಲ್ಲಿದೆ ⚠');
		return t('Not Started', 'ಪ್ರಾರಂಭಿಸಿಲ್ಲ');
	};

	const statusColor = (s: string) => {
		if (s === 'achieved') return 'text-green-400';
		if (s === 'in-progress') return 'text-blue-400';
		if (s === 'at-risk') return 'text-red-400';
		return 'text-white/45';
	};

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0e1e3f]/95 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={20} />
				</button>
				<span className="text-[#e8b84b] text-sm font-semibold">
					{t('Final Results', 'ಅಂತಿಮ ಫಲಿತಾಂಶ')}
				</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-xs px-3 py-1 rounded border border-white/35 hover:bg-white/15 transition-colors"
				>
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full pb-8">

				{/* Score + Level */}
				<div className="rounded-xl p-5 text-center border border-white/20 bg-[#162d5c]">
					<Trophy size={40} className="mx-auto mb-3" style={{ color: level.color }} />
					<div className="text-5xl font-bold mb-2" style={{ color: level.color }}>{score}</div>
					<div className="text-lg font-semibold mb-1">{t(level.level, level.level_kan)}</div>
					<div className="text-sm text-white/70">{t(level.description, level.description_kan)}</div>
					<div className="text-sm text-white/45 mt-2">
						{t(`Out of 300 points · Susheela, age ${Math.round(age)}`, `300 ಅಂಕಗಳಲ್ಲಿ · ಸುಶೀಲಾ, ವಯಸ್ಸು ${Math.round(age)}`)}
					</div>
					{(totalDebt === 0 || s6EngineerPath) && (
						<div className="mt-3 flex flex-wrap justify-center gap-2">
							{totalDebt === 0 && (
								<div className="inline-flex items-center gap-1.5 bg-green-900/40 border border-green-500/50 rounded-full px-3 py-1">
									<span className="text-green-400 text-sm">★</span>
									<span className="text-green-300 text-sm font-medium">
										{t('Debt-Free Journey', 'ಸಾಲಮುಕ್ತ ಪ್ರಯಾಣ')}
									</span>
								</div>
							)}
							{s6EngineerPath && (
								<div className="inline-flex items-center gap-1.5 bg-blue-900/40 border border-blue-500/50 rounded-full px-3 py-1">
									<GraduationCap size={14} className="text-blue-400" />
									<span className="text-blue-300 text-sm font-medium">
										{t('Priya the Engineer', 'ಎಂಜಿನಿಯರ್ ಪ್ರಿಯಾ')}
									</span>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Goals */}
				<div className="grid grid-cols-2 gap-3">
					<div className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
						<div className="flex items-center gap-2 mb-3">
							<img src={houseIcon} alt="House" className="w-6 h-6 object-contain" />
							<span className="text-sm text-white/55 uppercase tracking-wide">{t('House Goal', 'ಮನೆ ಗುರಿ')}</span>
						</div>
						<div className="text-2xl font-bold text-white mb-2">{houseGoalProgress}%</div>
						<div className="w-full bg-white/15 rounded-full h-1.5 mb-2">
							<div
								className="h-1.5 rounded-full"
								style={{ width: `${houseGoalProgress}%`, background: level.color }}
							/>
						</div>
						<div className={`text-sm font-medium ${statusColor(houseGoalStatus)}`}>
							{statusLabel(houseGoalStatus)}
						</div>
					</div>

					<div className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
						<div className="flex items-center gap-2 mb-3">
							<img src={educationIcon} alt="Education" className="w-6 h-6 object-contain" />
							<span className="text-sm text-white/55 uppercase tracking-wide">{t('Education Goal', 'ಶಿಕ್ಷಣ ಗುರಿ')}</span>
						</div>
						<div className="text-2xl font-bold text-white mb-2">{s6DiplomaPath ? 50 : educationGoalProgress}%</div>
						<div className="w-full bg-white/15 rounded-full h-1.5 mb-2">
							<div
								className={`h-1.5 rounded-full ${s6DiplomaPath ? 'bg-amber-400' : s6DropOutPath ? 'bg-red-500' : 'bg-green-400'}`}
								style={{ width: `${s6DiplomaPath ? 50 : educationGoalProgress}%` }}
							/>
						</div>
						<div className={`text-sm font-medium ${s6DiplomaPath ? 'text-amber-400' : s6DropOutPath ? 'text-red-400' : statusColor(educationGoalStatus)}`}>
							{s6DiplomaPath
								? t('Diploma — Partial Goal', 'ಡಿಪ್ಲೋಮಾ — ಆಂಶಿಕ ಗುರಿ')
								: s6DropOutPath
								? t('Dropped Out ⚠', 'ಬಿಟ್ಟುಬಿಡ್ಡರು ⚠')
								: statusLabel(educationGoalStatus)}
						</div>
						{s6DiplomaPath && (
							<p className="text-xs text-amber-300/70 mt-2">
								{t(
								'Priya achieved a Polytechnic Diploma — a real qualification, but not the engineering degree she dreamed of.',
								'ಪ್ರಿಯಾ ಪಾಲಿಟೆಕ್ನಿಕ್ ಡಿಪ್ಲೋಮಾ ಪಡೆದಳು — ನಿಜವಾದ ಅರ್ಹತೆ, ಆದರೆ ಅವಳು ಕನಸಿನ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿಯಲ್ಲ.'
								)}
							</p>
						)}
					</div>
				</div>

				{/* Final financial state */}
				<div className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
					<div className="text-xs text-white/50 uppercase tracking-wide mb-3">
						{t("Susheela's Final Finances", 'ಸುಶೀಲಾಳ ಅಂತಿಮ ಆರ್ಥಿಕ ಸ್ಥಿತಿ')}
					</div>
					<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
						<div className="flex justify-between gap-2">
							<span className="text-white/60">{t('Savings', 'ಉಳಿತಾಯ')}</span>
							<span className="font-medium">{fmt(savings)}</span>
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
								{monthlySurplus >= 0 ? '+' : ''}{fmt(monthlySurplus)}
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

					{assets.length > 0 && (
						<div className="mt-3 pt-3 border-t border-white/15">
							<div className="text-xs text-white/50 mb-2">{t('Assets held', 'ಹೊಂದಿರುವ ಆಸ್ತಿಗಳು')}</div>
							<div className="flex flex-wrap gap-2">
								{assets.map((a, i) => (
									<span key={i} className="text-sm bg-blue-900/35 border border-blue-700/35 rounded px-2 py-1 text-blue-300">
										{a.label} — {fmt(a.value)}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Actions */}
				<div className="flex gap-3">
					<button
						onClick={() => navigate('/financial-literacy/review')}
						className="flex-1 py-3.5 rounded-xl border border-white/30 text-white/75 hover:bg-white/15 transition-colors text-base"
					>
						{t('Review Choices', 'ಆಯ್ಕೆಗಳ ಪರಿಶೀಲನೆ')}
					</button>
					<button
						onClick={() => { resetGame(); navigate('/financial-literacy'); }}
						className="flex-1 py-3.5 rounded-xl bg-[#e8b84b] text-[#0e1e3f] font-bold hover:bg-[#f5c842] transition-colors text-base"
					>
						{t('Play Again', 'ಮತ್ತೆ ಆಡಿ')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ResultsScreen;
