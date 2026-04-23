import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, RefreshCcw, Award } from "lucide-react";
import gameData from "./gamedata.json";
import { saveGameSession } from "@/lib/db";
import inclusionCoverImage from "@/assets/inclusion-button.webp";

type GameState = "intro" | "playing" | "results";

interface ScenarioResponse {
  scenarioId: number;
  title: string;
  selectedOption: string;
  feedback: string;
  inclusionDelta: number;
  diversityDelta: number;
}

const scenarios = gameData.scenarios;
const resultLevels = gameData.resultLevels;

function getResult(total: number) {
  for (const level of resultLevels) {
    if (total >= level.minScore) return level;
  }
  return resultLevels[resultLevels.length - 1];
}

export default function InclusionDiversityGame() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [inclusionPoints, setInclusionPoints] = useState(10);
  const [diversityPoints, setDiversityPoints] = useState(10);
  const [equityPoints, setEquityPoints] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [scenarioResponses, setScenarioResponses] = useState<ScenarioResponse[]>([]);
  // Track answers for Appwrite save
  const answersLog = useRef<Array<{ questionId: number; answerIndex: number; pointsEarned: number }>>([]);

  const scenario = scenarios[currentScenario];

  function handleSubmit() {
    if (selectedAnswer === null) return;

    const option = scenario.options[selectedAnswer];
    const newInclusion = inclusionPoints + option.inclusionPoints;
    const newDiversity = diversityPoints + option.diversityPoints;

    setInclusionPoints(newInclusion);
    setDiversityPoints(newDiversity);
    setScenarioResponses(prev => [
      ...prev,
      {
        scenarioId: scenario.id,
        title: scenario.title,
        selectedOption: option.text,
        feedback: option.feedback,
        inclusionDelta: option.inclusionPoints,
        diversityDelta: option.diversityPoints,
      },
    ]);
    answersLog.current.push({
      questionId: scenario.id,
      answerIndex: selectedAnswer,
      pointsEarned: option.inclusionPoints + option.diversityPoints,
    });
    setAnswerSubmitted(true);
  }

  function handleNext() {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
    } else {
      const sum = inclusionPoints + diversityPoints;
      let equity = 0;
      if (sum >= 20) {
        equity = 2 + Math.floor(Math.max(0, (sum - 20) / 10));
      }
      const total = inclusionPoints + diversityPoints + equity;
      const result = getResult(total);
      setEquityPoints(equity);
      saveGameSession({
        gameId: "inclusion-diversity",
        totalQuestions: scenarios.length,
        questionsAnswered: scenarios.length,
        score: total,
        level: result.level,
        answers: answersLog.current,
      }).catch(console.error);
      setGameState("results");
    }
  }

  function resetGame() {
    setGameState("intro");
    setCurrentScenario(0);
    setInclusionPoints(10);
    setDiversityPoints(10);
    setEquityPoints(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setScenarioResponses([]);
    answersLog.current = [];
  }

  const selectedOption = selectedAnswer !== null ? scenario.options[selectedAnswer] : null;
  const isPositiveFeedback =
    selectedOption !== null &&
    selectedOption.inclusionPoints + selectedOption.diversityPoints > 0;

  // ── Shared shell ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8d5f5] via-[#d5c8f0] to-[#c8d8f5]">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            aria-label="Go home"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Home size={20} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Inclusion and Diversity Game
          </span>
          <div className="w-5" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {gameState === "intro" && <IntroScreen onStart={() => setGameState("playing")} />}

        {gameState === "playing" && (
          <div className="rounded-2xl shadow-lg overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] px-6 py-5">
              <h1 className="text-xl font-bold text-white mb-3">
                Scenario {currentScenario + 1}: {scenario.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="bg-[#3d35b5] text-white text-sm px-3 py-1 rounded-full">
                  Inclusion: {inclusionPoints}
                </span>
                <span className="text-white text-sm">
                  Diversity: {diversityPoints}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="bg-white px-6 py-6 space-y-5">
              {/* Progress bar */}
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] transition-all duration-300"
                  style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
                />
              </div>

              {/* DEI explainer */}
              {"explainer" in scenario && scenario.explainer && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-sm text-purple-800">
                  <span className="font-semibold">DEI Explainer: </span>
                  {scenario.explainer as string}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{scenario.description}</p>

              {/* Question */}
              {scenario.question && (
                <p className="font-semibold text-gray-800">{scenario.question}</p>
              )}

              {/* Options */}
              <div className="space-y-3">
                {scenario.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isFaded = answerSubmitted && !isSelected;
                  return (
                    <button
                      key={index}
                      onClick={() => !answerSubmitted && setSelectedAnswer(index)}
                      disabled={answerSubmitted}
                      className={[
                        "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150",
                        isSelected && !answerSubmitted
                          ? "border-[#5046e5] bg-white text-gray-800 shadow-sm"
                          : isSelected && answerSubmitted
                          ? "border-2 border-[#5046e5] bg-white text-gray-800"
                          : isFaded
                          ? "border-gray-200 bg-white text-gray-400"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#5046e5] cursor-pointer",
                      ].join(" ")}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {answerSubmitted && selectedOption && (
                <div
                  className={[
                    "rounded-lg px-4 py-4 text-sm",
                    isPositiveFeedback
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-100",
                  ].join(" ")}
                >
                  <p className="text-gray-700 mb-2">{selectedOption.feedback}</p>
                  <div className="flex gap-4 font-medium">
                    {selectedOption.inclusionPoints !== 0 && (
                      <span
                        className={
                          selectedOption.inclusionPoints > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        Inclusion: {selectedOption.inclusionPoints > 0 ? "+" : ""}
                        {selectedOption.inclusionPoints}
                      </span>
                    )}
                    {selectedOption.diversityPoints !== 0 && (
                      <span
                        className={
                          selectedOption.diversityPoints > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        Diversity: {selectedOption.diversityPoints > 0 ? "+" : ""}
                        {selectedOption.diversityPoints}
                      </span>
                    )}
                    {selectedOption.inclusionPoints === 0 &&
                      selectedOption.diversityPoints === 0 && (
                        <span className="text-gray-500">No points change</span>
                      )}
                  </div>
                </div>
              )}

              {/* Action button */}
              {!answerSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={[
                    "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
                    selectedAnswer === null
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] text-white hover:opacity-90",
                  ].join(" ")}
                >
                  Submit Answer <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] text-white hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
                >
                  {currentScenario < scenarios.length - 1 ? "Next Scenario" : "See Results"}
                  <ArrowRight size={16} />
                </button>
              )}

              <p className="text-center text-xs text-gray-400">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
            </div>
          </div>
        )}

        {gameState === "results" && (
          <ResultsScreen
            inclusionPoints={inclusionPoints}
            diversityPoints={diversityPoints}
            equityPoints={equityPoints}
            responses={scenarioResponses}
            onPlayAgain={resetGame}
          />
        )}
      </main>
    </div>
  );
}

// ── Intro screen ────────────────────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] px-6 py-5">
        <h1 className="text-2xl font-bold text-white">Inclusion &amp; Diversity Game</h1>
        <p className="text-blue-100 mt-1">Become an LGBTIAQ+ inclusive HR Personnel</p>
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-6 space-y-6">
        {/* Cover image */}
        <div className="w-full h-52 rounded-lg overflow-hidden">
          <img
            src={inclusionCoverImage}
            alt="Inclusion and Diversity"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 leading-relaxed">
            You are an HR professional at a leading corporate organisation in India. Your mission
            is to ensure an inclusive and engaging workplace for all employees while also
            attracting diverse talent.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Instructions</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span>•</span>
              <span>
                <span className="font-semibold text-purple-600">Inclusion Points</span> measure
                how welcoming and respectful you are in your interactions.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                <span className="font-semibold text-blue-500">Diversity Points</span> measure
                your understanding and responsiveness to the needs of diverse employees.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                <span className="font-semibold text-green-500">Equity Points</span> are awarded
                when you achieve a balanced score in both Inclusion and Diversity.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>You start with 10 Inclusion and Diversity Points each.</span>
            </li>
          </ul>
        </div>

        {/* Scoring */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Scoring</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex gap-2">
              <span>•</span>
              <span>Maximum points per answer: +2 points</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Minimum points per answer: -2 points</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] text-white hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
        >
          Start Game <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Results screen ───────────────────────────────────────────────────────────
function ResultsScreen({
  inclusionPoints,
  diversityPoints,
  equityPoints,
  responses,
  onPlayAgain,
}: {
  inclusionPoints: number;
  diversityPoints: number;
  equityPoints: number;
  responses: ScenarioResponse[];
  onPlayAgain: () => void;
}) {
  const total = inclusionPoints + diversityPoints + equityPoints;
  const result = getResult(total);

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] px-6 py-5">
        <h1 className="text-2xl font-bold text-white">Game Results</h1>
      </div>

      <div className="bg-white px-6 py-6 space-y-6">
        {/* Level summary */}
        <div className="text-center py-4">
          <Award className="mx-auto text-purple-500 mb-3" size={52} />
          <h2 className="text-2xl font-bold text-gray-800">{result.level}</h2>
          <p className="text-gray-500 mt-1 text-sm">{result.message}</p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <ScoreCard label="Inclusion" value={inclusionPoints} color="text-purple-600" />
          <ScoreCard label="Diversity" value={diversityPoints} color="text-blue-500" />
          <ScoreCard label="Equity" value={equityPoints} color="text-green-500" />
          <ScoreCard label="Total" value={total} color="text-gray-800" />
        </div>

        <hr className="border-gray-100" />

        {/* Response review */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Review Your Responses</h3>
          <div className="space-y-4">
            {responses.map((response, index) => {
              const positive = response.inclusionDelta + response.diversityDelta > 0;
              return (
                <div
                  key={index}
                  className={[
                    "rounded-lg border p-4 text-sm",
                    positive ? "border-green-100 bg-green-50" : "border-red-100 bg-red-50",
                  ].join(" ")}
                >
                  <p className="font-semibold text-gray-700 mb-1">{response.title}</p>
                  <p className="text-gray-500 mb-1 italic">"{response.selectedOption}"</p>
                  <p className="text-gray-600 mb-2">{response.feedback}</p>
                  <div className="flex gap-4 font-medium">
                    {response.inclusionDelta !== 0 && (
                      <span
                        className={
                          response.inclusionDelta > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        Inclusion: {response.inclusionDelta > 0 ? "+" : ""}
                        {response.inclusionDelta}
                      </span>
                    )}
                    {response.diversityDelta !== 0 && (
                      <span
                        className={
                          response.diversityDelta > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        Diversity: {response.diversityDelta > 0 ? "+" : ""}
                        {response.diversityDelta}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-[#5046e5] to-[#6b7ff0] text-white hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
        >
          Play Again <RefreshCcw size={16} />
        </button>
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl py-3 px-2">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}
