import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import * as path from 'path';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file || !(file instanceof File)) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		const uploadsDir = path.join(process.cwd(), 'public/uploads');
		if (!existsSync(uploadsDir)) {
			await mkdir(uploadsDir, { recursive: true });
		}

		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const filename = uniqueSuffix + path.extname(file.name);
		const filepath = path.join(uploadsDir, filename);

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		await writeFile(filepath, buffer);

		const fileUrl = `/uploads/${filename}`;

		return new NextResponse(JSON.stringify({ url: fileUrl }), {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ error: 'Internal server error during file upload' },
			{ status: 500 }
		);
	}
}
export const config = {
	api: {
		bodyParser: false,
	},
};
