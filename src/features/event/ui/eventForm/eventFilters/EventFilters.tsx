import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@/shared/components';
import { useQuery } from '@blitzjs/rpc';
import getAllCategories from '@/features/event/api/queries/getAllCategories';

type EventFiltersProps = {
	selectedCategories: string[];
	sortOrder: 'asc' | 'desc';
	onCategoriesChange: (categories: string[]) => void;
	onSortChange: (order: 'asc' | 'desc') => void;
};

export const EventFilters = ({
	selectedCategories,
	sortOrder,
	onCategoriesChange,
	onSortChange,
}: EventFiltersProps) => {
	const [categoriesData] = useQuery(getAllCategories, undefined);
	const categories = categoriesData || [];

	return (
		<Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
			<FormControl sx={{ minWidth: 200 }}>
				<InputLabel>Категории</InputLabel>
				<Select
					multiple
					value={selectedCategories}
					onChange={(e) => onCategoriesChange(e.target.value as string[])}
					label='Категории'
					sx={{
						'& .MuiSelect-select': {
							color: 'var(--white-color)',
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--custom-gray)',
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--white-color)',
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--white-color)',
						},
					}}>
					{categories.length > 0 ? (
						categories.map((category) => (
							<MenuItem key={category.id} value={category.id}>
								{category.title}
							</MenuItem>
						))
					) : (
						<MenuItem disabled>No categories available</MenuItem>
					)}
				</Select>
			</FormControl>

			<Button
				view='outlined-on-dark'
				label={sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
				onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
			/>
		</Box>
	);
};
