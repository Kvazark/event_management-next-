'use client';
import { Box } from '@mui/material';
import { BodyText, Button, HeaderText } from '@/shared/components';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '24px',
				padding: '20px',
				textAlign: 'center',
			}}>
			<HeaderText text='Что-то пошло не так' size='h1' />
			<BodyText text='Попробуйте снова позже или обновите страницу' size='l' />
			<Button view='primary' label='Попробовать снова' onClick={reset} />
		</Box>
	);
}
