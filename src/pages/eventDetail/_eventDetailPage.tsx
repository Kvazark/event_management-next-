'use client';
import { Box } from '@mui/material';
import { Button, Loader } from '@/shared/components';
import { useParams, useRouter } from 'next/navigation';
import { EventDetail } from '@/widgets/EventDetail';
import s from './pageStyled.module.scss';
import { EventHeaderDetail } from '@/widgets/EventDetail/components/EventHeaderDetail';
import { useSession } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';
import getEventById from '@/features/event/api/queries/getEventById';
import registerForEvent from '@/features/event/api/mutations/registerForEvent';
import { toast } from 'react-toastify';
import { Suspense } from 'react';

export const EventDetailPage = () => {
	const router = useRouter();
	const params = useParams();
	const session = useSession();

	const id = params?.id as string;
	const [event, { isLoading }] = useQuery(getEventById, { id });
	const [registerForEventMutation] = useMutation(registerForEvent);
	console.log(session);

	const handleRegister = async () => {
		try {
			if (!session.userId) {
				toast.error(
					`Необходимо авторизоваться, чтобы зарегистрироваться на событие "${event?.title}"`
				);
				return;
			}

			if (session.role !== 'CLIENT') {
				toast.error('Только клиенты могут регистрироваться на события');
				return;
			}

			await registerForEventMutation({ eventId: id });
			toast.success(`Вы зарегистрировались на событие "${event?.title}"`);
			router.push('/client/calendar');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Произошла ошибка при регистрации на событие');
			}
		}
	};

	if (isLoading || !event) {
		return <Loader visible={true} />;
	}

	return (
		<Box className={s.wrapper}>
			<EventHeaderDetail
				event={event}
				btnBack={
					<Button
						label='назад'
						view='primary'
						onClick={() => router.back()}
						addedClassName={s.btnBack}
					/>
				}
			/>
			<Suspense fallback={<Loader visible={true} />}>
				<EventDetail event={event} />
				<Box className={s.wrapper_block}>
					<Button
						label='Зарегистрироваться на событие'
						view='primary'
						onClick={handleRegister}
					/>
				</Box>
			</Suspense>
		</Box>
	);
};
