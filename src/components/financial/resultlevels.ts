export interface FinancialLevel {
	level: string;
	level_kan: string;
	description: string;
	description_kan: string;
	color: string;
}

export function getFinancialLevel(score: number): FinancialLevel {
	if (score >= 240)
		return {
			level: 'Financial Champion',
			level_kan: 'ಆರ್ಥಿಕ ಚಾಂಪಿಯನ್',
			description: 'Outstanding financial decisions across all scenarios.',
			description_kan: 'ಎಲ್ಲಾ ಸನ್ನಿವೇಶಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳು.',
			color: '#ffd700',
		};
	if (score >= 160)
		return {
			level: 'Wise Investor',
			level_kan: 'ಜ್ಞಾನಿ ಹೂಡಿಕೆದಾರ',
			description: 'Thoughtful planning with good long-term vision.',
			description_kan: 'ಒಳ್ಳೆಯ ದೀರ್ಘಕಾಲೀನ ದೃಷ್ಟಿಯೊಂದಿಗೆ ವಿಚಾರಶೀಲ ಯೋಜನೆ.',
			color: '#4ade80',
		};
	if (score >= 80)
		return {
			level: 'Steady Planner',
			level_kan: 'ಸ್ಥಿರ ಯೋಜಕ',
			description: 'Building financial habits with room to grow.',
			description_kan: 'ಬೆಳೆಯಲು ಅವಕಾಶವಿರುವ ಆರ್ಥಿಕ ಅಭ್ಯಾಸಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದಾರೆ.',
			color: '#fb923c',
		};
	return {
		level: 'Learning the Ropes',
		level_kan: 'ಕಲಿಯುತ್ತಿದ್ದಾರೆ',
		description: 'Every mistake is a lesson. Keep going!',
		description_kan: 'ಪ್ರತಿ ತಪ್ಪೂ ಒಂದು ಪಾಠ. ಮುಂದುವರಿಯಿರಿ!',
		color: '#f87171',
	};
}
