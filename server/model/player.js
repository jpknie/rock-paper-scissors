var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	name: String,
	wins: Number,
	loses: Number
});

module.exports = mongoose.model('Player', PlayerSchema);
