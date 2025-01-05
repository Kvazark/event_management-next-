import { Box, Card, CardContent } from '@mui/material';
import { HeaderText, BodyText } from '@/shared/components';
import { formatDateToString, getTimeFromDate } from '@/shared/utils';
import { TEventHistoryCardProps } from './types';

export const EventHistoryCard = ({ event }: TEventHistoryCardProps) => {
	if (!event.updatedAt) {
		return (
			<Card
				sx={{
					width: '300px',
					backgroundColor: 'var(--background-gray)',
					color: 'var(--white-color)',
					padding: '20px',
					height: 'fit-content',
				}}>
				<CardContent>
					<HeaderText text='История изменений' size='h3' />
					<Box sx={{ mt: 2 }}>
						<BodyText
							text='Событие еще не редактировалось'
							size='p1'
							color='var(--text-secondary)'
						/>
					</Box>
				</CardContent>
			</Card>
		);
	}

	const date = formatDateToString(event.updatedAt);
	const time = getTimeFromDate(event.updatedAt);
	const editor = event.updatedByUser || event.createdBy;

	return (
		<Card
			sx={{
				width: '300px',
				backgroundColor: 'var(--background-gray)',
				color: 'var(--white-color)',
				padding: '20px',
				height: 'fit-content',
			}}>
			<CardContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<HeaderText text='Последнее изменение' size='h3' />

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						<BodyText text={`Дата: ${date}`} size='p1' />
						<BodyText text={`Время: ${time}`} size='p1' />
					</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						<BodyText
							text='Изменено пользователем:'
							size='p1'
							color='var(--text-secondary)'
						/>
						<BodyText text={editor.email} size='p1' />
						<BodyText
							text={`${editor.lastName} ${editor.firstName} ${
								editor.patronymic || ''
							}`}
							size='p1'
						/>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};
