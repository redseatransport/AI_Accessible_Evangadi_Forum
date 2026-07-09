import {
  speak,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
} from "./textToSpeech";

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (!section) {
    speak("Section not found.");
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    speak(section.innerText);
  }, 600);
};

const COMMANDS = [
  // Dashboard
  {
    phrases: ["dashboard", "open dashboard", "go dashboard", "go to dashboard"],
    action: (navigate) => {
      speak("Opening Dashboard");
      navigate("/dashboard");
    },
  },

  {
    phrases: ["home", "dashboard home", "go home", "open home"],
    action: (navigate) => {
      speak("Opening Home");
      navigate("/dashboard");
    },
  },

  {
    phrases: ["your topics", "my topics", "topics", "my questions"],
    action: (navigate) => {
      speak("Opening Your Topics");
      navigate("/my-questions");
    },
  },

  {
    phrases: [
      "knowledge base",
      "knowledge",
      "knowledge based",
      "documents",
      "library",
      "rag",
    ],
    action: (navigate) => {
      speak("Opening Knowledge Base");
      navigate("/rag-documents");
    },
  },

  {
    phrases: ["ask question", "new question", "post question", "ask"],
    action: (navigate) => {
      speak("Opening Ask Question");
      navigate("/questions/ask");
    },
  },

  {
    phrases: ["profile", "my profile"],
    action: (navigate) => {
      speak("Opening Profile");
      navigate("/profile");
    },
  },

  {
    phrases: ["presentation", "presentation studio"],
    action: (navigate) => {
      speak("Opening Presentation Studio");
      navigate("/presentation");
    },
  },

  {
    phrases: ["logout", "log out", "sign out"],
    action: (navigate) => {
      localStorage.clear();
      speak("Logging out");
      navigate("/auth");
    },
  },

  // Landing Page
  {
    phrases: ["overview", "read overview"],
    action: () => scrollToSection("overview"),
  },

  {
    phrases: ["features", "read features"],
    action: () => scrollToSection("features"),
  },

  {
    phrases: ["how it works", "how does it work"],
    action: () => scrollToSection("how-it-works"),
  },

  {
    phrases: ["get started", "start"],
    action: () => scrollToSection("get-started"),
  },

  {
    phrases: ["sign in", "login"],
    action: (navigate) => navigate("/auth"),
  },

  {
    phrases: ["create account", "register", "create free account", "sign up"],
    action: (navigate) => navigate("/auth"),
  },

  // Reading
  {
    phrases: ["read page", "read current page", "read"],
    action: () => speak(document.body.innerText),
  },

  {
    phrases: ["stop reading"],
    action: () => stopSpeaking(),
  },

  {
    phrases: ["pause reading"],
    action: () => pauseSpeaking(),
  },

  {
    phrases: ["resume reading"],
    action: () => resumeSpeaking(),
  },

  // Accessibility
  {
    phrases: ["high contrast"],
    action: () => {
      document.body.classList.toggle("high-contrast");
      speak("High contrast enabled");
    },
  },

  {
    phrases: ["large text"],
    action: () => {
      document.body.classList.toggle("large-text");
      speak("Large text enabled");
    },
  },

  {
    phrases: ["scroll down"],
    action: () => {
      window.scrollBy({
        top: 500,
        behavior: "smooth",
      });

      speak("Scrolling down");
    },
  },

  {
    phrases: ["scroll up"],
    action: () => {
      window.scrollBy({
        top: -500,
        behavior: "smooth",
      });

      speak("Scrolling up");
    },
  },

  {
    phrases: ["top"],
    action: () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      speak("Top of page");
    },
  },

  {
    phrases: ["bottom"],
    action: () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      speak("Bottom of page");
    },
  },

  // Help
  {
    phrases: ["help", "commands", "available commands"],
    action: () => {
      speak(
        "Available commands include Dashboard, Home, Your Topics, Knowledge Base, Ask Question, Overview, Features, Read Page, Scroll Down, High Contrast, Presentation Studio, and Logout.",
      );
    },
  },
];

export const processVoiceCommand = (transcript, navigate) => {
  const command = normalize(transcript);

  console.log("Voice:", command);

  for (const cmd of COMMANDS) {
    if (cmd.phrases.some((phrase) => command.includes(phrase))) {
      cmd.action(navigate);
      return true;
    }
  }

  speak("Sorry, I didn't understand. Say Help to hear available commands.");

  return false;
};
