'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Card = new Schema({
	title: String,
	url: String,
	postedBy: String
});

module.exports = mongoose.model('Card', Card);
