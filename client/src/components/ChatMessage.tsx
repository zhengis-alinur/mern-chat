import React from 'react';
import { Badge } from 'react-bootstrap';
import { Message } from '../types';
import { getUserId, stringToColor } from '../utils';

const ChatMessage = ({ message }: { message: Message }) => {
	return (
		<div className="chat-message position-relative" style={{backgroundColor: stringToColor(message.userId)}}>
			<p>{message.text}</p>
			<div className="message-info">
				<div className="tags">
					{message.tags.map((tag, index) => (
						<Badge
							key={index}
							bg="secondary"
							className="message-badge"
						>
							{tag}
						</Badge>
					))}
				</div>
				<span className='text-muted'>{new Date(message.createdAt).toLocaleString()}</span>
				<span className='position-absolute top-0 right-0 text-muted'>by {message.userId}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
