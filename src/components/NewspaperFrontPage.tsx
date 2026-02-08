import coverImage from "@/assets/posh-coverimage.jpg";

const NewspaperFrontPage = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl bg-background shadow-2xl">
        {/* Outer border */}
        <div className="border-2 border-foreground p-1">
          <div className="border border-foreground">
            {/* Top info bar */}
            <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-body text-muted-foreground tracking-wide">
              <span>VOL. CLXVII . . . No. 1</span>
              <span>{dateStr}</span>
              <span>SPECIAL EDITION</span>
            </div>

            {/* Masthead */}
            <div className="text-center border-t-2 border-b border-foreground mx-4 pt-3 pb-2">
              <h1 className="newspaper-masthead text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none text-foreground">
                PoSH Awareness
              </h1>
              <div className="border-t border-foreground mt-2 pt-1">
                <p className="text-xs sm:text-sm font-headline tracking-[0.3em] uppercase text-muted-foreground">
                  Educational Games from Solidarity Foundation
                </p>
              </div>
            </div>

            {/* Thick rule below masthead */}
            <div className="mx-4 border-t-4 border-foreground" />
            <div className="mx-4 border-t border-foreground mt-0.5" />

            {/* Main content area */}
            <div className="px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Main article - left 8 columns */}
                <div className="md:col-span-8 md:newspaper-column-rule md:pr-5">
                  {/* Main headline */}
                  <h2 className="newspaper-headline text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-3">
                    Welcome to the PoSH Awareness Game!
                  </h2>

                  <div className="border-t border-foreground mb-3" />

                  {/* Main article body */}
                  <p className="newspaper-body text-sm sm:text-base leading-relaxed text-justify-newspaper text-foreground mb-4">
                    Creating a safe and respectful workplace is everyone's responsibility. This quiz is designed to test your understanding of key concepts, policies, and procedures related to preventing sexual harassment in the workplace.
                  </p>

                  {/* Cover image */}
                  <div className="mb-4 border border-foreground">
                    <img
                      src={coverImage}
                      alt="PoSH Awareness illustration showing women standing together in solidarity"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Decorative filler text styled as newspaper columns */}
                  <div className="columns-2 gap-5 text-xs leading-relaxed text-justify-newspaper text-muted-foreground mt-2">
                    <p className="mb-2 indent-4">
                      The Prevention of Sexual Harassment (PoSH) Act, 2013, is a landmark legislation in India that aims to provide a safe working environment for women. Every organization with 10 or more employees is required to constitute an Internal Complaints Committee.
                    </p>
                    <p className="mb-2 indent-4">
                      Awareness is the first step toward prevention. By understanding what constitutes sexual harassment, employees can better identify inappropriate behavior and take appropriate action. Education empowers individuals to stand up for themselves and their colleagues.
                    </p>
                  </div>
                </div>

                {/* Sidebar - right 4 columns */}
                <div className="md:col-span-4 md:pl-5 mt-6 md:mt-0">
                  {/* Sidebar article 1: Aim of the Game */}
                  <div className="mb-5">
                    <div className="border-t-2 border-foreground mb-2" />
                    <h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
                      Aim of the Game
                    </h3>
                    <div className="border-t border-foreground mb-2" />
                    <p className="newspaper-body text-xs sm:text-sm leading-relaxed text-justify-newspaper text-foreground mb-3">
                      Understanding these principles helps protect not only yourself but also your colleagues, and contributes to building a workplace where everyone can feel safe, respected, and valued.
                    </p>
                    <p className="newspaper-body text-xs sm:text-sm leading-relaxed text-justify-newspaper text-foreground mb-3">
                      Take your time, think through each scenario, and remember that in real situations, when in doubt, always err on the side of safety and follow proper reporting procedures.
                    </p>

                    {/* Blank image box */}
                    <div className="border border-foreground bg-newspaper-aged w-full aspect-[4/3] flex items-center justify-center">
                      <span className="text-xs text-muted-foreground italic tracking-wide">
                        — Image —
                      </span>
                    </div>
                  </div>

                  {/* Sidebar article 2: Rules of the Game */}
                  <div>
                    <div className="border-t-2 border-foreground mb-2" />
                    <h3 className="newspaper-headline text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2">
                      Rules of the Game
                    </h3>
                    <div className="border-t border-foreground mb-2" />
                    <p className="newspaper-body text-xs sm:text-sm leading-relaxed text-foreground mb-1">
                      You start with <strong>10 points</strong>.
                    </p>
                    <p className="newspaper-body text-xs sm:text-sm leading-relaxed text-foreground mb-1">
                      Correct answer: <strong>+1 point</strong>.
                    </p>
                    <p className="newspaper-body text-xs sm:text-sm leading-relaxed text-foreground">
                      Wrong answer: <strong>−1 point</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom rule */}
              <div className="border-t border-foreground mt-6 mb-4" />

              {/* Start Game Button */}
              <div className="flex justify-center pb-4">
                <button className="newspaper-headline text-lg sm:text-xl font-bold tracking-wider uppercase px-10 py-3 border-2 border-foreground bg-foreground text-primary-foreground hover:bg-background hover:text-foreground transition-colors duration-200">
                  Start Game
                </button>
              </div>

              {/* Footer */}
              <div className="border-t border-foreground pt-2 text-center">
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

export default NewspaperFrontPage;
