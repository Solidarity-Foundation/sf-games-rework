import { Navigate, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import gamedata from './gamedata.json';

type GameScenario = (typeof gamedata.scenarios)[number];
type GameChoice = GameScenario['choices'][number];

const ReviewScreen = () => {
	const navigate = useNavigate();
	const { choiceHistory, score, language, setLanguage, resetGame, completedScenarios } = useFinancialStore();

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	if (completedScenarios.length < 10) return <Navigate to="/financial-literacy/scenario" replace />;

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			<header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0e1e3f]/95 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={20} />
				</button>
				<span className="text-[#e8b84b] text-sm font-semibold">
					{t('Choice Review', 'ಆಯ್ಕೆ ಪರಿಶೀಲನೆ')} · {score} pts
				</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-xs px-3 py-1 rounded border border-white/35 hover:bg-white/15 transition-colors"
				>
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col gap-3 p-4 max-w-2xl mx-auto w-full pb-6">
				<p className="text-sm text-white/50 text-center pb-1">
					{t('Your choices vs the best choices', 'ನಿಮ್ಮ ಆಯ್ಕೆಗಳು vs ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆಗಳು')}
				</p>

				{gamedata.scenarios.map(scenario => {
					const rec = choiceHistory[(scenario as GameScenario).id];
					if (!rec) return null;

					const yourChoice = scenario.choices[rec.choiceIndex] as GameChoice & {
						label_kan?: string;
						description_kan?: string;
					};
					const bestChoice = [...scenario.choices].sort((a, b) => b.points - a.points)[0] as GameChoice & {
						label_kan?: string;
						description_kan?: string;
					};
					const isOptimal = rec.choiceId === bestChoice.id;
					const pointsColor = rec.points > 0 ? 'text-green-400' : 'text-red-400';
					const s = scenario as GameScenario & { title_kan?: string };

					return (
						<div key={scenario.id} className="bg-[#162d5c] rounded-xl p-4 border border-white/20">
							<div className="flex items-start justify-between mb-3 gap-2">
								<div>
									<span className="text-xs text-white/45">S{scenario.id} · </span>
									<span className="text-sm font-semibold">{t(scenario.title, s.title_kan ?? scenario.title)}</span>
								</div>
								<span className={`text-sm font-bold flex-shrink-0 ${pointsColor}`}>
									{rec.points > 0 ? '+' : ''}{rec.points}
								</span>
							</div>

							<div className="flex flex-col gap-2">
								{/* Your choice */}
								<div className={`rounded-lg p-3 text-sm border ${
									isOptimal
										? 'bg-green-900/25 border-green-700/35'
										: 'bg-orange-900/20 border-orange-700/30'
								}`}>
									<div className="flex items-center gap-2 mb-1.5">
										<span className={`font-bold text-base ${isOptimal ? 'text-green-400' : 'text-orange-400'}`}>
											{rec.choiceId}
										</span>
										<span className="font-semibold text-white/90">
											{t(yourChoice.label, yourChoice.label_kan ?? yourChoice.label)}
										</span>
										<span className="ml-auto text-white/45 text-xs">{t('your choice', 'ನಿಮ್ಮ ಆಯ್ಕೆ')}</span>
									</div>
									<p className="text-white/65 leading-relaxed">
										{t(yourChoice.description, yourChoice.description_kan ?? yourChoice.description)}
									</p>
								</div>

								{/* Best choice — only if different */}
								{!isOptimal && (
									<div className="rounded-lg p-3 text-sm border bg-green-900/20 border-green-700/30">
										<div className="flex items-center gap-2 mb-1.5">
											<span className="font-bold text-base text-green-400">{bestChoice.id}</span>
											<span className="font-semibold text-white/90">
												{t(bestChoice.label, bestChoice.label_kan ?? bestChoice.label)}
											</span>
											<span className="ml-auto text-green-400/65 text-xs">{t('best choice', 'ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ')}</span>
										</div>
										<p className="text-white/65 leading-relaxed">
											{t(bestChoice.description, bestChoice.description_kan ?? bestChoice.description)}
										</p>
									</div>
								)}
							</div>
						</div>
					);
				})}

				<div className="flex gap-3 mt-2">
					<button
						onClick={() => navigate('/financial-literacy/results')}
						className="flex-1 py-3.5 rounded-xl border border-white/30 text-white/75 hover:bg-white/15 transition-colors text-base"
					>
						{t('← Results', '← ಫಲಿತಾಂಶ')}
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

export default ReviewScreen;
