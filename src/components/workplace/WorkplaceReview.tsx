import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useWorkplaceStore } from './workplaceStore';
import { ROOM_SEQUENCE } from './roomConfig';
import gamedata from './gamedata.json';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const WorkplaceReview = () => {
  const navigate = useNavigate();
  const { answers, language } = useWorkplaceStore();
  const lang = language;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #fff8f0 0%, #fef3e2 40%, #e8f4fb 100%)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 shadow-md"
        style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f48c06 50%, #faa307 100%)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full">
          <button
            onClick={() => navigate('/workplace-etiquette/results')}
            className="flex items-center gap-1 text-sm text-white font-medium font-sans bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{lang === 'kan' ? 'ಹಿಂದೆ' : 'Back'}</span>
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-white font-sans">
              {lang === 'kan' ? 'ಉತ್ತರ ಪರಿಶೀಲನೆ' : 'Answer Review'}
            </h1>
            <p className="text-xs text-orange-100 font-sans">
              {lang === 'kan' ? 'ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಫುಡ್ ಆಫೀಸ್' : 'Tasty Bites Food Office'}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            aria-label="Home"
          >
            <Home size={18} className="text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-5 pb-10 space-y-5">

          <p className="text-xs text-center text-gray-500 font-sans uppercase tracking-wide">
            {lang === 'kan' ? 'ನಿಮ್ಮ ಎಲ್ಲಾ 10 ಉತ್ತರಗಳು' : 'All 10 of your answers'}
          </p>

          {ROOM_SEQUENCE.map((room, idx) => {
            const question = gamedata.questions.find((q) => q.id === room.questionId);
            if (!question) return null;

            const selectedIdx = answers[room.questionId];
            const answered = selectedIdx !== undefined;
            const roomName = lang === 'kan' ? room.name_kan : room.name;
            const questionText = lang === 'kan' ? question.question_kan : question.question;
            const description = lang === 'kan' ? question.description_kan : question.description;

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
              >
                {/* Room header */}
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{ background: 'linear-gradient(90deg, #fff8f0, #fef3e2)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center font-sans shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-orange-900 font-sans">{roomName}</span>
                  </div>
                  {answered && (
                    question.options[selectedIdx].workplacePoints > 0
                      ? <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      : <XCircle size={18} className="text-red-400 shrink-0" />
                  )}
                </div>

                <div className="px-4 py-3 space-y-3">
                  {/* Description + question */}
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{description}</p>
                  <p className="text-sm font-semibold text-gray-800 font-sans">{questionText}</p>

                  {/* All options */}
                  <div className="space-y-2">
                    {question.options.map((opt, i) => {
                      const isSelected = selectedIdx === i;
                      const isCorrect = opt.workplacePoints > 0;
                      const optText = lang === 'kan' ? opt.text_kan : opt.text;
                      const feedbackText = lang === 'kan' ? opt.feedback_kan : opt.feedback;

                      let containerStyle = 'rounded-xl px-3 py-2.5 border ';
                      let badgeStyle = '';
                      let textStyle = 'text-gray-500';

                      if (isSelected && isCorrect) {
                        containerStyle += 'bg-green-50 border-green-300';
                        badgeStyle = 'bg-green-500 text-white';
                        textStyle = 'text-gray-800';
                      } else if (isSelected && !isCorrect) {
                        containerStyle += 'bg-red-50 border-red-300';
                        badgeStyle = 'bg-red-400 text-white';
                        textStyle = 'text-gray-800';
                      } else if (!isSelected && isCorrect && answered) {
                        // Show the correct answer even when not selected
                        containerStyle += 'bg-green-50/40 border-green-200';
                        badgeStyle = 'bg-green-100 text-green-700';
                        textStyle = 'text-gray-600';
                      } else {
                        containerStyle += 'bg-gray-50 border-gray-100 opacity-50';
                        badgeStyle = 'bg-gray-200 text-gray-400';
                      }

                      return (
                        <div key={i} className={containerStyle}>
                          <div className="flex items-start gap-2">
                            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${badgeStyle} font-sans`}>
                              {OPTION_LABELS[i]}
                            </span>
                            <div className="flex-1">
                              <p className={`text-sm font-sans leading-snug ${textStyle}`}>{optText}</p>
                              {/* Show feedback only for selected option */}
                              {isSelected && (
                                <div className={`mt-1.5 flex items-start gap-1.5 text-xs font-sans ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                                  {isCorrect
                                    ? <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                                    : <XCircle size={13} className="shrink-0 mt-0.5" />}
                                  <p className="leading-snug">{feedbackText}</p>
                                </div>
                              )}
                              {/* Show correct answer label when user was wrong */}
                              {!isSelected && isCorrect && answered && (
                                <p className="text-xs text-green-600 font-sans mt-0.5 font-medium">
                                  {lang === 'kan' ? '✓ ಸರಿಯಾದ ಉತ್ತರ' : '✓ Correct answer'}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </main>
    </div>
  );
};

export default WorkplaceReview;
