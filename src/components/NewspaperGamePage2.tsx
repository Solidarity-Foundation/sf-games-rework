import { useNavigate } from "react-router-dom";

interface NewspaperGamePage2Props {
  currentPage?: number;
  totalQuestions?: number;
  score?: number;
  questionsAttempted?: number;
}

const NewspaperGamePage2 = ({
  currentPage = 2,
  totalQuestions = 10,
  score = 10,
  questionsAttempted = 0,
}: NewspaperGamePage2Props) => {
  const navigate = useNavigate();
  const questionsPerPage = 4;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const questionsLeft = totalQuestions - questionsAttempted;
  const startQ = (currentPage - 1) * questionsPerPage;

  const questions = Array.from({ length: questionsPerPage }, (_, i) => ({
    id: startQ + i + 1,
    title: `Game Question Title ${startQ + i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl bg-background shadow-2xl">
        <div className="border-2 border-foreground p-1">
          <div className="border border-foreground">
            {/* Masthead */}
            <div className="text-center border-b border-foreground mx-4 pt-4 pb-2">
              <h1 className="newspaper-masthead text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none text-foreground">
                PoSH Awareness
              </h1>
            </div>
            <div className="mx-4 border-t-4 border-foreground" />
            <div className="mx-4 border-t border-foreground mt-0.5" />

            <div className="px-4 py-4">
              {/* Top row: Q1 (text then image) | Q2 (image then text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="md:newspaper-column-rule md:pr-5">
                  <QuestionTextFirst question={questions[0]} />
                </div>
                <div className="md:pl-5 mt-6 md:mt-0">
                  <QuestionImageFirst question={questions[1]} />
                </div>
              </div>

              <div className="border-t border-foreground my-4" />

              {/* Bottom row: Q3 (image then text) | Q4 (text then image) — opposite of top */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="md:newspaper-column-rule md:pr-5">
                  <QuestionImageFirst question={questions[2]} />
                </div>
                <div className="md:pl-5 mt-6 md:mt-0">
                  <QuestionTextFirst question={questions[3]} />
                </div>
              </div>

              {/* Bottom rule */}
              <div className="border-t border-foreground mt-6 mb-4" />

              {/* Game Statistics */}
              <div className="mb-4">
                <div className="border-t-2 border-foreground mb-2" />
                <h3 className="newspaper-headline text-xl font-bold text-foreground mb-3">
                  Game Statistics
                </h3>
                <div className="border-t border-foreground mb-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Current Score
                    </p>
                    <p className="newspaper-headline text-3xl font-bold text-foreground">
                      {score}
                    </p>
                  </div>
                  <div>
                    <p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Attempted
                    </p>
                    <p className="newspaper-headline text-3xl font-bold text-foreground">
                      {questionsAttempted}
                    </p>
                  </div>
                  <div>
                    <p className="newspaper-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Remaining
                    </p>
                    <p className="newspaper-headline text-3xl font-bold text-foreground">
                      {questionsLeft}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="border-t border-foreground pt-4 pb-2 flex justify-between items-center">
                <button
                  onClick={() => navigate("/game")}
                  className="newspaper-headline text-sm sm:text-base font-bold tracking-wider uppercase px-6 py-2 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200"
                >
                  Previous Page
                </button>

                <p className="newspaper-body text-xs text-muted-foreground tracking-widest uppercase">
                  Page {currentPage} of {totalPages}
                </p>

                <button
                  className="newspaper-headline text-sm sm:text-base font-bold tracking-wider uppercase px-6 py-2 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200"
                >
                  Next Page
                </button>
              </div>

              {/* Footer */}
              <div className="border-t border-foreground pt-2 mt-2 text-center">
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  © Solidarity Foundation · All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-components --- */

interface QuestionProps {
  question: { id: number; title: string };
}

const ImagePlaceholder = () => (
  <div className="border border-foreground bg-newspaper-aged w-full aspect-[4/3] flex items-center justify-center">
    <span className="text-xs text-muted-foreground italic tracking-wide">
      — Image —
    </span>
  </div>
);

const LoremBody = () => (
  <div className="columns-2 gap-4 text-xs leading-relaxed text-justify-newspaper text-muted-foreground">
    <p className="mb-2 indent-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p className="mb-2 indent-4">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
);

/** Title → Text → Image */
const QuestionTextFirst = ({ question }: QuestionProps) => (
  <div>
    <h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
      {question.title}
    </h3>
    <div className="border-t border-foreground mb-3" />
    <LoremBody />
    <div className="mt-3">
      <ImagePlaceholder />
    </div>
    <div className="mt-3">
      <LoremBody />
    </div>
  </div>
);

/** Title → Image → Text */
const QuestionImageFirst = ({ question }: QuestionProps) => (
  <div>
    <h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
      {question.title}
    </h3>
    <div className="border-t border-foreground mb-3" />
    <LoremBody />
    <div className="my-3">
      <ImagePlaceholder />
    </div>
    <LoremBody />
  </div>
);

export default NewspaperGamePage2;
