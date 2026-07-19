"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DemoKind =
  | "overview"
  | "wordsearch"
  | "numberflow"
  | "boxes"
  | "minesweeper"
  | "codebreaker"
  | "crossword"
  | "samay"
  | "haaji"
  | "scoring"
  | "leaderboard";

type Slide = {
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  victory: string;
  rules: string[];
  demo: DemoKind;
  demoLabel: string;
  demoMeta: string;
  link?: string;
};

const slides: Slide[] = [
  {
    number: "00",
    title: "Parivar Play",
    shortTitle: "Welcome",
    eyebrow: "8 GAMES · ONE LEADERBOARD",
    victory: "Play bold. Finish on top.",
    rules: [
      "Split everyone into three-player teams",
      "Open each game from the presentation",
      "Review the mechanic before every round",
      "Record placements after each game",
      "Keep the leaderboard visible between games",
      "Use the final tie-break only when needed",
    ],
    demo: "overview",
    demoLabel: "TONIGHT'S LINEUP",
    demoMeta: "8 GAMES",
  },
  {
    number: "01",
    title: "Word Search",
    shortTitle: "Word Search",
    eyebrow: "FIND THE HIDDEN WORDS",
    victory: "First to find all 10 wins",
    rules: [
      "Find ten words hidden in a 10×10 grid",
      "Words may run horizontally or vertically",
      "Drag across letters to select a word",
      "Correct words lock into the found list",
      "Use the provided Gujarati and English words",
      "The first player to find all ten wins",
    ],
    demo: "wordsearch",
    demoLabel: "WORD GRID",
    demoMeta: "3 / 10",
  },
  {
    number: "02",
    title: "Number Flow",
    shortTitle: "Number Flow",
    eyebrow: "CONNECT EVERY NUMBER",
    victory: "First to finish 3 rounds",
    rules: [
      "All players receive the same numbered grid",
      "Start at 1 and connect numbers in order",
      "Fill every square with one continuous path",
      "Everyone plays against the same clock",
      "The first correct path wins the round",
      "Three round wins takes the match",
    ],
    demo: "numberflow",
    demoLabel: "DRAW 1 → 8 · FILL EVERY CELL",
    demoMeta: "ROUND 2 / 5",
    link: "https://zip-race-trial.onrender.com/",
  },
  {
    number: "03",
    title: "Battle Boxes",
    shortTitle: "Battle Boxes",
    eyebrow: "DRAW LINES · CLAIM BOXES",
    victory: "Most boxes wins",
    rules: [
      "Players share one grid of dots",
      "Take turns drawing one horizontal or vertical line",
      "Complete the fourth side to claim a box",
      "A claimed box earns one point",
      "Closing a box gives you another turn",
      "The player with the most boxes wins",
    ],
    demo: "boxes",
    demoLabel: "BOXES BATTLE",
    demoMeta: "P2 TURN",
    link: "https://boxes-battle-trial.onrender.com/",
  },
  {
    number: "04",
    title: "Minesweeper",
    shortTitle: "Minesweeper",
    eyebrow: "BE THE LAST PLAYER STANDING",
    victory: "First to win 2 rounds",
    rules: [
      "Share the same grid and take turns clicking",
      "Safe squares reveal nearby mine counts",
      "Use those numbers to judge the next move",
      "Hitting a mine eliminates you for the round",
      "Running out of turn time also eliminates you",
      "Last player standing wins the round",
    ],
    demo: "minesweeper",
    demoLabel: "SHARED BOARD",
    demoMeta: "P1 TURN",
    link: "https://bansipatel.github.io/ClaudeCodeTest/minesweeper.html",
  },
  {
    number: "05",
    title: "Codebreaker",
    shortTitle: "Codebreaker",
    eyebrow: "CRACK THE FOUR-DIGIT CODE",
    victory: "First to win 2 rounds",
    rules: [
      "All three players attack the same secret code",
      "Submit unlimited four-digit guesses",
      "Green means the right digit and position",
      "Yellow means the right digit, wrong position",
      "Red means the digit is not in the code",
      "First to crack the code wins the round",
    ],
    demo: "codebreaker",
    demoLabel: "CRACK THE CODE",
    demoMeta: "GUESS 04",
    link: "https://bansipatel.github.io/ClaudeCodeTest/codebreaker.html",
  },
  {
    number: "06",
    title: "Crossword",
    shortTitle: "Crossword",
    eyebrow: "SOLVE FROM THE CLUES",
    victory: "First correct grid wins",
    rules: [
      "Read the across and down clues",
      "Enter one answer into each numbered slot",
      "Crossing letters must agree",
      "Answers use the supplied Gujarati and English list",
      "Incorrect entries remain editable",
      "The first complete correct grid wins",
    ],
    demo: "crossword",
    demoLabel: "CLUE BOARD",
    demoMeta: "6 ACROSS",
  },
  {
    number: "07",
    title: "Samay Sparsh",
    shortTitle: "Samay Sparsh",
    eyebrow: "CATCH THE TARGET TIME",
    victory: "Closest player wins",
    rules: [
      "A target duration is announced",
      "The visible clock disappears when the round begins",
      "Each player stops their timer by instinct",
      "Early and late guesses are both measured",
      "The closest time wins that round",
      "Most round wins takes the game",
    ],
    demo: "samay",
    demoLabel: "CATCH THE TIME",
    demoMeta: "TARGET 10s",
    link: "https://samay-sparsh.onrender.com/",
  },
  {
    number: "08",
    title: "Haaji Naaji",
    shortTitle: "Haaji Naaji",
    eyebrow: "SHARE, STEAL, BLUFF",
    victory: "Most treasure wins",
    rules: [
      "Three players negotiate before every choice",
      "Secretly choose Haaji (share) or Naaji (steal)",
      "One thief takes the whole pot",
      "Multiple thieves cancel one another out",
      "All sharers split the pot evenly",
      "The biggest treasure pot appears last",
    ],
    demo: "haaji",
    demoLabel: "SECRET CHOICE",
    demoMeta: "POT 300",
    link: "https://compromise-trial.onrender.com/",
  },
  {
    number: "09",
    title: "Overall Scoring",
    shortTitle: "Scoring",
    eyebrow: "ONE FORMULA · EVERY GAME",
    victory: "Highest cumulative total",
    rules: [
      "Every player starts with 100 points; winners add 50",
      "Multiply for mandal diversity and a vadil in the trio",
      "Repeated exact trios earn a shrinking multiplier",
      "New mandal badges add a separate one-time 200 points",
    ],
    demo: "scoring",
    demoLabel: "POINTS SYSTEM",
    demoMeta: "8 GAMES",
  },
  {
    number: "10",
    title: "Final Leaderboard",
    shortTitle: "Leaderboard",
    eyebrow: "THE FINAL COUNT",
    victory: "Crown the champion",
    rules: [
      "Confirm every game placement",
      "Add placement and bonus points",
      "Sort teams from highest to lowest",
      "Resolve ties with the sudden-death challenge",
      "Reveal the podium from third to first",
      "Celebrate the winning team",
    ],
    demo: "leaderboard",
    demoLabel: "FINAL RESULTS",
    demoMeta: "COMPLETE",
  },
];

const wordGrid = [
  "A", "A", "R", "T", "I", "K", "M", "S", "O", "U",
  "D", "A", "R", "S", "H", "A", "N", "E", "K", "L",
  "B", "H", "A", "K", "T", "I", "G", "U", "R", "U",
  "S", "A", "T", "S", "A", "N", "G", "P", "E", "A",
  "D", "H", "A", "R", "M", "A", "T", "C", "E", "E",
  "M", "O", "K", "S", "H", "A", "M", "R", "T", "I",
];

function OverviewDemo() {
  return (
    <div className="overview-demo">
      {["WORD", "FLOW", "BOX", "MINE", "CODE", "CLUE", "TIME", "PICK"].map((item, i) => (
        <div className="overview-tile" style={{ "--i": i } as React.CSSProperties} key={item}>
          <span>{String(i + 1).padStart(2, "0")}</span>{item}
        </div>
      ))}
      <div className="overview-path" />
    </div>
  );
}

function WordSearchDemo() {
  return (
    <div className="word-demo">
      <div className="word-grid">
        {wordGrid.map((letter, i) => <span className={[11, 12, 13, 14, 15, 16].includes(i) ? "found" : ""} key={i}>{letter}</span>)}
      </div>
      <div className="found-words"><b>FOUND</b><span>AARTI</span><span className="pop-word">DARSHAN ✓</span><span>BHAKTI</span></div>
    </div>
  );
}

function NumberFlowDemo() {
  const path = [0, 1, 2, 3, 4, 5, 11, 10, 9, 8, 7, 6, 12, 13, 14, 15, 16, 17, 23, 22, 21, 20, 19, 18, 24, 25, 26, 27, 28, 29, 35, 34, 33, 32, 31, 30];
  const waypointSteps: Record<number, number> = { 0: 1, 5: 2, 9: 3, 13: 4, 18: 5, 23: 6, 28: 7, 35: 8 };
  const direction = (from: number, to: number) => {
    const delta = to - from;
    if (delta === 1) return "right";
    if (delta === -1) return "left";
    if (delta === 6) return "down";
    return "up";
  };

  return (
    <div className="flow-demo">
      <div className="flow-board" aria-label="Animated number path puzzle">
        {Array.from({ length: 36 }, (_, cell) => {
          const step = path.indexOf(cell);
          const neighbors = [path[step - 1], path[step + 1]].filter((value): value is number => value !== undefined);
          return (
            <span className="flow-cell" style={{ "--step": step } as React.CSSProperties} key={cell}>
              <i className="flow-stroke">
                {neighbors.map((neighbor) => <em className={`flow-arm ${direction(cell, neighbor)}`} key={neighbor} />)}
                <em className="flow-center" />
              </i>
              {waypointSteps[step] && <b>{waypointSteps[step]}</b>}
            </span>
          );
        })}
      </div>
      <div className="flow-status"><b>1</b><span>ONE CONTINUOUS PATH</span><b>8</b></div>
    </div>
  );
}

function BoxesDemo() {
  return (
    <div className="boxes-board">
      {Array.from({ length: 16 }, (_, i) => <i className="dot" key={`d${i}`} />)}
      {Array.from({ length: 10 }, (_, i) => <i className={`draw-line line-${i}`} style={{ "--i": i } as React.CSSProperties} key={`l${i}`} />)}
      <span className="claimed-box box-a">P1</span><span className="claimed-box box-b">P2</span>
      <div className="mini-scores"><b>P1&nbsp; 3</b><b>P2&nbsp; 2</b><b>P3&nbsp; 1</b></div>
    </div>
  );
}

function MinesweeperDemo() {
  const cells = ["1", "1", "", "", "1", "2", "2", "1", "", "2", "✹", "2", "", "2", "2", "1"];
  return <div className="mine-wrap"><div className="mine-board">{cells.map((v, i) => <span className={v === "✹" ? "mine" : v ? "safe" : "covered"} style={{ "--i": i } as React.CSSProperties} key={i}>{v}</span>)}</div><div className="turn-strip"><b>P1</b><span>safe</span><b>P2</b><span>thinking…</span><b className="out">P3</b><span className="out">mine</span></div></div>;
}

function CodebreakerDemo() {
  const rows = [["2", "8", "4", "1"], ["4", "1", "7", "3"], ["4", "6", "7", "1"]];
  const colors = [["red", "yellow", "red", "green"], ["green", "yellow", "green", "red"], ["green", "green", "green", "green"]];
  return <div className="code-demo"><div className="code-secret">? &nbsp; ? &nbsp; ? &nbsp; ?</div>{rows.map((row, ri) => <div className="guess-row" style={{ "--i": ri } as React.CSSProperties} key={ri}>{row.map((n, i) => <span className={colors[ri][i]} key={i}>{n}</span>)}</div>)}<div className="cracked">CODE CRACKED</div></div>;
}

function CrosswordDemo() {
  const dark = new Set([3, 4, 8, 13, 18, 20, 21]);
  return <div className="cross-demo"><div className="cross-grid">{Array.from({ length: 25 }, (_, i) => <span className={`${dark.has(i) ? "black" : ""} ${[5,6,7,9].includes(i) ? "active" : ""}`} key={i}>{[5,6,7,9].includes(i) ? ["G","U","R","U"][[5,6,7,9].indexOf(i)] : ""}</span>)}</div><div className="clue-card"><b>6 ACROSS</b><p>Spiritual mentor</p><span>GURU ✓</span></div></div>;
}

function SamayDemo() {
  return <div className="samay-demo"><div className="target-time"><small>TARGET</small><b>10.00s</b></div><div className="timer-ring"><i /><span>9.84</span></div><div className="time-results"><span>P1&nbsp; 9.84</span><span className="winner">P2&nbsp; 10.06 ★</span><span>P3&nbsp; 10.41</span></div></div>;
}

function HaajiDemo() {
  return <div className="haaji-demo"><div className="treasure">POT <b>300</b></div><div className="choice-row"><div><i>P1</i><b>HAAJI</b><small>share</small></div><div><i>P2</i><b>NAAJI</b><small>steal</small></div><div><i>P3</i><b>HAAJI</b><small>share</small></div></div><div className="choice-result">ONE THIEF<br/><b>TAKES THE POT</b><span>+300</span></div></div>;
}

function ScoringDemo() {
  return <div className="scoring-demo"><div className="points-row gold"><b>1ST</b><span>10</span></div><div className="points-row silver"><b>2ND</b><span>6</span></div><div className="points-row bronze"><b>3RD</b><span>3</span></div><div className="bonus-card"><b>PERFECT GAME</b><span>+2 BONUS</span></div><div className="score-equation">PLACEMENT + BONUS = TOTAL</div></div>;
}

function ScoringPage() {
  const repeatSteps = [["1st", "1.0×"], ["2nd", "0.8×"], ["3rd", "0.6×"], ["4th", "0.4×"], ["5th", "0.2×"], ["6th+", "0×"]];
  return (
    <article className="scoring-page">
      <header className="scoring-header">
        <div><p>ONE FORMULA · EVERY GAME</p><h1>How scoring works</h1></div>
        <div className="score-base"><span>COMPLETE</span><b>100</b><i>WIN</i><strong>+50</strong></div>
      </header>

      <div className="formula-ribbon"><b>(100 + 50 if you win)</b><span>×</span><b>Mandal mix</b><span>×</span><b>Vadil bonus</b><span>×</span><b>Repeat-trio factor</b></div>

      <section className="score-factors">
        <div className="factor-card diversity-card"><small>01 · MIX THE GROUP</small><h2>Mandal diversity</h2><div className="factor-options"><span><b>1</b> mandal <strong>1.0×</strong></span><span><b>2</b> mandals <strong>1.5×</strong></span><span className="best"><b>3</b> mandals <strong>2.5×</strong></span></div></div>
        <div className="factor-card vadil-card"><small>02 · INCLUDE EVERY AGE</small><h2>Vadil in trio</h2><div className="vadil-bonus"><b>55+</b><span>At least one older player benefits all three</span><strong>1.15×</strong></div><p>One vadil triggers the bonus; it does not stack.</p></div>
        <div className="factor-card repeat-card"><small>03 · KEEP MEETING PEOPLE</small><h2>Exact trio repeats</h2><div className="repeat-scale">{repeatSteps.map(([label, value]) => <span className={value === "0×" ? "zero" : ""} key={label}><b>{label}</b><strong>{value}</strong></span>)}</div><p>Only the same set of three is penalized—not recurring pairs.</p></div>
      </section>

      <section className="badge-strip"><div className="badge-points">+200</div><div><small>SEPARATE ONE-TIME LEDGER</small><h2>New mandal badge</h2><p>Each player earns 200 points the first time they play alongside someone from a new mandal—once per mandal, ever.</p></div></section>

      <section className="worked-example"><div className="example-copy"><small>QUICK EXAMPLE</small><b>3 mandals · one vadil · first-time trio</b><span>Winner: 150 × 2.5 × 1.15 × 1.0</span><span>Others: 100 × 2.5 × 1.15 × 1.0</span></div><div className="example-score winner"><small>WINNER</small><b>431.25</b><span>before badges</span></div><div className="example-score"><small>EACH OTHER PLAYER</small><b>287.5</b><span>before badges</span></div></section>
    </article>
  );
}

function LeaderboardDemo() {
  const teams = [["TEAM ORBIT", 68], ["TEAM NOVA", 61], ["TEAM COMET", 54], ["TEAM PIXEL", 47]] as const;
  return <div className="leader-demo"><div className="trophy">★</div><h3>CHAMPIONS</h3>{teams.map(([name, score], i) => <div className="leader-row" style={{ "--i": i } as React.CSSProperties} key={name}><b>{i + 1}</b><span>{name}</span><strong>{score}</strong></div>)}</div>;
}

function Demo({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "overview": return <OverviewDemo />;
    case "wordsearch": return <WordSearchDemo />;
    case "numberflow": return <NumberFlowDemo />;
    case "boxes": return <BoxesDemo />;
    case "minesweeper": return <MinesweeperDemo />;
    case "codebreaker": return <CodebreakerDemo />;
    case "crossword": return <CrosswordDemo />;
    case "samay": return <SamayDemo />;
    case "haaji": return <HaajiDemo />;
    case "scoring": return <ScoringDemo />;
    case "leaderboard": return <LeaderboardDemo />;
  }
}

function InstructionCard({ slide }: { slide: Slide }) {
  return (
    <article className="instruction-card">
      <header className="game-heading"><p>{slide.eyebrow}</p><h1>{slide.title}</h1></header>
      <section className="fact-block"><h2><span>★</span> Victory condition</h2><div className="victory-pill">{slide.victory}</div></section>
      <section className="rules-block"><h2><span>▤</span> Rules</h2><ol>{slide.rules.map((rule, i) => <li key={rule}><b>{i + 1}</b><span>{rule}</span></li>)}</ol></section>
    </article>
  );
}

function Phone({ slide, replay }: { slide: Slide; replay: () => void }) {
  return (
    <section className="mechanics-panel">
      <div className="mechanics-title"><span>▶</span><h2>How it works</h2></div>
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-notch"><i /></div>
          <div className="phone-meta"><b>DEMO MODE</b><b>{slide.demoMeta}</b></div>
          <div className="demo-stage"><div className="demo-label">{slide.demoLabel}</div><Demo kind={slide.demo} /></div>
          <div className="phone-actions">
            <button onClick={replay} aria-label={`Replay ${slide.title} animation`}>↻ Replay demo</button>
            {slide.link && <a href={slide.link} target="_blank" rel="noreferrer">Open game ↗</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [demoKey, setDemoKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(clamped);
    setDemoKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(index + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(index - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const slide = slides[index];

  return (
    <main className="presentation-shell" onTouchStart={(e) => { touchStart.current = e.changedTouches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current === null) return; const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 60) go(index + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
      <nav className="topbar" aria-label="Presentation controls">
        <div className="brand"><span>P</span><b>Parivar Play</b></div>
        <div className="slide-picker"><label htmlFor="slide-select">Jump to</label><select id="slide-select" value={index} onChange={(e) => go(Number(e.target.value))}>{slides.map((item, i) => <option value={i} key={item.number}>{item.number} — {item.shortTitle}</option>)}</select></div>
        <button className="fullscreen" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter full screen">Full screen ⛶</button>
      </nav>

      <div className={`slide-frame${slide.demo === "scoring" ? " scoring-slide" : ""}`} aria-live="polite">
        <div className="decor decor-top"/><div className="decor decor-right"/><div className="decor decor-bottom"/><div className="decor decor-dot"/>
        {slide.demo === "scoring" ? <ScoringPage /> : <><InstructionCard slide={slide} /><div key={`${slide.number}-${demoKey}`} className="demo-remount"><Phone slide={slide} replay={() => setDemoKey((key) => key + 1)} /></div></>}
        <span className="page-number">{slide.number}</span>
      </div>

      <footer className="deck-controls">
        <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">← Previous</button>
        <div className="progress" aria-label={`Slide ${index + 1} of ${slides.length}`}><div className="progress-bar"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div><span>{index + 1} / {slides.length}</span></div>
        <button onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label="Next slide">Next →</button>
      </footer>
    </main>
  );
}
