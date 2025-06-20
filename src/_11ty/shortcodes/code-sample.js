// Read a code sample and run prettier on the file before returning
import * as prettier from "prettier";
import * as fs from 'fs';

export default function (language, filename) {
  const backticks = "```";
  const content = fs.readFileSync(filename, function(err, contents) {
      if (err) return err;
      return contents;
  });
                                  
  const prettified = prettier.format(content, {
    parser: language,
    printWidth: 512,
    tabWidth: 2
  });
                                     
  return `${backticks} ${language}\n ${prettified}\n${backticks}`;
}
