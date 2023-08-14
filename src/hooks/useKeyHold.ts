import { useEffect, useState } from "react";

function useKeyHold(
  code: string,
  onKeyDown: () => void,
  onKeyUp: () => void,
  requiredHoldTime: number
) {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === code && !isKeyDown) {
        setIsKeyDown(true);
        setHoldTimeout(
          setTimeout(() => {
            onKeyDown();
            setHoldTimeout(null);
          }, requiredHoldTime)
        );
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === code && isKeyDown) {
        setIsKeyDown(false);
        clearTimeout(holdTimeout);
        // if (holdTimeout !== null) {
        onKeyUp();
        // }
        setHoldTimeout(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(holdTimeout);
    };
  }, [code, isKeyDown, onKeyDown, onKeyUp, requiredHoldTime, holdTimeout]);
}

export default useKeyHold;
