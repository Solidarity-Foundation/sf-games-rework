import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import coverImage from '@/assets/posh-coverimage.jpg';
import stopHarassmentImage from '@/assets/stop-sexual-harassment.jpg';
import solidarityLogo from '@/assets/solidarity-logo-only.png';

type Lang = 'en' | 'kan';

const NewspaperFrontPage = () => {
	const navigate = useNavigate();

	const [lang, setLang] = useState<Lang>(() => {
		try {
			const stored = localStorage.getItem('posh-lang');
			return (stored === 'kan' ? 'kan' : 'en') as Lang;
		} catch {
			return 'en';
		}
	});

	useEffect(() => {
		localStorage.setItem('posh-lang', lang);
	}, [lang]);

	const today = new Date();
	const dateStr = today.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-background border-b border-foreground/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70 rounded" aria-label="Home">
					<Home size={20} className="text-foreground" />
				</button>
			</header>
			<div className="flex-1 flex items-center justify-center py-8 px-4">
				<div className="w-full max-w-4xl bg-background shadow-2xl">
					{/* Outer border */}
					<div className="border-2 border-foreground p-1">
						<div className="border border-foreground">
							{/* Top info bar */}
							<div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-body text-muted-foreground tracking-wide">
								<span>VOL. CLXVII . . . No. 1</span>
								<span>{dateStr}</span>
								<span>{lang === 'kan' ? 'ವಿಶೇಷ ಆವೃತ್ತಿ' : 'SPECIAL EDITION'}</span>
							</div>

							{/* Masthead */}
							<div className="border-t-2 border-b border-foreground mx-4 pt-3 pb-2">
								<div className="flex items-center justify-between gap-2">
									<img
										src={solidarityLogo}
										alt="Solidarity Foundation"
										className="h-10 sm:h-12 md:h-14 w-auto flex-shrink-0"
									/>
									<h1 className="newspaper-masthead text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-none text-foreground text-center flex-1">
										{lang === 'kan' ? 'ಪೋಶ್ ಪ್ರಗ್ನೆ' : 'PoSH Awareness'}
									</h1>
									<div className="flex flex-col sm:flex-row gap-1 newspaper-body text-xs flex-shrink-0">
										<button
											onClick={() => setLang('en')}
											className={`px-2 py-1 border border-foreground transition-colors ${lang === 'en' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-foreground/10'}`}>
											<span className="sm:hidden">ENG</span>
											<span className="hidden sm:inline">English</span>
										</button>
										<button
											onClick={() => setLang('kan')}
											className={`px-2 py-1 border border-foreground transition-colors ${lang === 'kan' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-foreground/10'}`}>
											ಕನ್ನಡ
										</button>
									</div>
								</div>
								<div className="border-t border-foreground mt-2 pt-1">
									<p className="text-xs sm:text-sm font-headline tracking-[0.3em] uppercase text-muted-foreground text-center">
										{lang === 'kan'
											? 'ಸೋಲಿಡಾರಿಟಿ ಫೌಂಡೇಶನ್‌ನಿಂದ ಶೈಕ್ಷಣಿಕ ಆಟಗಳು'
											: 'Educational Games from Solidarity Foundation'}
									</p>
								</div>
							</div>

							{/* Thick rule below masthead */}
							<div className="mx-4 border-t-4 border-foreground" />
							<div className="mx-4 border-t border-foreground mt-0.5" />

							{/* Main content area */}
							<div className="px-4 py-4">
								<div className="grid grid-cols-1 md:grid-cols-12 gap-0">
									{/* Main article - left 8 columns */}
									<div className="md:col-span-8 md:newspaper-column-rule md:pr-5">
										{/* Main headline */}
										<h2 className="newspaper-headline text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-3">
											{lang === 'kan'
												? 'ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ನೀತಿಯ ಜಾಗೃತಿಗಾಗಿ ಆಟ'
												: 'Welcome to the PoSH Awareness Game!'}
										</h2>

										<div className="border-t border-foreground mb-3" />

										{/* Main article body */}
										<p className="newspaper-body text-sm sm:text-base leading-relaxed text-justify-newspaper text-foreground mb-4">
											{lang === 'kan'
												? 'ಸುರಕ್ಷಿತ ಮತ್ತು ಗೌರವಾನ್ವಿತ ಕೆಲಸದ ಸ್ಥಳವನ್ನು ರಚಿಸುವುದು ಪ್ರತಿಯೊಬ್ಬರ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ. ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳವನ್ನು ತಡೆಗಟ್ಟಲು ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳು, ನೀತಿಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಲು ಈ ರಸಪ್ರಶ್ನೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.'
												: "Creating a safe and respectful workplace is everyone's responsibility. This quiz is designed to test your understanding of key concepts, policies, and procedures related to preventing sexual harassment in the workplace."}
										</p>

										{/* Cover image */}
										<div className="mb-4 border border-foreground">
											<img
												src={coverImage}
												alt="PoSH Awareness illustration showing women standing together in solidarity"
												className="w-full h-auto object-cover"
											/>
										</div>

										{/* Decorative filler text styled as newspaper columns */}
										<div className="columns-2 gap-5 text-sm sm:text-base leading-relaxed text-justify-newspaper text-foreground mt-2">
											<p className="mb-2 indent-4">
												{lang === 'kan'
													? 'ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆ (PoSH) ಕಾಯ್ದೆ, 2013, ಭಾರತದಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ಸುರಕ್ಷಿತ ಕೆಲಸದ ವಾತಾವರಣವನ್ನು ಒದಗಿಸುವ ಗುರಿಯನ್ನು ಹೊಂದಿರುವ ಒಂದು ಹೆಗ್ಗುರುತು ಶಾಸನವಾಗಿದೆ. 10 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ಉದ್ಯೋಗಿಗಳನ್ನು ಹೊಂದಿರುವ ಪ್ರತಿಯೊಂದು ಸಂಸ್ಥೆಯು ಆಂತರಿಕ ದೂರು ಸಮಿತಿಯನ್ನು ರಚಿಸುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ.'
													: 'The Prevention of Sexual Harassment (PoSH) Act, 2013, is a landmark legislation in India that aims to provide a safe working environment for women. Every organization with 10 or more employees is required to constitute an Internal Complaints Committee.'}
											</p>
											<p className="mb-2 indent-4">
												{lang === 'kan'
													? 'ಜಾಗೃತಿಯು ತಡೆಗಟ್ಟುವಿಕೆಯ ಮೊದಲ ಹೆಜ್ಜೆಯಾಗಿದೆ. ಲೈಂಗಿಕ ಕಿರುಕುಳ ಏನೆಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮೂಲಕ, ಉದ್ಯೋಗಿಗಳು ಅನುಚಿತ ನಡವಳಿಕೆಯನ್ನು ಉತ್ತಮವಾಗಿ ಗುರುತಿಸಬಹುದು ಮತ್ತು ಸೂಕ್ತ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಬಹುದು. ಶಿಕ್ಷಣವು ವ್ಯಕ್ತಿಗಳು ತಮ್ಮನ್ನು ಮತ್ತು ತಮ್ಮ ಸಹೋದ್ಯೋಗಿಗಳನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಲು ಅಧಿಕಾರ ನೀಡುತ್ತದೆ.'
													: 'Awareness is the first step toward prevention. By understanding what constitutes sexual harassment, employees can better identify inappropriate behavior and take appropriate action.Education empowers individuals to stand up for themselves and their colleagues.'}
											</p>
										</div>
									</div>

									{/* Sidebar - right 4 columns */}
									<div className="md:col-span-4 md:pl-5 mt-6 md:mt-0">
										{/* Sidebar article 1: Aim of the Game */}
										<div className="mb-5">
											<div className="border-t-2 border-foreground mb-2" />
											<h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
												{lang === 'kan' ? 'ಆಟದ ಗುರಿ' : 'Aim of the Game'}
											</h3>
											<div className="border-t border-foreground mb-2" />
											<p className="newspaper-body text-sm sm:text-base leading-relaxed text-justify-newspaper text-foreground mb-3">
												{lang === 'kan'
													? 'ಈ ತತ್ವಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ನಿಮ್ಮನ್ನು ಮಾತ್ರವಲ್ಲದೆ ನಿಮ್ಮ ಸಹೋದ್ಯೋಗಿಗಳನ್ನು ಸಹ ರಕ್ಷಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಯೊಬ್ಬರೂ ಸುರಕ್ಷಿತ, ಗೌರವಾನ್ವಿತ ಮತ್ತು ಮೌಲ್ಯಯುತವೆಂದು ಭಾವಿಸುವ ಕೆಲಸದ ಸ್ಥಳವನ್ನು ನಿರ್ಮಿಸಲು ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.'
													: 'Understanding these principles helps protect not only yourself but also your colleagues, and contributes to building a workplace where everyone can feel safe, respected, and valued.'}
											</p>
											<p className="newspaper-body text-sm sm:text-base leading-relaxed text-justify-newspaper text-foreground mb-3">
												{lang === 'kan'
													? 'ನಿಮ್ಮ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ, ಪ್ರತಿಯೊಂದು ಸನ್ನಿವೇಶದ ಮೂಲಕ ಯೋಚಿಸಿ, ಮತ್ತು ನೈಜ ಸಂದರ್ಭಗಳಲ್ಲಿ, ಸಂದೇಹವಿದ್ದಾಗ, ಯಾವಾಗಲೂ ಸುರಕ್ಷತೆಯ ಬದಿಯಲ್ಲಿ ತಪ್ಪು ಮಾಡಿ ಮತ್ತು ಸರಿಯಾದ ವರದಿ ಮಾಡುವ ವಿಧಾನಗಳನ್ನು ಅನುಸರಿಸಿ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.'
													: 'Take your time, think through each scenario, and remember that in real situations, when in doubt, always err on the side of safety and follow proper reporting procedures.'}
											</p>

											{/* Stop Sexual Harassment image */}
											<div className="border border-foreground w-full overflow-hidden">
												<img
													src={stopHarassmentImage}
													alt="Stop Sexual Harassment awareness"
													className="w-full h-auto object-cover"
												/>
											</div>
										</div>

										{/* Sidebar article 2: Rules of the Game */}
										<div>
											<div className="border-t-2 border-foreground mb-2" />
											<h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
												{lang === 'kan' ? 'ಆಟದ ನಿಯಮಗಳು' : 'Rules of the Game'}
											</h3>
											<div className="border-t border-foreground mb-2" />
											<p className="newspaper-body text-sm sm:text-base leading-relaxed text-foreground mb-1">
												{lang === 'kan' ? 'ನೀವು 10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿಸುತ್ತೀರಿ.' : 'You start with 10 points.'}
											</p>
											<p className="newspaper-body text-sm sm:text-base leading-relaxed text-foreground mb-1">
												{lang === 'kan' ? 'ಸರಿಯಾದ ಉತ್ತರ : +1 ಅಂಕ.' : 'Correct answer: +1 point.'}
											</p>
											<p className="newspaper-body text-sm sm:text-base leading-relaxed text-foreground">
												{lang === 'kan' ? 'ತಪ್ಪಾದ ಉತ್ತರ : −1 ಅಂಕ.' : 'Wrong answer: −1 point.'}
											</p>
										</div>
									</div>
								</div>

								{/* Bottom rule */}
								<div className="border-t border-foreground mt-6 mb-4" />

								{/* Start Game Button */}
								<div className="flex justify-center pb-4">
									<button
										onClick={() => {
											localStorage.removeItem('posh-page-1-answers');
											localStorage.removeItem('posh-page-2-answers');
											localStorage.removeItem('posh-page-3-answers');
											navigate('/posh/page-1');
										}}
										className="newspaper-headline text-lg sm:text-xl font-bold tracking-wider uppercase px-10 py-3 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200">
										{lang === 'kan' ? 'ಆಟವನ್ನು ಪ್ರಾರಂಭಿಸಿ' : 'Start Game'}
									</button>
								</div>

								{/* Footer */}
								<div className="border-t border-foreground pt-2 text-center">
									<p className="text-xs text-muted-foreground tracking-widest uppercase">
										{lang === 'kan'
											? '© ಸೋಲಿಡಾರಿಟಿ ಫೌಂಡೇಶನ್ · ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ'
											: '© Solidarity Foundation · All Rights Reserved'}
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

export default NewspaperFrontPage;
