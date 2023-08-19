import io from 'socket.io-client';
import { extractHashtags, extractText, getUserId } from '../utils';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const socket = io(SERVER_URL);

socket.on('getUserId', () => {
	const userId = getUserId();
	socket.emit('userId', userId);
});

socket.on('setUser', (userId) => {
	localStorage.setItem('userId', userId);
});

export const emitUserId = (userId: string | null) => {
	socket.emit('userId', userId);
};

export const emitNewMessage = (message: string) => {
	socket.emit('newMessage', {
		text: extractText(message),
		tags: extractHashtags(message),
	});
};

export const emitNewTag = (tag: string) => {
	const userId = getUserId();
	socket.emit('newTag', { userId, name: tag });
};

export const emitSelectTag = (tag: string[]) => {
	socket.emit('selectTag', tag);
};

export const emitDeleteTag = (tag: string) => {
	const userId = getUserId();
	socket.emit('deleteTag', {
		userId,
		tag,
	});
};

export const emitSetUserTag = (tag: string) => {
	const userId = getUserId();
	socket.emit('setUserTag', {
		userId,
		tag,
	});
};

export default socket;
