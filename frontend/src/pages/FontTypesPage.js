import { useState } from "react";
import FontInfoModal from "./FontInfoModal";
import sansImage from './../assets/sans.png';
import serifImage from "./../assets/serif.png";
import handwrittenImage from "./../assets/handwritten.jpg"
import scriptImage from "./../assets/script.png"
import displayImage from "./../assets/display.png"
import monoImage from "./../assets/mono.png"

export default function FontTypesPage({ go }) {
  const [openId, setOpenId] = useState(null);

  /* --------------- card + modal content --------------- */
  const CARDS = [
    /* ─────────────────────────── 1. Sans Serif ─────────────────────────── */
    {
      id: "sans",
      label: "Sans Serif",
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      extra: "font-sans",
      about:
        "Sans serif means ‘without’ serifs. Sans serif typefaces are typically favored by brands because they’re accessible and flexible. They’re great for logos and headlines but can be used in body text just as easily.",
      usage: [
        "Sans serif fonts are incredibly versatile. They can be bold and striking in heavier weights, or minimal and airy in lighter weights.",
        "Use bold, heavy sans serifs to call attention to something in a headline or announcement.",
        "Use lightweight sans serifs as accents to create a serene, minimal feel.",
      ],
      specimen: sansImage,
    },
  
    /* ───────────────────────────── 2. Serif ────────────────────────────── */
    {
      id: "serif",
      label: "Serif",
      fontFamily: 'Georgia, "Times New Roman", serif',
      extra: "font-serif",
      about:
        "The word ‘serif’ comes from an old Dutch word for a dash or line, so serif fonts are defined by the small strokes at the ends of letters. They bring a timeless elegance to a brand and can improve legibility, especially in print.",
      usage: [
        "Serif fonts work well in printed materials and long-form reading. Their classic, sophisticated look is ideal when you want a sense of tradition or authority.",
        "Use serif fonts in magazines, novels, or formal invitations for a refined feel.",
        "Pair serifs with clean sans-serif headings to create balanced hierarchy.",
      ],
      specimen: serifImage,
    },
  
    /* ───────────────────────── 3. Handwritten ──────────────────────────── */
    {
      id: "hand",
      label: "Handwritten",
      fontFamily: '"Indie Flower","Comic Sans MS",cursive',
      extra: "",
      about:
        "Handwritten fonts mimic the appearance of real hand lettering. They feel organic, imperfect, and personal, adding a human touch to digital designs.",
      usage: [
        "These fonts evoke creativity, personalization, and informality. They’re ideal for conveying emotions and establishing a more personal connection with the audience.",
        "Use in greeting cards, playful logos, or children’s products to add warmth.",
        "Avoid long paragraphs in handwritten fonts; reserve them for short, expressive text.",
      ],
      specimen: handwrittenImage,
    },
  
    /* ───────────────────────────── 4. Script ───────────────────────────── */
    {
      id: "script",
      label: "Script",
      fontFamily: '"Dancing Script","Brush Script MT",cursive',
      extra: "",
      about:
        "Formal script fonts are highly ornate and baroque in design. They’re distinguished, official, and instantly recognizable by their flowing, swirly strokes.",
      usage: [
        "Script fonts are best used where there’s room—their legibility suffers if scaled too small.",
        "They shine in wordmark logos, labels, invitations, and luxury branding.",
        "Combine scripts with simple sans-serif body text to avoid visual overload.",
      ],
      specimen: scriptImage,
    },
  
    /* ──────────────────────────── 5. Display ──────────────────────────── */
    {
      id: "display",
      label: "Display",
      fontFamily: '"Press Start 2P","Courier New",monospace',
      extra: "tracking-widest",
      about:
        "Display (decorative) fonts are designed for larger applications or digital displays. They’re rarely used for long reading but are highly striking and original.",
      usage: [
        "Use display fonts when you want to make a visual impact—posters, signage, logos.",
        "Because readability drops at small sizes, keep them in headlines or short calls-to-action.",
        "Pair with a neutral body font so the display type can take center stage.",
      ],
      specimen: displayImage,
    },
  
    /* ────────────────────────── 6. Monospaced ─────────────────────────── */
    {
      id: "mono",
      label: "Monospaced",
      fontFamily: '"Courier New",monospace',
      extra: "font-mono",
      about:
        "Monospaced (typewriter) fonts give every character the same horizontal space, creating a uniform, grid-like appearance.",
      usage: [
        "Perfect where clarity, precision, and uniformity are needed—think code editors, tabular data, or technical documents.",
        "They evoke a utilitarian, retro tech feel in branding or design.",
        "Use sparingly in long prose; instead highlight snippets of code or commands.",
      ],
      specimen: monoImage,
    },
  ];
  

  /* --------------- page layout --------------- */
  return (
    <div className="relative min-h-screen px-6 py-6 lg:px-16 lg:py-10">
      {/* ── TOP-LEFT NAVIGATION ──────────────────────────────────────── */}
      <nav className="flex gap-4">
        {/* HOME button added here */}
        <button
          className="rounded-md px-5 py-2 text-sm font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200"
          onClick={() => go("home")}
        >
          Home
        </button>

        {/* current page (Font Types) marked active */}
        <button
          className="rounded-md px-5 py-2 text-sm font-semibold bg-blue-200 text-blue-900"
          onClick={() => go("fontTypes")}
        >
          Font Types
        </button>

        <button
          className="rounded-md px-5 py-2 text-sm font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200"
          onClick={() => go("partsLetter")}
        >
          Parts of a Letter
        </button>

        <button
          className="rounded-md px-5 py-2 text-sm font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200"
          onClick={() => go("quizIntro")}
        >
          Quiz
        </button>
      </nav>

      {/* heading */}
      <h1 className="mt-8 text-center text-3xl lg:text-4xl font-serif text-blue-600">
        There are six main types of fonts.
      </h1>

      {/* grid */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => setOpenId(card.id)}
            style={{ fontFamily: card.fontFamily }}
            className={`flex items-center justify-center h-60 bg-gray-100
                        rounded-sm shadow-sm text-2xl md:text-3xl text-gray-700
                        transition hover:shadow-lg active:scale-95
                        ${card.extra}`}
          >
            {card.label}
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-lg text-blue-900 italic">
        click on each to learn more.
      </p>

      {/* modal */}
      {CARDS.map((c) => (
        <FontInfoModal
          key={c.id}
          open={openId === c.id}
          onClose={() => setOpenId(null)}
          go={go}
          title={c.label}
          about={c.about}
          usageLines={c.usage}
          sampleImage={c.specimen}
        />
      ))}
    </div>
  );
}