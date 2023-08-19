import React, { useEffect, useState } from 'react';
import socket, { emitDeleteTag, emitSelectTag } from '../websocket';
import { ListGroup, CloseButton } from 'react-bootstrap';
import TagSelect from './TagSelect';

const Sidebar = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [userTags, setUserTags] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	useEffect(() => {
		function onNewTag(tag: string) {
			setTags((previous) => [...previous, tag]);
		}

		function onTags(tags: string[]) {
			setTags(tags);
		}
		function onUserTags(tags: string[]) {
			setUserTags(tags);
		}

		socket.on('userTags', onUserTags);
		socket.on('newTag', onNewTag);
		socket.on('tags', onTags);
	}, []);

	const onSelectTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			const filtred = selectedTags.filter((t) => t !== tag);
			setSelectedTags(filtred);
			emitSelectTag(filtred);
		} else {
			setSelectedTags([...selectedTags, tag]);
			emitSelectTag([...selectedTags, tag]);
		}
	};

	const onDeleteTag = (tag: string) => {
		if(selectedTags.includes(tag)) {
			onSelectTag(tag);
		}
		emitDeleteTag(tag);
	};

	return (
		<div className="sidebar p-3 d-flex flex-column gap-5">
			<h3>Tags</h3>
			<TagSelect tags={tags}/>
			<div>
				<h4>My favorite tags</h4>
				<ListGroup>
					{userTags.length === 0 ? (
						<p>You don't have favorite tags</p>
					) : (
						userTags.map((tag) => (
							<ListGroup.Item
								key={tag}
								active={selectedTags.includes(tag)}
								onClick={() => onSelectTag(tag)}
								className="d-flex justify-content-between"
							>
								{tag}
								<CloseButton
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										onDeleteTag(tag);
									}}
								/>
							</ListGroup.Item>
						))
					)}
				</ListGroup>
			</div>
		</div>
	);
};

export default Sidebar;
