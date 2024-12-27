'use client';
import React, { useEffect, useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './ui/calendar.scss';
import { formatDateToString } from '@/shared/utils/formatDateToString';
import { HighlightedCalendarDays } from '@/features/calendar/ui';
import { useQuery } from '@blitzjs/rpc';
import getUserEvents from '@/features/event/api/queries/getUserEvents';
import { DrawerCardEvent } from '@/widgets/Calendar/ui/DrawerCardEvent';

export const Calendar = () => {
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [highlightedDays, setHighlightedDays] = useState<string[]>([]);

	const [events] = useQuery(getUserEvents, null);

	useEffect(() => {
		if (events) {
			const daysToHighlight = events.map((event) =>
				formatDateToString(event.startDate, 'yyyy-MM-dd')
			);
			setHighlightedDays(daysToHighlight);
		}
	}, [events]);

	const handleDateClick = (date: string) => {
		const event = events?.find(
			(event) => formatDateToString(event.startDate, 'yyyy-MM-dd') === date
		);

		if (event) {
			setSelectedEvent(event);
			setDrawerOpen(true);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display='flex' alignItems='center' width='100%' flex='1'>
				<DateCalendar
					renderLoading={() => <div>Loading...</div>}
					slots={{
						day: (dayProps) => (
							<HighlightedCalendarDays
								{...dayProps}
								highlightedDays={highlightedDays}
								onDateClick={handleDateClick}
							/>
						),
					}}
				/>
				<Drawer
					anchor='right'
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					PaperProps={{
						sx: {
							width: '400px',
							background: 'var(--background-light-gray)',
							padding: '20px',
						},
					}}>
					{selectedEvent && <DrawerCardEvent selectedEvent={selectedEvent} />}
				</Drawer>
			</Box>
		</LocalizationProvider>
	);
};

export default Calendar;
