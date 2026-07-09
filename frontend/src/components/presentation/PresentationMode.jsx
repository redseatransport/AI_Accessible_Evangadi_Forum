import {useState} from "react";

import usePresentationKeyboard from "./presentationKeyboard";
import {
  readSlide,
  repeatSlide,
  pauseReading,
  resumeReading,
  stopReading,
} from "./presentationReader";

import defaultSlides from "./presentationSlides";

export default function PresentationMode({slides = [], onClose}) {
  const presentationSlides = slides.length > 0 ? slides : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = presentationSlides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < presentationSlides.length - 1) {
      stopReading();
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      stopReading();
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const togglePause = () => {
    if (paused) {
      resumeReading();
    } else {
      pauseReading();
    }

    setPaused(!paused);
  };

  usePresentationKeyboard({
    nextSlide,
    previousSlide,
    readSlide: () => readSlide(slide),
    pauseResume: togglePause,
    exitPresentation: () => {
      stopReading();
      onClose();
    },
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 0 25px rgba(0,0,0,.35)",
        }}
      >
        <button
          onClick={() => {
            stopReading();
            onClose();
          }}
          style={{
            float: "right",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          ✖ Close
        </button>

        <h1
          style={{
            color: "#0066ff",
            marginBottom: "10px",
          }}
        >
          {slide.title}
        </h1>

        <h3>
          Slide {currentSlide + 1} of {presentationSlides.length}
        </h3>

        <div
          style={{
            height: "10px",
            background: "#ddd",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: `${
                ((currentSlide + 1) / presentationSlides.length) * 100
              }%`,
              height: "100%",
              background: "#0066ff",
            }}
          />
        </div>

        <div
          style={{
            minHeight: "250px",
            fontSize: "22px",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        >
          {slide.content}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <button onClick={previousSlide}>⬅ Previous</button>

          <button onClick={() => readSlide(slide)}>🔊 Read</button>

          <button onClick={togglePause}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>

          <button onClick={() => repeatSlide(slide)}>🔁 Repeat</button>

          <button onClick={nextSlide}>Next ➡</button>
        </div>

        <hr style={{margin: "30px 0"}} />

        <h3>Keyboard Shortcuts</h3>

        <ul
          style={{
            lineHeight: "2",
          }}
        >
          <li>⬅ Left Arrow — Previous Slide</li>
          <li>➡ Right Arrow — Next Slide</li>
          <li>Enter — Read Current Slide</li>
          <li>Space — Pause / Resume Reading</li>
          <li>Esc — Exit Presentation</li>
        </ul>
      </div>
    </div>
  );
}
