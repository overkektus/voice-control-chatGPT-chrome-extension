import { useEffect, useState } from "react";

interface TextToSpeechHootProps {
  voice: SpeechSynthesisVoice;
  volume?: number;
  rate?: number;
}

export const useTextToSpeech = ({
  voice,
  volume,
  rate,
}: TextToSpeechHootProps) => {
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
      if (voice) {
        utterance.volume = volume;
        utterance.rate = rate;
        utterance.voice = voice;
        utterance.lang = voice.lang;
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
