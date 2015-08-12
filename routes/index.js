var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 


/* GET home page. */
router.get('/', function(req, res, next) {


	var query = Page.find();
	query.exec(function(err, page) {
		console.log(page);
		res.render('index', {pages: page})
	});
});

module.exports = router;
