const toSentenceCase = (inputString: string) => {
  if (typeof inputString !== 'string' || inputString.trim() === '') return inputString;
  return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
};

export default toSentenceCase;
