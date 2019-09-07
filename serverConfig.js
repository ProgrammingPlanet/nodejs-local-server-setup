

/* server config */

const hostname = 'localhost';
const port = 3000;

const indexPage = 'index.html';
const publicFolder = 'public';
const allowedMethods = ['GET','POST'];
const allowedExts = ['.ico','.html','.css','.js','.png'];

/* end server config */


exports.dirIndex = indexPage; //mean indexPage constant can be used on other code by name dirIndex
exports.publicDir = publicFolder;
exports.allowedMethods = allowedMethods; //also can be access by same name on other files
exports.allowedExts = allowedExts;
exports.hostname = hostname;
exports.port = port;
