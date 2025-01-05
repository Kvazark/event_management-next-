export type TEventHistoryCardProps = {
	event: TEventHistoryCard;
};

type TEventHistoryCard = {
	updatedAt?: Date | null;
	updatedByUser: TUpdatedBy;

	createdBy: TUpdatedBy;
};

type TUpdatedBy = {
	email: string;
	firstName: string;
	lastName: string;
	patronymic?: string | null;
};
