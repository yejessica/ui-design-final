import { useEffect, useState } from "react";
import "./App.css";
import FontMatchQuestion from "./pages/FontMatchQuestion";
import QuizIntro from "./pages/QuizIntro";
import LetterQuiz from "./pages/LetterQuiz";
import FontTypesPage from "./pages/FontTypesPage";   // ← NEW

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
  if (page === "fontTypes") return <FontTypesPage go={setPage} />;          // ← NEW

  if (page === "quizIntro")
    return <QuizIntro onStart={(next) => setPage(next)} />;

  if (page === "quiz1")
    return (
      <Layout onBack={() => setPage("home")} onFontTypes={() => setPage("fontTypes")}>
        <FontMatchQuestion onNext={() => setPage("quiz2")} />
      </Layout>
    );

  if (page === "quiz2")
    return (
      <Layout onBack={() => setPage("home")} onFontTypes={() => setPage("fontTypes")}>
        <LetterQuiz />
      </Layout>
    );

  /* --------------------------- HOME PAGE -------------------------- */
  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <button onClick={() => setPage("fontTypes")}>Font Types</button> {/* ← CHANGED */}
          <button onClick={() => setPage("partsLetter")}>Parts of a Letter</button>
          <button className="learn-btn">Learn</button>
          <button className="quiz-btn" onClick={() => setPage("quizIntro")}>
            Quiz Yourself
          </button>
        </nav>
      </header>

      <section className="hero">
        <h1>Anatomy of a Font</h1>
        <p className={`typing-text ${font}`}>{displayText}</p>
      </section>
    </div>
  );
}

/* ────────────────────── small reusable layout ─────────────────────── */
function Layout({ children, onBack, onFontTypes }) {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <button onClick={onFontTypes}>Font Types</button>  {/* ← CHANGED */}
          <a href="#">Parts of a Letter</a>
          <button className="learn-btn" onClick={onBack}>
            Back
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
}

export default App;