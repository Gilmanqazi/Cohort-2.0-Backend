import ImageKit from 'imagekit';
import { config } from '../config/config.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: config.urlEndpoint 
});

/**
 * Upload Logic
 */
export const uploadFile = async ({ buffer, fileName, folder = "snitch" }) => {
  try {
    const result = await client.upload({
      file: buffer,
      fileName: fileName,
      folder: folder
    });
    return result;
  } catch (error) {
    console.error("ImageKit Upload Error:", error.message);
    throw error;
  }
};

/**
 * Delete Logic
 */
export const deleteFileFromImageKit = async (filePath) => {
  try {
    // 1. Path Clean karo: "snitch/image.jpg" -> name: "image.jpg", folder: "/snitch"
    const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    const parts = cleanPath.split('/');
    const fileName = parts.pop(); 
    const folderPath = parts.length > 0 ? `/${parts.join('/')}` : "/";

    
    // 2. File dhoondo
    const files = await client.listFiles({
      name: fileName,
      path: folderPath
    });

    // 3. Agar mili toh delete karo
    if (files && files.length > 0) {
      await client.deleteFile(files[0].fileId);
      return { success: true };
    }
    return { success: false, message: "File not found" };
  } catch (error) {
    console.error("ImageKit Delete Error:", error.message);
    return { success: false, error: error.message };
  }
};