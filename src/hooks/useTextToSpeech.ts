import { useEffect, useState } from "react";

export const useTextToSpeech = () => {
  const [queue, setQueue] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const addToQueue = (text) => {
    setQueue((prev) => [...prev, text]);
  };

  const startSpeak = () => {
    if (queue.length === 0) return;

    if (speaking) {
      const utterance = new SpeechSynthesisUtterance(queue[0]);
      setQueue((prev) => prev.slice(1));
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeak = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  useEffect(() => {
    setSpeaking(true);
    startSpeak();
  }, [queue]);

  return {
    addToQueue,
    stopSpeak,
  };
};
