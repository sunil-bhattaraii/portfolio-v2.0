import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a base64 data URL (or a URL string) to Cloudinary.
 * Returns the secure URL of the uploaded asset.
 */
export async function uploadImage(
  dataUrl: string,
  folder = 'portfolio'
): Promise<string> {
  const result = await cloudinary.uploader.upload(dataUrl, {
    folder,
    resource_type: 'image',
  });
  return result.secure_url;
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete failed:', error);
  }
}

/** Extracts a Cloudinary public_id from a secure_url, if present. */
export function getPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+?)(?:\.\w+)?$/);
  return match ? match[1] : null;
}
