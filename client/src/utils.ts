export const extractHashtags = (text: string) => {
	const hashtags = text.match(/#\w+/g)?.map((tag) => tag.slice(1));
	return hashtags || [];
};

export const extractText = (text: string) => {
	return text.replace(/#\w+/g, '');
};

export const getUserId = () => localStorage.getItem('userId');

export const stringToColor = (str: string | null) => {
	if (!str) return 'rgba(145, 210, 255, 0.5)'
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const r = (hash >> 16) & 0xFF;
	const g = (hash >> 8) & 0xFF;
	const b = hash & 0xFF;

	const rgbaColor = `rgba(${r},${g},${b},0.5)`;

	return rgbaColor;
}

