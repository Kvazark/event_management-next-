import { IEvent } from '@/entities/event';
import { CardEvent } from '@/widgets';
import { Box } from '@mui/material';
import React from 'react';
import { BodyText } from '@/shared/components';
import s from './drawerCardevent.module.scss';
import { getTimeFromDate } from '@/shared/utils';

type TDrawerCardEventProps = {
	selectedEvent: IEvent;
};

export const DrawerCardEvent = ({ selectedEvent }: TDrawerCardEventProps) => {
	return (
		<Box className={s.container}>
			<CardEvent event={selectedEvent} />
			<Box className={s.container_infoBlock}>
				<Box className={s.container_infoBlock_description}>
					<BodyText
						text={selectedEvent.description || 'Описание отсутствует'}
						size='p2'
						color='var(--text-secondary)'
					/>
				</Box>

				<Box className={s.container_infoBlock_time}>
					<BodyText
						text={`Начало: ${getTimeFromDate(selectedEvent.startDate)}`}
						size='p2'
						color='var(--text-secondary)'
					/>
					<BodyText
						text={`Окончание: ${getTimeFromDate(selectedEvent.endDate)}`}
						size='p2'
						color='var(--text-secondary)'
					/>
				</Box>
			</Box>
		</Box>
	);
};
