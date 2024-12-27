import {
	Box,
	Popover,
	TextField,
	Checkbox,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import { BodyText, Button } from '@/shared/components';
import { FilterIcon } from '@/shared/icons';
import { useRef, useState } from 'react';
import s from './styled.module.scss';
import { textFieldStyles } from '@/shared/styles/textFieldStyles';

type CategoryFilterDropdownProps = {
	categories: Array<{ id: string; title: string }>;
	selectedCategories: string[];
	onCategoryChange: (categories: string[]) => void;
};

export const CategoryFilterDropdown = ({
	categories,
	selectedCategories,
	onCategoryChange,
}: CategoryFilterDropdownProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [searchText, setSearchText] = useState('');
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSearchText('');
	};

	const handleToggleCategory = (categoryId: string) => {
		const newSelected = selectedCategories.includes(categoryId)
			? selectedCategories.filter((id) => id !== categoryId)
			: [...selectedCategories, categoryId];
		onCategoryChange(newSelected);
	};

	const filteredCategories = categories.filter((category) =>
		category.title.toLowerCase().includes(searchText.toLowerCase())
	);

	const open = Boolean(anchorEl);

	return (
		<>
			<Box className={s.container}>
				<Button
					ref={buttonRef}
					onClick={handleClick}
					view='primary'
					label={
						<Box className={s.containerBtn}>
							<BodyText text='Фильтровать по категориям' size='p1' />
							<Box width='24px' height='24px'>
								<FilterIcon />
							</Box>
							{selectedCategories.length > 0 &&
								`(${selectedCategories.length})`}
						</Box>
					}
				/>
			</Box>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				slotProps={{
					paper: {
						sx: {
							width: 300,
							mt: 1,
							bgcolor: 'var(--background-light-gray)',
							border: '1px solid var(--custom-gray)',
						},
					},
				}}>
				<Box sx={{ p: 2 }}>
					<TextField
						fullWidth
						size='small'
						placeholder='Поиск категорий...'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						sx={textFieldStyles}
					/>

					<List
						sx={{
							maxHeight: 300,
							overflow: 'auto',
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
						{filteredCategories.map((category) => (
							<ListItem
								key={category.id}
								dense
								button
								onClick={() => handleToggleCategory(category.id)}
								sx={{
									borderRadius: 1,
									mb: 0.5,
									'&:hover': {
										bgcolor: 'var(--background-gray)',
									},
								}}>
								<ListItemIcon sx={{ minWidth: 40 }}>
									<Checkbox
										edge='start'
										checked={selectedCategories.includes(category.id)}
										sx={{
											color: 'var(--custom-gray)',
											'&.Mui-checked': {
												color: 'var(--accent-color)',
											},
										}}
									/>
								</ListItemIcon>
								<ListItemText
									primary={category.title}
									sx={{
										'& .MuiTypography-root': {
											color: 'var(--white-color)',
										},
									}}
								/>
							</ListItem>
						))}
					</List>
				</Box>
			</Popover>
		</>
	);
};
