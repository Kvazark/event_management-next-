import { Box } from '@mui/material';
import { eventsMocks } from '@/shared/api/mocks';
import { IEvent } from '@/entities/event';
import { BodyText, HeaderText } from '@/shared/components';
import s from './styles.module.scss';
import {
	AboutConf,
	DescriptionConf,
	AnimationComponent,
	BottomDescription,
} from '@/widgets/EventDetail/components';

export const findEventById = (events: IEvent[], id: string) => {
	return events.find((event) => event.id === id);
};

type TEventDetailProps = {
	event: IEvent;
};

export const EventDetail = ({ event }: TEventDetailProps) => {
	const textTitle = [
		`Присоединяйтесь к нам на конференции ${event?.title}!`,
		'Это уникальная возможность для educators, исследователей, студентов и всех, кто заинтересован в будущем образования, собраться вместе, поделиться идеями и обсудить последние тренды и технологии, которые меняют образовательный ландшафт.',
	];

	return (
		<Box className={s.wrapper}>
			<Box className={s.wrapper_testBlock}></Box>
			<Box className={s.wrapper_block} sx={{ position: 'relative' }}>
				<AnimationComponent />
			</Box>
			<Box
				className={s.wrapper_block}
				sx={{ background: 'var(--white-color)' }}>
				<Box className={s.wrapper_block_text} alignItems='center'>
					<HeaderText
						text={textTitle[0]}
						size='h1'
						color='var(--accent-color)'
					/>
					<BodyText
						text={textTitle[1]}
						size='l'
						color={'var(--black-color)'}
						fontWeight='600'
					/>
				</Box>
			</Box>
			<Box
				className={s.wrapper_block}
				sx={{
					background: 'var(--white-color)',
				}}>
				<AboutConf categories={event?.categories} />
				<DescriptionConf categoryTitle={event?.categories[0].title || 'IT'} />
			</Box>
			<Box className={s.wrapper_block}>
				<BottomDescription />
			</Box>
			<Box
				className={s.wrapper_block}
				flexDirection='column'
				sx={{
					background: 'var(--white-color)',
				}}>
				<Box className={s.wrapper_block_text}>
					<HeaderText
						text='Регистрация:'
						size='h1'
						color='var(--black-color)'
					/>
					<BodyText
						text={
							'Не упустите шанс стать частью этого значимого события! Зарегистрируйтесь до 3-х дней до окончания регистрации' +
							' на этой странице. Количество мест ограничено!'
						}
						size='l'
						color={'var(--black-color)'}
					/>
				</Box>
			</Box>
		</Box>
	);
};
