var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');
var contactSchema = new Schema({
    firstname: {type:String},
    pfbalance: {type:String},
    phone: {type:String},
    age: {type:String},
    user: {type: Schema.Types.ObjectId, ref: newFunction()}
});
// contactSchema.post('remove', function (contact) {
//     User.findById(contact.user, function (err, user) {
//         user.contact.pull(contact);
//         user.save();
//     });
// });
module.exports = mongoose.model('contact', contactSchema,'contacts');
function newFunction() {
    return 'user';
}
