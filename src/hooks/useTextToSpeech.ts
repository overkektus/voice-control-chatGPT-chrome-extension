import { useEffect, useState } from "react";

export const useTextToSpeech = () => {
  const [queue, setQueue] = useState([]);

  const addToQueue = (text) => {
    setQueue((prev) => [...prev, text]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const startSpeak = () => {
    if (queue.length === 0) return;

    const utterance = new SpeechSynthesisUtterance(queue[0]);
    setQueue((prev) => prev.slice(1));
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    startSpeak();
  }, [queue]);

  return {
    addToQueue,
    clearQueue,
  };
};
