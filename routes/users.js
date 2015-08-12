var express = require('express');
var router = express.Router();
var models = require('../models/');
var User = models.User;
var Page = models.Page; 
var Promise = require('bluebird')
/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = User.find();
	query.exec(function(err, user) {
		res.render('users', {users: user})
	});
});

router.get('/:id', function(req, res, next){
  var userPromise = User.findById(req.params.id).exec();
  var pagesPromise = Page.find({ author: req.params.id }).exec();
  Promise.join(userPromise, pagesPromise, function(user, pages){
    res.render('user', { user: user, pages: pages });
  }).catch(next);
});

module.exports = router;
