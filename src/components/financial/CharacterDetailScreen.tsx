import { Navigate, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import susheelaImg from '@/assets/financial/susheela-profile.webp';

const CharacterDetailScreen = () => {
	const navigate = useNavigate();
	const { selectedCharacter, startGame, language, setLanguage } = useFinancialStore();

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	if (!selectedCharacter) {
		return <Navigate to="/financial-literacy" replace />;
	}

	const handleStartGame = () => {
		startGame();
		navigate('/financial-literacy/scenario');
	};

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			<header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#0e1e3f]/90 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={22} />
				</button>
				<span className="text-[#e8b84b] text-base font-semibold tracking-wide">
					{t('Financial Literacy Game', 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ ಆಟ')}
				</span>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-sm px-4 py-1.5 rounded border border-white/35 hover:bg-white/15 transition-colors">
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 py-6 gap-6">
				{/* Portrait + name hero */}
				<div className="flex items-end gap-5">
					<img
						src={susheelaImg}
						alt="Susheela"
						className="w-36 h-48 object-cover object-top rounded-2xl border border-white/20 flex-shrink-0"
					/>
					<div className="pb-1">
						<p className="text-sm text-[#e8b84b]/80 uppercase tracking-widest mb-1">
							{t('Your character', 'ನಿಮ್ಮ ಪಾತ್ರ')}
						</p>
						<h1 className="text-4xl font-bold tracking-wide text-white leading-tight">{t('SUSHEELA', 'ಸುಶೀಲಾ')}</h1>
						<p className="text-base text-white/65 mt-1">{t('Age 30 · Bengaluru', 'ವಯಸ್ಸು 30 · ಬೆಂಗಳೂರು')}</p>

						{/* Starting finances */}
						<div className="flex flex-wrap gap-2 mt-3">
							<span className="bg-[#e8b84b]/20 border border-[#e8b84b]/40 text-[#e8b84b] text-xs font-medium px-3 py-1 rounded-full">
								{t('Income: ', 'ಆದಾಯ: ')}₹18,000/{t('month', 'ತಿಂಗಳು')}
							</span>
							<span className="bg-white/12 border border-white/25 text-white/75 text-xs font-medium px-3 py-1 rounded-full">
								{t('Savings: ', 'ಉಳಿತಾಯ: ')}₹0
							</span>
						</div>
					</div>
				</div>

				{/* Story */}
				<div className="space-y-4 text-base leading-relaxed text-white/85">
					<p>
						{t(
							'Susheela is a trans woman who has built her life through sheer determination. She runs a small beauty services business in Bengaluru, earning ₹18,000 a month — the first stable income of her life.',
							'ಸುಶೀಲಾ ಒಬ್ಬ ಟ್ರಾನ್ಸ್ ಮಹಿಳೆ, ಅವಳು ತನ್ನ ಜೀವನವನ್ನು ದೃಢ ನಿಶ್ಚಯದಿಂದ ಕಟ್ಟಿಕೊಂಡಿದ್ದಾಳೆ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ಸಣ್ಣ ಸೌಂದರ್ಯ ಸೇವಾ ವ್ಯವಹಾರ ನಡೆಸಿ ₹18,000/ತಿಂಗಳು ಗಳಿಸುತ್ತಿದ್ದಾಳೆ.',
						)}
					</p>
					<p>
						{t(
							'She is raising her daughter Priya. Over the next 20 years, you will journey with Susheela through the biggest financial decisions of her life — helping her make smart choices so she can achieve her goals and build a secure future for herself and Priya.',
							'ಅವಳು ತನ್ನ ಮಗಳು ಪ್ರಿಯಾಳನ್ನು ಬೆಳೆಸುತ್ತಿದ್ದಾಳೆ. ಮುಂದಿನ 20 ವರ್ಷಗಳಲ್ಲಿ, ನೀವು ಸುಶೀಲಾಳ ಜೀವನದ ಪ್ರಮುಖ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳ ಮೂಲಕ ಅವಳೊಂದಿಗೆ ಪ್ರಯಾಣಿಸುತ್ತೀರಿ — ಅವಳ ಗುರಿಗಳನ್ನು ಸಾಧಿಸಲು ಸರಿಯಾದ ಆಯ್ಕೆಗಳನ್ನು ಮಾಡಲು ಸಹಾಯ ಮಾಡಿ.',
						)}
					</p>
				</div>

				{/* 2-year interval callout */}
				<div className="rounded-2xl p-5 border-2 border-[#e8b84b]/60 bg-[#e8b84b]/8">
					<div className="flex items-center gap-2 mb-3">
						<span className="text-xl">⏱</span>
						<h3 className="text-sm font-bold uppercase tracking-widest text-[#e8b84b]">
							{t('10 decisions · 20 years', '10 ನಿರ್ಧಾರ · 20 ವರ್ಷ')}
						</h3>
					</div>
					<p className="text-sm text-white/80 leading-relaxed mb-5">
						{t(
							"Each decision jumps Susheela's life forward by 2 years. Your choices have long-term consequences — a bad call at Year 4 can haunt her at Year 18.",
							'ಪ್ರತಿ ನಿರ್ಧಾರ ಸುಶೀಲಾಳ ಜೀವನವನ್ನು 2 ವರ್ಷ ಮುಂದಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ. ನಿಮ್ಮ ಆಯ್ಕೆಗಳು ದೀರ್ಘಕಾಲೀನ ಪರಿಣಾಮ ಬೀರುತ್ತವೆ.',
						)}
					</p>
					{/* Timeline strip */}
					<div className="flex items-start">
						{[0, 2, 4, 6, 8, 10, 12, 14, 16, 18].map((year, i) => (
							<div key={year} className="flex items-center flex-1 min-w-0">
								<div className="flex flex-col items-center flex-shrink-0">
									<div className="w-6 h-6 rounded-full bg-[#e8b84b] flex items-center justify-center text-[9px] font-bold text-[#0e1e3f]">
										{i + 1}
									</div>
									<span className="text-[11px] text-white/50 mt-1 whitespace-nowrap">Yr {year}</span>
								</div>
								{i < 9 && <div className="flex-1 h-0.5 bg-[#e8b84b]/35 mx-0.5 mb-3" />}
							</div>
						))}
					</div>
				</div>

				{/* Background info */}
				<div className="bg-[#162d5c] rounded-2xl p-5 border border-white/20">
					<h3 className="text-sm font-semibold uppercase tracking-widest text-white/55 mb-4">
						{t('Background', 'ಹಿನ್ನೆಲೆ')}
					</h3>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">💼</span>
							<div>
								<p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{t('Profession', 'ವೃತ್ತಿ')}</p>
								<p className="text-base text-white/85">
									{t(
										'Part-time sex worker + beauty services provider, transitioning to full-time beauty parlor',
										'ಅರೆಕಾಲಿಕ ಲೈಂಗಿಕ ಕಾರ್ಯಕರ್ತೆ + ಸೌಂದರ್ಯ ಸೇವಾ ಪೂರೈಕೆದಾರೆ, ಪೂರ್ಣಕಾಲಿಕ ಬ್ಯೂಟಿ ಪಾರ್ಲರ್‌ಗೆ ಪರಿವರ್ತನೆ',
									)}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">🏠</span>
							<div>
								<p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">
									{t('Living Situation', 'ವಾಸಸ್ಥಳ')}
								</p>
								<p className="text-base text-white/85">
									{t(
										'Rents a small room in Malleswaram with two other trans women',
										'ಮಲ್ಲೇಶ್ವರಂನಲ್ಲಿ ಇಬ್ಬರು ಟ್ರಾನ್ಸ್ ಮಹಿಳೆಯರೊಂದಿಗೆ ಸಣ್ಣ ಕೋಣೆ ಬಾಡಿಗೆಗೆ ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ',
									)}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">🤝</span>
							<div>
								<p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{t('Community', 'ಸಮುದಾಯ')}</p>
								<p className="text-base text-white/85">
									{t(
										'Part of local hijra community under guru Lakshmi; supports younger trans women',
										'ಗುರು ಲಕ್ಷ್ಮಿ ಅಡಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಹಿಜ್ರಾ ಸಮುದಾಯದ ಭಾಗ; ಯುವ ಟ್ರಾನ್ಸ್ ಮಹಿಳೆಯರಿಗೆ ಬೆಂಬಲ',
									)}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">👨‍👩‍👧</span>
							<div>
								<p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{t('Family', 'ಕುಟುಂಬ')}</p>
								<p className="text-base text-white/85">
									{t(
										'Sends money secretly to her supportive mother; has informally adopted Priya (7), daughter of a deceased friend',
										'ತನ್ನ ಬೆಂಬಲಿಗ ತಾಯಿಗೆ ಗುಪ್ತವಾಗಿ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆ; ನಿಧನ ಹೊಂದಿದ ಗೆಳತಿಯ ಮಗಳು ಪ್ರಿಯಾ (7) ಳನ್ನು ಅನೌಪಚಾರಿಕವಾಗಿ ದತ್ತು ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ',
									)}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">💊</span>
							<div>
								<p className="text-xs text-white/45 uppercase tracking-wide mb-0.5">{t('Health', 'ಆರೋಗ್ಯ')}</p>
								<p className="text-base text-white/85">
									{t('Diabetic; requires regular medication', 'ಮಧುಮೇಹ; ನಿಯಮಿತ ಔಷಧಿ ಅಗತ್ಯ')}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Goals box */}
				<div className="bg-[#162d5c] rounded-2xl p-5 border border-white/20">
					<h3 className="text-sm font-semibold uppercase tracking-widest text-white/55 mb-4">
						{t('Her goals', 'ಅವಳ ಗುರಿಗಳು')}
					</h3>
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<span className="text-2xl flex-shrink-0">🏠</span>
							<p className="text-base text-white/85 font-medium">
								{t('Buy a house for retirement', 'ನಿವೃತ್ತಿಗಾಗಿ ಮನೆ ಖರೀದಿ')}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-2xl flex-shrink-0">🎓</span>
							<p className="text-base text-white/85 font-medium">
								{t("Fund Priya's education", 'ಪ್ರಿಯಾಳ ಶಿಕ್ಷಣಕ್ಕೆ ಹಣ ಒದಗಿಸಿ')}
							</p>
						</div>
					</div>
				</div>

				{/* Challenges */}
				<div className="bg-[#162d5c] rounded-2xl p-5 border border-white/20">
					<h3 className="text-sm font-semibold uppercase tracking-widest text-white/55 mb-4">
						{t('The challenges she faces', 'ಅವಳು ಎದುರಿಸುವ ಸವಾಲುಗಳು')}
					</h3>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">🚔</span>
							<p className="text-base text-white/80">
								{t('Police harassment and the constant threat of extortion', 'ಪೊಲೀಸ್ ಕಿರುಕುಳ ಮತ್ತು ಸುಲಿಗೆಯ ನಿರಂತರ ಭಯ')}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">🤝</span>
							<p className="text-base text-white/80">
								{t('Community obligations to her guru and family', 'ಗುರು ಮತ್ತು ಕುಟುಂಬಕ್ಕೆ ಸಮುದಾಯ ಬಾಧ್ಯತೆಗಳು')}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-xl flex-shrink-0">🏦</span>
							<p className="text-base text-white/80">
								{t('Limited access to formal banking and credit', 'ಔಪಚಾರಿಕ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಸಾಲಕ್ಕೆ ಸೀಮಿತ ಪ್ರವೇಶ')}
							</p>
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex flex-col gap-3 pb-4">
					<button
						onClick={handleStartGame}
						className="w-full py-4 rounded-2xl bg-[#e8b84b] text-[#0e1e3f] font-bold text-lg hover:bg-[#f5c842] transition-colors">
						{t("Start Susheela's Journey →", 'ಸುಶೀಲಾಳ ಪ್ರಯಾಣ ಆರಂಭಿಸಿ →')}
					</button>
					<button
						onClick={() => navigate('/financial-literacy')}
						className="w-full py-3.5 rounded-2xl border border-white/25 text-white/70 hover:bg-white/15 transition-colors flex items-center justify-center gap-2 text-base">
						<ArrowLeft size={16} />
						{t('Go Back', 'ಹಿಂದೆ ಹೋಗಿ')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CharacterDetailScreen;
