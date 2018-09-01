#!/usr/bin/env node 

let mdLinks = {}; 
const path = require('path');
const fs = require('fs'); 
const [, , ...args] = process.argv.slice(2);
let options = {};
if (args.includes('--validate')) options.validate = true;

//Promesa sin la opción --validate
mdLinks(path)
	.then((links) => {
		if (links.length === 0) console.error('No se encontraron enlaces');
		links.forEach(element => {
			let result = '';
			result = `${element.path} : ${element.line} : ${element.href} : ${element.text}`;
			console.log(result);
		});
	}).catch((error) => {
		console.error(error);
	});
//Promesa con la opción --validate
mdLinks(path, { validate: true })
	.then(links => links.forEach(element => {
		let result = '';
		if (options.validate) result = `${element.path} : ${element.line} : ${element.href} : ${element.text} : ${element.ok} : ${element.status}`;
		console.log(result);
	})
		.catch(console.error));
        
//Lee un archivo y lo retorna como una promesa.
mdLinks.leerArchivo  = (file) => {
	return new Promise(function (resolve, reject) {
		resolve(fs.readFileSync(file, 'utf8'));
	});	
};

module.exports = mdLinks;