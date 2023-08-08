import { useEffect, useState } from "react";

interface ObserverResult {
  textContent: string;
}

export const useDynamicContentObserver = (
  targetParentSelector: string,
  targetChildSelector: string
): ObserverResult => {
  const [textContent, setTextContent] = useState<string>("");
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "characterData") {
          setTextContent(mutation.target.textContent);
        }
        if (mutation.type === "attributes") {
          console.log(mutation);
        }
        if (mutation.type === "childList") {
          console.log(mutation);
        }
      }
    });

    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

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
              const div = node.querySelector(
                "div.markdown.prose.w-full.break-words.dark\\:prose-invert.light"
              );
              setElement(div);
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

  return { textContent };
};

export default useDynamicContentObserver;
