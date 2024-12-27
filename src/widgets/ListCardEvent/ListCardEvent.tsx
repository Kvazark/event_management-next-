'use client';
import './cardEvent.scss';
import { CardEvent } from '@/widgets';
import { eventsMocks } from '@/shared/api/mocks';
import { Pagination, PaginationItem, useMediaQuery } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { IEvent } from '@/entities/event';
import { Button } from '@/shared/components';
import { usePagination } from '@/shared/hooks/usePagination';
import { LeftArrowIcon, RightArrowIcon } from '@/shared/icons';
import { useQuery } from '@blitzjs/rpc';
import getEvents from '@/features/event/api/queries/getEvents';

export const ListCardEvent = () => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const [eventsQuery] = useQuery(getEvents, null);

	useEffect(() => {
		if (eventsQuery) {
			setEvents(eventsQuery);
		}
	}, [eventsQuery]);

	const { currentPage, getCurrentData, setPagePaginated, countPages } =
		usePagination<IEvent>(events, 6);

	function handlePageChange(_: ChangeEvent<unknown>, page: number) {
		setPagePaginated(page);
	}

	const isSmallScreen = useMediaQuery('(max-width:800px)');

	return (
		<div className='card-list-wrapper'>
			<div className='card-list-wrapper_cards'>
				{getCurrentData().map((item, index) => (
					<CardEvent event={item} key={`${index}-card`} />
				))}
			</div>
			<Pagination
				count={countPages}
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
									contentLeft={
										<LeftArrowIcon />
										// <SvgIcon component={LeftArrowIcon} inheritViewBox />
									}
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
		</div>
	);
};
