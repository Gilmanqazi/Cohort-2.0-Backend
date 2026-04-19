import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY 
});

export const uploadFile = async ({buffer,fileName,folder = "snitch"})=>{

  const result = await client.files.upload({
    file:await ImageKit.toFile(buffer),
    fileName,
    folder
  })

  return result
}


export const deleteFileFromImageKit = async (filePath) => {
  try {
    // ImageKit path ke aage '/' lagana zaroori hai search ke liye
    const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    const fileName = filePath.split('/').pop();

    // 1. File dhoondo
    const files = await client.files.list({
      searchQuery: `name = "${fileName}" AND filePath = "${cleanPath}"`
    });

    // 2. Agar mili toh delete karo
    if (files && files.length > 0) {
      await client.files.delete(files[0].fileId);
      return { success: true };
    }
    return { success: false, message: "File not found on Cloud" };
  } catch (error) {
    console.error("ImageKit Delete Error:", error.message);
    return { success: false, error: error.message };
  }
};