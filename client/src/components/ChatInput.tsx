import React, { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { emitNewMessage } from '../websocket';

const ChatInput = () => {
	const [message, setMessage] = useState('');

	const handleSendMessage = (event: FormEvent) => {
		event.preventDefault();
		if (message.trim() !== '') {
			emitNewMessage(message);
			setMessage('');
		}
	};

	return (
		<div className="chat-input p-3">
			<Form
				className="d-flex flex-direction-row gap-3"
				style={{ width: '100%' }}
				onSubmit={handleSendMessage}
			>
				<Form.Control
					type="text"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button variant="primary" onClick={handleSendMessage}>
					Send
				</Button>
			</Form>
		</div>
	);
};

export default ChatInput;
