'use strict';

var fs 		= require('fs'),
	path 	= require('path');

var basePath    = require('./config.js');

exports.getFolders = function (dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
    });
};

exports.installEssay = function(essayName){
    
    var importString = '\n@import "modules/' +  essayName + '";';

    if(!fs.existsSync(process.cwd() + '/public/src/stylesheets/modules/' + '_' + essayName + '.scss')){
        try {
            fs.writeFileSync(process.cwd() + '/public/src/stylesheets/modules/' + '_' + essayName + '.scss', '');
            fs.appendFileSync(process.cwd() + '/public/src/stylesheets/essays.scss', importString);
        } catch (err) {
            throw err;
        }                    
    }

    if(!fs.existsSync(basePath.essays + essayName)){
    	try {
        	fs.mkdirSync(basePath.essays + essayName);
        	fs.writeFileSync(basePath.essays + essayName + '/app.js', '');
    	} catch (err) {
    		throw err;
    	}
    }
};