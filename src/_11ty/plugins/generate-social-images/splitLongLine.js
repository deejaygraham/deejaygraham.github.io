export default function (text, lineLength, maxRows) {
	const lines = [];

	const words = text.split(/(?<=[^a-zA-Z0-9()<>""''])/);

  let line = '';
	words.forEach((word) => {
		if (line.length + word.length >= lineLength) {
			lines.push(line);
			line = '';
		}

		line += word;
	});

	if (line) {
		lines.push(line);
	}

	if (lines.length > maxRows) {
		lines.length = maxRows;
		lines[maxRows-1] += "…";
	}

	return lines;
}
