import "regenerator-runtime/runtime";
import { MutableRefObject, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "./Button";
import Menu from "./Menu";

export default function App() {
  const textarea = useRef(document.querySelector("textarea"));
  const sendButton: MutableRefObject<HTMLButtonElement> = useRef(
    document.querySelector("button[disabled]")
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
  } = useSpeechRecognition();

  const handleStartStopRecognition = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (!listening) {
      SpeechRecognition.startListening({
        language: "en-US",
        continuous: true,
        interimResults: true,
      });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    let timeoutId = null;

    function handleSpaceDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (event.code == "Space") {
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
      if (event.code == "Space") {
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
  }, []);

  useEffect(() => {
    textarea.current.value = transcript;
    textarea.current.dispatchEvent(new Event("input", { bubbles: true }));
    sendButton.current.click();
    resetTranscript();
  }, [listening]);

  return (
    <div className="content-view flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <Button text={interimTranscript} onClick={handleStartStopRecognition} />
      <Menu />
    </div>
  );
}
