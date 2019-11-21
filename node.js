const _ = require('lodash');
const main = async () => {
		function getAllIndexes(arr, val) {
			    var indexes = [], i = -1;
			    while ((i = arr.indexOf(val, i+1)) != -1){
				            indexes.push(i);
				        }
			    return indexes;
		}

	const filename = '../wordlists/rockyou.txt'
	var lineReader = require('readline').createInterface({
		  input: require('fs').createReadStream(filename)
	});
	function addLines(lines, line) {
		if (lines.indexOf(line) == -1) 
			lines.push(line);
		return lines;
	}
	let id = 0;
	let time = +new Date().getTime();
	function lTime() {
		const newTime = +new Date().getTime();
		console.error('ss:' + (newTime - time));
		time = newTime;
	}
	lineReader.on('line', function (line) {
		let lines = [line];
		if (id % 100000 == 0) {
			lTime();
			console.error(id);
		}
		id++;

		const newLine1 = line.charAt(0).toUpperCase() + line.slice(1);
		lines = addLines(lines, newLine1);
		
		const leets = {
			'o': '0',
			'b': '6',
			'i': '1'
		}
		const cc = [2,6,3,4]
		let finish = false
		let lineId = 0;
			
		while (lines[lineId]) {
			const line = lines[lineId];
			Object.keys(leets).forEach(leetKey => {
				const leet = leets[leetKey];
				const indexes = getAllIndexes(line, leetKey)	
				indexes.forEach(index => {
					const newLine = line.replace(leetKey, leet, index);
					lines = addLines(lines, newLine);
				});
			});
			lineId++;
		}
		lines.forEach(line => console.log(line));
	});
}


main();
