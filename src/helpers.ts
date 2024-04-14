export const generateGrid = (wordLength: number) => {
  return [...Array(6)].map(() => Array(wordLength).fill(null));
};
