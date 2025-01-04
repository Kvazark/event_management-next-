import React, { useState, useRef, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import {
	Autocomplete,
	TextField,
	Checkbox,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TCategorySelectFieldProps } from '@/features/event/ui/eventForm/categorySelectField/types';
import { autocompleteStyles } from '@/shared/styles';

export const CategorySelectField = ({
	name,
	label,
	control,
	errors,
	options,
	loading = false,
	onLoadMore,
}: TCategorySelectFieldProps) => {
	const [inputValue, setInputValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const listRef = useRef<HTMLDivElement>(null);

	const filteredOptions = useMemo(() => {
		const searchTerm = inputValue.toLowerCase().trim();
		if (!searchTerm) return options;
		return options.filter((option) =>
			option.title.toLowerCase().includes(searchTerm)
		);
	}, [options, inputValue]);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		if (
			target.scrollTop + target.clientHeight >= target.scrollHeight - 20 &&
			!loading &&
			onLoadMore
		) {
			onLoadMore?.();
		}
	};

	const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
	const checkedIcon = <CheckBoxIcon fontSize='small' />;

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: 'Выберите категорию',
			}}
			render={({ field: { value, onChange } }) => (
				<Autocomplete
					multiple
					options={filteredOptions}
					disableCloseOnSelect
					getOptionLabel={(option) => option.title}
					value={options.filter((option) => value?.includes(option.id))}
					onChange={(_, newValue) => {
						onChange(newValue.map((item) => item.id));
					}}
					inputValue={inputValue}
					onInputChange={(_, newInputValue, reason) => {
						if (reason !== 'reset') {
							setInputValue(newInputValue);
						}
					}}
					renderOption={(props, option, { selected }) => (
						<ListItem {...props} dense>
							<ListItemIcon>
								<Checkbox
									icon={icon}
									checkedIcon={checkedIcon}
									style={{ marginRight: 8 }}
									checked={selected}
								/>
							</ListItemIcon>
							<ListItemText
								primary={option.title}
								primaryTypographyProps={{
									color: selected ? 'primary' : 'inherit',
								}}
							/>
						</ListItem>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							variant='outlined'
							error={!!errors[name]}
							helperText={errors[name]?.message as string}
							onChange={(e) => setSearchTerm(e.target.value)}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? 'Загрузка...' : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
							sx={autocompleteStyles}
						/>
					)}
					// PopperComponent={(props) => (
					// 	<div
					// 		{...props}
					// 		ref={listRef}
					// 		style={{
					// 			maxHeight: '300px',
					// 			overflowY: 'auto',
					// 		}}
					// 		onScroll={handleScroll}
					// 	/>
					// )}
				/>
			)}
		/>
	);
};
