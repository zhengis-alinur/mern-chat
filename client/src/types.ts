export type Message = {
	text: string;
	tags: string[];
	userId: string;
	createdAt: Date;
};

export type Tag = {
	name: string;
};
