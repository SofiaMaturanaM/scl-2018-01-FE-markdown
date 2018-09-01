const Marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
let mdLinks = {};

//Verificar la ruta
mdLinks.verifyPath = (path) => {
	if(path !== ''){
		return true;
	}else{
		return 'Debe especificar la ruta';
	}
};