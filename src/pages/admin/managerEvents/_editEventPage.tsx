'use client';
import { Box } from '@mui/material';
import { EventForm } from '@/widgets/EventForm/EventForm';
import { withAdminAuthHOC } from '@/shared/HOCS';
import { EventFormData } from '@/widgets/EventForm/types';
import { Loader } from '@/shared/components';
import { useQuery } from '@blitzjs/rpc';
import { useParams } from 'next/navigation';
import getEventById from '@/features/event/api/queries/getEventById';
import { EventHistoryCard } from '@/features/event/ui/eventHistoryCard';

const EditEventPage = () => {
	const params = useParams();
	const eventId = params?.id as string;

	const [event, { isLoading }] = useQuery(getEventById, { id: eventId });

	if (isLoading) {
		return <Loader visible={true} />;
	}

	if (!event) {
		return <div>Событие не найдено</div>;
	}

	const initialFormData: EventFormData = {
		id: event.id,
		formatId: event.formatId,
		title: event.title,
		startDate: event.startDate,
		endDate: event.endDate,
		formatType: event.format.formatName as 'онлайн' | 'офлайн' | 'гибрид',
		link: event.format.link || undefined,
		address: event.format.address || undefined,
		description: event.description || '',
		image: event.image,
		categoryIds: event.categories.map((cat) => cat.id),
		authorIds: event.authors.map((author) => author.id),
	};

	return (
		<Box
			sx={{
				display: 'flex',
				gap: '24px',
				width: '100%',
				'& > :first-of-type': { flex: 1 },
			}}>
			<Box>
				<EventForm
					initialData={initialFormData}
					submitButtonText='Обновить событие'
				/>
			</Box>
			<EventHistoryCard event={event} />
		</Box>
	);
};

export default withAdminAuthHOC(EditEventPage);
