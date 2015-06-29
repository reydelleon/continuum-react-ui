/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     Licensed under MIT license
 */

var express = require('express');

var server = express();
server.use(express.static('public'));
server.listen(3000);

