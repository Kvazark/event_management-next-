import * as yup from 'yup';

export const profileFormSchema = yup.object({
	firstName: yup
		.string()
		.required('Имя обязательно')
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов'),
	lastName: yup
		.string()
		.required('Фамилия обязательна')
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов'),
	patronymic: yup
		.string()
		.nullable()
		.optional()
		.max(50, 'Максимум 50 символов'),
	email: yup.string().required('Email обязателен').email('Некорректный email'),
});

export const currentPasswordSchema = yup.object({
	currentPassword: yup
		.string()
		.required('Введите текущий пароль')
		.min(6, 'Минимум 6 символов'),
});

export const newPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required('Введите новый пароль')
		.min(6, 'Минимум 6 символов'),
	confirmPassword: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('newPassword')], 'Пароли не совпадают'),
});
