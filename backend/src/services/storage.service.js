import config from '../config/config.js';
import ImageKit from '@imagekit/nodejs';


const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY, 
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
    
});

export async function uploadFile(file, fileName) {
    try {
      const result = await imagekit.files.upload({
        file: file.toString("base64"),       // Buffer, Base64 string, or URL
        fileName: fileName
      });
      return result;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }
  



// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);