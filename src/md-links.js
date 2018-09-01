const Marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
let mdLinks = {};
// const [, , ...args] = process.argv;
// let options = {};
// if (args.includes('--validate')) options.validate = true;
// Promesa sin la opción --validate
// mdLinks.mdLinks(path)
// 	.then((links) => {
// 		if (links.length === 0) console.error('No se encontraron enlaces');
// 		links.forEach(element => {
// 			let result = '';
// 			result = `${element.path} : ${element.line} : ${element.href} : ${element.text}`;
// 			console.log(result);
// 		});
// 	}).catch((error) => {
// 		console.error(error);
// 	});
// // Promesa con la opción --validate
// mdLinks.mdLinks(path, { validate: true })
// 	.then(links => links.forEach(element => {
// 		let result = '';
// 		if (options.validate) result = `${element.path} : ${element.line} : ${element.href} : ${element.text} : ${element.ok} : ${element.status}`;
// 		console.log(result);
// 	})
// 		.catch(console.error));
        
//Lee un archivo y lo retorna como una promesa.
mdLinks.leerArchivo  = (file) => {
	return new Promise(function (resolve, reject) {
		resolve(fs.readFileSync(file, 'utf8'));
	});	
};
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

const pathFile= path.resolve('./README.md');

//Leer el archivo 
fs.readFile(pathFile, 'utf-8', function (err,data){
	if(err) throw err;
	{
		console.log(err);
	}
    
	console.log(pathFile);
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
	// console.log(links);
	return validateLinks(links);
	
}
//validar links
function validateLinks(links) {  
	links.forEach(element => {
		let url = element.href;
		let texto = element.text;
		let textFile = texto.toString(texto).substring(0,50);//No funciona, iterar
		fetch(url).then(response => response
		).then(data => {
			console.log( data.url + ' ' + data.status + ' ' + data.statusText + ' ' + data.textFile);
  
			if (data.status=='404'){
				(console.log('No encontrado')); 
       
			}
		}).catch(error => {
			console.error('ERROR > ' + error.status);
		});
	});
}
  
module.exports = mdLinks;