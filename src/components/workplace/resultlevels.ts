export interface WorkplaceLevel {
  level: string;
  level_kan: string;
  message: string;
  message_kan: string;
}

export function calculateWorkplaceLevel(total: number): WorkplaceLevel {
  if (total > 19) {
    return {
      level: 'Workplace Etiquette Champion',
      level_kan: 'ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಚಾಂಪಿಯನ್',
      message: 'Congratulations! You have a deep understanding of workplace etiquette.',
      message_kan:
        'ಅಭಿನಂದನೆಗಳು! ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಬಗ್ಗೆ ನಿಮಗೆ ಆಳವಾದ ತಿಳುವಳಿಕೆ ಇದೆ.',
    };
  } else if (total >= 10) {
    return {
      level: 'Workplace Etiquette Leader',
      level_kan: 'ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ನಾಯಕ',
      message: "You're doing well! Keep learning to become a Workplace Etiquette Champion.",
      message_kan:
        'ನೀವು ಚೆನ್ನಾಗಿದ್ದೀರಿ! ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಚಾಂಪಿಯನ್ ಆಗಲು ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ.',
    };
  } else if (total > 0) {
    return {
      level: 'Workplace Etiquette Learner',
      level_kan: 'ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಕಲಿಕಾರ',
      message:
        'You have a good start but need to polish your Workplace Etiquette. Keep learning and growing.',
      message_kan:
        'ನೀವು ಉತ್ತಮ ಆರಂಭವನ್ನು ಹೊಂದಿದ್ದೀರಿ ಆದರೆ ನಿಮ್ಮ ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರವನ್ನು ಮೆರುಗುಗೊಳಿಸಬೇಕಾಗಿದೆ. ಕಲಿಯುತ್ತಿರಲಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರಲಿ.',
    };
  } else {
    return {
      level: 'Workplace Etiquette Beginner',
      level_kan: 'ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಪ್ರಾರಂಭಿಕ',
      message: "It's time to play again and learn more about Workplace Etiquette.",
      message_kan:
        'ಮತ್ತೆ ಆಟವಾಡಲು ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳದ ಶಿಷ್ಟಾಚಾರದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಇದು ಸಮಯ.',
    };
  }
}
