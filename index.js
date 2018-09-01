#!/usr/bin/env node 

let mdlinks = require('./src/md-links');
let mdLinks = {};
const path = require('path');
const fs = require('fs'); 
const [, , ...args] = process.argv;

// mdlinks.mdLinks(args[0]);

module.exports = mdLinks;