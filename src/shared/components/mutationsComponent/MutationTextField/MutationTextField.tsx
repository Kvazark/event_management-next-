import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { textFieldStyles } from '@/shared/styles/textFieldStyles';

type FormTextFieldProps = {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	required?: boolean;
} & Omit<TextFieldProps, 'name' | 'label'>;

export const MutationTextField = ({
	name,
	label,
	register,
	errors,
	required = false,
	...props
}: FormTextFieldProps) => {
	return (
		<TextField
			label={label}
			fullWidth
			{...register(name, { required: required ? 'Обязательное поле' : false })}
			error={!!errors[name]}
			helperText={errors[name]?.message as string}
			sx={textFieldStyles}
			{...props}
		/>
	);
};
