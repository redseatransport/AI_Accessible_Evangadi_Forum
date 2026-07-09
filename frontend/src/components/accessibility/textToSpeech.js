// frontend/src/components/accessibility/textToSpeech.js

let currentUtterance = null;

const synth = window.speechSynthesis;

export const stopSpeaking = () => {
  synth.cancel();
};

export const pauseSpeaking = () => {
  synth.pause();
};

export const resumeSpeaking = () => {
  synth.resume();
};

export const getVoices = () => {
  return synth.getVoices();
};

export const speak = (
  text,
  {rate = 1, pitch = 1, volume = 1, lang = "en-US", interrupt = true} = {},
) => {
  if (!text) return;

  if (interrupt) {
    synth.cancel();
  }

  currentUtterance = new SpeechSynthesisUtterance(text);

  currentUtterance.rate = rate;
  currentUtterance.pitch = pitch;
  currentUtterance.volume = volume;
  currentUtterance.lang = lang;

  const voices = synth.getVoices();

  const englishVoice =
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en"));

  if (englishVoice) {
    currentUtterance.voice = englishVoice;
  }

  synth.speak(currentUtterance);
};

window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

