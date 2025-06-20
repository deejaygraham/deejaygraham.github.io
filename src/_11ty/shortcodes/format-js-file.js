// Read a code sample and run prettier on the file before returning
import * as prettier from "prettier";
import * as fs from 'fs';

export default async function (language, filename) {
	try {
		// Check if input file exists first
		if (!fs.existsSync(filename)) {
			console.error(`Source code file not found: ${filename}`);
			return '';
		}

		const codeContent = await fs.promises.readFile(filename, 'utf8');
    const prettyCode = await prettier.format(codeContent, {
    	parser: "babel",
      printWidth: 512,
      tabWidth: 2
   	});
    
    const backticks = "```";
    return `${backticks} ${language}\n ${prettyCode}\n${backticks}`;
	} catch (err) {
		console.error("Error processing source code:", err);
		return "";
	}
}
