const calculateStringDifference = (first: string, second: string): string => {
  const index = second.indexOf(first);
  if (index !== -1) {
    return second.substring(index + first.length);
  }
  return second;
};

const extractCompleteSentences = (text: string): string[] => {
  const sentences = text.match(/[^.!?]*[.!?]/g); // Split into sentences using regex
  if (sentences) {
    return sentences.map((sentence) => sentence.trim());
  }
  return [];
};

export { calculateStringDifference, extractCompleteSentences };
