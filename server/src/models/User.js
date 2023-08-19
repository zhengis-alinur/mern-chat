const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	tags: [String],
});
const User = mongoose.model('users', userSchema);
module.exports = User;
