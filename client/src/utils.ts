export const extractHashtags = (text: string) => {
	const hashtags = text.match(/#\w+/g)?.map((tag) => tag.slice(1));
	return hashtags || [];
};

export const extractText = (text: string) => {
	return text.replace(/#\w+/g, '');
};

export const getUserId = () => localStorage.getItem('userId');
