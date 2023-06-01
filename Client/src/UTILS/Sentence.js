export const sentenceCase = (str) => {
  return str.replace(/\.\s+([a-z])[^\.]|^(\s*[a-z])[^\.]/g, (s) =>
    s.replace(/([a-z])/, (s) => s.toUpperCase())
  );
};
