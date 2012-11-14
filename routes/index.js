
/*
 * GET home page.
 */
var mongoose = require('mongoose')

var Articles = require('../controllers/articles')
exports.index = function(req, res){
  Articles.list
};