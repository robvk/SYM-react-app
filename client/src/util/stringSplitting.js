// Split long single words into max length
export default function splitString(str, length) {
  let words = str.split(" ");
  for (let j = 0; j < words.length; j++) {
    let l = words[j].length;
    if (l > length) {
      let result = [],
        i = 0;
      while (i < l) {
        result.push(words[j].substr(i, length));
        i += length;
      }
      words[j] = result.join(" ");
    }
  }
  return words.join(" ");
}
