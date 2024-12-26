import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { Button } from '@/shared/components';
import { currentPasswordSchema, newPasswordSchema } from './validation';
import s from './styled.module.scss';
import { toast } from 'react-toastify';
import { useMutation } from '@blitzjs/rpc';
import changePassword from '@/features/user/api/mutations/changePassword';

interface ChangePasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const ChangePasswordModal = ({
	isOpen,
	onClose,
}: ChangePasswordModalProps) => {
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [changePasswordMutation] = useMutation(changePassword);

	const {
		register: registerStep1,
		handleSubmit: handleSubmitStep1,
		formState: { errors: errorsStep1 },
		setError: setErrorStep1,
		reset: resetStep1,
		watch: watchStep1,
	} = useForm({
		resolver: yupResolver(currentPasswordSchema),
	});

	const {
		register: registerStep2,
		handleSubmit: handleSubmitStep2,
		formState: { errors: errorsStep2 },
		reset: resetStep2,
	} = useForm({
		resolver: yupResolver(newPasswordSchema),
	});

	const handleClose = () => {
		resetStep1();
		resetStep2();
		setStep(1);
		onClose();
	};

	const handleVerifyPassword = async (data: { currentPassword: string }) => {
		setIsLoading(true);
		try {
			await changePasswordMutation({
				currentPassword: data.currentPassword,
				newPassword: data.currentPassword,
			});
			setStep(2);
		} catch (error) {
			setErrorStep1('currentPassword', {
				type: 'manual',
				message: 'Неверный текущий пароль',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleChangePassword = async (data: {
		newPassword: string;
		confirmPassword: string;
	}) => {
		setIsLoading(true);
		const currentPassword = watchStep1('currentPassword');
		try {
			await changePasswordMutation({
				currentPassword: currentPassword,
				newPassword: data.newPassword,
			});
			console.log('ds');
			toast.success('Пароль успешно изменен');
			handleClose();
			resetStep1();
			resetStep2();
		} catch (error) {
			console.log('.....................');
			let errorMessage = 'Не удалось изменить пароль';
			if (error instanceof Error) {
				if (error.message === 'Current password is incorrect') {
					errorMessage = 'Текущий пароль неверен';
				} else if (error.message === 'Password update failed') {
					errorMessage = 'Не удалось обновить пароль';
				}
			}
			toast.error(errorMessage);
			setStep(1); // Return to first step on error
		} finally {
			setIsLoading(false);
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
			}}>
			<DialogTitle>
				Смена пароля
				<IconButton
					aria-label='close'
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: 'var(--white-color)',
						'&:hover': {
							color: 'var(--accent-color)',
						},
					}}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{step === 1 ? (
					<form
						onSubmit={handleSubmitStep1(handleVerifyPassword)}
						className={s.form}>
						<MutationTextField
							name='currentPassword'
							label='Текущий пароль'
							register={registerStep1}
							errors={errorsStep1}
							type='password'
							required
						/>
						<Box className={s.modalButtons}>
							<Button
								type='submit'
								view='primary'
								label='Продолжить'
								disabled={isLoading}
							/>
						</Box>
					</form>
				) : (
					<form
						onSubmit={handleSubmitStep2(handleChangePassword)}
						className={s.form}>
						<MutationTextField
							name='newPassword'
							label='Новый пароль'
							register={registerStep2}
							errors={errorsStep2}
							type='password'
							autoComplete='new-password'
							required
						/>
						<MutationTextField
							name='confirmPassword'
							label='Повторите пароль'
							register={registerStep2}
							errors={errorsStep2}
							type='password'
							required
						/>
						<Box className={s.modalButtons}>
							<Button
								type='submit'
								view='primary'
								label='Сохранить'
								disabled={isLoading}
							/>
						</Box>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};
