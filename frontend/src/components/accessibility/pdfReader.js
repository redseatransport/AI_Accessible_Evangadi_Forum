import {speak} from "./textToSpeech";

export const readPDFText = (text) => {
  if (!text) {
    speak("No PDF text available.");
    return;
  }

  speak(text);
};
