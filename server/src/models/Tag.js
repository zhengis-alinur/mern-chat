const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
	name: String,
});
const Tag = mongoose.model('tags', tagsSchema);
module.exports = Tag;
