export default function (text, lineLength, maxRows) {
	const lines = [];

	const words = text.split(/(?<=[^a-zA-Z0-9()<>""''])/);

  let line = '';
	words.forEach((word) => {
		if (line.length + word.length >= lineLength) {
			lines.push(line.trim());
			line = '';
		}

		line += word;
	});

	if (line) {
		lines.push(line.trim());
	}

	if (lines.length > maxRows) {
		lines.length = maxRows;
		lines[maxRows-1] += "...";
	}

	return lines;
}
