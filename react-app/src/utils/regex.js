const Regex = function buildRegex(pattern, flags) {
  return new RegExp(pattern.replace(/\s/g, ''), flags);
};

export default Regex;
