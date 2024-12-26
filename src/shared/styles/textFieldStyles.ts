export const textFieldStyles = {
	'& label': {
		color: 'var(--text-secondary)',
		'&.Mui-focused': {
			color: 'var(--white-color)',
		},
		'&.Mui-error': {
			color: 'var(--custom-red)',
		},
	},
	'& .MuiInputBase-root': {
		color: 'var(--white-color)',
		backgroundColor: 'var(--background-gray)',
		borderRadius: '12px',
		'&:hover': {
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--white-color)',
			},
		},
		'&.Mui-focused': {
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--white-color)',
			},
		},
		'&.Mui-error': {
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--custom-red)',
			},
		},
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'var(--custom-gray)',
	},
	'& .MuiInputBase-input': {
		padding: '12px 16px',
		'&::placeholder': {
			color: 'var(--text-secondary)',
			opacity: 1,
		},
	},
	'& .MuiFormHelperText-root': {
		color: 'var(--text-secondary)',
		'&.Mui-error': {
			color: 'var(--custom-red)',
		},
	},
	'& .Mui-disabled': {
		opacity: 0.8,
		'-webkit-text-fill-color': 'var(--text-form) !important',

		'& .MuiOutlinedInput-notchedOutline': {
			color: 'var(--text-form)',
			borderColor: 'var(--custom-gray)',
		},
	},
};
