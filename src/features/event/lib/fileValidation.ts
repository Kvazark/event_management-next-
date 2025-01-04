export const validateImage = (file: File) => {
	const MAX_SIZE = 5 * 1024 * 1024; // 5MB
	const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	if (file.size > MAX_SIZE) {
		throw new Error('Файл слишком большой. Максимальный размер 5MB');
	}

	if (!ALLOWED_TYPES.includes(file.type)) {
		throw new Error('Неподдерживаемый формат файла');
	}

	return true;
};
