import { useEffect, useState } from "react";
import "./App.css";
import FontMatchQuestion from "./pages/FontMatchQuestion";
import QuizIntro from "./pages/QuizIntro";
import LetterQuiz from "./pages/LetterQuiz";
import FontTypesPage from "./pages/FontTypesPage";
import PartsOfLetter from "./pages/PartsOfLetter";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [page, setPage] = useState("home");

  /* --------------- typing-animation state (unchanged) --------------- */
  const message =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quam, non mollis erat aliquam a.";
  const fontCycle = ["georgia", "montserrat", "pacifico", "firacode", "anton"];
  const [fontIndex, setFontIndex] = useState(0);
  const font = fontCycle[fontIndex];
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isPaused || page !== "home") return;
    const delay = deleting ? 30 : 60;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (index < message.length) {
          setDisplayText(message.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setDeleting(true);
            setIsPaused(false);
          }, 1000);
        }
      } else {
        if (index > 0) {
          setDisplayText(message.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setFontIndex((prev) => (prev + 1) % fontCycle.length);
          setDeleting(false);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, deleting, isPaused, page, fontCycle.length]);

  /* ---------------------------- ROUTES ---------------------------- */
  let content;
  if (page === "fontTypes") content = <FontTypesPage go={setPage} />;
  else if (page === "partsLetter") content = <PartsOfLetter go={setPage} />;
  else if (page === "quizIntro") content = <QuizIntro onStart={(next) => setPage(next)} />;
  else if (page === "quiz1") content = <FontMatchQuestion onNext={() => setPage("quiz2")} />;
  else if (page === "quiz2") content = <LetterQuiz onNext={() => setPage("results")} />;
  else if (page === "results") content = <ResultsPage onRestart={() => setPage("home")} />;
  else {
    content = (
      <section className="hero">
        <h1>Anatomy of a Font</h1>
        <p className={`typing-text ${font}`}>{displayText}</p>
      </section>
    );
  }

  return (
    <Layout
      onBack={() => setPage("home")}
      onFontTypes={() => setPage("fontTypes")}
      go={setPage}
    >
      {content}
    </Layout>
  );
}

/* ────────────────────── Reusable layout ─────────────────────── */
function Layout({ children, onBack, onFontTypes, go }) {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <button onClick={onFontTypes}>Font Types</button>
          <button onClick={() => go("partsLetter")}>Parts of a Letter</button>
          {/* <button className="learn-btn" onClick={onBack}>Back</button> */}
          <button className="quiz-btn" onClick={() => go("quizIntro")}>Quiz Yourself</button>
        </nav>
      </header>
      {children}
    </div>
  );
}

export default App;
