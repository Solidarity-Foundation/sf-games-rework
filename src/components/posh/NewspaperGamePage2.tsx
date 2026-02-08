import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import solidarityLogo from '@/assets/solidarity-logo-only.png';
import gameData from '@/components/posh/gamedata.json';

type Lang = 'en' | 'kan';

interface NewspaperGamePage2Props {
	currentPage?: number;
	totalQuestions?: number;
}

const NewspaperGamePage2 = ({
	currentPage = 2,
	totalQuestions = 10,
}: NewspaperGamePage2Props) => {
	const navigate = useNavigate();
	const questionsPerPage = 4;
	const totalPages = Math.ceil(totalQuestions / questionsPerPage);

	const questions = gameData.questions.slice(3, 7);

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

	const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
		try {
			const stored = localStorage.getItem('posh-page-2-answers');
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		localStorage.setItem('posh-page-2-answers', JSON.stringify(selectedAnswers));
	}, [selectedAnswers]);

	const handleSelect = (questionId: number, optionIndex: number) => {
		if (selectedAnswers[questionId] !== undefined) return;
		setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
	};

	const otherAnswers: Record<number, number> = (() => {
		const combined: Record<number, number> = {};
		['posh-page-1-answers', 'posh-page-3-answers'].forEach((key) => {
			try {
				const stored = localStorage.getItem(key);
				if (stored) Object.assign(combined, JSON.parse(stored));
			} catch { /* ignore */ }
		});
		return combined;
	})();
	const allAnswers = { ...otherAnswers, ...selectedAnswers };
	const totalEarned = gameData.questions.reduce((sum, q) => {
		const sel = allAnswers[q.id];
		return sel !== undefined ? sum + q.options[sel].poshPoints : sum;
	}, 0);
	const totalAttempted = Object.keys(allAnswers).length;
	const currentScore = 10 + totalEarned;
	const remaining = gameData.questions.length - totalAttempted;
	const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

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
								<div className="absolute right-0 flex flex-col sm:flex-row gap-1 newspaper-body text-xs">
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
							<div className="mx-4 border-t-4 border-foreground" />
							<div className="mx-4 border-t border-foreground mt-0.5" />

							<div className="px-4 py-4">
								{/* Top row: Q4 | Q5 */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
									<div className="md:newspaper-column-rule md:pr-5">
										<QuestionArticle
											question={questions[0]}
											lang={lang}
											selectedAnswer={selectedAnswers[questions[0].id] ?? null}
											isAnswered={selectedAnswers[questions[0].id] !== undefined}
											onSelect={(i) => handleSelect(questions[0].id, i)}
										/>
									</div>
									<div className="md:pl-5 mt-6 md:mt-0">
										<QuestionArticle
											question={questions[1]}
											lang={lang}
											selectedAnswer={selectedAnswers[questions[1].id] ?? null}
											isAnswered={selectedAnswers[questions[1].id] !== undefined}
											onSelect={(i) => handleSelect(questions[1].id, i)}
										/>
									</div>
								</div>

								<div className="border-t border-foreground my-4" />

								{/* Bottom row: Q6 | Q7 */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
									<div className="md:newspaper-column-rule md:pr-5">
										<QuestionArticle
											question={questions[2]}
											lang={lang}
											selectedAnswer={selectedAnswers[questions[2].id] ?? null}
											isAnswered={selectedAnswers[questions[2].id] !== undefined}
											onSelect={(i) => handleSelect(questions[2].id, i)}
										/>
									</div>
									<div className="md:pl-5 mt-6 md:mt-0">
										<QuestionArticle
											question={questions[3]}
											lang={lang}
											selectedAnswer={selectedAnswers[questions[3].id] ?? null}
											isAnswered={selectedAnswers[questions[3].id] !== undefined}
											onSelect={(i) => handleSelect(questions[3].id, i)}
										/>
									</div>
								</div>

								{/* Bottom rule */}
								<div className="border-t border-foreground mt-6 mb-4" />

								{/* Game Statistics */}
								<div className="mb-4">
									<div className="border-t-2 border-foreground mb-2" />
									<h3 className="newspaper-headline text-xl font-bold text-foreground mb-3">
										{lang === 'kan' ? 'ಆಟದ ಅಂಕಿಅಂಶಗಳು' : 'Game Statistics'}
									</h3>
									<div className="border-t border-foreground mb-3" />
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
												{lang === 'kan' ? 'ಪ್ರಸ್ತುತ ಅಂಕಗಳು' : 'Current Score'}
											</p>
											<p className="newspaper-headline text-3xl font-bold text-foreground">{currentScore}</p>
										</div>
										<div>
											<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
												{lang === 'kan' ? 'ಪ್ರಯತ್ನಿಸಿದೆ' : 'Attempted'}
											</p>
											<p className="newspaper-headline text-3xl font-bold text-foreground">{totalAttempted}</p>
										</div>
										<div>
											<p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
												{lang === 'kan' ? 'ಉಳಿದಿರುವುದು' : 'Remaining'}
											</p>
											<p className="newspaper-headline text-3xl font-bold text-foreground">{remaining}</p>
										</div>
									</div>
								</div>

								{/* Navigation Buttons */}
								<div className="border-t border-foreground pt-4 pb-2 flex justify-between items-center">
									<button
										onClick={() => navigate('/posh/page-1')}
										className="newspaper-headline text-sm sm:text-base font-bold tracking-wider uppercase px-6 py-2 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200">
										{lang === 'kan' ? 'ಹಿಂದಿನ ಪುಟ' : 'Previous Page'}
									</button>

									<p className="newspaper-body text-xs text-muted-foreground tracking-widest uppercase">
										Page {currentPage} of {totalPages}
									</p>

									<button
										disabled={!allAnswered}
										onClick={() => navigate('/posh/page-3')}
										className={`newspaper-headline text-sm sm:text-base font-bold tracking-wider uppercase px-6 py-2 border-2 border-foreground transition-colors duration-200 ${allAnswered ? 'bg-foreground text-primary-foreground hover:bg-background hover:text-foreground' : 'bg-foreground/40 text-primary-foreground cursor-not-allowed'}`}>
										{lang === 'kan' ? 'ಮುಂದಿನ ಪುಟ' : 'Next Page'}
									</button>
								</div>

								{/* Footer */}
								<div className="border-t border-foreground pt-2 mt-2 text-center">
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

/* --- Sub-components --- */

interface QuestionOption {
	text: string;
	text_kan: string;
	feedback: string;
	feedback_kan: string;
	poshPoints: number;
}

interface QuestionData {
	id: number;
	title: string;
	title_kan: string;
	description: string;
	description_kan: string;
	question: string;
	question_kan: string;
	options: QuestionOption[];
}

interface QuestionProps {
	question: QuestionData;
	lang: Lang;
	selectedAnswer: number | null;
	isAnswered: boolean;
	onSelect: (optionIndex: number) => void;
}

const OptionList = ({
	options,
	lang,
	selectedAnswer,
	isAnswered,
	onSelect,
}: {
	options: QuestionOption[];
	lang: Lang;
	selectedAnswer: number | null;
	isAnswered: boolean;
	onSelect: (i: number) => void;
}) => {
	const selected = selectedAnswer !== null ? options[selectedAnswer] : null;
	return (
		<div className="mt-3 space-y-1.5">
			{options.map((option, i) => (
				<button
					key={i}
					disabled={isAnswered}
					onClick={() => onSelect(i)}
					className={`w-full text-left text-sm px-3 py-2 border newspaper-body leading-snug transition-colors duration-150 ${
						selectedAnswer === i
							? 'bg-foreground text-background border-foreground'
							: isAnswered
								? 'bg-background text-muted-foreground border-foreground/30 opacity-50 cursor-not-allowed'
								: 'bg-background border-foreground/20 hover:bg-foreground/10'
					}`}>
					<span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span>
					{lang === 'kan' ? option.text_kan : option.text}
				</button>
			))}
			{selected && (
				<div
					className={`mt-2 border px-3 py-2 newspaper-body text-sm ${selected.poshPoints > 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
					<p className="text-foreground leading-snug">{lang === 'kan' ? selected.feedback_kan : selected.feedback}</p>
					<p className={`mt-1 font-bold text-base ${selected.poshPoints > 0 ? 'text-green-600' : 'text-red-600'}`}>
						{selected.poshPoints > 0 ? `+${selected.poshPoints} point` : `${selected.poshPoints} point`}
					</p>
				</div>
			)}
		</div>
	);
};

const QuestionArticle = ({ question, lang, selectedAnswer, isAnswered, onSelect }: QuestionProps) => (
	<div>
		<h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
			{lang === 'kan' ? question.title_kan : question.title}
		</h3>
		<div className="border-t border-foreground mb-3" />

		<div className="border border-foreground bg-newspaper-aged w-full aspect-[16/9] flex items-center justify-center mb-3">
			<span className="text-xs text-muted-foreground italic tracking-wide">— Image —</span>
		</div>

		<div className="text-sm leading-relaxed text-justify-newspaper text-muted-foreground">
			<p className="mb-2">{lang === 'kan' ? question.description_kan : question.description}</p>
			{question.question && (
				<p className="font-semibold text-foreground">{lang === 'kan' ? question.question_kan : question.question}</p>
			)}
		</div>

		<OptionList
			options={question.options}
			lang={lang}
			selectedAnswer={selectedAnswer}
			isAnswered={isAnswered}
			onSelect={onSelect}
		/>
	</div>
);

export default NewspaperGamePage2;
