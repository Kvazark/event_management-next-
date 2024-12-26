'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@blitzjs/rpc';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { withAdminAuthHOC } from '@/shared/HOCS';
import { ProfileForm } from '@/widgets/Profile/ProfileForm';
import { Loader } from '@/shared/components';
import getUserProfile from '@/features/user/api/queries/getUserProfile';
import updateUserProfile from '@/features/user/api/mutations/updateUserProfile';

const AdminPage = () => {
	const [userData, setUserData] = useState(null);
	const [userQuery] = useQuery(getUserProfile, null);
	const [updateProfileMutation] = useMutation(updateUserProfile);

	useEffect(() => {
		if (userQuery) {
			setUserData(userQuery);
		}
	}, [userQuery]);

	const handleSubmit = async (data) => {
		try {
			const updatedUser = await updateProfileMutation(data);
			setUserData(updatedUser);
			toast.success('Профиль успешно обновлен');
			return true; // Возвращаем true для индикации успешного обновления
		} catch (error) {
			if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
				toast.error('Этот email уже используется');
			} else {
				toast.error('Ошибка при обновлении профиля');
			}
			return false; // Возвращаем false при ошибке
		}
	};

	if (!userData) {
		return <Loader visible={true} />;
	}

	return (
		<Box sx={{ width: '100%', height: '100%', padding: '24px' }}>
			<ProfileForm initialData={userData} onSubmit={handleSubmit} />
		</Box>
	);
};

export default withAdminAuthHOC(AdminPage);
