export default function FontInfoModal({
  open,
  onClose,
  go = () => {},
  title = "Font Name",
  about = "About copy goes here.",
  usageLines = ["Usage info"],
  sampleImage = "",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative z-50 mx-4 h-[80vh] max-w-5xl w-full
                   bg-white rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Content */}
        <div className="flex flex-col h-full overflow-y-auto p-8 space-y-6 items-stretch">
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* About */}
          <section className="bg-blue-100 rounded-xl p-5 space-y-2 text-base text-left">
            <h2 className="font-semibold">ABOUT</h2>
            <p>{about}</p>
          </section>

          {/* Use */}
          <section className="bg-blue-200 rounded-xl p-5 space-y-3 text-base text-left">
            <h2 className="font-semibold">USE</h2>
            <p>{usageLines[0]}</p>
            <ul className="list-disc list-inside space-y-1">
              {usageLines.slice(1).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>

          {/* Image below sections */}
          <div className="flex items-center justify-center w-full p-4">
            {sampleImage ? (
              <img
                src={sampleImage}
                alt={`${title} specimen`}
                className="max-h-48 object-contain"
              />
            ) : (
              <span className="text-gray-400 italic">[Add specimen]</span>
            )}
          </div>
        </div>

        {/* Go-back button */}
        <button
          onClick={onClose}
          className="
            absolute bottom-6 right-6
            bg-transparent border border-[#888] rounded-[12px]
            px-[0.8rem] py-[0.3rem] text-base font-inherit
            cursor-pointer transition-colors duration-200 ease
            hover:bg-[#c0d0dd]
          "
        >
          go back
        </button>
      </div>
    </div>
  );
}
