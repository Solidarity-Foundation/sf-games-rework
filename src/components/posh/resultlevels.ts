/**
 * Calculates the POSH (Prevention of Sexual Harassment) awareness level based on total points scored
 * @param {number} total - Total points scored in the quiz
 * @returns {object} Object containing level, level_kan, message, and message_kan
 */

interface PoshLevelConfig {
	champion?: number;
	leader?: number;
	learner?: number;
}

export function calculatePoshLevelWithConfig(total: number, config: PoshLevelConfig = {}) {
	// Default thresholds
	const thresholds = {
		champion: config.champion ?? 20,
		leader: config.leader ?? 10,
		learner: config.learner ?? 1,
		...config,
	};

	const levels = {
		champion: {
			level: 'PoSH Awareness Champion',
			level_kan: 'ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಚಾಂಪಿಯನ್',
			message: 'Congratulations! You have a deep understanding of PoSH policies.',
			message_kan: 'ಅಭಿನಂದನೆಗಳು! ನಿಮಗೆ PoSH ನೀತಿಗಳ ಬಗ್ಗೆ ಆಳವಾದ ತಿಳುವಳಿಕೆ ಇದೆ.',
		},
		leader: {
			level: 'PoSH Awareness Leader',
			level_kan: 'ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ನಾಯಕ',
			message: "You're doing well! Keep learning to become a PoSH Awareness Champion.",
			message_kan: 'ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ! PoSH ಜಾಗೃತಿ ಚಾಂಪಿಯನ್ ಆಗಲು ಕಲಿಯುತ್ತಿರಿ.',
		},
		learner: {
			level: 'PoSH Awareness Learner',
			level_kan: 'ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಕಲಿಕಾರ',
			message: 'You have a good start but need to polish your PoSH policies. Keep learning and growing.',
			message_kan:
				'ನೀವು ಉತ್ತಮ ಆರಂಭವನ್ನು ಹೊಂದಿದ್ದೀರಿ ಆದರೆ ನಿಮ್ಮ PoSH ನೀತಿಗಳನ್ನು ಮೆರುಗುಗೊಳಿಸಬೇಕಾಗಿದೆ. ಕಲಿಯುತ್ತಿರಲಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರಲಿ.',
		},
		beginner: {
			level: 'PoSH Awareness Beginner',
			level_kan: 'ಲೈಂಗಿಕ ಕಿರುಕುಳ ತಡೆಗಟ್ಟುವಿಕೆ ಪ್ರಾರಂಭಿಕ',
			message: "It's time to play again and learn more about PoSH policies.",
			message_kan: 'ಮತ್ತೊಮ್ಮೆ ಆಡಲು ಮತ್ತು PoSH ನೀತಿಗಳ ಕುರಿತು ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಇದು ಸಮಯ.',
		},
	};

	if (total >= thresholds.champion) {
		return levels.champion;
	} else if (total >= thresholds.leader) {
		return levels.leader;
	} else if (total >= thresholds.learner) {
		return levels.learner;
	} else {
		return levels.beginner;
	}
}
