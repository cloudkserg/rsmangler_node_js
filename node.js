const _ = require('lodash');
//главная функция для выполнения программы
const main = async () => {
		//функция для поиска всех позиций в массиве, которые имеют значения val
		//возвращает массив индексов (позиций)
		function getAllIndexes(arr, val) {
			    var indexes = [], i = -1;
			    while ((i = arr.indexOf(val, i+1)) != -1){
				            indexes.push(i);
				        }
			    return indexes;
		}
		//функция для добавления только таких линий в массив, которых там еще нет
	function addLines(lines, line) {
		if (lines.indexOf(line) == -1) 
			lines.push(line);
		return lines;
	}

	/*------------------------------------------------------------*/
	/*-----------НАЧАЛО РАБОТЫ-------------------*/
	/*------------------------------------------------------------*/
	//словарь, который переделываем
	const filename = '../wordlists/rockyou.txt'
	//создаем программу для считывания по линиям словаря образца
	var lineReader = require('readline').createInterface({
		  input: require('fs').createReadStream(filename)
	});
	

	//считываем файл по линиям
	lineReader.on('line', function (line) {
		//заносим строку образец в массив для нового словаря
		let lines = [line];


		//добавляем в массив для нового словаря строку образец с первой большой буквой
		const newLine1 = line.charAt(0).toUpperCase() + line.slice(1);
		lines = addLines(lines, newLine1);
		
		//объект для преобзования символов из задания
		const leets = {
			'o': '0',
			'b': '6',
			'i': '1'
		}
		//позиция строке в массиве для нового словаря, которую обрабатываем
		let lineId = 0;
		// пока еще есть такие строки
		while (lines[lineId]) {
			//берем текущую строку
			const line = lines[lineId];
			//Каждый символ из преобразования обходим
			Object.keys(leets).forEach(leetKey => {
				//берем символ для преобразования
				const leet = leets[leetKey];
				//Получаем все позиции символа для преобразования
				const indexes = getAllIndexes(line, leetKey)	
				//обходим все позиции
				indexes.forEach(index => {
					//заменяем символ для преобразования на новый и добавляем если такой строки нет в текущий массив
					const newLine = line.replace(leetKey, leet, index);
					lines = addLines(lines, newLine);
				});
			});
			lineId++;
		}
		//когда собрали все строки по строке образцу - выводим на экран, чтобы сохранить в файл
		lines.forEach(line => console.log(line));
	});
}


main();
