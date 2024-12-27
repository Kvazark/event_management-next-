import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Badge } from '@mui/material';

type HighlightedCalendarDaysProps = PickersDayProps<Dayjs> & {
	highlightedDays?: string[];
	onDateClick?: (date: string) => void;
};

export const HighlightedCalendarDays = (
	props: HighlightedCalendarDaysProps
) => {
	const { highlightedDays = [], day, onDateClick, ...other } = props;

	const formattedDate = day.format('YYYY-MM-DD');
	const isHighlighted = highlightedDays.includes(formattedDate);

	const handleClick = () => {
		if (isHighlighted && onDateClick) {
			onDateClick(formattedDate);
		}
	};

	return (
		<Badge
			key={day.toString()}
			overlap='circular'
			badgeContent={
				isHighlighted ? (
					<div
						style={{
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							backgroundColor: 'var(--custom-lilac)',
							position: 'absolute',
							top: '5px',
							left: '50%',
							transform: 'translateX(-50%)',
						}}
					/>
				) : undefined
			}>
			<PickersDay
				{...other}
				day={day}
				onClick={handleClick}
				sx={{
					color: isHighlighted ? 'var(--custom-lilac) !important' : undefined,
					'&:hover': {
						backgroundColor: isHighlighted
							? 'var(--custom-dark-gray)'
							: undefined,
					},
				}}
			/>
		</Badge>
	);
};
