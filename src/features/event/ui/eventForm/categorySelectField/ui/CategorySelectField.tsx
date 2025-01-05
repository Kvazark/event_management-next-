import React, { useState, useRef, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import {
	Autocomplete,
	TextField,
	Checkbox,
	ListItem,
	ListItemText,
	ListItemIcon,
	Popper,
	Paper,
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
			onLoadMore();
		}
	};

	const CustomPopper = function (props: any) {
		return (
			<Popper
				{...props}
				placement='bottom-start'
				style={{ width: props.style?.width }}
				modifiers={[
					{
						name: 'offset',
						options: {
							offset: [0, 8],
						},
					},
				]}>
				<Paper
					ref={listRef}
					onScroll={handleScroll}
					elevation={8}
					sx={{
						backgroundColor: 'var(--background-light-gray)',
						color: 'var(--text-form)',
						border: '1px solid var(--custom-gray)',
						maxHeight: '300px',
						overflowY: 'auto',
						mt: 1,
						'& .MuiAutocomplete-listbox': {
							backgroundColor: 'var(--background-light-gray)',
							padding: '8px 0',
						},
						'&::-webkit-scrollbar': {
							width: '6px',
						},
						'&::-webkit-scrollbar-track': {
							background: 'var(--background-gray)',
						},
						'&::-webkit-scrollbar-thumb': {
							background: 'var(--accent-color)',
							borderRadius: '3px',
						},
					}}>
					{props.children}
				</Paper>
			</Popper>
		);
	};

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
					PopperComponent={CustomPopper}
					renderOption={(props, option, { selected }) => (
						<ListItem
							{...props}
							dense
							sx={{
								padding: '8px 16px',
								borderRadius: 1,
								mb: 0.5,
								mx: 1,
								'&:hover': {
									backgroundColor: 'var(--background-gray)',
								},
								'&.Mui-focused': {
									backgroundColor: 'var(--accent-color-secondary)',
								},
								'&.Mui-selected': {
									backgroundColor: 'var(--accent-color)',
								},
							}}>
							<ListItemIcon sx={{ minWidth: 40 }}>
								<Checkbox
									icon={<CheckBoxOutlineBlankIcon />}
									checkedIcon={<CheckBoxIcon />}
									checked={selected}
									sx={{
										color: selected
											? 'var(--accent-color)'
											: 'var(--custom-gray)',
										'&.Mui-checked': {
											color: 'var(--accent-color)',
										},
									}}
								/>
							</ListItemIcon>
							<ListItemText
								primary={option.title}
								sx={{
									color: 'var(--text-form)',
									'& .MuiTypography-root': {
										color: 'var(--text-form)',
									},
								}}
							/>
						</ListItem>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							placeholder='Поиск категории...'
							variant='outlined'
							error={!!errors[name]}
							helperText={errors[name]?.message as string}
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
					filterOptions={(options, { inputValue }) => options}
					noOptionsText='Категории не найдены'
				/>
			)}
		/>
	);
};
