import { AppBar } from '@mui/material';
import { HeaderMenu } from '@/features/header/ui';

export const Header = () => {
	return (
		<AppBar
			position='static'
			elevation={0}
			sx={{
				height: '80px',
				backgroundColor: 'var(--black-color)',
			}}>
			<HeaderMenu />
		</AppBar>
	);
};
