'use client';
import './cardEvent.scss';
import { CardEvent } from '@/widgets';
import { Box, Pagination, PaginationItem, useMediaQuery } from '@mui/material';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { Button, Loader } from '@/shared/components';
import { LeftArrowIcon, RightArrowIcon } from '@/shared/icons';
import { useQuery } from '@blitzjs/rpc';
import { EventFilters } from '@/features/event/ui/eventForm';
import getEventsWithFilters from '@/features/event/api/queries/getEventsWithFilters';

export const ListCardEvent = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const [{ events, totalPages }, { refetch }] = useQuery(getEventsWithFilters, {
		page: currentPage,
		perPage: 6,
		categoryIds: selectedCategories,
		sortBy: sortOrder,
	});

	useEffect(() => {
		setCurrentPage(1);
		refetch();
	}, [selectedCategories, sortOrder]);

	function handlePageChange(_: ChangeEvent<unknown>, page: number) {
		setCurrentPage(page);
	}

	const isSmallScreen = useMediaQuery('(max-width:800px)');

	if (!events) {
		return <Loader visible={true} />;
	}

	return (
		<Suspense fallback={<Loader visible={true} />}>
			<Box className='card-list-wrapper'>
				<Box className='card-list-wrapper_container'>
					<EventFilters
						selectedCategories={selectedCategories}
						sortOrder={sortOrder}
						onCategoriesChange={setSelectedCategories}
						onSortChange={setSortOrder}
					/>

					<Box className='card-list-wrapper_cards'>
						{events.map((item, index) => (
							<CardEvent event={item} key={`${index}-card`} />
						))}
					</Box>
				</Box>

				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
						renderItem={(item) => (
							<PaginationItem
								className={
									item.type === 'page' && item.page === currentPage
										? 'current-page'
										: 'no-current-page'
								}
								slots={{
									previous: () => (
										<Button
											view='outlined-on-dark'
											label={!isSmallScreen ? 'Назад' : ''}
											contentLeft={<LeftArrowIcon />}
										/>
									),
									next: () => (
										<Button
											view='outlined-on-dark'
											label={!isSmallScreen ? 'Вперёд' : ''}
											contentRight={<RightArrowIcon />}
										/>
									),
								}}
								{...item}
							/>
						)}
					/>
				)}
			</Box>
		</Suspense>
	);
};
