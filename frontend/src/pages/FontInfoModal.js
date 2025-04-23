/**
 * FontInfoModal
 * -----------------------------------------------------------------
 * Smaller-type variant.
 */
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
          className="relative z-50 mx-4 h-[90vh] max-w-6xl w-full
                     bg-white rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Content */}
          <div className="flex h-full flex-col lg:flex-row">
            {/* Left column */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <h1 className="text-2xl font-bold">{title}</h1>
  
              {/* About */}
              <section className="bg-blue-100 rounded-xl p-5 space-y-2 text-2xl">
                <h2 className="font-semibold">ABOUT</h2>
                <p>{about}</p>
              </section>
  
              {/* Use */}
              <section className="bg-blue-200 rounded-xl p-5 space-y-3 text-2xl">
                <h2 className="font-semibold">USE</h2>
                <p>{usageLines[0]}</p>
                <ul className="list-disc list-inside space-y-1">
                  {usageLines.slice(1).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            </div>
  
            {/* Right column */}
            <div className="hidden lg:flex items-center justify-center w-80 p-8">
              {sampleImage ? (
                <img
                  src={sampleImage}
                  alt={`${title} specimen`}
                  className="max-h-[70%] object-contain"
                />
              ) : (
                <span className="text-gray-400 italic">[Add specimen]</span>
              )}
            </div>
          </div>
  
          {/* Go-back button */}
          <button
            className="absolute bottom-6 right-6 p-14
                       bg-blue-600 text-white font-semibold leading-tight
                       hover:bg-blue-700"
            onClick={onClose}
          >
            Go<br />back
          </button>
        </div>
      </div>
    );
  }
  