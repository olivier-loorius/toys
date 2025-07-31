# 🚀 Application Fullstack TypeScript avec Supabase

Une application moderne de gestion d'utilisateurs construite avec React, TypeScript, TailwindCSS et Supabase.

## ✨ Fonctionnalités

- 🔐 **Authentification complète** avec inscription/connexion
- 👤 **Gestion des profils** avec nom, prénom et email
- 🌙 **Mode sombre/clair** avec persistance
- 📱 **Interface responsive** et moderne
- 🔒 **Sécurité** avec JWT et Supabase Auth
- 💾 **Base de données** PostgreSQL via Supabase
- ⚡ **Performance** avec Vite et React 18

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **TailwindCSS** - Framework CSS utilitaire
- **SCSS** - Préprocesseur CSS
- **Supabase Client** - SDK pour l'API

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Typage statique
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de données
- **JWT** - Authentification

## 📁 Structure du projet

```
Toys/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── contexts/        # Contextes React
│   │   ├── config/          # Configuration
│   │   └── styles/          # Styles SCSS
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # API Express
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── middleware/      # Middlewares
│   │   ├── routes/          # Routes API
│   │   └── types/           # Types TypeScript
│   └── package.json
└── supabase-setup.sql       # Script de configuration DB
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase

### 1. Configuration Supabase
1. Créez un projet sur [supabase.com](https://supabase.com)
2. Récupérez vos clés API dans Settings > API
3. Exécutez le script `supabase-setup.sql` dans l'éditeur SQL

### 2. Configuration des variables d'environnement

**Frontend** (`frontend/.env`) :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

**Backend** (`backend/.env`) :
```env
PORT=3001
JWT_SECRET=votre_secret_jwt
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

### 3. Installation des dépendances
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 4. Démarrage de l'application
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔧 Configuration

### Base de données Supabase
Le script `supabase-setup.sql` configure :
- Table `users` avec nom, prénom, email
- Politiques RLS (Row Level Security)
- Triggers automatiques pour la création de profils
- Index pour les performances

### Styles et thème
- **Couleurs personnalisées** : dark, light, primary, secondary
- **Polices** : Anton (titres), Raleway (texte)
- **Mode sombre** par défaut avec toggle
- **Responsive design** avec TailwindCSS

## 📝 API Endpoints

### Backend Express
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/me` - Informations utilisateur (protégé)

### Supabase
- Authentification automatique
- Gestion des sessions JWT
- Synchronisation temps réel

## 🎨 Composants principaux

### AuthForm
- Formulaire d'inscription/connexion
- Validation côté client
- Gestion des erreurs
- Interface responsive

### Dashboard
- Affichage des informations utilisateur
- Actions (déconnexion)
- Statistiques du compte

### ThemeToggle
- Basculement mode sombre/clair
- Persistance dans localStorage
- Icônes SVG dynamiques

## 🔒 Sécurité

- **Authentification JWT** via Supabase
- **Politiques RLS** pour la protection des données
- **Validation côté client et serveur**
- **HTTPS** obligatoire en production
- **Variables d'environnement** pour les secrets

## 🚀 Déploiement

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm start
```

## 📚 Développement

### Scripts disponibles
```bash
# Frontend
npm run dev      # Développement
npm run build    # Production
npm run preview  # Prévisualisation

# Backend
npm run dev      # Développement avec nodemon
npm start        # Production
```

### Linting et formatage
```bash
npm run lint     # Vérification ESLint
npm run format   # Formatage Prettier
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ en utilisant les meilleures pratiques modernes de développement web.

---

**Note** : Ce projet est conçu comme un exemple éducatif de développement fullstack moderne avec TypeScript. 