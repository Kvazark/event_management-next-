import { ReactNode } from 'react';

export type TModalDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string | ReactNode;
	content?: string | ReactNode;
	buttons?: ReactNode;
};
