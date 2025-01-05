import { TModalDialogProps } from '@/shared/components/ModalDialog/types';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ModalDialog = ({
	isOpen,
	onClose,
	title,
	content,
	buttons,
}: TModalDialogProps) => {
	const preventEventPropagation = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			onClick={preventEventPropagation}
			aria-labelledby='delete-dialog-title'
			aria-describedby='delete-dialog-description'
			maxWidth='sm'
			fullWidth
			PaperProps={{
				sx: {
					backgroundColor: 'var(--background-light-gray)',
					color: 'var(--white-color)',
				},
			}}>
			<DialogTitle id='delete-dialog-title'>
				{title}
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: 'var(--white-color)',
					}}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='dialog-description'>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>{buttons}</DialogActions>
		</Dialog>
	);
};
