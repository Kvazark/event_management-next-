import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { Button, HeaderText } from '@/shared/components';
import { ChangePasswordModal } from './ChangePasswordModal';
import { profileFormSchema } from './validation';
import s from './styled.module.scss';

interface ProfileFormProps {
	initialData: {
		firstName: string;
		lastName: string;
		patronymic?: string;
		email: string;
	};
	onSubmit: (data: any) => Promise<boolean>;
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

	const handleSaveClick = async () => {
		const data = await handleSubmit(handleFormSubmit)();
		if (data) {
			handleFormSubmit(data);
		}
	};
	const handleFormSubmit = async (data: any) => {
		const success = await onSubmit(data);
		if (success) {
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		reset(initialData);
		setIsEditing(false);
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
								type='button'
							/>
							<Button
								view='outlined-on-dark'
								label='Сменить пароль'
								onClick={() => setIsPasswordModalOpen(true)}
								type='button'
							/>
						</>
					) : (
						<>
							<Button
								type='button'
								view='primary'
								label='Сохранить'
								onClick={handleSaveClick}
							/>
							<Button
								view='outlined-on-dark'
								label='Отмена'
								onClick={handleCancel}
								type='button'
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
