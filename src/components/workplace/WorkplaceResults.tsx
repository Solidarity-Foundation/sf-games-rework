import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, BookOpen } from 'lucide-react';
import { useWorkplaceStore } from './workplaceStore';
import groupPhoto from '@/assets/workplace/group-photo.webp';
import { calculateWorkplaceLevel } from './resultlevels';
import { saveGameSession } from '@/lib/db';
import gamedata from './gamedata.json';

const TAKEAWAYS_EN = [
	'Cultural sensitivity promotes team inclusion',
	'Clear communication prevents misunderstandings',
	'Accountability builds trust and credibility',
	'Respectful interruptions maintain meeting flow',
	'Professional greetings create positive impressions',
	'Body language communicates as much as words',
	'Addressing conflicts promptly prevents escalation',
];

const TAKEAWAYS_KAN = [
	'ಸಾಂಸ್ಕೃತಿಕ ಸಂವೇದನಶೀಲತೆ ತಂಡದ ಒಳಗೊಳ್ಳುವಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ',
	'ಸ್ಪಷ್ಟ ಸಂವಹನ ತಪ್ಪುತಿಳುವಳಿಕೆಗಳನ್ನು ತಡೆಗಟ್ಟುತ್ತದೆ',
	'ಉತ್ತರದಾಯಿತ್ವ ವಿಶ್ವಾಸ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ',
	'ಗೌರವಾನ್ವಿತ ಮಧ್ಯಪ್ರವೇಶಗಳು ಸಭೆಯ ಹರಿವನ್ನು ಕಾಪಾಡುತ್ತವೆ',
	'ವೃತ್ತಿಪರ ಶುಭಾಶಯಗಳು ಉತ್ತಮ ಅಭಿಪ್ರಾಯ ಮೂಡಿಸುತ್ತವೆ',
	'ದೇಹ ಭಾಷೆ ಮಾತಿನಷ್ಟೇ ಅಭಿವ್ಯಕ್ತಿಸುತ್ತದೆ',
	'ಸಂಘರ್ಷಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಬಗೆಹರಿಸುವುದು ಉಲ್ಬಣವನ್ನು ತಡೆಗಟ್ಟುತ್ತದೆ',
];

const WorkplaceResults = () => {
	const navigate = useNavigate();
	const { score, answers, completedRooms, language, resetGame } = useWorkplaceStore();

	const lang = language;
	const result = calculateWorkplaceLevel(score);

	// Save to Appwrite once on mount — ref guards against StrictMode double-fire
	const savedRef = useRef(false);
	useEffect(() => {
		if (savedRef.current) return;
		savedRef.current = true;

		const answersList = Object.entries(answers).map(([qId, answerIndex]) => {
			const question = gamedata.questions.find((q) => q.id === Number(qId))!;
			return {
				questionId: Number(qId),
				answerIndex,
				pointsEarned: question.options[answerIndex].workplacePoints,
			};
		});

		saveGameSession({
			gameId: 'workplace-etiquette',
			totalQuestions: gamedata.questions.length,
			questionsAnswered: completedRooms.length,
			score,
			level: result.level,
			answers: answersList,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const isPerfect = score > 19;
	const takeaways = lang === 'kan' ? TAKEAWAYS_KAN : TAKEAWAYS_EN;

	// Score-appropriate company message
	const companyMessage = (() => {
		if (score > 19)
			return {
				en: "You're now ready to be part of our team at Tasty Bites Foods! You've demonstrated exceptional understanding of professional workplace etiquette. We're proud to have you!",
				kan: 'ನೀವು ಈಗ ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್‌ನ ತಂಡದ ಭಾಗವಾಗಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಿ! ವೃತ್ತಿಪರ ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಅಸಾಧಾರಣ ಗ್ರಹಿಕೆಯನ್ನು ನೀವು ಪ್ರದರ್ಶಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಬಗ್ಗೆ ನಮಗೆ ಹೆಮ್ಮೆ ಇದೆ!',
			};
		if (score >= 10)
			return {
				en: "You're well on your way to joining the Tasty Bites Foods team! A solid understanding of workplace etiquette — keep building on it and you'll be an expert in no time.",
				kan: 'ನೀವು ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್ ತಂಡಕ್ಕೆ ಸೇರಲು ಉತ್ತಮ ದಾರಿಯಲ್ಲಿದ್ದೀರಿ! ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಗಟ್ಟಿಯಾದ ತಿಳುವಳಿಕೆ ಇದೆ — ಮುಂದುವರಿಸಿ, ಶೀಘ್ರದಲ್ಲೇ ತಜ್ಞರಾಗುವಿರಿ.',
			};
		if (score > 0)
			return {
				en: "There's still more to learn before you're fully ready for the Tasty Bites team. Keep practicing — workplace etiquette takes time, and we believe in you!",
				kan: 'ನೀವು ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ತಂಡಕ್ಕೆ ಸಂಪೂರ್ಣ ಸಿದ್ಧರಾಗಲು ಇನ್ನಷ್ಟು ಕಲಿಯಬೇಕಿದೆ. ಅಭ್ಯಾಸ ಮುಂದುವರಿಸಿ — ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರಕ್ಕೆ ಸಮಯ ಬೇಕು, ನಮಗೆ ನಿಮ್ಮ ಮೇಲೆ ವಿಶ್ವಾಸ ಇದೆ!',
			};
		return {
			en: "It looks like workplace etiquette is a new area for you — and that's okay! We encourage you to play again. Our team is rooting for you to grow.",
			kan: 'ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರ ನಿಮಗೆ ಹೊಸ ವಿಷಯ ಅನ್ನಿಸುತ್ತದೆ — ಅದು ಸರಿಯೇ! ಮತ್ತೆ ಆಡಲು ನಾವು ನಿಮ್ಮನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ. ನಮ್ಮ ತಂಡ ನಿಮ್ಮ ಬೆಳವಣಿಗೆಗೆ ಬೆಂಬಲಿಸುತ್ತಿದೆ.',
		};
	})();

	const companyMessageAuthor =
		score >= 10
			? lang === 'kan'
				? '— ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್ ತಂಡದಿಂದ'
				: '— From all of us at Tasty Bites Foods'
			: lang === 'kan'
				? '— ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ತರಬೇತಿ ತಂಡ'
				: '— Tasty Bites Training Team';

	const handlePlayAgain = () => {
		resetGame();
		navigate('/workplace-etiquette');
	};

	const handleReviewAnswers = () => {
		navigate('/workplace-etiquette/review');
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ background: 'linear-gradient(160deg, #fff8f0 0%, #fef3e2 40%, #e8f4fb 100%)' }}>
			{/* Header */}
			<header
				className="sticky top-0 z-10 shadow-md"
				style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f48c06 50%, #faa307 100%)' }}>
				<div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full">
					<button
						onClick={() => navigate('/')}
						className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
						aria-label="Home">
						<Home size={18} className="text-white" />
					</button>
					<div className="text-center">
						<h1 className="text-base font-bold text-white tracking-wide font-sans">
							{lang === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ ಆಫೀಸ್' : 'Tasty Bites Food Office'}
						</h1>
						<p className="text-xs text-orange-100 font-sans">
							{lang === 'kan' ? 'ಉತ್ತಮ ತಂಡ. ಉತ್ತಮ ರುಚಿ.' : 'Great Team. Great Taste.'}
						</p>
					</div>
					<div className="w-9" />
				</div>
			</header>

			<main className="flex-1 overflow-auto">
				<div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
					{/* Congratulations / Completion banner */}
					<div className="text-center">
						<p className="text-3xl mb-1">{score >= 10 ? '🎉' : score > 0 ? '👍' : '💪'}</p>
						<h2 className="text-2xl font-bold font-sans text-orange-900 leading-tight">
							{score >= 10
								? lang === 'kan'
									? 'ಅಭಿನಂದನೆಗಳು!'
									: 'Congratulations!'
								: score > 0
									? lang === 'kan'
										? 'ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ದೀರಿ!'
										: 'Good Effort!'
									: lang === 'kan'
										? 'ಪ್ರಯತ್ನಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ!'
										: 'Thanks for Playing!'}
						</h2>
						<p className="text-sm text-gray-600 font-sans mt-1">
							{lang === 'kan'
								? 'ನೀವು ಎಲ್ಲಾ ಕೆಲಸದ ಸ್ಥಳದ ಸನ್ನಿವೇಶಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ!'
								: "You've Completed All Workplace Scenarios!"}
						</p>
					</div>

					{/* Celebration illustration */}
					<div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
						<img src={groupPhoto} alt="Welcome to the Tasty Bites Team!" className="w-full h-auto block" />
						<div
							className="px-4 py-3 flex items-center justify-center"
							style={{ background: 'linear-gradient(90deg, #e85d04, #faa307)' }}>
							<p className="text-center text-white font-bold font-sans text-base">
								{lang === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ತಂಡಕ್ಕೆ ಸ್ವಾಗತ!' : 'Welcome to the Tasty Bites Team!'}
							</p>
						</div>
					</div>

					{/* YOUR RESULTS */}
					<div className="bg-white rounded-2xl border border-orange-100 shadow-sm px-5 py-4">
						<h3 className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans mb-3">
							{lang === 'kan' ? 'ನಿಮ್ಮ ಫಲಿತಾಂಶ' : 'Your Results'}
						</h3>

						<div className="flex items-center gap-4">
							<div
								className="flex flex-col items-center justify-center w-20 h-20 rounded-full shrink-0 border-4 border-orange-200"
								style={{ background: 'linear-gradient(135deg, #fff8f0, #fef3e2)' }}>
								<span className="text-2xl font-bold text-orange-600 font-sans leading-none">{score}</span>
								<span className="text-xs text-gray-400 font-sans">{lang === 'kan' ? 'ಅಂಕ' : 'pts'}</span>
							</div>
							<div>
								<p className="font-bold text-orange-900 font-sans text-base">
									{lang === 'kan' ? result.level_kan : result.level}
								</p>
								<p className="text-xs text-gray-500 font-sans mt-1 leading-snug">
									{lang === 'kan' ? result.message_kan : result.message}
								</p>
								{isPerfect && <p className="text-base mt-1">⭐⭐⭐⭐⭐</p>}
							</div>
						</div>
					</div>

					{/* KEY TAKEAWAYS */}
					<div className="bg-white rounded-2xl border border-green-100 shadow-sm px-5 py-4">
						<h3 className="text-xs font-bold text-green-600 uppercase tracking-widest font-sans mb-3">
							{lang === 'kan' ? 'ನೀವು ಕಲಿತ ಪ್ರಮುಖ ಅಂಶಗಳು' : "Key Takeaways You've Learned"}
						</h3>
						<div className="space-y-2">
							{takeaways.map((item, i) => (
								<div key={i} className="flex items-start gap-2">
									<span className="text-green-500 font-bold text-sm shrink-0 mt-0.5">✓</span>
									<p className="text-gray-700 font-sans text-sm leading-snug">{item}</p>
								</div>
							))}
						</div>
					</div>

					{/* Company message — score-aware */}
					<div
						className="rounded-2xl px-5 py-4"
						style={{ background: 'linear-gradient(135deg, #fff8f0, #fef3e2)', border: '1px solid #fed7aa' }}>
						<p className="text-gray-700 font-sans text-sm leading-relaxed italic">
							"{lang === 'kan' ? companyMessage.kan : companyMessage.en}"
						</p>
						<p className="text-orange-600 font-sans text-xs font-semibold mt-2">{companyMessageAuthor}</p>
					</div>

					{/* Action buttons */}
					<div className="flex flex-col gap-3 pb-8">
						<button
							onClick={handleReviewAnswers}
							className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold font-sans text-sm border-2 border-orange-400 text-orange-600 bg-white hover:bg-orange-50 transition-colors shadow-sm">
							<BookOpen size={16} />
							{lang === 'kan' ? 'ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ' : 'Review Answers'}
						</button>
						<button
							onClick={handlePlayAgain}
							className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold font-sans text-sm text-white shadow-md transition-opacity hover:opacity-90"
							style={{ background: 'linear-gradient(90deg, #e85d04, #faa307)' }}>
							<RotateCcw size={16} />
							{lang === 'kan' ? 'ಮತ್ತೆ ಆಡಿ' : 'Restart Game'}
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default WorkplaceResults;
