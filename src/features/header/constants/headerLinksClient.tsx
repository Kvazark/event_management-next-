import { ProfileClientIcon, CalendarIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/header/ui/HeaderMenu/types';

export const headerLinksClient: THeaderLinks[] = [
	{
		link: '/client/calendar',
		icon: <CalendarIcon />,
	},
	{
		link: '/client/profile',
		icon: <ProfileClientIcon />,
	},
];
