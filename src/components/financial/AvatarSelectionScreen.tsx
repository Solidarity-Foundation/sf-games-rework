import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useFinancialStore } from './financialStore';
import susheelaImg from '@/assets/financial/susheela.png';

const AvatarSelectionScreen = () => {
	const navigate = useNavigate();
	const selectCharacter = useFinancialStore(s => s.selectCharacter);
	const language = useFinancialStore(s => s.language);
	const setLanguage = useFinancialStore(s => s.setLanguage);

	const t = (en: string, kan: string) => (language === 'kan' ? kan : en);

	const handleSelect = () => {
		selectCharacter('susheela');
		navigate('/financial-literacy/character');
	};

	const bio = (
		<div className="border border-white/20 rounded-xl p-4 text-sm space-y-2.5 text-white/85">
			<div>
				<span className="text-white/55 font-medium">{t('Background: ', 'ಹಿನ್ನೆಲೆ: ')}</span>
				{t(
					'Trans woman, 30. Runs a small beauty services business in Bengaluru. Raising her daughter Priya.',
					'ಟ್ರಾನ್ಸ್ ಮಹಿಳೆ, 30 ವರ್ಷ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ಸೌಂದರ್ಯ ಸೇವಾ ವ್ಯವಹಾರ. ಮಗಳು ಪ್ರಿಯಾಳನ್ನು ಬೆಳೆಸುತ್ತಿದ್ದಾಳೆ.',
				)}
			</div>
			<div>
				<span className="text-white/55 font-medium">{t('Goals: ', 'ಗುರಿಗಳು: ')}</span>
				{t('Own a house, educate daughter Priya', 'ಮನೆ ಖರೀದಿ, ಮಗಳು ಪ್ರಿಯಾಳ ಶಿಕ್ಷಣ')}
			</div>
			<div>
				<span className="text-white/55 font-medium">{t('Timeframe: ', 'ಸಮಯ: ')}</span>
				{t('20 years (age 30 to 50)', '20 ವರ್ಷ (30 ರಿಂದ 50 ವರೆಗೆ)')}
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-[#0e1e3f] text-white flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#0e1e3f]/90 backdrop-blur border-b border-white/20">
				<button onClick={() => navigate('/')} className="p-1 hover:opacity-70" aria-label="Home">
					<Home size={22} />
				</button>
				<button
					onClick={() => setLanguage(language === 'en' ? 'kan' : 'en')}
					className="text-sm px-4 py-1.5 rounded border border-white/35 hover:bg-white/15 transition-colors"
				>
					{language === 'en' ? 'ಕನ್ನಡ' : 'English'}
				</button>
			</header>

			<div className="flex-1 flex flex-col items-center justify-center px-5 py-10 gap-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-wide text-[#e8b84b]">
						{t('Financial Literacy Game', 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ ಆಟ')}
					</h1>
					<p className="text-white/65 mt-3 text-base">
						{t('Educational Games from Solidarity Foundation', 'ಸಾಲಿಡಾರಿಟಿ ಫೌಂಡೇಶನ್‌ನ ಶೈಕ್ಷಣಿಕ ಆಟಗಳು')}
					</p>
				</div>

				{/* Purpose paragraph */}
				<div className="w-full max-w-xl text-white/70 text-sm leading-relaxed text-center px-2">
					{t(
						'This game puts you in the shoes of a real person navigating financial decisions over 20 years. Each choice you make — about savings, loans, investments, and emergencies — shapes your future. There are no perfect answers, only trade-offs. Play to understand how financial planning works for people living on the margins.',
						'ಈ ಆಟ ನಿಮ್ಮನ್ನು 20 ವರ್ಷಗಳ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳ ಮೂಲಕ ಒಬ್ಬ ನಿಜವಾದ ವ್ಯಕ್ತಿಯ ಜೀವನದಲ್ಲಿ ಇಡುತ್ತದೆ. ಉಳಿತಾಯ, ಸಾಲ, ಹೂಡಿಕೆ ಮತ್ತು ತುರ್ತು ಸಂದರ್ಭಗಳ ಬಗ್ಗೆ ನೀವು ತೆಗೆದುಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ನಿರ್ಧಾರವೂ ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು ರೂಪಿಸುತ್ತದೆ. ಆರ್ಥಿಕ ಅಂಚಿನಲ್ಲಿ ಜೀವಿಸುವ ಜನರಿಗೆ ಹಣಕಾಸು ಯೋಜನೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಆಡಿ.',
					)}
				</div>

				{/* Susheela card */}
				<div className="w-full max-w-xl rounded-2xl border border-[#e8b84b]/60 bg-[#162d5c] overflow-hidden hover:border-[#e8b84b]/85 transition-colors">

					{/* Mobile layout: name → image → bio → button */}
					<div className="flex flex-col md:hidden p-5 gap-4">
						<div className="text-xl font-bold tracking-wider text-[#e8b84b]">SUSHEELA</div>
						<img
							src={susheelaImg}
							alt="Susheela"
							className="w-full h-56 rounded-xl object-cover object-top"
						/>
						{bio}
						<button
							onClick={handleSelect}
							className="w-full py-2.5 rounded-xl bg-[#e8b84b] text-[#0e1e3f] text-sm font-bold hover:bg-[#f5c842] transition-colors"
						>
							{t('Start Game', 'ಆಟ ಪ್ರಾರಂಭಿಸಿ')}
						</button>
					</div>

					{/* Desktop layout: info left, image + button right */}
					<div className="hidden md:flex items-stretch p-5 gap-5">
						<div className="flex-1">
							<div className="text-xl font-bold tracking-wider text-[#e8b84b] mb-3">SUSHEELA</div>
							{bio}
						</div>
						<div className="flex flex-col items-center justify-between w-32 flex-shrink-0">
							<img
								src={susheelaImg}
								alt="Susheela"
								className="w-28 h-36 rounded-xl object-cover object-top"
							/>
							<button
								onClick={handleSelect}
								className="mt-4 w-full py-2.5 rounded-xl bg-[#e8b84b] text-[#0e1e3f] text-sm font-bold hover:bg-[#f5c842] transition-colors"
							>
								{t('Start Game', 'ಆಟ ಪ್ರಾರಂಭಿಸಿ')}
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default AvatarSelectionScreen;
