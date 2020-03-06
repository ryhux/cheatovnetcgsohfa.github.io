// Создаём новый объект
let doc = {
	// Создаём методы
	getElement: (element, type = "") => {
		/**
		 *Обрабатываем разные элементы по-разному
		 * Например: #testId или .testClass обрабатываем как id и класс соответственно 
		 */
		if (element[0] == "#")
			return document.getElementById(element.substr(1));
		if (element[0] == ".")
			return document.getElementsByClassName(element.substr(1))[0];
		/**
		 * Повторяем процедуру, если вместо #testId кто-то решил написать testId
		 * Но только в том случае, если программист указал тип во втором аргументе
		 */
		if (type == "id")
			return document.getElementById(element);
		if (type == "class")
			return document.getElementsByClassName(element)[0];
		return document.getElementsByTagName(element)[0];
	},
	getElements: (element, type = "") => {
		/**
		 * Тоже самое, что и выше
		 * Здесь мы ищем не 1 элемент, а сразу все
		 * Id не бывает больше 1. Поэтому здесь мы не ищем по id
		 */
		if (element[0] == ".")
			return document.getElementsByClassName(element.substr(1));
		if (type == "class")
			return document.getElementsByClassName(element);
		return document.getElementsByTagName(element);
	}
}

// Генераторы случайных значений (от минимального числа до максимального)
// Возвращает число
function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Возвращает строку из цифр
function getRandomIStr(min, max, count = 0)
{
	let result = "";
	if (count)
		for (let i = 0; i < count; i++)
			result += getRandomInt(min, max);
	else
		result += getRandomInt(min, max);
	return result;
}
