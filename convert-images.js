import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputPath = fullPath.replace(ext, '.webp');
        if (!fs.existsSync(outputPath)) {
          sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(() => console.log(`Converted: ${fullPath} -> ${outputPath}`))
            .catch(err => console.error(`Error converting ${fullPath}:`, err));
        } else {
          console.log(`Skipped (already exists): ${outputPath}`);
        }
      }
    }
  });
};

walk(publicDir);
