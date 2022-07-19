// Pull data out of the 538a field. Originally set up for just commmited to retain only but now will grab any text.
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

const retrieve538aString = async (data) => {
  let string583a = "";
  let document = data.anies[0];
  document = document.toString();
  console.log("document", document);
  let xmlParsedDoc = await new dom().parseFromString(document);
  string583a = xpath.select("//datafield[@tag=583]/subfield", xmlParsedDoc);
  if (string583a.length === 0) {
    string583a = "----";
  } else {
    string583a = string583a[0].toString();
    string583a = string583a.replace(/<subfield(.*?)>/g, "");
    string583a = string583a.replace(/<\/subfield>/g, "");
  }
  return string583a;
};

module.exports = retrieve538aString;