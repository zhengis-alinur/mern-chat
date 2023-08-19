import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import socket from '../websocket';
import { Container, Row, Col } from 'react-bootstrap';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Sidebar from './Sidebar';

const Chat = () => {
	const chatRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	useEffect(() => {
		function onNewMessage(message: Message) {
			setMessages((previous) => [...previous, message]);
		}
		function onInitialMessages(messages: Message[]) {
			setMessages(messages);
		}
		socket.on('newMessage', onNewMessage);
		socket.on('selectTag', onInitialMessages);
		socket.on('messages', onInitialMessages);
	}, []);

	useEffect(() => {
		const chat = chatRef.current;
		chat?.scrollTo(0, chat.scrollHeight);
	}, [messages]);

	return (
		<Container fluid>
			<Row>
				<Col md={3} className="sidebar-container">
					<Sidebar />
				</Col>
				<Col md={9} className="chat-container p-3">
					<h3>Messages</h3>
					<div className="chat-messages" ref={chatRef}>
						{messages.map((message, index) => (
							<ChatMessage key={index} message={message} />
						))}
					</div>
					<ChatInput />
				</Col>
			</Row>
		</Container>
	);
};

export default Chat;
