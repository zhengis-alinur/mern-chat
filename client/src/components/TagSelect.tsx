import React from 'react';
import { emitNewTag, emitSetUserTag } from '../websocket';
import CreatableSelect from 'react-select/creatable';

type Props = {
	tags: string[];
};

const TagSelect = ({ tags }: Props) => {
	const onTagCreate = (option: string) => {
		emitNewTag(option);
	};

	const onTagChoosen = (option?: string) => {
		if (option) {
			emitSetUserTag(option);
		}
	};

	return (
		<CreatableSelect
			className="tagSelect"
			isClearable
			onChange={(event) => {
				onTagChoosen(event?.value);
			}}
			options={tags.map((tag) => ({ value: tag, label: tag }))}
			onCreateOption={onTagCreate}
		/>
	);
};

export default TagSelect;
