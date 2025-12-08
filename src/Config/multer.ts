import multer from 'multer';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const getUploadPath = () => {
  // Em produção no Render com Disk
  if (process.env.NODE_ENV === 'production') {
    return '/data/uploads';
  }
  
  // Desenvolvimento local
  return 'uploads/';
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = getUploadPath();
    
    // Cria pasta se não existir
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
      console.log(`📁 Pasta criada: ${uploadPath}`);
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;