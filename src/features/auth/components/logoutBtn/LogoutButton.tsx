import logout from '@/features/auth/api/mutations/logout';
import { useMutation } from '@blitzjs/rpc';
import { Button } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { loadingSlice } from '@/app/store/slices/loading/loadingSlice';
import { ExitIcon } from '@/shared/icons';
import { Box } from '@mui/material';
import { authUserActions } from '@/app/store/slices/user';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const [logoutMutation] = useMutation(logout);

	const handleLogout = async () => {
		try {
			dispatch(loadingSlice.actions.setLoading(true));
			await logoutMutation();
			window.location.href = '/login';
			dispatch(authUserActions.clearAuthUser());
		} catch (error) {
			console.error('Logout error:', error);
			dispatch(loadingSlice.actions.setLoading(false));
		}
	};

	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Button label={<ExitIcon />} view='transparent' onClick={handleLogout} />
		</Box>
	);
};
