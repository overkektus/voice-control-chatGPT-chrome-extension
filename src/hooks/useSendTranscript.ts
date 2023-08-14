import { useEffect, useRef } from "react";

function useSendTranscript(
  isListenFinish: boolean,
  isTranscriptForSend: boolean,
  transcript: string,
  resetTranscript: () => void
) {
  const textarea = useRef(document.querySelector("textarea"));
  const sendButton = useRef<HTMLButtonElement>(
    document.querySelector("button[disabled]")
  );

  useEffect(() => {
    if (!isListenFinish) return;
    textarea.current.value = transcript;
    textarea.current.dispatchEvent(new Event("input", { bubbles: true }));
    if (!isTranscriptForSend) return;
    sendButton.current.click();
  }, [isListenFinish, transcript, resetTranscript]);
}

export default useSendTranscript;
