import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { Button } from '@/shared/components';
import { toast } from 'react-toastify';
import { useMutation } from '@blitzjs/rpc';
import createCategory from '@/features/event/api/mutations/createCategory';

type AddCategoryModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onCategoryAdded: (category: ICategory) => void;
};

export const AddCategoryModal = ({
	isOpen,
	onClose,
	onCategoryAdded,
}: AddCategoryModalProps) => {
	const [createCategoryMutation] = useMutation(createCategory);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: '',
		},
	});

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmit(onSubmit)(e);
	};

	const onSubmit = async (data: { title: string }) => {
		try {
			const newCategory = await createCategoryMutation(data);
			toast.success('Категория успешно создана');
			onCategoryAdded(newCategory);
			handleClose();
		} catch (error) {
			toast.error('Ошибка при создании категории');
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{
				sx: {
					backgroundColor: 'var(--background-light-gray)',
					color: 'var(--white-color)',
				},
			}}
			onClick={(e) => e.stopPropagation()}>
			<DialogTitle>
				Создать новую категорию
				<IconButton
					aria-label='close'
					onClick={handleClose}
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
				<Box
					component='form'
					onSubmit={handleFormSubmit}
					onClick={(e) => e.stopPropagation()}
					sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
					<MutationTextField
						name='title'
						label='Название категории'
						register={register}
						errors={errors}
						required
					/>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
						<Button
							type='button'
							view='outlined-on-dark'
							label='Отменить'
							onClick={handleClose}
						/>
						<Button
							type='submit'
							view='primary'
							label='Добавить новую категорию'
						/>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};
