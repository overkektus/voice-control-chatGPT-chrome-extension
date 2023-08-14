import { useEffect } from "react";

function useKeyHold(
  code: string,
  onKeyDown: () => void,
  onKeyUp: () => void,
  requiredHoldTime: number
) {
  useEffect(() => {
    let isKeyDown = false;
    let holdTimeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === code && !isKeyDown) {
        isKeyDown = true;
        holdTimeout = setTimeout(onKeyDown, requiredHoldTime);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === code) {
        isKeyDown = false;
        clearTimeout(holdTimeout);
        onKeyUp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(holdTimeout);
    };
  }, [code, onKeyDown, onKeyUp, requiredHoldTime]);
}

export default useKeyHold;
