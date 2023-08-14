import { useEffect, useState } from "react";

export const useTextToSpeech = () => {
  const [queue, setQueue] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [mute, setMute] = useState(false);

  const addToQueue = (text) => {
    setQueue((prev) => [...prev, text]);
  };

  const startSpeak = () => {
    if (queue.length === 0) return;

    if (speaking && !mute) {
      const utterance = new SpeechSynthesisUtterance(queue[0]);
      const availableVoices = speechSynthesis.getVoices();
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === "Саманта"
      );
      if (selectedVoice) {
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }
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

  const setMuteState = (isMuted) => {
    setMute(isMuted);
    if (speaking && isMuted) {
      stopSpeak();
    }
  };

  useEffect(() => {
    setSpeaking(true);
    startSpeak();
  }, [queue]);

  return {
    addToQueue,
    stopSpeak,
    mute,
    setMuteState,
  };
};
