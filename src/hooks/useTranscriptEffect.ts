import { useEffect, useRef } from "react";

export default function useTranscriptEffect(
  listening: boolean,
  transcript: string,
  resetTranscript: () => void
) {
  const textarea = useRef(document.querySelector("textarea"));
  const sendButton = useRef<HTMLButtonElement>(
    document.querySelector("button[disabled]")
  );

  useEffect(() => {
    if (listening) return;
    textarea.current.value = transcript;
    textarea.current.dispatchEvent(new Event("input", { bubbles: true }));
    sendButton.current.click();
    resetTranscript();
  }, [listening, transcript, resetTranscript]);
}
