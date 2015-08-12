var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});


router.post('/', function(req, res, next) {
  User.findOrCreate({
  	email: req.body.email,
  	name: req.body.name
  }).then(function(id) {
  	 var page = new Page({
     title: req.body.title,
     content: req.body.content,
     author: id
  	})
  
//  }).then(function() {
  	 page.save(function (err, page) {
  	
  	if(err) next(err);
  	else res.redirect(page.route);
  })
  })
 // console.log(page);
 

  // -> after save -> res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:title', function(req,res,next) {
	Page.findOne({urlTitle: req.params.title}).exec(err, function(page){
		User.findOne({_id: page.author}).exec(err, function(user) {
			page.authorname = user.name;
			res.render('wikipage', page);
		})
		
	});
});



module.exports = router;

