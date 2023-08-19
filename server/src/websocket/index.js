const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../..', '.env') });

const express = require('express');
const http = require('http');
const cors = require('cors');
const {
	getAllMessages,
	createMessage,
	getMessages,
	getAllTags,
	createTag,
	createUser,
	getUserTags,
	setUserTag,
	deleteUserTag,
} = require('../mongo');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: process.env.CORS_CLIENT,
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

io.on('connection', async (socket) => {
	console.log('A user connected');
	socket.emit('getUserId', 'Check if user has userId');

	getAllMessages()
		.then((messages) => {
			socket.emit('messages', messages);
		})
		.catch((error) => {
			console.error('Error fetching messages:', error);
		});

	getAllTags()
		.then((tags) => {
			socket.emit('tags', tags);
		})
		.catch((error) => {
			console.error('Error fetching tags:', error);
		});

	socket.on('userId', async (userId) => {
		if (!userId) {
			userId = new mongoose.Types.ObjectId();
			await createUser(userId);
		}
		getUserTags(userId)
			.then((tags) => {
				socket.emit('userTags', tags);
			})
			.catch((error) => {
				console.error('Error fetching usertags:', error);
			});
		socket.emit('setUser', userId);
	});

	socket.on('newMessage', async (data) => {
		createMessage(data)
			.then(({message, tags}) => {
				io.emit('newMessage', message);
				io.emit('tags', tags);
			})
			.catch((error) => {
				console.error('Error creating a message:', error);
			});
	});

	socket.on('setUserTag', async (data) => {
		setUserTag(data)
			.then((userTags) => {
				socket.emit('userTags', userTags);
			})
			.catch((error) => {
				console.error('Error seting user tag:', error);
			});
	});

	socket.on('selectTag', (data) => {
		let messagePromise;

		if (data.length === 0) {
			messagePromise = getAllMessages();
		} else {
			messagePromise = getMessages(data);
		}

		messagePromise
			.then((messages) => {
				socket.emit('selectTag', messages);
			})
			.catch((error) => {
				console.error('Error selecting tag:', error);
			});
	});

	socket.on('deleteTag', (data) => {
		deleteUserTag(data)
			.then((userTags) => {
				socket.emit('userTags', userTags);
			})
			.catch((error) => {
				console.error('Error deleting tag:', error);
			});
	});

	socket.on('newTag', (data) => {
		createTag(data)
			.then((tag) => {
				if (tag) {
					return setUserTag({
						tag: data.name,
						userId: data.userId,
					});
				}
			})
			.then((userTags) => {
				if (userTags) {
					socket.emit('userTags', userTags);
					socket.io('newTag', data.name);
				}
			})
			.catch((error) => {
				console.error('Error creating new tag:', error);
			});
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

module.exports = { server, io };
