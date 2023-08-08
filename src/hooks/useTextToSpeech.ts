import { useState, useEffect } from "react";

export function useTextToSpeech() {
  const [textQueue, setTextQueue] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (textPart) => {
    if (!window.speechSynthesis) {
      console.error("SpeechSynthesis API is not supported in this browser.");
      return;
    }

    setTextQueue((prevQueue) => [...prevQueue, textPart]);

    if (!isSpeaking) {
      startSpeaking();
    }
  };

  const startSpeaking = () => {
    if (textQueue.length > 0) {
      const utterance = new SpeechSynthesisUtterance(textQueue[0]);
      setIsSpeaking(true);

      utterance.onend = () => {
        setTextQueue((prevQueue) => prevQueue.slice(1));
        if (textQueue.length > 1) {
          startSpeaking();
        } else {
          setIsSpeaking(false);
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setTextQueue([]);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isSpeaking && textQueue.length === 0) {
      setIsSpeaking(false);
    }
  }, [isSpeaking, textQueue]);

  return {
    isSpeaking,
    speak,
    stopSpeaking,
  };
}

export default useTextToSpeech;
