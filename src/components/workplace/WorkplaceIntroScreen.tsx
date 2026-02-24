import { useNavigate } from 'react-router-dom';
import { Home, Building2, Briefcase, MapPin, Star, Lock, CheckCircle } from 'lucide-react';
import { useWorkplaceStore } from './workplaceStore';

const WorkplaceIntroScreen = () => {
  const navigate = useNavigate();
  const { language, setLanguage, startGame } = useWorkplaceStore();

  const t = {
    title: language === 'kan' ? 'ಕಾರ್ಯಸ್ಥಳ ಶಿಷ್ಟಾಚಾರ ಸ್ಪರ್ಧೆ' : 'Workplace Etiquette Challenge',
    companyName: language === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್' : 'Tasty Bites Foods',
    welcome: language === 'kan'
      ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ಸ್‌ಗೆ ಸ್ವಾಗತ! ನಮ್ಮ ಪ್ಯಾಕೇಜ್ಡ್ ಸ್ನ್ಯಾಕ್ಸ್ ಕಂಪನಿಯಲ್ಲಿ ನಿಮ್ಮ ಮೊದಲ ದಿನ ಪ್ರಾರಂಭವಾಗಿದೆ. ಕಚೇರಿಯ ಮೂಲಕ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ ಮತ್ತು ನೈಜ ಸನ್ನಿವೇಶಗಳನ್ನು ನಿಭಾಯಿಸುವ ಮೂಲಕ ಮಹತ್ವದ ಕಾರ್ಯಸ್ಥಳ ಶಿಷ್ಟಾಚಾರವನ್ನು ಕಲಿಯಿರಿ.'
      : "Welcome to Tasty Bites Foods! You're starting your first day at our packaged snacks company. Navigate through the office and learn important workplace etiquette by handling real scenarios.",
    rulesTitle: language === 'kan' ? 'ಆಟದ ನಿಯಮಗಳು' : 'How to Play',
    rule1: language === 'kan' ? '10 ಕೊಠಡಿಗಳಿವೆ, ಪ್ರತಿಯೊಂದರಲ್ಲೂ ಒಂದು ಸನ್ನಿವೇಶ ಇದೆ' : '10 rooms, each with a real workplace scenario',
    rule2: language === 'kan' ? 'ಕೊಠಡಿಗಳು ಒಂದೊಂದಾಗಿ ಅನ್ಲಾಕ್ ಆಗುತ್ತವೆ' : 'Rooms unlock one at a time as you progress',
    rule3: language === 'kan' ? 'ಸರಿಯಾದ ಉತ್ತರ: +1 ಅಂಕ · ತಪ್ಪಾದ ಉತ್ತರ: −1 ಅಂಕ' : 'Correct answer: +1 point · Wrong answer: −1 point',
    rule4: language === 'kan' ? '10 ಅಂಕಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ' : 'Start with 10 points',
    startBtn: language === 'kan' ? 'ಆಟ ಪ್ರಾರಂಭಿಸಿ' : 'Start Game',
    footer: language === 'kan' ? '© ಸೋಲಿಡಾರಿಟಿ ಫೌಂಡೇಶನ್' : '© Solidarity Foundation',
    illustrationAlt: language === 'kan' ? 'ಕಚೇರಿ ಚಿತ್ರ' : 'Office illustration',
    logoAlt: language === 'kan' ? 'ಕಂಪನಿ ಲೋಗೋ' : 'Company logo',
  };

  const handleStart = () => {
    startGame();
    navigate('/workplace-etiquette/game');
  };

  return (
    <div className="min-h-screen bg-[#dce8f5] flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 flex items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => navigate('/')}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Home"
        >
          <Home size={20} className="text-gray-700" />
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#3b6fa0] via-[#5b9fd0] to-[#3b6fa0]" />

          <div className="p-6 sm:p-8">
            {/* Logo placeholder + Language toggle */}
            <div className="flex items-start justify-between mb-5">
              {/* Company logo placeholder */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#dce8f5] rounded-xl flex items-center justify-center border-2 border-[#a8c8e8]">
                  <Building2 size={28} className="text-[#3b6fa0]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Company</p>
                  <p className="text-sm font-semibold text-gray-700">{t.companyName}</p>
                </div>
              </div>

              {/* Language toggle */}
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${
                    language === 'en'
                      ? 'bg-[#3b6fa0] text-white border-[#3b6fa0]'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-[#3b6fa0] hover:text-[#3b6fa0]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('kan')}
                  className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${
                    language === 'kan'
                      ? 'bg-[#3b6fa0] text-white border-[#3b6fa0]'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-[#3b6fa0] hover:text-[#3b6fa0]'
                  }`}
                >
                  ಕನ್ನಡ
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight mb-2">
              {t.title}
            </h1>

            {/* Location tag */}
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-5">
              <MapPin size={12} />
              <span>Bengaluru, Karnataka</span>
            </div>

            {/* Office illustration placeholder */}
            <div className="w-full h-40 sm:h-48 bg-[#dce8f5] rounded-xl border-2 border-dashed border-[#a8c8e8] flex flex-col items-center justify-center mb-5 text-[#3b6fa0]">
              <Briefcase size={40} className="mb-2 opacity-60" />
              <p className="text-sm font-medium opacity-60">{t.illustrationAlt}</p>
            </div>

            {/* Welcome text */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
              {t.welcome}
            </p>

            {/* How to play */}
            <div className="bg-[#f0f7ff] rounded-xl p-4 mb-6 border border-[#c8ddf0]">
              <h2 className="text-sm font-semibold text-[#3b6fa0] uppercase tracking-wider mb-3">
                {t.rulesTitle}
              </h2>
              <ul className="space-y-2">
                {[
                  { icon: MapPin, text: t.rule1 },
                  { icon: Lock, text: t.rule2 },
                  { icon: Star, text: t.rule3 },
                  { icon: CheckCircle, text: t.rule4 },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Icon size={14} className="text-[#3b6fa0] mt-0.5 flex-shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              className="w-full py-3 px-6 bg-[#3b6fa0] hover:bg-[#2d5a87] text-white font-bold text-lg rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {t.startBtn} →
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-4">{t.footer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceIntroScreen;
