import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin du fichier actuel en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des tailles d'icônes
const iconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-120x120.png', size: 120 },
  { name: 'apple-touch-icon-76x76.png', size: 76 },
  { name: 'apple-touch-icon-60x60.png', size: 60 }
];

// Chemins des dossiers
const inputPath = path.join(__dirname, '../public/images/BTLogo.png');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  try {
    console.log('🎨 Génération des icônes à partir de BTLogo.png...');
    
    // Vérifier que le logo source existe
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Logo source non trouvé: ${inputPath}`);
    }
    
    // Créer le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Générer chaque taille d'icône
    for (const icon of iconSizes) {
      const outputPath = path.join(outputDir, icon.name);
      
      console.log(`📱 Génération de ${icon.name} (${icon.size}x${icon.size})...`);
      
      await sharp(inputPath)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Fond transparent
        })
        .png()
        .toFile(outputPath);
    }
    
    // Créer le favicon.ico (combinaison de 16x16 et 32x32)
    console.log('🔧 Génération du favicon.ico...');
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32-for-ico.png'));
    
    console.log('✅ Toutes les icônes ont été générées avec succès !');
    console.log(`📁 Icônes sauvegardées dans: ${outputDir}`);
    
    // Afficher la liste des fichiers générés
    const generatedFiles = fs.readdirSync(outputDir);
    console.log('\n📋 Fichiers générés:');
    generatedFiles.forEach(file => {
      const stats = fs.statSync(path.join(outputDir, file));
      console.log(`   - ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération des icônes:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
generateIcons();
