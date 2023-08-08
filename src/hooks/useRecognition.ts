import { useEffect } from "react";
import SpeechRecognition from "react-speech-recognition";

export default function useRecognition(listening: boolean) {
  useEffect(() => {
    let timeoutId = null;

    function handleSpaceDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (event.code === "Space") {
        timeoutId = setTimeout(() => {
          if (!listening) {
            SpeechRecognition.startListening({
              language: "en-US",
              continuous: true,
              interimResults: true,
            });
          }
        }, 500);
      }
    }

    function handleSpaceUp(event: KeyboardEvent) {
      if (event.code === "Space") {
        clearTimeout(timeoutId);
        SpeechRecognition.stopListening();
      }
    }

    window.addEventListener("keydown", handleSpaceDown);
    window.addEventListener("keyup", handleSpaceUp);

    return () => {
      window.removeEventListener("keydown", handleSpaceDown);
      window.removeEventListener("keyup", handleSpaceUp);
    };
  }, [listening]);
}
