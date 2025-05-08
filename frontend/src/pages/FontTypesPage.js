import { useState } from "react"
import { ArrowRight } from "lucide-react"
import FontInfoModal from "./FontInfoModal"
import sansImage from "../assets/sans.png"
import serifImage from "../assets/serif.png"
import handwrittenImage from "../assets/handwritten.jpg"
import scriptImage from "../assets/script.png"
import displayImage from "../assets/display.png"
import monoImage from "../assets/mono.png"

export default function FontTypesPage({ go }) {
  const [openId, setOpenId] = useState(null)
  const [viewedCards, setViewedCards] = useState(new Set())

  const handleCardClick = (cardId) => {
    setOpenId(cardId)
    setViewedCards(prev => new Set([...prev, cardId]))
  }

  const CARDS = [
    {
      id: "sans",
      label: "Sans Serif",
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      extra: "font-sans",
      about:
        "Sans serif means 'without' serifs. Sans serif typefaces are clean, versatile and flexible. They're great for logos and headlines but can be used in body text just as easily.",
      usage: [
        "Sans serif fonts are incredibly versatile. They can be bold and impactful in heavier weights, or minimal and airy in lighter weights.",
        "Use bold, heavy sans serifs to call attention to something in a headline or announcement.",
        "Use lightweight sans serifs as accents to create a serene, minimal feel.",
      ],
      specimen: sansImage,
    },
    {
      id: "serif",
      label: "Serif",
      fontFamily: 'Georgia, "Times New Roman", serif',
      extra: "font-serif",
      about:
        "The word 'serif' comes from an old Dutch word for 'line'—serifs are the little strokes at the ends of letters. Serifs add a sense of tradition and can improve legibility, especially in print.",
      usage: [
        "Serif fonts work well in printed materials and long-form reading; their classic look is ideal when you want a sense of tradition or authority.",
        "Use serif fonts in magazines, novels, or formal invitations for a refined feel.",
        "Pair serifs with clean sans-serif headings to create balanced hierarchy.",
      ],
      specimen: serifImage,
    },
    {
      id: "hand",
      label: "Handwritten",
      fontFamily: '"Indie Flower","Comic Sans MS",cursive',
      extra: "",
      about:
        "Handwritten fonts mimic the appearance of real handwriting. They feel organic, imperfect, and personal, adding a human touch to digital designs.",
      usage: [
        "These fonts evoke creativity, personalization, and warmth—perfect for greeting cards or personal notes.",
        "Use in greeting cards, playful logos, or children's products to add warmth.",
        "Avoid long paragraphs in handwritten fonts; reserve them for short, expressive text.",
      ],
      specimen: handwrittenImage,
    },
    {
      id: "script",
      label: "Script",
      fontFamily: '"Dancing Script","Brush Script MT",cursive',
      extra: "",
      about:
        "Formal script fonts are highly ornate and baroque, imitating cursive handwriting, and instantly recognizable by their flowing, swirly strokes.",
      usage: [
        "Script fonts are best used where there's room—their legibility suffers if scaled too small.",
        "They shine in wordmark logos, labels, invitations, and luxury branding.",
        "Combine scripts with simple sans-serif body text to avoid visual overload.",
      ],
      specimen: scriptImage,
    },
    {
      id: "display",
      label: "Display",
      fontFamily: '"Press Start 2P","Courier New",monospace',
      extra: "tracking-widest",
      about:
        "Display (decorative) fonts are designed for larger sizes—posters, signage, headlines—and are rarely used for long reading but are highly striking and original.",
      usage: [
        "Use display fonts when you want to make a visual impact—posters, signage, logos.",
        "Because readability drops at small sizes, keep them in headlines or short calls-to-action.",
        "Pair with a neutral body font so the display type can take center stage.",
      ],
      specimen: displayImage,
    },
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

  return (
    <section className="hero min-h-screen relative">
      <h1 className="mt-8 text-center text-3xl lg:text-4xl font-sans text-gray-800">
        There are six main types of fonts.
      </h1>

      <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{ fontFamily: card.fontFamily }}
            className={`flex items-center justify-center p-8 
               rounded-sm shadow-sm text-2xl md:text-3xl text-gray-700
               transition hover:shadow-lg active:scale-95
               ${viewedCards.has(card.id) ? 'bg-[#d3dee7]' : 'bg-gray-100'}
               ${card.extra}`}
          >
            {card.label}
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-lg font-sans text-gray-800 italic">
        click on each to learn more.
      </p>

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

      {/* Floating arrow to the "Parts of Letter" page */}
      <button
        onClick={() => go("quiz4")}
        className="fixed right-4 top-1/2 transform -translate-y-1/2
                   bg-blue-600 text-white p-3 rounded-full shadow-lg
                   hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Go to Parts of Letter page"
      >
        <ArrowRight size={24} />
      </button>
    </section>
  )
}
