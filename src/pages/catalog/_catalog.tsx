import s from './catalogPageStyled.module.scss';
import { ListCardEvent } from '@/widgets';

export const CatalogPage = () => {
	return (
		<div className={s.wrapper}>
			<ListCardEvent />
		</div>
	);
};
