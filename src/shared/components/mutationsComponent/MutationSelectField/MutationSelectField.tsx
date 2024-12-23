import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField, MenuItem } from '@mui/material';
import s from './styled.module.scss';

type Option = {
	id: string;
	[key: string]: any;
};

type SelectFieldProps = {
	name: string;
	label: string;
	control: Control<any>;
	errors: FieldErrors;
	options: Option[];
	displayKey: string;
	multiple?: boolean;
	required?: boolean;
	onChange?: (value: any) => void;
};

export const MutationSelectField = ({
	name,
	label,
	control,
	errors,
	options,
	displayKey,
	multiple = false,
	required = false,
	onChange,
}: SelectFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={{ required: required ? 'Обязательное поле' : false }}
			render={({ field }) => (
				<TextField
					select
					label={label}
					fullWidth
					SelectProps={{ multiple }}
					error={!!errors[name]}
					helperText={errors[name]?.message as string}
					sx={{
						'& .MuiInputBase-root': {
							background: 'var(--background-gray)',
							color: 'var(--white-color)',
							borderRadius: '12px',
						},
						'& .MuiInputLabel-root': {
							color: 'var(--text-secondary)',
							'&.Mui-focused': {
								color: 'var(--white-color)',
							},
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--custom-gray)',
						},
						'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--white-color)',
						},
						'& .MuiSelect-icon': {
							color: 'var(--white-color)',
						},
						'& .MuiMenuItem-root': {
							color: 'var(--black-color)',
						},
					}}
					{...field}
					onChange={(e) => {
						field.onChange(e);
						onChange?.(e.target.value);
					}}>
					{options.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option[displayKey]}
						</MenuItem>
					))}
				</TextField>
			)}
		/>
	);
};