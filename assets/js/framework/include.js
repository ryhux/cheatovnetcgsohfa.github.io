
(function () {
	function hasClass(element, selector) {
		var className = " " + selector + " ";
		if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(selector) > -1 ) {
			return true;
		}
		return false;
	}
	function include(name, type, parent = "body", oldElement = null) {
		let element,
			newParent = null,
			br 		  = null;
			url = "assets/"+ type + "/" + name + "." + type;
		if (type == "js") {
			element = document.createElement("script");
			element.src = url;
			element.defer = true;
		}
		else if (type == "css") {
			element  = document.createElement("link");
			element.href = url;
			element.rel  = "stylesheet";
		}
		else if (type == "img") {
			element	  = document.createElement("img");
			let
				title	  = null,
				block	  = null,
				link	  = null;

			if (oldElement.innerText) {
				title 			= document.createElement("span");
				title.innerText = oldElement.innerText;
				block 			= document.createElement("div");
				if (oldElement.hasAttribute("parentClass")) {
					block.setAttribute("class", oldElement.getAttribute("parentClass"));
				}
				block.classList.add("text-center");
				if (hasClass(oldElement, "align-right")) {
					block.classList.add("align-right");
				}
				if (hasClass(oldElement, "align-left")) {
					block.classList.add("align-left");
				}
				if (!oldElement.hasAttribute("href")) {
					block.appendChild(element);
					block.appendChild(document.createElement("br"));
					block.appendChild(title);
					newParent = block;
				}
			}
			if (oldElement.hasAttribute("href")) {
				link 	  = document.createElement("a");
				link.href = oldElement.getAttribute("href");
				link.appendChild(element);
				if (title) {
					link.appendChild(document.createElement("br"));
					link.appendChild(title);
					block.appendChild(link);
					newParent = block;
				}
				else {
					if (oldElement.hasAttribute("parentClass")) {
						link.setAttribute("class", oldElement.getAttribute("parentClass"));
					}
					newParent = link;
				}
			}

			if (oldElement.hasAttribute("br")) {
				br = document.createElement("br");
				br.setAttribute("clear", "both");
			}

			element.src = "assets/media/" + name;
			
			if (!oldElement.hasAttribute("alt"))
				element.alt = "Image";
			if (oldElement.classList.length)
				for (let i = 0; i < oldElement.classList.length; i++)
					element.classList.add(oldElement.classList[i]);
		}
		if (!oldElement)
			document.querySelector(parent).appendChild(element);
		else if (!newParent) {
			parent.replaceChild(element,oldElement);
			if (br)
				parent.insertBefore(br, element.nextSibling);
		}
		else {
			parent.replaceChild(newParent,oldElement);
			if (br)
				parent.insertBefore(br, newParent.nextSibling);
		}
	}
	let
		styles = document.getElementsByTagName("styles"),
		scripts = document.getElementsByTagName("scripts"),
		images = document.getElementsByTagName("pic");
	let 
		jsFiles,
		cssFiles,
		imageFiles;

	for (let j = 0; j < styles.length; j++) {
		cssFiles = styles[j].innerText.split(" ");
		for (let i = 0; i < cssFiles.length; i++) {
			include(cssFiles[i], "css", "head");
		}
		styles[j].remove();
	}
	for (let j = 0; j < scripts.length; j++) {
		jsFiles = scripts[j].innerText.split(" ");
		for (let i = 0; i < jsFiles.length; i++) {
			include(jsFiles[i], "js");
		}
		scripts[j].remove();
	}
	let length = images.length;
	for (let i = 0; i < length; i++) {
		include(images[0].getAttribute("src"), "img", images[0].parentElement, images[0]);
	}
	document.getElementById("include").remove();
})();