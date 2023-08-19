const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	text: String,
	tags: [String],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const Message = mongoose.model('messages', messageSchema);
module.exports = Message;
