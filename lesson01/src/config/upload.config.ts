import { diskStorage } from 'multer';
import { extname } from 'path';

export const uploadConfig = {
  storage: diskStorage({
    destination: './files',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};
