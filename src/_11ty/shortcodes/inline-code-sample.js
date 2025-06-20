// Run prettier on an inline code sample (js) before returning
import * as prettier from "prettier";

export default function (content) {
  const backticks = "```";
                                  
  const prettified = prettier.format(content, {
    parser: "babel",
    printWidth: 512,
    tabWidth: 2
  });

  const language = "javascript";
  return `${backticks} ${language}\n ${prettified}\n${backticks}`;
}
