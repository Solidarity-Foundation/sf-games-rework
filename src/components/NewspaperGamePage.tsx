import { useNavigate } from "react-router-dom";

interface NewspaperGamePageProps {
  currentPage?: number;
  totalQuestions?: number;
  score?: number;
  questionsAttempted?: number;
}

const NewspaperGamePage = ({
  currentPage = 1,
  totalQuestions = 9,
  score = 10,
  questionsAttempted = 0,
}: NewspaperGamePageProps) => {
  const navigate = useNavigate();
  const questionsPerPage = 3;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const questionsLeft = totalQuestions - questionsAttempted;

  // Placeholder questions for layout
  const questions = Array.from({ length: questionsPerPage }, (_, i) => ({
    id: (currentPage - 1) * questionsPerPage + i + 1,
    title: `Game Question Title ${(currentPage - 1) * questionsPerPage + i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl bg-background shadow-2xl">
        {/* Outer border */}
        <div className="border-2 border-foreground p-1">
          <div className="border border-foreground">
            {/* Masthead — same as intro but without tagline */}
            <div className="text-center border-b border-foreground mx-4 pt-4 pb-2">
              <h1 className="newspaper-masthead text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none text-foreground">
                PoSH Awareness
              </h1>
            </div>

            {/* Thick rule below masthead */}
            <div className="mx-4 border-t-4 border-foreground" />
            <div className="mx-4 border-t border-foreground mt-0.5" />

            {/* Questions area */}
            <div className="px-4 py-4">
              {/* Questions 1 & 2 — side by side on top row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="md:newspaper-column-rule md:pr-5">
                  <QuestionArticleSmall question={questions[0]} />
                </div>
                <div className="md:pl-5 mt-6 md:mt-0">
                  <QuestionArticleSmall question={questions[1]} />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-foreground my-4" />

              {/* Question 3 — full-width below */}
              <QuestionArticleLarge question={questions[2]} />

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
                  onClick={() => {
                    if (currentPage <= 1) navigate("/");
                  }}
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

const QuestionArticleLarge = ({ question }: QuestionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
    {/* Left: title + image + body text */}
    <div className="md:col-span-7 md:newspaper-column-rule md:pr-5">
      <h2 className="newspaper-headline text-2xl sm:text-3xl font-bold leading-tight text-foreground mb-3">
        {question.title}
      </h2>
      <div className="border-t border-foreground mb-3" />

      {/* Image placeholder */}
      <div className="border border-foreground bg-newspaper-aged w-full aspect-[4/3] flex items-center justify-center mb-3">
        <span className="text-xs text-muted-foreground italic tracking-wide">
          — Image —
        </span>
      </div>

      {/* Article body in columns */}
      <div className="columns-2 gap-5 text-xs leading-relaxed text-justify-newspaper text-muted-foreground">
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
    </div>

    {/* Right: secondary text block */}
    <div className="md:col-span-5 md:pl-5 mt-6 md:mt-0">
      <div className="border-t-2 border-foreground mb-2 md:mt-0" />
      <div className="text-xs leading-relaxed text-justify-newspaper text-muted-foreground">
        <p className="mb-2 indent-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p className="mb-2 indent-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia.
        </p>
        <p className="mb-2 indent-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>
      </div>
    </div>
  </div>
);

const QuestionArticleSmall = ({ question }: QuestionProps) => (
  <div>
    <h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
      {question.title}
    </h3>
    <div className="border-t border-foreground mb-3" />

    {/* Image placeholder */}
    <div className="border border-foreground bg-newspaper-aged w-full aspect-[4/3] flex items-center justify-center mb-3">
      <span className="text-xs text-muted-foreground italic tracking-wide">
        — Image —
      </span>
    </div>

    {/* Article body in columns */}
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
  </div>
);

export default NewspaperGamePage;
