import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { authUserSelectors } from '@/app/store/slices/user';
import { Button, Dropdown, ModalDialog } from '@/shared/components';
import s from './styled.module.scss';
import { useMutation } from '@blitzjs/rpc';
import deleteEvent from '@/features/event/api/mutations/deleteEvent';
import { toast } from 'react-toastify';
import { IEvent } from '@/entities/event';

type TEditEventBtnProps = {
	event: IEvent;
	onDelete?: () => void;
};

export const EditEventBtn = ({ event, onDelete }: TEditEventBtnProps) => {
	const currentPath = usePathname();
	const router = useRouter();

	const [showEditBtn, setShowEditBtn] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [deleteEventMutation] = useMutation(deleteEvent);

	const user = useAppSelector(authUserSelectors.getUser);
	useEffect(() => {
		if (
			currentPath === '/admin/managerEvents' &&
			user.isAuth &&
			user.role === 'ADMIN'
		)
			setShowEditBtn(true);
		else setShowEditBtn(false);
	}, [user, currentPath]);

	const idEvent = String(event.id);
	const handleEdit = () => {
		router.push(`/admin/managerEvents/edit/${idEvent}`);
	};

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await deleteEventMutation({ id: event.id });
			toast.success('Событие успешно удалено');
			if (onDelete) {
				onDelete();
			} else {
				router.push('/admin/managerEvents');
			}
		} catch (error) {
			toast.error('Ошибка при удалении события');
			console.error('Error deleting event:', error);
		} finally {
			setIsDeleteDialogOpen(false);
		}
	};

	const textContent = `Вы уверены, что хотите удалить событие "${event.title}"? Это
							действие нельзя будет отменить.`;
	if (showEditBtn)
		return (
			<>
				<Box className={s.menuBtn}>
					<Dropdown
						items={[
							{
								content: 'Изменить',
								onClick: handleEdit,
							},
							{
								content: 'Удалить',
								onClick: handleDeleteClick,
							},
						]}
					/>
				</Box>
				<ModalDialog
					isOpen={isDeleteDialogOpen}
					onClose={() => setIsDeleteDialogOpen(false)}
					title='Подтвердите удаление'
					content={
						<Box
							sx={{
								color: 'var(--text-secondary)',
							}}>
							{textContent}
						</Box>
					}
					buttons={
						<>
							<Button
								view='outlined-on-dark'
								onClick={() => setIsDeleteDialogOpen(false)}
								label='Отменить'
							/>
							<Button
								view='primary'
								onClick={handleConfirmDelete}
								label='Удалить'
							/>
						</>
					}
				/>
			</>
		);
	else {
		return null;
	}
};
