import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { publicId } = body;

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { result } = await cloudinary.uploader.destroy(publicId);

    if (result !== 'ok') throw result;

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error deleting image from Cloudinary:', error);
    return new NextResponse('Error deleting image from Cloudinary', {
      status: 400,
      statusText: 'IMG_DELETE_ERROR',
    });
  }
};
