export interface IEvent {
	id: string;
	createdIdBy: string;
	createdAt: Date;
	updatedAt?: Date;
	updatedBy?: string;
	title: string;
	startDate: Date;
	endDate: Date;
	formatId: string;
	format: IFormat;
	description?: string;
	image: string;
	categories: ICategory[];
	authors: IAuthor[];
}
