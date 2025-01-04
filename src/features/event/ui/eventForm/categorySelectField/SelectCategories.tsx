import { useEffect, useState } from 'react';
import { useQuery } from '@blitzjs/rpc';
import getCategories from '@/features/event/api/queries/getCategories';
import { toast } from 'react-toastify';
import { CategorySelectField } from './ui/CategorySelectField';
import { AddCategoryModal } from './ui/AddCategoryModal';
import { TSelectCategoriesProps } from './types';
import { Box } from '@mui/material';
import { Button } from '@/shared/components';
import { PlusCircleIcon } from '@/shared/icons';

export const SelectCategories = ({
	categories,
	onSetCategoriesData,
	...rest
}: TSelectCategoriesProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const handleCategoryAdded = (newCategory: ICategory) => {
		onSetCategoriesData((prev) => [...prev, newCategory]);
	};

	const [categoriesQuery] = useQuery(
		getCategories,
		{
			page,
			limit: 10,
		},
		{
			suspense: true,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (categoriesQuery?.categories) {
			onSetCategoriesData((prev) =>
				page === 1
					? categoriesQuery.categories
					: [...prev, ...categoriesQuery.categories]
			);
			setHasMore(categoriesQuery.hasMore);
			setLoading(false);
		}
	}, [categoriesQuery, page]);

	const loadMoreCategories = async () => {
		if (hasMore && !loading) {
			try {
				setLoading(true);
				setPage((prev) => prev + 1);
			} catch (error) {
				console.error('Error loading more categories:', error);
				toast.error('Ошибка при загрузке категорий');
			}
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Box sx={{ flex: 1 }}>
				<CategorySelectField
					name='categoryIds'
					label='Категории'
					options={categories || []}
					{...rest}
				/>
			</Box>
			<Box
				sx={{
					button: {
						width: '30px',
					},
				}}>
				<Button
					view='transparent'
					label={<PlusCircleIcon />}
					onClick={() => setIsModalOpen(true)}
				/>
			</Box>
			<AddCategoryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onCategoryAdded={handleCategoryAdded}
			/>
		</Box>
	);
};
