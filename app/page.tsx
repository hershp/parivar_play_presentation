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
  | "pairs"
  | "math"
  | "scoring"
  | "leaderboard";

type Slide = {
  active?: boolean;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  victory: string;
  playMode?: "Collaborative" | "Competitive";
  rules: string[];
  demo: DemoKind;
  demoLabel: string;
  demoMeta: string;
  link?: string;
};

const slideLibrary: Slide[] = [
  {
    number: "00",
    title: "Parivar Play",
    shortTitle: "Welcome",
    eyebrow: "9 GAMES · ONE LEADERBOARD",
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
    demoMeta: "9 GAMES",
  },
  {
    number: "01",
    title: "Word Search",
    shortTitle: "Word Search",
    eyebrow: "FIND THE HIDDEN WORDS",
    victory: "Find all words before your opponents",
    playMode: "Competitive",
    rules: [
      "Press the first letter, swipe across every letter in the word, and release on the last letter",
      "Or tap the first letter and then the last letter",
      "Words may be vertical, horizontal, or diagonal",
    ],
    demo: "wordsearch",
    demoLabel: "WORD GRID",
    demoMeta: "3 / 10",
  },
  {
    number: "02",
    title: "Speed Sprint",
    shortTitle: "Speed Sprint",
    eyebrow: "CONNECT EVERY NUMBER",
    victory: "First to finish 3 rounds",
    playMode: "Competitive",
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
    playMode: "Competitive",
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
    title: "Survival",
    shortTitle: "Survival",
    eyebrow: "HIDE BOMBS · SURVIVE THE BOARD",
    victory: "First player to win 2 rounds",
    playMode: "Competitive",
    rules: [
      "Hide your three bombs before the game starts",
      "On your turn, tap a square",
      "A number tells you how many bombs are hiding around it",
      "Touch any bomb and you are out — even your own",
      "The last player wins the round; win 2 rounds to win the game",
    ],
    demo: "minesweeper",
    demoLabel: "ROUND 1 OF 4",
    demoMeta: "SURVIVAL",
    link: "https://bansipatel.github.io/ClaudeCodeTest/minesweeper.html",
  },
  {
    number: "05",
    title: "Codebreaker",
    shortTitle: "Codebreaker",
    eyebrow: "CRACK THE FOUR-DIGIT CODE",
    victory: "First to win 2 rounds",
    playMode: "Competitive",
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
    victory: "Solve the puzzle within the five-minute timer",
    playMode: "Collaborative",
    rules: [
      "Read the clues",
      "Enter the answer to a clue by clicking the first letter",
      "All clues have only one solution word",
      "Words can be English or Gujarati",
    ],
    demo: "crossword",
    demoLabel: "CLUE BOARD",
    demoMeta: "6 ACROSS",
  },
  {
    number: "07",
    title: "Time Tap",
    shortTitle: "Time Tap",
    eyebrow: "CATCH THE TARGET TIME",
    victory: "Closest player wins",
    playMode: "Competitive",
    rules: [
      "A target duration is announced",
      "The digital clock disappears when the round begins",
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
    title: "Perfect Pairs",
    shortTitle: "Perfect Pairs",
    eyebrow: "MEMORIZE · MATCH · SURVIVE",
    victory: "Find every pair before losing 5 lives",
    playMode: "Collaborative",
    rules: [
      "Study all 20 cards face-up for 7 seconds",
      "Memorize the pairs on the 5×4 board together",
      "After the cards flip down, players take turns",
      "Flip two cards and keep every correct pair",
      "An incorrect pair costs the team one life",
      "Find all ten pairs before all five lives are gone",
    ],
    demo: "pairs",
    demoLabel: "TEAM MEMORY BOARD",
    demoMeta: "5 LIVES",
  },
  {
    number: "09",
    title: "Math Mania",
    shortTitle: "Math Mania",
    eyebrow: "THINK FAST · TYPE FASTER",
    victory: "Most correct answers wins the round",
    playMode: "Competitive",
    rules: [
      "Each player sees only their own current question",
      "Solve as many questions as possible before time runs out",
      "Type each answer using the keyboard",
      "A correct answer unlocks the next question",
      "An incorrect answer keeps the current question on screen",
      "The player with the most correct answers wins the round",
    ],
    demo: "math",
    demoLabel: "ARITHMETIC SPRINT",
    demoMeta: "P2 LEADS",
  },
  {
    number: "10",
    title: "Overall Scoring",
    shortTitle: "Scoring",
    eyebrow: "ONE FORMULA · EVERY GAME",
    victory: "Highest cumulative total",
    rules: [
      "Every player starts with 100 points; winners add 50",
      "Multiply based on the number of mandals participating and a vadil in the trio",
      "Repeated exact trios earn a shrinking multiplier",
      "New mandal badges add a separate one-time 200 points",
    ],
    demo: "scoring",
    demoLabel: "POINTS SYSTEM",
    demoMeta: "9 GAMES",
  },
  {
    active: false,
    number: "11",
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

const slides = slideLibrary.filter((slide) => slide.active !== false);

const wordGrid = [
  "A", "A", "R", "T", "I", "K", "M", "S", "O", "U",
  "D", "A", "R", "S", "H", "A", "N", "E", "K", "L",
  "B", "H", "R", "K", "T", "I", "G", "U", "R", "U",
  "S", "A", "T", "T", "A", "N", "G", "P", "E", "A",
  "D", "H", "A", "R", "I", "A", "T", "C", "E", "E",
  "M", "O", "K", "S", "H", "A", "M", "R", "T", "I",
];

function OverviewDemo() {
  return (
    <div className="overview-demo">
      {["WORD", "SPEED", "BOX", "MINE", "CODE", "CLUE", "TIME", "PAIRS", "MATH"].map((item, i) => (
        <div className="overview-tile" style={{ "--i": i } as React.CSSProperties} key={item}>
          <span>{String(i + 1).padStart(2, "0")}</span>{item}
        </div>
      ))}
      <div className="overview-path" />
    </div>
  );
}

function WordSearchDemo() {
  const darshanCells = [10, 11, 12, 13, 14, 15, 16];
  const aartiCells = [0, 11, 22, 33, 44];

  return (
    <div className="word-demo">
      <div className="word-round-bar"><span>ROUND 1</span><b>7 WORDS LEFT</b><strong>01:42</strong></div>
      <div className="word-grid">
          {wordGrid.map((letter, i) => {
            const classes = [
              darshanCells.includes(i) ? "found" : "",
              aartiCells.includes(i) ? "diagonal-found" : "",
            ].filter(Boolean).join(" ");
            return <span className={classes} key={i}>{letter}</span>;
          })}
      </div>
      <div className="found-words"><b>FOUND</b><span className="pop-word diagonal-word">AARTI ↘</span><span className="pop-word">DARSHAN →</span><span>BHAKTI</span></div>
      <div className="word-player-strip"><span className="active">YOU <b>3</b></span><span>ATMIYA <b>2</b></span><span>BANSI <b>1</b></span></div>
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
    <div className="boxes-demo">
      <div className="boxes-turn"><span>P3&apos;S TURN</span><b>DRAW ONE LINE</b><strong>09s</strong></div>
      <div className="boxes-board">
        <div className="box-instruction"><span className="p1-dot" />P1 → <span className="p2-dot" />P2 → <span className="p3-dot" />P3 · REPEAT</div>
        {Array.from({ length: 16 }, (_, i) => <i className="dot" key={`d${i}`} />)}
        <i className="box-edge edge-top edge-p1" style={{ "--delay": ".25s" } as React.CSSProperties}/>
        <i className="box-edge edge-left edge-p2" style={{ "--delay": ".7s" } as React.CSSProperties}/>
        <i className="box-edge edge-right edge-p3" style={{ "--delay": "1.15s" } as React.CSSProperties}/>
        <i className="box-edge extra-p1 edge-p1" style={{ "--delay": "1.6s" } as React.CSSProperties}/>
        <i className="box-edge extra-p2 edge-p2" style={{ "--delay": "2.05s" } as React.CSSProperties}/>
        <i className="box-edge edge-fourth"/>
        <span className="claimed-box focus-box"><b>P3</b><small>+1 BOX</small></span>
        <div className="mini-scores"><b className="p1-score">P1&nbsp; 0</b><b className="p2-score">P2&nbsp; 0</b><b className="score-winner p3-score">P3&nbsp; <span>0</span><strong>1</strong></b></div>
        <div className="bonus-turn">ORANGE COMPLETES THE BOX · P3 SCORES +1 &amp; PLAYS AGAIN</div>
      </div>
      <div className="boxes-players"><span><i className="p1-dot"/>YOU</span><span><i className="p2-dot"/>ATMIYA</span><span className="playing"><i className="p3-dot"/>BANSI · PLAYING</span></div>
    </div>
  );
}

function MinesweeperDemo() {
  const picks: Record<number, { player: string; result: string; value: string; delay: string }> = {
    18: { player: "YOU", result: "safe-pick", value: "1", delay: "3.65s" },
    30: { player: "ATMIYA", result: "mine-pick", value: "💥", delay: "4.85s" },
    43: { player: "BANSI", result: "safe-pick", value: "2", delay: "6s" },
    6: { player: "YOU", result: "mine-pick", value: "💥", delay: "7.15s" },
  };
  const bombs: Record<number, { player: string; delay: string }> = {
    6: { player: "p1", delay: ".25s" }, 21: { player: "p1", delay: ".48s" }, 51: { player: "p1", delay: ".71s" },
    14: { player: "p2", delay: "1.15s" }, 30: { player: "p2", delay: "1.38s" }, 60: { player: "p2", delay: "1.61s" },
    9: { player: "p3", delay: "2.05s" }, 37: { player: "p3", delay: "2.28s" }, 55: { player: "p3", delay: "2.51s" },
  };
  const floodValues: Record<number, string> = {
    19: "1", 20: "1", 22: "1", 26: "1", 27: "2", 28: "2", 34: "1", 35: "2",
    36: "2", 42: "1", 44: "1", 50: "1", 52: "1", 58: "1", 59: "1",
  };
  const messages = [
    ["YOU", "HIDE YOUR 3 BOMBS", ".05s"],
    ["ATMIYA", "HIDES 3 BOMBS", "1s"],
    ["BANSI", "HIDES 3 BOMBS", "1.95s"],
    ["ALL", "9 BOMBS HIDDEN · SURVIVAL BEGINS", "2.9s"],
    ["YOU", "TAP SAFE · NEARBY COUNTS OPEN", "3.45s"],
    ["ATMIYA", "TOUCHES A BOMB · OUT", "4.65s"],
    ["BANSI", "TAPS SAFE · STAYS IN", "5.8s"],
    ["YOU", "TOUCH A BOMB · OUT", "6.95s"],
    ["BANSI", "WINS THE ROUND", "8.05s"],
  ];
  return (
    <div className="mine-wrap">
      <div className="mine-turn-banner">{messages.map(([player, text, delay]) => <span style={{ "--delay": delay } as React.CSSProperties} key={text + player}><b>{player}</b> {text}</span>)}</div>
      <div className="mine-board">{Array.from({ length: 64 }, (_, i) => {
        const pick = picks[i];
        const bomb = bombs[i];
        const isFloodCell = Object.hasOwn(floodValues, i);
        const floodOrder = Object.keys(floodValues).indexOf(String(i));
        const style = pick ? { "--delay": pick.delay } : isFloodCell ? { "--delay": `${3.9 + floodOrder * .035}s` } : undefined;
        return <span className={`mine-cell${pick ? ` ${pick.result}` : isFloodCell ? " flood-cell" : ""}`} data-player={pick?.player} style={style as React.CSSProperties | undefined} key={i}>{bomb && <i className={`placed-bomb ${bomb.player}`} style={{ "--place-delay": bomb.delay } as React.CSSProperties}>✹</i>}{pick?.value ?? floodValues[i]}</span>;
      })}</div>
      <div className="mine-players">
        <div className="player-one"><b>YOU</b><small>● ●</small><strong>OUT</strong></div>
        <div className="player-two"><b>ATMIYA</b><small>● ●</small><strong>OUT</strong></div>
        <div className="player-three"><b>BANSI</b><small>● ●</small><strong>🏆 WINNER</strong></div>
      </div>
      <div className="mine-winner-card"><span>🏆</span><b>BANSI WON THE ROUND!</b><small>Two players touched a bomb</small></div>
    </div>
  );
}

function CodebreakerDemo() {
  const rows = [["2", "8", "4", "1"], ["4", "1", "7", "3"], ["4", "6", "7", "1"]];
  const colors = [["red", "yellow", "red", "green"], ["green", "yellow", "green", "red"], ["green", "green", "green", "green"]];
  return <div className="code-demo"><div className="code-secret">? &nbsp; ? &nbsp; ? &nbsp; ?</div>{rows.map((row, ri) => <div className="guess-row" style={{ "--i": ri } as React.CSSProperties} key={ri}>{row.map((n, i) => <span className={colors[ri][i]} key={i}>{n}</span>)}</div>)}<div className="cracked">CODE CRACKED</div></div>;
}

function CrosswordDemo() {
  const dark = new Set([4, 9, 10, 14, 20, 21]);
  const answerCells = [5, 6, 7, 8];
  const answer = ["G", "U", "R", "U"];
  return <div className="cross-demo"><div className="cross-status"><b>TEAM PUZZLE</b><span>4 CLUES LEFT</span><strong>04:18</strong></div><div className="cross-grid">{Array.from({ length: 25 }, (_, i) => {
    const answerIndex = answerCells.indexOf(i);
    return <span className={`${dark.has(i) ? "black" : ""} ${answerIndex >= 0 ? "active" : ""} ${i === 5 ? "answer-start" : ""}`} style={answerIndex >= 0 ? { "--delay": `${0.45 + answerIndex * 0.28}s` } as React.CSSProperties : undefined} key={i}>{answerIndex >= 0 ? answer[answerIndex] : ""}</span>;
  })}</div><div className="clue-card"><b>SELECTED · 6 ACROSS · 4 LETTERS</b><p>A teacher or spiritual guide</p><span>GURU ✓</span></div><div className="cross-team"><b>YOU</b><span>ATMIYA</span><span>BANSI</span><strong>PLAY TOGETHER</strong></div></div>;
}

function SamayDemo() {
  const results = [["P1", "9.84s", "0.16 early"], ["P2", "10.06s", "0.06 late"], ["P3", "10.41s", "0.41 late"]];
  return <div className="samay-demo"><div className="target-time"><small>TARGET TIME</small><b>10.00s</b></div><div className="samay-play"><div className="digital-timer" aria-label="Digital timer"><small>ELAPSED</small><span className="timer-running">--.--</span><span className="timer-stopped">09.84</span></div><div className="stop-demo-button" role="img" aria-label="Player presses the stop button"><span>STOP</span></div></div><div className="time-results">{results.map(([player,time,difference],i) => <div className={player === "P2" ? "winner" : ""} style={{ "--delay": `${1.9 + i * 0.2}s` } as React.CSSProperties} key={player}><b>{player}</b><strong>{time}</strong><small>{difference}</small>{player === "P2" && <em>★ CLOSEST</em>}</div>)}</div><div className="round-winner">★ P2 WINS THE ROUND</div></div>;
}

function PairsDemo() {
  const symbols = ["★", "●", "▲", "◆", "♥", "☀", "✿", "♣", "☂", "♫", "★", "●", "▲", "◆", "♥", "☀", "✿", "♣", "☂", "♫"];
  const cardClass = (i: number) => {
    if ([1, 2].includes(i)) return "miss-one";
    if ([3, 4].includes(i)) return "miss-two";
    if ([0, 10].includes(i)) return "match-one";
    if ([5, 15].includes(i)) return "match-two";
    return "";
  };
  const messages = [
    ["TRY 1", "● + ▲ · NO MATCH", "miss"],
    ["TRY 2", "◆ + ♥ · NO MATCH", "miss"],
    ["TRY 3", "★ + ★ · PAIR FOUND", "success"],
    ["TRY 4", "☀ + ☀ · PAIR FOUND", "success"],
  ];
  return <div className="pairs-demo"><div className="pairs-top"><b>TEAM MEMORY</b><span>5×4 BOARD</span><strong aria-label="Lives"><i>♥</i><i>♥</i><i>♥</i><i className="life-lost-two">♥</i><i className="life-lost-one">♥</i></strong></div><div className="pairs-board">{symbols.map((symbol, i) => <span className={cardClass(i)} key={`${symbol}-${i}`}><b>{symbol}</b><i>?</i></span>)}</div><div className="pairs-status">{messages.map(([turn, result, outcome], i) => <span className={outcome} style={{ "--i": i } as React.CSSProperties} key={turn}><b>{turn}</b>{result}{outcome === "miss" && <em>−1 LIFE</em>}</span>)}</div></div>;
}

function MathDemo() {
  return <div className="math-demo"><div className="math-head"><b>YOUR SCREEN</b><span>PRIVATE QUESTION</span><strong>00:24</strong></div><div className="math-question"><div className="question-one"><small>CURRENT QUESTION · #9</small><b>6 × 4 =</b><span>24<i>▌</i></span><em>✓ CORRECT · +1</em></div><div className="question-two"><small>CURRENT QUESTION · #10</small><b>17 − 8 =</b><span><i>▌</i></span><em>ANSWER TO CONTINUE</em></div></div><div className="math-personal-score"><b>YOUR CORRECT ANSWERS</b><span><i>8</i><strong>9</strong></span></div><div className="math-keyboard">CORRECT ANSWER UNLOCKS THE NEXT QUESTION</div></div>;
}

function ScoringDemo() {
  return <div className="scoring-demo"><div className="points-row gold"><b>1ST</b><span>10</span></div><div className="points-row silver"><b>2ND</b><span>6</span></div><div className="points-row bronze"><b>3RD</b><span>3</span></div><div className="bonus-card"><b>PERFECT GAME</b><span>+2 BONUS</span></div><div className="score-equation">PLACEMENT + BONUS = TOTAL</div></div>;
}

function ScoringPage() {
  return (
    <article className="scoring-page">
      <header className="scoring-header">
        <div><p>PARIVAR PLAY</p><h1>How scoring works</h1></div>
        <p className="scoring-intro"><strong>Keep it simple.</strong> Play every game, mix with new people, and avoid repeating the same trio.</p>
      </header>

      <section className="scoring-pillars" aria-label="Four scoring pillars">
        <section className="scoring-pillar">
          <div className="pillar-heading"><span>1</span><div><h2>Participate</h2><p>Complete the game and earn your starting points.</p></div></div>
          <div className="simple-score"><strong>100</strong><span>POINTS</span></div>
          <p className="simple-explanation">Every player receives 100 points for participating.</p>
        </section>

        <section className="scoring-pillar">
          <div className="pillar-heading"><span>2</span><div><h2>Win the game</h2><p>Winners receive an extra points bonus.</p></div></div>
          <div className="simple-score winner"><strong>+50</strong><span>POINTS</span></div>
          <p className="simple-explanation">Win and add 50 points to your participation score.</p>
        </section>

        <section className="scoring-pillar modifier-pillar">
          <div className="pillar-heading"><span>3</span><div><h2>Earn multipliers</h2><p>Build a team that connects the Parivar.</p></div></div>
          <div className="simple-multipliers">
            <div><strong>MANDAL MULTIPLIER</strong><span>Your multiplier is based on the number of mandals participating.</span></div>
            <div><strong>VADIL</strong><span>Include a Vadil in your trio to increase everyone&apos;s score.</span></div>
          </div>
        </section>

        <section className="scoring-pillar badge-pillar">
          <div className="pillar-heading"><span>4</span><div><h2>Mix up your trio</h2><p>Playing with the same people reduces your score.</p></div></div>
          <div className="repeat-warning"><strong>0</strong><span>POINTS AFTER<br/>5 REPEATS</span></div>
          <p className="simple-explanation">The exact same trio earns fewer points each time and reaches zero after five repeats.</p>
        </section>
      </section>

      <footer className="scoring-footer">
        <div className="score-formula"><small>START HERE</small><strong>Participate = 100 points · Win = +50 points</strong></div>
        <div className="worked-example"><small>THEN</small><div>Multiple mandals or a Vadil?<br/><strong>Your score gets multiplied.</strong></div></div>
      </footer>
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
    case "pairs": return <PairsDemo />;
    case "math": return <MathDemo />;
    case "scoring": return <ScoringDemo />;
    case "leaderboard": return <LeaderboardDemo />;
  }
}

function InstructionCard({ slide }: { slide: Slide }) {
  return (
    <article className="instruction-card">
      <header className="game-heading"><p>{slide.eyebrow}</p><h1>{slide.title}</h1></header>
      <section className="fact-block"><h2><span>★</span> Victory condition</h2><div className="victory-pill">{slide.victory}</div>{slide.playMode && <div className={`play-mode ${slide.playMode.toLowerCase()}`}><span>{slide.playMode === "Collaborative" ? "◆" : "⚔"}</span><b>{slide.playMode}</b><small>{slide.playMode === "Collaborative" ? "Play together" : "Play against each other"}</small></div>}</section>
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
          <div className="phone-meta" aria-hidden="true">
            <b>9:36 <span className="silent-icon">◆</span></b>
            <span className="phone-status">
              <i className="cell-signal"><b /><b /><b /><b /></i>
              <i className="wifi-icon">◒</i>
              <i className="battery-icon"><b>51</b></i>
            </span>
          </div>
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

  useEffect(() => {
    if (slide.demo === "overview" || slide.demo === "scoring" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const loop = window.setInterval(() => setDemoKey((key) => key + 1), 6500);
    return () => window.clearInterval(loop);
  }, [slide.demo]);

  return (
    <main className="presentation-shell" onTouchStart={(e) => { touchStart.current = e.changedTouches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current === null) return; const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 60) go(index + (delta < 0 ? 1 : -1)); touchStart.current = null; }}>
      <nav className="topbar" aria-label="Presentation controls">
        <div className="brand"><span>P</span><b>Parivar Play</b></div>
        <div className="slide-picker"><label htmlFor="slide-select">Jump to</label><select id="slide-select" value={index} onChange={(e) => go(Number(e.target.value))}>{slides.map((item, i) => <option value={i} key={item.number}>{item.number} — {item.shortTitle}</option>)}</select></div>
        <button className="fullscreen" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter full screen">Full screen ⛶</button>
      </nav>

      <div className={`slide-frame${slide.demo === "scoring" ? " scoring-slide" : slide.demo === "overview" ? " welcome-slide" : ""}`} aria-live="polite">
        {slide.demo === "overview" ? <img className="welcome-art" src="/parivar-play-welcome.png" alt="Chalo! Madiye Ramiye Jaaniye — nine games, animated rules, one leaderboard" /> : <><div className="decor decor-top"/><div className="decor decor-right"/><div className="decor decor-bottom"/><div className="decor decor-dot"/>{slide.demo === "scoring" ? <ScoringPage /> : <><InstructionCard slide={slide} /><div key={`${slide.number}-${demoKey}`} className="demo-remount"><Phone slide={slide} replay={() => setDemoKey((key) => key + 1)} /></div></>}<span className="page-number">{slide.number}</span></>}
      </div>

      <footer className="deck-controls">
        <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">← Previous</button>
        <div className="progress" aria-label={`Slide ${index + 1} of ${slides.length}`}><div className="progress-bar"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div><span>{index + 1} / {slides.length}</span></div>
        <button onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label="Next slide">Next →</button>
      </footer>
    </main>
  );
}
