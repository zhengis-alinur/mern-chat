const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../..', '.env') });

const Message = require('../models/Message');
const Tag = require('../models/Tag');
const User = require('../models/User');

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

const getAllMessages = async () => {
	try {
		const messages = await Message.find({}).sort({createdAt: 1});
		return messages;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createMessage = async (data) => {
	try {
		const tags = await getAllTags();
		data.tags.forEach((tag) => {
			if(!tags.includes(tag)){
				createTag({name: tag});
			}
		})
		return ({
			message: await Message.create({ ...data, createdAt: new Date() }),
			tags: await getAllTags()
		})
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getMessages = async (tags) => {
	try {
		const tagedMessages = await Message.find({ tags: { $in: tags } });
		const unTagedMessages = await Message.find({ tags: [] });
		const result = [...tagedMessages, ...unTagedMessages];
		return result.sort(
			(a, b) => a.createdAt.getMilliseconds > b.createdAt.getMilliseconds
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getAllTags = async () => {
	try {
		const tags = await Tag.find({});
		return tags.map((tag) => tag.name);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createUser = async (userId) => {
	try {
		await User.create({
			_id: userId,
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getUserTags = async (userId) => {
	try {
		const user = await User.findById(userId)
		if(user) {
			return user.tags;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const setUserTag = async ({ userId, tag }) => {
	try {
		const tags = await getUserTags(userId);
		if (!tags.includes(tag)) {
			tags.push(tag);
			await User.findByIdAndUpdate(userId, {
				tags: tags,
			});
		}
		return tags;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const deleteUserTag = async ({ userId, tag }) => {
	try {
		let tags = await getUserTags(userId);
		tags = tags.filter((userTag) => userTag !== tag);
		await User.findByIdAndUpdate(userId, {
			tags: tags,
		});
		return tags;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createTag = async (data) => {
	try {
		if (!(await Tag.exists(data))) {
			console.log('data doesnt exists', data);
			return await Tag.create(data);
		}
		return null;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	getAllMessages,
	createMessage,
	getMessages,
	getAllTags,
	createTag,
	createUser,
	getUserTags,
	setUserTag,
	deleteUserTag,
};
