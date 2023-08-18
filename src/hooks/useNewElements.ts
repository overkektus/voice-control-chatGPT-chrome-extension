import { useEffect, useState } from "react";

interface ObserverResult {
  textContent: string;
  skip: () => void;
}

export const useDynamicContentObserver = (
  targetParentSelector: string,
  targetChildSelector: string
): ObserverResult => {
  const [textContent, setTextContent] = useState<string>("");
  const [element, setElement] = useState<Element | null>(null);
  const [observer, setObserver] = useState<MutationObserver | null>(null);

  const skip = () => {
    observer.disconnect();
  };

  useEffect(() => {
    if (!element) return;

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "characterData") {
          setTextContent(mutation.target.textContent);
        }
      }
    });

    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

    setObserver(observer);

    observer.observe(element, config);
  }, [element]);

  useEffect(() => {
    const targetParentNode = document.querySelector(targetParentSelector);

    if (!targetParentNode) {
      console.warn(
        `Element with selector '${targetParentSelector}' not found.`
      );
      return;
    }

    const mutationCallback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              node instanceof HTMLElement &&
              node.parentElement === targetParentNode &&
              node.matches(targetChildSelector)
            ) {
              console.log("set");
              setElement(node);
            }
          });
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    const observerConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    observer.observe(targetParentNode, observerConfig);

    return () => {
      observer.disconnect();
    };
  }, [targetParentSelector, targetChildSelector]);

  return { textContent, skip };
};

export default useDynamicContentObserver;
