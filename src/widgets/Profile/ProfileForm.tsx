import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { Button, HeaderText } from '@/shared/components';
import { ChangePasswordModal } from './ChangePasswordModal';
import { profileFormSchema } from './validation';
import s from './styled.module.scss';
import { toast } from 'react-toastify';

interface ProfileFormProps {
	initialData: {
		firstName: string;
		lastName: string;
		patronymic?: string;
		email: string;
	};
	onSubmit: (data: any) => void;
}

export const ProfileForm = ({ initialData, onSubmit }: ProfileFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: initialData,
		resolver: yupResolver(profileFormSchema),
	});

	// Сбрасываем значения формы только когда изменились initialData
	useEffect(() => {
		reset(initialData);
	}, [initialData, reset]);

	// Отдельный эффект для обработки входа в режим редактирования
	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData?.email]);

	const handleFormSubmit = async (data: any) => {
		try {
			await onSubmit(data);
			toast.success('Профиль успешно обновлен');
			setIsEditing(false);
		} catch (error) {
			toast.error('Ошибка при обновлении профиля');
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		reset(initialData);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	return (
		<Box className={s.profileForm}>
			<HeaderText text='Профиль' size='h1' />
			<form onSubmit={handleSubmit(handleFormSubmit)} className={s.form}>
				<MutationTextField
					name='firstName'
					label='Имя'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>
				<MutationTextField
					name='lastName'
					label='Фамилия'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>
				<MutationTextField
					name='patronymic'
					label='Отчество'
					register={register}
					errors={errors}
					disabled={!isEditing}
				/>
				<MutationTextField
					name='email'
					label='Email'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>

				<Box className={s.buttons}>
					{!isEditing ? (
						<>
							<Button
								view='primary'
								label='Изменить информацию'
								onClick={() => setIsEditing(true)}
							/>
							<Button
								view='outlined-on-dark'
								label='Сменить пароль'
								onClick={() => setIsPasswordModalOpen(true)}
							/>
						</>
					) : (
						<>
							<Button type='submit' view='primary' label='Сохранить' />
							<Button
								view='outlined-on-dark'
								label='Отмена'
								onClick={handleCancel}
							/>
						</>
					)}
				</Box>
			</form>

			<ChangePasswordModal
				isOpen={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
			/>
		</Box>
	);
};
