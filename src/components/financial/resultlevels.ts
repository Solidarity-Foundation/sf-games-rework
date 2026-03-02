export interface FinancialLevel {
	level: string;
	level_kan: string;
	description: string;
	description_kan: string;
	color: string;
}

export function getFinancialLevel(score: number, houseAchieved: boolean): FinancialLevel {
	if (score >= 240) {
		if (houseAchieved)
			return {
				level: 'Financial Champion',
				level_kan: 'ಆರ್ಥಿಕ ಚಾಂಪಿಯನ್',
				description: 'Outstanding financial decisions across all scenarios.',
				description_kan: 'ಎಲ್ಲಾ ಸನ್ನಿವೇಶಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳು.',
				color: '#ffd700',
			};
		return {
			level: 'Financial Champion — No Retirement Home',
			level_kan: 'ಆರ್ಥಿಕ ಚಾಂಪಿಯನ್ — ನಿವೃತ್ತಿ ಮನೆ ಇಲ್ಲ',
			description: 'Outstanding financial decisions — but Susheela never secured land for her retirement home. Financial strength alone is not complete security.',
			description_kan: 'ಅತ್ಯುತ್ತಮ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳು — ಆದರೆ ನಿವೃತ್ತಿ ಮನೆಗಾಗಿ ಭೂಮಿ ಭದ್ರಪಡಿಸಲಿಲ್ಲ. ಆರ್ಥಿಕ ಶಕ್ತಿ ಮಾತ್ರ ಪೂರ್ಣ ಭದ್ರತೆಯಲ್ಲ.',
			color: '#ffd700',
		};
	}
	if (score >= 160) {
		if (houseAchieved)
			return {
				level: 'Wise Investor',
				level_kan: 'ಜ್ಞಾನಿ ಹೂಡಿಕೆದಾರ',
				description: 'Thoughtful planning with good long-term vision.',
				description_kan: 'ಒಳ್ಳೆಯ ದೀರ್ಘಕಾಲೀನ ದೃಷ್ಟಿಯೊಂದಿಗೆ ವಿಚಾರಶೀಲ ಯೋಜನೆ.',
				color: '#4ade80',
			};
		return {
			level: 'Wise Investor — No Retirement Home',
			level_kan: 'ಜ್ಞಾನಿ ಹೂಡಿಕೆದಾರ — ನಿವೃತ್ತಿ ಮನೆ ಇಲ್ಲ',
			description: 'Thoughtful planning with good long-term vision — but Susheela\'s retirement home goal was never fulfilled.',
			description_kan: 'ಒಳ್ಳೆಯ ದೀರ್ಘಕಾಲೀನ ದೃಷ್ಟಿಯೊಂದಿಗೆ ವಿಚಾರಶೀಲ ಯೋಜನೆ — ಆದರೆ ನಿವೃತ್ತಿ ಮನೆ ಗುರಿ ಈಡೇರಲಿಲ್ಲ.',
			color: '#4ade80',
		};
	}
	if (score >= 80) {
		if (houseAchieved)
			return {
				level: 'Steady Planner',
				level_kan: 'ಸ್ಥಿರ ಯೋಜಕ',
				description: 'Building financial habits with room to grow.',
				description_kan: 'ಬೆಳೆಯಲು ಅವಕಾಶವಿರುವ ಆರ್ಥಿಕ ಅಭ್ಯಾಸಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದಾರೆ.',
				color: '#fb923c',
			};
		return {
			level: 'Steady Planner — No Retirement Home',
			level_kan: 'ಸ್ಥಿರ ಯೋಜಕ — ನಿವೃತ್ತಿ ಮನೆ ಇಲ್ಲ',
			description: 'Building financial habits with room to grow — and Susheela\'s retirement home remains a dream unfulfilled.',
			description_kan: 'ಬೆಳೆಯಲು ಅವಕಾಶವಿರುವ ಆರ್ಥಿಕ ಅಭ್ಯಾಸಗಳು — ಮತ್ತು ನಿವೃತ್ತಿ ಮನೆ ಇನ್ನೂ ಕನಸಾಗಿಯೇ ಉಳಿದಿದೆ.',
			color: '#fb923c',
		};
	}
	if (houseAchieved)
		return {
			level: 'Learning the Ropes',
			level_kan: 'ಕಲಿಯುತ್ತಿದ್ದಾರೆ',
			description: 'Every mistake is a lesson. Keep going!',
			description_kan: 'ಪ್ರತಿ ತಪ್ಪೂ ಒಂದು ಪಾಠ. ಮುಂದುವರಿಯಿರಿ!',
			color: '#f87171',
		};
	return {
		level: 'Learning the Ropes — No Retirement Home',
		level_kan: 'ಕಲಿಯುತ್ತಿದ್ದಾರೆ — ನಿವೃತ್ತಿ ಮನೆ ಇಲ್ಲ',
		description: 'Every mistake is a lesson — including the reminder that securing a home for retirement needs early attention.',
		description_kan: 'ಪ್ರತಿ ತಪ್ಪೂ ಒಂದು ಪಾಠ — ನಿವೃತ್ತಿಗಾಗಿ ಮನೆ ಮೊದಲೇ ಭದ್ರಪಡಿಸುವ ಅಗತ್ಯವೂ ಸೇರಿ.',
		color: '#f87171',
	};
}
