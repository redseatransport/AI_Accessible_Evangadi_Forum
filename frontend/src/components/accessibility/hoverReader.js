import {speak, stopSpeaking} from "./textToSpeech";

let enabled = false;
let currentElement = null;

const readableTags = [
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "SPAN",
  "BUTTON",
  "A",
  "LABEL",
  "LI",
];

function handleMouseOver(event) {
  if (!enabled) return;

  const element = event.target;

  if (!readableTags.includes(element.tagName)) return;

  const text = element.innerText?.trim();

  if (!text) return;

  if (currentElement === element) return;

  currentElement = element;

  stopSpeaking();
  speak(text);
}

export function enableHoverReader() {
  if (enabled) return;

  enabled = true;
  document.addEventListener("mouseover", handleMouseOver);
}

export function disableHoverReader() {
  enabled = false;
  currentElement = null;

  stopSpeaking();

  document.removeEventListener("mouseover", handleMouseOver);
}
