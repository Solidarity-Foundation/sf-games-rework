import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWorkplaceStore } from './workplaceStore';
import { ROOM_SEQUENCE } from './roomConfig';
import gamedata from './gamedata.json';
import q1Image from '@/assets/workplace/q1.webp';
import q1CorrectImage from '@/assets/workplace/q1-correct.webp';
import q1WrongImage from '@/assets/workplace/q1-wrong.webp';
import q2Image from '@/assets/workplace/q2.webp';
import q2CorrectImage from '@/assets/workplace/q2-correct.webp';
import q3Image from '@/assets/workplace/q3.webp';
import q3CorrectImage from '@/assets/workplace/q3-correct.webp';
import q3WrongImage from '@/assets/workplace/q3-wrong.webp';
import q4Image from '@/assets/workplace/q4.webp';
import q4CorrectImage from '@/assets/workplace/q4-correct.webp';
import q4WrongImage from '@/assets/workplace/q4-wrong.webp';
import q5Image from '@/assets/workplace/q5.webp';
import q5CorrectImage from '@/assets/workplace/q5-correct.webp';
import q5WrongImage from '@/assets/workplace/q5-wrong.webp';
import q6Image from '@/assets/workplace/q6.webp';
import q6CorrectImage from '@/assets/workplace/q6-correct.webp';
import q6WrongImage from '@/assets/workplace/q6-wrong.webp';
import q7Image from '@/assets/workplace/q7.webp';
import q7CorrectImage from '@/assets/workplace/q7-correct.webp';
import q7WrongImage from '@/assets/workplace/q7-wrong.webp';
import q8Image from '@/assets/workplace/q8.webp';
import q8CorrectImage from '@/assets/workplace/q8-correct.webp';
import q8WrongImage from '@/assets/workplace/q8-wrong.webp';
import q9Image from '@/assets/workplace/q9.webp';
import q9CorrectImage from '@/assets/workplace/q9-correct.webp';
import q9WrongImage from '@/assets/workplace/q9-wrong.webp';
import q10Image from '@/assets/workplace/q10.webp';
import q10CorrectImage from '@/assets/workplace/q10-correct.webp';
import q10WrongImage from '@/assets/workplace/q10-wrong.webp';

// Keys are 1-based sequence numbers (matching image filenames q1–q10)
const IMAGE_MAP: Record<number, string> = { 1: q1Image, 2: q2Image, 3: q3Image, 4: q4Image, 5: q5Image, 6: q6Image, 7: q7Image, 8: q8Image, 9: q9Image, 10: q10Image };
const CORRECT_IMAGE_MAP: Record<number, string> = { 1: q1CorrectImage, 2: q2CorrectImage, 3: q3CorrectImage, 4: q4CorrectImage, 5: q5CorrectImage, 6: q6CorrectImage, 7: q7CorrectImage, 8: q8CorrectImage, 9: q9CorrectImage, 10: q10CorrectImage };
const WRONG_IMAGE_MAP: Record<number, string> = { 1: q1WrongImage, 3: q3WrongImage, 4: q4WrongImage, 5: q5WrongImage, 6: q6WrongImage, 7: q7WrongImage, 8: q8WrongImage, 9: q9WrongImage, 10: q10WrongImage };

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const WorkplaceQuestion = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { completedRooms, answers, language, completeRoom } = useWorkplaceStore();

  const room = ROOM_SEQUENCE.find((r) => r.id === roomId);
  const sequenceIndex = room ? ROOM_SEQUENCE.findIndex((r) => r.id === roomId) : -1;

  if (!room) return null;

  const question = gamedata.questions.find((q) => q.id === room.questionId);
  if (!question) return null;

  const alreadyCompleted = completedRooms.includes(room.id);
  const existingAnswerIndex = answers[room.questionId];

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    alreadyCompleted ? existingAnswerIndex : undefined
  );
  const [shaking, setShaking] = useState(false);

  const isAnsweredCorrectly = selectedIndex !== undefined && question.options[selectedIndex]?.workplacePoints > 0;
  const isAnsweredWrong = selectedIndex !== undefined && !isAnsweredCorrectly;

  const seqNum = sequenceIndex + 1;
  const imageSrc = isAnsweredCorrectly
    ? (CORRECT_IMAGE_MAP[seqNum] ?? IMAGE_MAP[seqNum])
    : isAnsweredWrong
    ? (WRONG_IMAGE_MAP[seqNum] ?? IMAGE_MAP[seqNum])
    : IMAGE_MAP[seqNum];

  const handleOptionSelect = (index: number) => {
    if (selectedIndex !== undefined) return;
    setSelectedIndex(index);
    if (!alreadyCompleted) {
      const points = question.options[index].workplacePoints;
      completeRoom(room.id, room.questionId, index, points);
    }
    if (question.options[index].workplacePoints > 0) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e85d04', '#f48c06', '#faa307', '#22c55e', '#ffffff'],
      });
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const lang = language;
  const roomName         = lang === 'kan' ? room.name_kan            : room.name;
  const dialogue         = lang === 'kan' ? question.dialogue_kan    : question.dialogue;
  const reactionCorrect  = lang === 'kan' ? (question as any).reaction_correct_kan : (question as any).reaction_correct;
  const reactionWrong    = lang === 'kan' ? (question as any).reaction_wrong_kan   : (question as any).reaction_wrong;
  const title            = lang === 'kan' ? question.title_kan       : question.title;
  const description      = lang === 'kan' ? question.description_kan : question.description;
  const questionText     = lang === 'kan' ? question.question_kan    : question.question;
  const isAnswered       = selectedIndex !== undefined;

  const activeDialogue   = isAnsweredCorrectly ? reactionCorrect : isAnsweredWrong ? reactionWrong : dialogue;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fff8f0 0%, #fef3e2 40%, #e8f4fb 100%)' }}>

      {/* Header — matches floor plan gradient */}
      <header className="sticky top-0 z-10 shadow-md" style={{ background: 'linear-gradient(90deg, #e85d04 0%, #f48c06 50%, #faa307 100%)' }}>
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto w-full">
          <button
            onClick={() => navigate('/workplace-etiquette/game')}
            className="flex items-center gap-1 text-sm text-white font-medium font-sans bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
            <span>{lang === 'kan' ? 'ಕಚೇರಿಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Office'}</span>
          </button>
          <span className="font-bold text-white text-base font-sans truncate">{roomName}</span>
          <span className="font-bold text-orange-600 bg-white rounded-full px-3 py-1 font-sans shadow-sm shrink-0" style={{ fontSize: 'clamp(11px, 3vw, 14px)' }}>
            {`${sequenceIndex + 1} / 10`}
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className={`max-w-2xl mx-auto px-4 py-5 space-y-4 ${shaking ? 'animate-shake' : ''}`}>

          {/* Dialogue / Reaction */}
          {activeDialogue ? (
            <div
              key={isAnsweredCorrectly ? 'correct' : isAnsweredWrong ? 'wrong' : 'default'}
              className={`rounded-xl px-4 py-3 border-l-4 shadow-sm ${
                isAnswered ? 'animate-fade-in-up' : ''
              } ${
                isAnsweredCorrectly
                  ? 'bg-green-50 border-green-500 shadow-green-100'
                  : isAnsweredWrong
                  ? 'bg-red-50 border-red-400 shadow-red-100'
                  : 'bg-white/80 border-orange-400'
              }`}
            >
              {activeDialogue.split('\n').map((line: string, i: number) => (
                <p
                  key={i}
                  className={`font-sans italic text-sm leading-relaxed ${
                    isAnsweredCorrectly
                      ? 'text-green-800'
                      : isAnsweredWrong
                      ? 'text-red-800'
                      : 'text-gray-600'
                  } ${i > 0 ? 'mt-1' : ''}`}
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}

          {/* Image or placeholder */}
          <div
            className={`rounded-xl overflow-hidden ${
              isAnsweredCorrectly
                ? 'animate-pulse-glow-green'
                : isAnsweredWrong
                ? 'animate-shake-loop shadow-md'
                : 'shadow-md'
            }`}
          >
            {imageSrc ? (
              <img
                key={isAnsweredCorrectly ? 'correct' : isAnsweredWrong ? 'wrong' : 'default'}
                src={imageSrc}
                alt={title}
                className={`w-full h-auto block ${isAnsweredCorrectly ? 'animate-image-reveal' : ''}`}
              />
            ) : (
              <div className="w-full aspect-video bg-orange-50 flex items-center justify-center border-2 border-orange-100">
                <svg className="w-16 h-16 text-orange-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H3V5h18v14zm-10-7l5 3-5 3V9z" />
                </svg>
              </div>
            )}
          </div>

          {/* Question title */}
          <h2 className="text-orange-900 font-bold text-lg font-sans leading-snug">{title}</h2>

          {/* Description */}
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-orange-100">
            <p className="text-gray-700 font-sans text-sm leading-relaxed">{description}</p>
          </div>

          {/* Question prompt */}
          <div className="rounded-xl px-4 py-3 shadow-sm" style={{ background: 'linear-gradient(90deg, #e85d04, #faa307)' }}>
            <p className="text-white font-sans font-semibold text-sm">{questionText}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 pb-8">
            {question.options.map((opt, i) => {
              const optText      = lang === 'kan' ? opt.text_kan     : opt.text;
              const feedbackText = lang === 'kan' ? opt.feedback_kan : opt.feedback;
              const isSelected   = selectedIndex === i;
              const isCorrect    = opt.workplacePoints > 0;

              let containerClass = 'rounded-xl px-4 py-3 border-2 transition-all duration-150 cursor-pointer ';

              if (!isAnswered) {
                containerClass += 'bg-white border-orange-100 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md';
              } else if (isSelected && isCorrect) {
                containerClass += 'bg-green-50 border-green-400 cursor-default shadow-sm';
              } else if (isSelected && !isCorrect) {
                containerClass += 'bg-red-50 border-red-400 cursor-default shadow-sm';
              } else {
                containerClass += 'bg-white border-orange-50 opacity-40 cursor-default';
              }

              return (
                <div key={i} className={containerClass} onClick={() => handleOptionSelect(i)}>
                  <div className="flex items-start gap-3">
                    {/* Option label badge */}
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        !isAnswered
                          ? 'bg-orange-100 text-orange-600'
                          : isSelected && isCorrect
                          ? 'bg-green-500 text-white'
                          : isSelected && !isCorrect
                          ? 'bg-red-400 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {OPTION_LABELS[i]}
                    </span>

                    <div className="flex-1">
                      <p className="text-gray-800 font-sans text-sm leading-relaxed">{optText}</p>

                      {/* Result feedback */}
                      {isSelected && (
                        <div className={`mt-2 flex items-start gap-2 text-sm font-sans ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect
                            ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                            : <XCircle size={16} className="shrink-0 mt-0.5" />}
                          <p>{feedbackText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
};

export default WorkplaceQuestion;
