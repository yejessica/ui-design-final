import React, { useState, useEffect } from "react";
import "./App.css";

import FontTypesPage from "./pages/FontTypesPage";
import QuizIntro from "./pages/QuizIntro";
import FontMatchQuestion from "./pages/FontMatchQuestion";
import LetterQuiz from "./pages/LetterQuiz";
import ResultsPage from "./pages/ResultsPage";
import PartsOfLetter from "./pages/PartsOfLetter";
import FontTypeUsageDrag from "./pages/FontTypeUsageDrag";
import IdentifyFont from "./pages/IdentifyFont";
import ImageMatchQuestion from "./pages/ImageMatchQuestion";

function App() {
  const [page, setPage] = useState("home");
  const [typingDone, setTypingDone] = useState(false);
  const go = (target) => setPage(target);

  useEffect(() => {
    if (page === "home") {
      setTypingDone(false);
    }
  }, [page]);

  let content;
  switch (page) {
    case "fontTypes":
      content = <FontTypesPage go={go} />;
      break;

    case "partsLetter":
      content = <PartsOfLetter go={setPage} />;
      break;

    case "quizIntro":
      content = <QuizIntro onStart={go} />;
      break;

    case "quiz1":
      content = <FontMatchQuestion onNext={() => go("quiz2")} />;
      break;

    case "quiz2":
      content = <LetterQuiz onNext={() => go("quiz3")} />;
      break;
    
    case "quiz3":
      content = <FontTypeUsageDrag onNext={() => go("quiz4")} />;
      break;

    case "quiz4":
      content = <IdentifyFont onNext={() => go("quiz5")} />;
      break;

    case "quiz5":
      content = <ImageMatchQuestion onNext={() => go("results")} />;
      break;

    case "results":
      content = <ResultsPage 
        onRestart={() => go("home")} 
        onReturnHome={() => go("home")} 
      />;
      break;

    default:
      content = (
        <section className="hero">
          <div className="definition-block">
            <h1>font•anatomy</h1>
            <p className="ipa">
              <em>/ˈfänt əˈnadəmē/</em>
            </p>
            <p className="noun">noun</p>
          </div>

          <div className="typing-container">
            <Typing
              text={`the anatomy of type refers to the visual elements that come together to form the letterforms in a typeface.\n\neach letterform comprises of various components.`}
              onComplete={() => setTypingDone(true)}
            />
          </div>

          {typingDone && (
            <div className="hero-actions">
              <button
                className="start-button"
                onClick={() => go("fontTypes")}
              >
                start learning
              </button>
            </div>
          )}
        </section>
      );
  }

  return (
    <div className="App">
      <header className="App-header nav">
        <div className="nav-left">
          <button className="logo" onClick={() => go("home")}>
            f • a
          </button>
        </div>
        <div className="nav-right">
          <button onClick={() => go("fontTypes")}>types of fonts</button>
          <button onClick={() => go("partsLetter")}>parts of a letter</button>
          <button onClick={() => go("quizIntro")}>quiz</button>
        </div>
      </header>
      {content}
    </div>
  );
}

const Typing = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayedText((t) => t + text[idx]);
        setIdx(idx + 1);
      }, 30);
      return () => clearTimeout(t);
    }
  }, [idx, text]);

  useEffect(() => {
    if (idx === text.length && onComplete) {
      onComplete();
    }
  }, [idx, text.length, onComplete]);

  return <p className="typing">{displayedText}</p>;
};

export default App;
