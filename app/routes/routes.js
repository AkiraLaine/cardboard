'use strict';

var path = process.cwd();
var User = require('../models/users');
var Card = require('../models/cards');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route("/profile")
		.get(isLoggedIn, function(req,res){
			res.sendFile(path + "/public/profile.html")
		})

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
		
	app.route("/api/user")
		.get(function(req, res) {
		    res.send(req.user);
		}) 
		
	app.route("/api/profile/new")
		.post(function(req,res){
			console.log(req.body)
			User.update({"github.id": req.user.github.id}, {$push: {"cards": req.body}}).exec();
		})
		
	app.route("/api/cards")
		.get(function(req,res){
			Card.find({}, function(err,cards){
				res.send(cards)
			})
		})
		.post(function(req,res){
			var card = new Card();
			card.title = req.body.title;
			card.url = req.body.url;
			card.save();
		})
	
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));
};
