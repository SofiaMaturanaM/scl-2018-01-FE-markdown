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

