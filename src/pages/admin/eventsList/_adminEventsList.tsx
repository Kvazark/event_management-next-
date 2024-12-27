'use client';
import { Box } from '@mui/material';
import { Button, HeaderText, Loader } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { withAdminAuthHOC } from '@/shared/HOCS';
import { CardEvent } from '@/widgets';
import { useQuery } from '@blitzjs/rpc';
import { Suspense, useMemo, useState } from 'react';
import getAdminEvents from '@/features/event/api/queries/getAdminEvents';
import s from './styled.module.scss';
import { IEvent } from '@/entities/event';
import { useSession } from '@blitzjs/auth';

type FilterType = 'all' | 'created' | 'coauthor';
const AdminEventsList = () => {
	const router = useRouter();
	const session = useSession();
	const [events, { refetch }] = useQuery(getAdminEvents, null);
	const [filter, setFilter] = useState<FilterType>('all');
	const currentIdUser = session.userId;

	const filteredEvents = useMemo(() => {
		if (!events) return [];

		return events.filter((event: IEvent) => {
			switch (filter) {
				case 'created':
					return event.createdIdBy === currentIdUser;
				case 'coauthor':
					return event.authors.some((author) => author.id === currentIdUser);
				default:
					return true;
			}
		});
	}, [events, filter]);

	return (
		<Box className={s.wrapper}>
			<Box className={s.header}>
				<HeaderText text='Мои события' size='h1' />
				<Button
					label='Создать событие'
					view='primary'
					onClick={() => router.push('/admin/managerEvents/create')}
				/>
			</Box>

			<Box className={s.filterButtons}>
				<Button
					label='Все события'
					view={filter === 'all' ? 'primary' : 'outlined-on-dark'}
					onClick={() => setFilter('all')}
				/>
				<Button
					label='Созданные мной'
					view={filter === 'created' ? 'primary' : 'outlined-on-dark'}
					onClick={() => setFilter('created')}
				/>
				<Button
					label='Где я соавтор'
					view={filter === 'coauthor' ? 'primary' : 'outlined-on-dark'}
					onClick={() => setFilter('coauthor')}
				/>
			</Box>

			<Suspense fallback={<Loader visible={true} />}>
				<Box className={s.eventsList}>
					{filteredEvents?.map((event) => (
						<CardEvent key={event.id} event={event} onDelete={refetch} />
					))}
				</Box>
			</Suspense>
		</Box>
	);
};

export default withAdminAuthHOC(AdminEventsList);
