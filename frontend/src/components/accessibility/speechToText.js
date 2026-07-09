// src/components/accessibility/speechToText.js

let recognition = null;
let isListening = false;
let shouldKeepListening = false;
let lastTranscript = "";

export const requestMicrophonePermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({audio: true});
    return true;
  } catch (error) {
    console.error("Microphone permission denied:", error);
    return false;
  }
};

export const initSpeechToText = (onResult, onError, onStatusChange) => {
  if (recognition) return recognition;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return null;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    isListening = true;

    if (onStatusChange) {
      onStatusChange(true);
    }

    console.log("🎤 Listening...");
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];

    const transcript = result[0].transcript.trim();
    const confidence = result[0].confidence ?? 1;

    if (!result.isFinal) return;

    if (confidence < 0.45) {
      console.log("Low confidence:", confidence);
      return;
    }

    if (transcript === lastTranscript) {
      return;
    }

    lastTranscript = transcript;

    console.log("Heard:", transcript, "Confidence:", confidence.toFixed(2));

    if (onResult) {
      onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    console.log("Speech Error:", event.error);

    switch (event.error) {
      case "no-speech":
        // Ignore
        break;

      case "audio-capture":
        alert("No microphone detected.");
        shouldKeepListening = false;
        break;

      case "not-allowed":
        alert("Microphone permission denied.");
        shouldKeepListening = false;
        break;

      default:
        console.log(event.error);
    }

    if (onError) {
      onError(event.error);
    }
  };

  recognition.onend = () => {
    isListening = false;

    if (onStatusChange) {
      onStatusChange(false);
    }

    console.log("Recognition stopped");

    if (shouldKeepListening) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch {}
      }, 300);
    }
  };

  return recognition;
};

export const startListening = () => {
  if (!recognition) return;

  shouldKeepListening = true;

  if (isListening) return;

  try {
    recognition.start();
  } catch (error) {
    console.log(error);
  }
};

export const stopListening = () => {
  shouldKeepListening = false;
  lastTranscript = "";

  if (!recognition) return;

  try {
    recognition.stop();
  } catch {}
};

export const toggleListening = () => {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
};

export const getListeningState = () => isListening;
