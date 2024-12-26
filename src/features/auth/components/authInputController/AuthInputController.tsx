import { Control, FieldErrors, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import s from './styled.module.scss';
import { textFieldStyles } from '@/shared/styles/textFieldStyles';

type TAuthInputProps = {
	name: string;
	control: Control<any>;
	label: string;
	required?: boolean;
	errors: FieldErrors;
};

export const AuthInputController = ({
	name,
	control,
	label,
	required = false,
	errors,
}: TAuthInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField
					className={s.authTextField}
					margin='normal'
					label={label}
					type={name === 'password' ? 'password' : 'email'}
					fullWidth
					required={required}
					autoComplete={name === 'email' ? 'email' : undefined}
					error={!!errors[name]?.message}
					helperText={errors[name]?.message as string}
					sx={textFieldStyles}
					{...field}
				/>
			)}
		/>
	);
};
