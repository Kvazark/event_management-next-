import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { Button, ModalDialog } from '@/shared/components';
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
		<ModalDialog
			isOpen={isOpen}
			onClose={handleClose}
			title='Создать новую категорию'
			content={
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
			}
		/>
	);
};
