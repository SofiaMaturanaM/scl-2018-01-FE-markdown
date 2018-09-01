const Marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
let mdLinks = {};

//Verificar la ruta
mdLinks.verifyPath = (path) => {
	if(path !== ''){
		return true;
	}else{
		return 'Debe especificar la ruta';
	}
};

//Convierte la ruta relativa a ruta absoluta
mdLinks.convertToAbsolutePath = (ruta) => { 
	return path.resolve(ruta); 
};

const ruta= path.resolve();

//Leer el archivo 
fs.readFile(ruta, 'utf-8', function (err,data){
	if(err) throw err;
	{
		console.log(err);
	}
	console.log(ruta);
	return markdownLinkExtractor(data);
});

//Función que extrae los links sacada del readme de la descripción del proyecto
function markdownLinkExtractor(markdown) {
	const links = [];

	const renderer = new Marked.Renderer();

	// Taken from https://github.com/markedjs/marked/issues/1279
	const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

	Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
	Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
	Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

	renderer.link = function(href, title, text) {
		links.push({
			href: href,
			text: text,
			title: title,
		});
	};
	renderer.image = function(href, title, text) {
		// Remove image size at the end, e.g. ' =20%x50'
		href = href.replace(/ =\d*%?x\d*%?$/, '');
		links.push({
			href: href,
			text: text,
			title: title,
		});
	};
	Marked(markdown, {renderer: renderer});

	return links;
}


