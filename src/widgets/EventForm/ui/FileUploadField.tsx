import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validateImage } from '@/features/event/lib/fileValidation';
import { Button } from '@/shared/components';

type TFileUploadFieldProps = {
	onFileSelect: (file: File | null) => void;
	error?: string;

	initialImage?: string;
};
export const FileUploadForm = ({
	onFileSelect,
	error,
	initialImage,
}: TFileUploadFieldProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	useEffect(() => {
		if (initialImage) {
			setPreview(initialImage);
		}
	}, [initialImage]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		try {
			validateImage(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);

			onFileSelect(file);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			setPreview(null);
			onFileSelect(null);
		}
	};

	const handleClear = (e: React.MouseEvent) => {
		e.preventDefault();
		setPreview(null);
		onFileSelect(null);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<input
				type='file'
				accept='image/*'
				onChange={handleFileChange}
				style={{ display: 'none' }}
				id='event-image-upload'
			/>

			<Box sx={{ display: 'flex', gap: 2 }}>
				<label htmlFor='event-image-upload'>
					<Button
						view='outlined-on-dark'
						label={preview ? 'Изменить изображение' : 'Загрузить изображение'}
					/>
				</label>

				{preview && (
					<Button
						view='outlined-on-dark'
						label='Удалить'
						onClick={handleClear}
					/>
				)}
			</Box>

			{preview && (
				<Box sx={{ maxWidth: '300px' }}>
					<img
						src={preview.startsWith('data:') ? preview : preview}
						alt='Preview'
						style={{
							width: '100%',
							height: 'auto',
							borderRadius: '8px',
						}}
					/>
				</Box>
			)}

			{error && <Box sx={{ color: 'var(--custom-red)' }}>{error}</Box>}
		</Box>
	);
};
