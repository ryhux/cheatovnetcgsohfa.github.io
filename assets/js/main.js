// Примеры использования нашего объекта из functions.js
let 
	body = doc.getElement("body"),
	first_title = doc.getElement(".title"),
	subtexts = doc.getElements("subtext", "class");

// Генерируем номер телефона
let phone = "8(" + getRandomIStr(0,9,3) + ")" + getRandomIStr(0,9,3) + "-" + getRandomIStr(0,9,2) + "-" + getRandomIStr(0,9,2);

// Записываем номер телефона в элемент с указанным id
doc.getElement("phone_number", "id").innerText = phone;
