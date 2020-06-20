import cloudinary from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

export default async (profileImage) => {
  if (profileImage.secure_url) {
    return profileImage;
  }
  const { path } = profileImage;
  const uniqueFilename = new Date().toISOString();

  // eslint-disable-next-line camelcase
  const { secure_url } = await cloudinary.uploader.upload(
    path,
    { public_id: `kudi/${uniqueFilename}`, tags: 'kudi' }
  );

  return { secure_url };
};