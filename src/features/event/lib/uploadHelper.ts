export const uploadFile = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	try {
		// Используем абсолютный URL
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5080';
		const response = await fetch(`${baseUrl}/api/upload`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Ошибка загрузки файла');
		}

		const data = await response.json();
		return data.url;
	} catch (error) {
		console.error('Upload error:', error);
		throw new Error('Ошибка при загрузке файла');
	}
};
