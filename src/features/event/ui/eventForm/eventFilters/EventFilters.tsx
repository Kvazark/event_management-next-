import { Box } from '@mui/material';
import { Button } from '@/shared/components';
import { useQuery } from '@blitzjs/rpc';
import getAllCategories from '@/features/event/api/queries/getAllCategories';
import { CategoryFilterDropdown } from './CategoryFilterDropdown';

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
			<CategoryFilterDropdown
				categories={categories}
				selectedCategories={selectedCategories}
				onCategoryChange={onCategoriesChange}
			/>

			<Button
				view='outlined-on-dark'
				label={sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
				onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
			/>
		</Box>
	);
};
