import { useCallback } from "react";

export const useVoiceSearch = (setQuery, onSearch) => {
  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // onSearch(); // auto-trigger search
      if (typeof onSearch === "function") {
  onSearch();
} else {
  console.warn("onSearch is not a function");
}

    };

    recognition.onerror = (e) => console.error("Voice error:", e);
    recognition.start();
  }, [setQuery, onSearch]);

  return startVoiceRecognition;

  
};






