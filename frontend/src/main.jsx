import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import "./index.css";

import App from "./App";

import {speak} from "./components/accessibility/textToSpeech";
import {enableHoverReader} from "./components/accessibility/hoverReader";

window.addEventListener("load", () => {
  setTimeout(() => {
    enableHoverReader();
  }, 1500);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Test the speech engine once the page has loaded.
window.addEventListener("load", () => {
  setTimeout(() => {
    speak("Accessibility assistant is ready.");
  }, 1000);
});
