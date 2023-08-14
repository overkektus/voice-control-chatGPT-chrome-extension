import "regenerator-runtime/runtime";
import { useContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "./Button";
import Menu from "./Menu";
import SettingsModal from "./Settings/SettingsModal";
import useSendTranscript from "@src/hooks/useSendTranscript";
import { useDynamicContentObserver } from "@src/hooks/useNewElements";
import { useTextToSpeech } from "@src/hooks/useTextToSpeech";
import {
  calculateStringDifference,
  extractCompleteSentences,
} from "@src/utils";
import useKeyPress from "@src/hooks/useKeyPress";
import useKeyHold from "@src/hooks/useKeyHold";
import { SettingsContext } from "./settingsConext";
import React from "react";

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

  const { addToQueue, stopSpeak, setMuteState } = useTextToSpeech();
  const { isSpeechOn } = useContext(SettingsContext);

  useEffect(() => {
    setMuteState(!isSpeechOn);
  }, [isSpeechOn]);

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

  const [isListenFinish, setIsListenFinish] = useState(false);
  const [isTranscriptForSend, setIsTranscriptForSend] = useState(false);
  useSendTranscript(
    isListenFinish,
    isTranscriptForSend,
    transcript,
    resetTranscript
  );

  const startListening = () => {
    console.log("start listening");
    resetTranscript();
    setIsListenFinish(false);
    setIsTranscriptForSend(true);
    SpeechRecognition.startListening({
      language: "en-US",
      continuous: true,
      interimResults: true,
    });
  };

  const stopListening = async () => {
    console.log("stop listening");
    setIsListenFinish(true);
    await SpeechRecognition.stopListening();
  };

  const cancelListening = async () => {
    await SpeechRecognition.abortListening();
    resetTranscript();
  };

  const stopAndPasteTranscription = () => {
    if (!listening) return;
    setIsTranscriptForSend(false);
    stopListening();
  };

  useKeyPress("KeyS", stopSpeak);
  useKeyPress("KeyE", stopAndPasteTranscription);
  useKeyPress("KeyQ", cancelListening);
  useKeyHold("Space", startListening, stopListening, 500);

  const handleStartButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (!listening) {
      startListening();
    } else {
      stopListening();
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
