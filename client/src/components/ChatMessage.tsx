import React from 'react';
import { Badge } from 'react-bootstrap';
import { Message } from '../types';

const ChatMessage = ({ message }: { message: Message }) => {
	return (
		<div className="chat-message">
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
				<span>{new Date(message.createdAt).toLocaleString()}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
