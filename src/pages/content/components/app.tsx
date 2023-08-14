import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "./Button";
import Menu from "./Menu";
import SettingsModal from "./Settings/SettingsModal";
import useTranscriptEffect from "@src/hooks/useTranscriptEffect";
import { useDynamicContentObserver } from "@src/hooks/useNewElements";
import { useTextToSpeech } from "@src/hooks/useTextToSpeech";
import {
  calculateStringDifference,
  extractCompleteSentences,
} from "@src/utils";
import useKeyPress from "@src/hooks/useKeyPress";
import useKeyHold from "@src/hooks/useKeyHold";

export default function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { textContent } = useDynamicContentObserver(
    ".flex.flex-col.text-sm.dark\\:bg-gray-800",
    ".group.w-full.text-token-text-primary.border-b.border-black\\/10.dark\\:border-gray-900\\/50.bg-gray-50.dark\\:bg-\\[\\#444654\\]"
  );

  const [gptAnswerText, setGPTAnswerText] = useState<string>("");
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentencesSpeaked, setSentencesSpeaked] = useState<string[]>([]);

  const { addToQueue, stopSpeak } = useTextToSpeech();

  useEffect(() => {
    const newSentencesToSpeak = sentences.filter(
      (sentence) => sentencesSpeaked.indexOf(sentence) === -1
    );

    if (newSentencesToSpeak.length > 0) {
      setSentencesSpeaked((prevSentences) => [
        ...prevSentences,
        ...newSentencesToSpeak,
      ]);
      newSentencesToSpeak.map((sentence) => addToQueue(sentence));
    }
  }, [sentences, sentencesSpeaked]);

  useEffect(() => {
    const diff = calculateStringDifference(gptAnswerText, textContent);
    setGPTAnswerText(gptAnswerText + diff);
    const newSentences = extractCompleteSentences(textContent);
    setSentences((prevSentences) => [...prevSentences, ...newSentences]);
  }, [textContent]);

  const {
    listening,
    interimTranscript,
    transcript,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useTranscriptEffect(listening, transcript, resetTranscript);

  const startListening = () => {
    SpeechRecognition.startListening({
      language: "en-US",
      continuous: true,
      interimResults: true,
    });
  };

  // const stopListening = async () => {
  //   resetTranscript();
  //   await SpeechRecognition.stopListening();
  // };

  useKeyPress("KeyS", stopSpeak);
  // TODO: stop and copy the transcription to the ChatGPT input field without submitting
  // useKeyPress("e", )
  // TODO: cancel transcription
  // useKeyPress("KeyQ", stopListening);
  useKeyHold(
    "Space",
    startListening,
    () => SpeechRecognition.stopListening(),
    500
  );

  const handleStartButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (!listening) {
      startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  return (
    <div className="content-view flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <Button text={interimTranscript} onClick={handleStartButtonClick} />
      <Menu handleOpenSettingsModal={handleOpen} />
      <SettingsModal isOpen={open} handleClose={handleClose} />
    </div>
  );
}
