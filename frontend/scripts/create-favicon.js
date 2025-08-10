import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  try {
    console.log('🔧 Création du favicon.ico...');
    
    const inputPath = path.join(__dirname, '../public/icons/favicon-32x32.png');
    const outputPath = path.join(__dirname, '../public/icons/favicon.ico');
    
    // Lire l'image PNG
    const image = await Jimp.read(inputPath);
    
    // Redimensionner à 32x32 (taille standard pour favicon.ico)
    image.resize(32, 32);
    
    // Sauvegarder en ICO
    await image.writeAsync(outputPath);
    
    console.log('✅ Favicon.ico créé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création du favicon.ico:', error.message);
  }
}

createFavicon();
