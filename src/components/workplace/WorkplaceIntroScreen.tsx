import { useNavigate } from 'react-router-dom';
import { Home, MapPin, Star, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { useWorkplaceStore } from './workplaceStore';
import tastyBitesLogo from '@/assets/workplace/tasty-bites-logomark-white.png';

const WorkplaceIntroScreen = () => {
	const navigate = useNavigate();
	const { language, setLanguage, startGame } = useWorkplaceStore();

	const handleStart = () => {
		startGame();
		navigate('/workplace-etiquette/game');
	};

	const lang = language;

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ background: 'linear-gradient(160deg, #fff8f0 0%, #fef3e2 40%, #e8f4fb 100%)' }}>
			{/* Header */}
			<header
				className="sticky top-0 z-10 shadow-md"
				style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f48c06 50%, #faa307 100%)' }}>
				<div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full gap-2">
					<button
						onClick={() => navigate('/')}
						className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors shrink-0"
						aria-label="Home">
						<Home size={18} className="text-white" />
					</button>
					<div className="text-center flex-1 min-w-0">
						<h1 className="text-base font-bold text-white tracking-wide leading-tight font-sans truncate">
							{lang === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ ಆಫೀಸ್' : 'Tasty Bites Food Office'}
						</h1>
						<p className="text-xs text-orange-100 font-sans">
							{lang === 'kan' ? 'ಉತ್ತಮ ತಂಡ. ಉತ್ತಮ ರುಚಿ.' : 'Great Team. Great Taste.'}
						</p>
					</div>
					{/* Language toggle */}
					<div className="flex shrink-0 rounded-lg overflow-hidden border border-white/40">
						<button
							onClick={() => setLanguage('en')}
							className={`px-2.5 py-1 text-xs font-bold font-sans transition-colors ${language === 'en' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}>
							EN
						</button>
						<button
							onClick={() => setLanguage('kan')}
							className={`px-2.5 py-1 text-xs font-bold font-sans transition-colors ${language === 'kan' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}>
							ಕನ್ನಡ
						</button>
					</div>
				</div>
			</header>

			{/* Main content */}
			<main className="flex-1 overflow-auto">
				<div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
					{/* Company branding card */}
					<div
						className="rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm"
						style={{ background: 'linear-gradient(90deg, #e85d04, #faa307)' }}>
						<div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
							<img src={tastyBitesLogo} alt="Tasty Bites Foods" className="w-10 h-10 object-contain" />
						</div>
						<div className="min-w-0">
							<p className="text-xs text-orange-100 font-sans uppercase tracking-widest">
								{lang === 'kan' ? 'ಕಂಪನಿ' : 'Company'}
							</p>
							<p className="text-lg font-bold text-white font-sans leading-tight">
								{lang === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್' : 'Tasty Bites Foods'}
							</p>
							<div className="flex items-center gap-1 mt-0.5">
								<MapPin size={11} className="text-orange-100" />
								<span className="text-xs text-orange-100 font-sans">Bengaluru, Karnataka</span>
							</div>
						</div>
					</div>

					{/* Title + challenge badge */}
					<div className="text-center px-2">
						<span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans mb-2">
							{lang === 'kan' ? 'ಕಾರ್ಯಸ್ಥಳ ಸ್ಪರ್ಧೆ' : 'Workplace Challenge'}
						</span>
						<h2 className="text-2xl font-bold text-orange-900 font-sans leading-tight">
							{lang === 'kan' ? 'ಕಾರ್ಯಸ್ಥಳ ಶಿಷ್ಟಾಚಾರ ಸ್ಪರ್ಧೆ' : 'Workplace Etiquette Challenge'}
						</h2>
					</div>

					{/* Welcome message card */}
					<div className="bg-white rounded-2xl border border-orange-100 shadow-sm px-5 py-4 space-y-3">
						<p className="text-sm text-gray-700 font-sans leading-relaxed">
							{lang === 'kan'
								? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್‌ಗೆ ಸ್ವಾಗತ! ನಮ್ಮ ಪ್ಯಾಕೇಜ್ಡ್ ಸ್ನ್ಯಾಕ್ಸ್ ಕಂಪನಿಯಲ್ಲಿ ನಿಮ್ಮ ಮೊದಲ ದಿನ ಪ್ರಾರಂಭವಾಗಿದೆ. ಕಚೇರಿಯ ಮೂಲಕ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ ಮತ್ತು ನೈಜ ಸನ್ನಿವೇಶಗಳನ್ನು ನಿಭಾಯಿಸುವ ಮೂಲಕ ಮಹತ್ವದ ಕಾರ್ಯಸ್ಥಳ ಶಿಷ್ಟಾಚಾರವನ್ನು ಕಲಿಯಿರಿ. ಗೌರವಾನ್ವಿತ, ಉತ್ಪಾದಕ ಮತ್ತು ಸಾಮರಸ್ಯದ ಕೆಲಸದ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸಲು ಅಗತ್ಯವಿರುವ ಅಗತ್ಯ ಕೌಶಲ್ಯಗಳನ್ನು ನೀವು ಇಲ್ಲಿ ಅನ್ವೇಷಿಸುವಿರಿ.'
								: "Welcome to Tasty Bites Foods! You're starting your first day at our packaged snacks company. Navigate through the office and learn important workplace etiquette by handling real scenarios — and pick up the essential skills needed to create a respectful, productive, and harmonious work environment."}
						</p>
						<p className="text-sm text-gray-700 font-sans leading-relaxed">
							{lang === 'kan'
								? 'ಪ್ರತಿ ಪ್ರಶ್ನೆಯನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳದ ಸಂಬಂಧಗಳ ಮೇಲೆ ವಿಭಿನ್ನ ನಡವಳಿಕೆಗಳ ಪ್ರಭಾವವನ್ನು ಪರಿಗಣಿಸಿ. ಗೌರವ, ವೃತ್ತಿಪರತೆ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಟೀಮ್‌ವರ್ಕ್ ಅನ್ನು ಉತ್ತೇಜಿಸುವ ಬಗ್ಗೆ ಯೋಚಿಸಿ ಮತ್ತು ಉತ್ತಮ ಕೆಲಸದ ಶಿಷ್ಟಾಚಾರವು ಎಲ್ಲರಿಗೂ ಪ್ರಯೋಜನವನ್ನು ನೀಡುತ್ತದೆ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ!'
								: 'Read each question carefully and consider the impact of different behaviors on workplace relationships. Think about what promotes respect, professionalism, and effective teamwork, and remember that good workplace etiquette benefits everyone!'}
						</p>
					</div>

					{/* How to play */}
					<div className="bg-white rounded-2xl border border-orange-100 shadow-sm px-5 py-4">
						<h3 className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans mb-3">
							{lang === 'kan' ? 'ಆಟದ ನಿಯಮಗಳು' : 'How to Play'}
						</h3>
						<ul className="space-y-2.5">
							{[
								{
									icon: MapPin,
									en: '10 rooms, each with a real workplace scenario',
									kan: '10 ಕೊಠಡಿಗಳಿವೆ, ಪ್ರತಿಯೊಂದರಲ್ಲೂ ಒಂದು ಸನ್ನಿವೇಶ ಇದೆ',
								},
								{
									icon: Lock,
									en: 'Rooms unlock one at a time as you progress',
									kan: 'ಕೊಠಡಿಗಳು ಒಂದೊಂದಾಗಿ ಅನ್ಲಾಕ್ ಆಗುತ್ತವೆ',
								},
								{
									icon: Star,
									en: 'Correct answer: +1 point · Wrong answer: −1 point',
									kan: 'ಸರಿಯಾದ ಉತ್ತರ: +1 ಅಂಕ · ತಪ್ಪಾದ ಉತ್ತರ: −1 ಅಂಕ',
								},
								{
									icon: CheckCircle,
									en: 'Start with 10 points — aim for the top!',
									kan: '10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ — ಅತ್ಯುತ್ತಮ ಗುರಿ ಇಡಿ!',
								},
							].map(({ icon: Icon, en, kan }, i) => (
								<li key={i} className="flex items-start gap-3">
									<span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
										<Icon size={13} className="text-orange-600" />
									</span>
									<span className="text-sm text-gray-700 font-sans leading-snug">{lang === 'kan' ? kan : en}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Start button */}
					<div className="pb-8">
						<button
							onClick={handleStart}
							className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold font-sans text-base text-white shadow-lg transition-opacity hover:opacity-90 active:scale-[0.98]"
							style={{
								background: 'linear-gradient(90deg, #e85d04, #faa307)',
								boxShadow: '0 4px 24px rgba(232,93,4,0.35)',
							}}>
							{lang === 'kan' ? 'ಆಟ ಪ್ರಾರಂಭಿಸಿ' : 'Start Game'}
							<ChevronRight size={20} />
						</button>
						<p className="text-center text-xs text-gray-400 font-sans mt-3">© Solidarity Foundation</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default WorkplaceIntroScreen;
