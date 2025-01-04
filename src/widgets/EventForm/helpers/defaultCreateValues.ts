export const defaultCreateValues = {
	title: '',
	startDate: new Date(),
	endDate: new Date(Date.now() + 3600000),
	formatType: '' as 'онлайн' | 'офлайн' | 'гибрид',
	description: '',
	image: null,
	categoryIds: [],
	authorIds: [],
};
