import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import solidarityLogo from '@/assets/solidarity-logo-only.png';
import gameData from '@/components/posh/gamedata.json';
import { calculatePoshLevelWithConfig } from '@/components/posh/resultlevels';

type Lang = 'en' | 'kan';

const STARTING_SCORE = 10;

const NewspaperResultsPage = () => {
	const navigate = useNavigate();

	const [lang, setLang] = useState<Lang>(() => {
		try {
			const stored = localStorage.getItem('posh-lang');
			return (stored === 'kan' ? 'kan' : 'en') as Lang;
		} catch {
			return 'en';
		}
	});

	// Load all answers from all three pages
	const allAnswers: Record<number, number> = (() => {
		const combined: Record<number, number> = {};
		['posh-page-1-answers', 'posh-page-2-answers', 'posh-page-3-answers'].forEach((key) => {
			try {
				const stored = localStorage.getItem(key);
				if (stored) Object.assign(combined, JSON.parse(stored));
			} catch {}
		});
		return combined;
	})();

	const totalEarned = gameData.questions.reduce((sum, q) => {
		const sel = allAnswers[q.id];
		return sel !== undefined ? sum + q.options[sel].poshPoints : sum;
	}, 0);

	const totalScore = STARTING_SCORE + totalEarned;
	const totalAnswered = Object.keys(allAnswers).length;
	const level = calculatePoshLevelWithConfig(totalScore);

	const handlePlayAgain = () => {
		localStorage.removeItem('posh-page-1-answers');
		localStorage.removeItem('posh-page-2-answers');
		localStorage.removeItem('posh-page-3-answers');
		navigate('/posh');
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-background border-b border-foreground/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70 rounded" aria-label="Home">
					<Home size={20} className="text-foreground" />
				</button>
			</header>

			<div className="flex-1 flex items-center justify-center py-8 px-4">
				<div className="w-full max-w-4xl bg-background shadow-2xl">
					<div className="border-2 border-foreground p-1">
						<div className="border border-foreground">
							{/* Masthead */}
							<div className="relative flex items-center justify-center border-b border-foreground mx-4 pt-4 pb-2">
								<img src={solidarityLogo} alt="Solidarity Foundation" className="absolute left-0 h-12 sm:h-14 w-auto" />
								<h1 className="newspaper-masthead text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none text-foreground">
									{lang === 'kan' ? 'ಪೋಶ್ ಪ್ರಗ್ನೆ' : 'PoSH Awareness'}
								</h1>
								<div className="absolute right-0 flex gap-1 newspaper-body text-xs">
									<button
										onClick={() => setLang('en')}
										className={`px-2 py-1 border border-foreground transition-colors ${lang === 'en' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-foreground/10'}`}>
										English
									</button>
									<button
										onClick={() => setLang('kan')}
										className={`px-2 py-1 border border-foreground transition-colors ${lang === 'kan' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-foreground/10'}`}>
										ಕನ್ನಡ
									</button>
								</div>
							</div>
							<div className="mx-4 border-t-4 border-foreground" />
							<div className="mx-4 border-t border-foreground mt-0.5" />

							<div className="px-4 py-4">
								{/* Results headline */}
								<h2 className="newspaper-headline text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-3 text-center">
									{lang === 'kan' ? 'ನಿಮ್ಮ ಪರಿಣಾಮ' : 'Your Results'}
								</h2>
								<div className="border-t border-foreground mb-4" />

								{/* Score & Level */}
								<div className="text-center mb-6">
									<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
										{lang === 'kan' ? 'ಒಟ್ಟು ಅಂಕ' : 'Total Score'}
									</p>
									<p className="newspaper-headline text-6xl font-bold text-foreground mb-3">{totalScore}</p>
									<div className="border-t border-foreground my-3" />
									<p className="newspaper-headline text-2xl sm:text-3xl font-bold text-foreground mb-2">
										{lang === 'kan' ? level.level_kan : level.level}
									</p>
									<p className="newspaper-body text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg mx-auto">
										{lang === 'kan' ? level.message_kan : level.message}
									</p>
									<div className="grid grid-cols-2 gap-4 mt-4 max-w-xs mx-auto text-center">
										<div>
											<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
												{lang === 'kan' ? 'ಉತ್ತರಿಸಿದ' : 'Answered'}
											</p>
											<p className="newspaper-headline text-2xl font-bold text-foreground">
												{totalAnswered} / {gameData.questions.length}
											</p>
										</div>
										<div>
											<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
												{lang === 'kan' ? 'ಗಳಿಸಿದ' : 'Earned'}
											</p>
											<p
												className={`newspaper-headline text-2xl font-bold ${totalEarned >= 0 ? 'text-green-600' : 'text-red-600'}`}>
												{totalEarned >= 0 ? `+${totalEarned}` : totalEarned}
											</p>
										</div>
									</div>
								</div>

								<div className="border-t-2 border-foreground mb-2" />
								<h3 className="newspaper-headline text-xl font-bold text-foreground mb-3">
									{lang === 'kan' ? 'ಪ್ರಶ್ನೆ ವಿಮರ್ಶೆ' : 'Question Review'}
								</h3>
								<div className="border-t border-foreground mb-4" />

								{/* Question review list */}
								<div className="space-y-4">
									{gameData.questions.map((q, idx) => {
										const sel = allAnswers[q.id];
										const answered = sel !== undefined;
										const selectedOption = answered ? q.options[sel] : null;
										const correct = selectedOption ? selectedOption.poshPoints > 0 : false;

										return (
											<div
												key={q.id}
												className={`border px-4 py-3 ${answered ? (correct ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50') : 'border-foreground/30 bg-background'}`}>
												<div className="flex items-start justify-between gap-2">
													<div className="flex-1">
														<p className="newspaper-headline font-bold text-foreground text-sm">
															{idx + 1}. {lang === 'kan' ? q.title_kan : q.title}
														</p>
														{answered ? (
															<>
																<p className="newspaper-body text-xs text-muted-foreground mt-1">
																	{lang === 'kan' ? 'ನಿಮ್ಮ ಉತ್ತರ:' : 'Your answer:'}{' '}
																	<span className="text-foreground">
																		{String.fromCharCode(65 + sel)}.{' '}
																		{lang === 'kan' ? selectedOption!.text_kan : selectedOption!.text}
																	</span>
																</p>
																<p className="newspaper-body text-xs mt-1 text-foreground">
																	{lang === 'kan' ? selectedOption!.feedback_kan : selectedOption!.feedback}
																</p>
															</>
														) : (
															<p className="newspaper-body text-xs text-muted-foreground mt-1 italic">
																{lang === 'kan' ? 'ಉತ್ತರಿಸಲಾಗಿಲ್ಲ' : 'Not answered'}
															</p>
														)}
													</div>
													{answered && (
														<p
															className={`newspaper-headline font-bold text-base whitespace-nowrap ${correct ? 'text-green-600' : 'text-red-600'}`}>
															{selectedOption!.poshPoints > 0
																? `+${selectedOption!.poshPoints}`
																: selectedOption!.poshPoints}
														</p>
													)}
												</div>
											</div>
										);
									})}
								</div>

								{/* Bottom rule */}
								<div className="border-t border-foreground mt-6 mb-4" />

								{/* Play Again Button */}
								<div className="flex justify-center pb-4">
									<button
										onClick={handlePlayAgain}
										className="newspaper-headline text-lg sm:text-xl font-bold tracking-wider uppercase px-10 py-3 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200">
										{lang === 'kan' ? 'ಮತ್ತೆ ಆಡಿ' : 'Play Again'}
									</button>
								</div>

								{/* Footer */}
								<div className="border-t border-foreground pt-2 text-center">
									<p className="text-xs text-muted-foreground tracking-widest uppercase">
										© Solidarity Foundation · All Rights Reserved
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewspaperResultsPage;
