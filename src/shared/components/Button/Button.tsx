import { Button } from '@mui/material';
import { ReactNode } from 'react';

type TButtonProps = {
	label: string | ReactNode;
	contentLeft?: ReactNode;
	contentRight?: ReactNode;
	view:
		| 'primary'
		| 'secondary'
		| 'outlined-on-light'
		| 'outlined-on-dark'
		| 'transparent'
		| 'link';
	disabled?: boolean;
	stretch?: boolean;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
	dataTestid?: string;
	href?: string;
	addedClassName?: string;
};
export const CustomButton = ({
	label,
	contentLeft,
	contentRight,
	view,
	disabled,
	stretch,
	onClick,
	type,
	dataTestid,
	href,
	addedClassName,
}: TButtonProps) => {
	const getButtonStyles = () => {
		switch (view) {
			case 'primary':
				return {
					background: disabled ? 'var(--text-outline)' : 'var(--accent-color)',
					borderRadius: '12px',
					color: 'var(--white-color)',
					'&:hover': {
						background: 'var(--accent-color-secondary)',
						'svg path': {
							fill: 'var(--black-color)',
						},
					},
				};
			case 'outlined-on-dark':
				return {
					border: '2px solid var(--accent-color-secondary)',
					background: 'transparent',
					borderRadius: '55px',
					color: 'var(--white-color)',
					'&:hover': {
						background: 'var(--background-gray)',
						border: '2px solid var(--accent-color)',
					},
				};
			case 'outlined-on-light':
				return {
					border: '2px solid var(--accent-color-secondary)',
					background: 'transparent',
					borderRadius: '55px',
					'&:hover': {
						background: 'var(--background-gray)',
						border: '1px solid var(--accent-color)',
						'svg path': {
							fill: 'var(--black-color)',
						},
					},
				};
			case 'secondary':
				return {
					background: 'var(--text-form)',
					borderRadius: '55px',
					minWidth: '24px',
					padding: '6px 8px',
					'&:hover': {
						background: 'var(--text-outline)',
					},
				};
			case 'transparent':
				return {
					color: 'var(--accent-color)',
					background: 'transparent',
					padding: '0',
					minWidth: '16px',
					'svg path': {
						fill: 'var(--accent-color)',
					},
					'&:hover': {
						color: 'var(--accent-color-secondary)',
						'svg path': {
							fill: 'var(--accent-light-color)',
						},
					},
				};
			case 'link':
				return {
					background: 'transparent',
					padding: '0',
					height: 'fit-content',
					minWidth: '16px',
					gap: '4px',
					'&:hover': {
						background: 'transparent',
						'svg path': {
							fill: 'var(--black-color)',
						},
						color: 'var(--black-color)',
					},
					'svg path': {
						fill: 'var(--text-secondary)',
					},
				};
		}
	};

	const buttonStyles = getButtonStyles();

	return (
		<Button
			data-testid={dataTestid}
			onClick={onClick}
			disabled={disabled}
			type={type}
			href={href}
			className={`btn, ${addedClassName}`}
			sx={{
				display: 'flex',
				gap: '8px',
				justifyContent: 'center',
				alignItems: 'center',
				padding: contentLeft || contentRight ? '12px 24px' : '10px 18px',
				color: 'var(--black-color)',
				fontWeight: '700',
				fontSize: '16px',
				textTransform: 'none',
				width: stretch ? '100%' : 'auto',
				height: contentLeft || contentRight || stretch ? '48px' : '40px',
				...buttonStyles,
			}}
			disableRipple>
			{contentLeft}
			{label}
			{contentRight}
		</Button>
	);
};
