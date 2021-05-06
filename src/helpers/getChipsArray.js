const getChipsArray = (string) => {
  if (!string.length) return [];

  const chips = [];
  let quotesFlag = false;
  let startIndex = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '"') quotesFlag = !quotesFlag;
    if (string[i] === ',') {
      if (startIndex === i) {
        startIndex = i + 1;
      } else if (!quotesFlag) {
        chips.push(string.substr(startIndex, i - startIndex));
        startIndex = i + 1;
      }
    }
  }
  if (startIndex < string.length) {
    chips.push(string.substr(startIndex, string.length - startIndex));
  }

  return chips;
};

export default getChipsArray;
