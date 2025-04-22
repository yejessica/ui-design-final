import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import FontMatchQuestion from './FontMatchQuestion';

function App() {
  const message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum orci quam, non mollis erat aliquam a.';

  const fontCycle = ['georgia', 'montserrat', 'pacifico', 'firacode', 'anton'];
  const [fontIndex, setFontIndex] = useState(0);
  const font = fontCycle[fontIndex];

  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const delay = deleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (index < message.length) {
          setDisplayText(message.slice(0, index + 1));
          setIndex(index + 1);
        } else if (index === message.length) {
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
  }, [index, deleting, isPaused]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="nav">
          <a href="#">Font Types</a>
          <a href="#">Parts of a Letter</a>
          <button className="learn-btn">Learn</button>
          <button className="quiz-btn">Quiz Yourself</button>
        </nav>
      </header>

      <section className="hero">
        <h1>Anatomy of a Font</h1>
        <p className={`typing-text ${font}`}>{displayText}</p>
      </section>
      <FontMatchQuestion />
    </div>
  );
}

export default App;
