import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { supabase, createUsersTable } from './config/supabase';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL du frontend Vite
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend API fonctionnel', timestamp: new Date().toISOString() });
});

// Initialiser la base de données
async function initializeDatabase() {
  try {
    // Créer la table users si elle n'existe pas
    const { error } = await supabase.rpc('exec_sql', { sql: createUsersTable });
    
    if (error) {
      console.log('Note: La table users pourrait déjà exister ou nécessiter une création manuelle');
    } else {
      console.log('✅ Table users initialisée avec succès');
    }
  } catch (error) {
    console.log('Note: Impossible d\'initialiser automatiquement la table. Veuillez la créer manuellement dans Supabase.');
  }
}

// Démarrer le serveur
app.listen(PORT, async () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}`);
  console.log(`🔐 Routes d'authentification: http://localhost:${PORT}/api/auth`);
  
  await initializeDatabase();
});

export default app; 