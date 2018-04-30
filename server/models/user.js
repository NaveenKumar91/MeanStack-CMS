var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    email: {type:String},
    password: {type:String},
    contact: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('User', userschema,'users');