const typeWordSplit = (word: string): { text: string }[] => {
  const returnArray: { text: string }[] = [];
  word.split(" ").map((i) => {
    returnArray.push({ text: i });
  });
  return returnArray;
};
export default typeWordSplit;
