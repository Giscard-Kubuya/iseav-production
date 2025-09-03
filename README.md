# ISEAV-WALUNGU Website

Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu

## Architecture du Projet

Ce projet utilise **Next.js 13+ App Router** avec une architecture séparée en 4 logiques principales :

### 🌐 Site Web Public - `app/(public)/`
- Pages publiques du site institutionnel
- Informations sur l'institut, programmes, actualités
- Processus de candidature en ligne
- Multilingue (Français, Anglais)

### 🔐 Portails Utilisateurs - `app/portal/`
- **Portail Étudiant** (`/portal/student/`) : Notes, présences, devoirs, finances
- **Portail Parent** (`/portal/parent/`) : Suivi des enfants, communications

### 🛡️ Administration - `app/admin/`
- Gestion complète du système
- Utilisateurs, candidatures, contenu, finances
- Rapports et analytics
- Configuration système

### 🔧 Enseignants - `app/teacher/`
- Gestion des classes et étudiants
- Saisie notes et présences
- Devoirs et évaluations
- Communications

## Structure des Dossiers

```
app/
├── (public)/           # Site web public
├── portal/            # Portails utilisateurs
├── admin/             # Back-office administration
├── teacher/           # Portail enseignants
├── (auth)/            # Pages d'authentification
└── api/               # Routes API séparées par logique
```

## Technologies

- **Framework** : Next.js 13+ (App Router)
- **Styling** : Tailwind CSS
- **Language** : TypeScript
- **Database** : PostgreSQL (prévu)
- **Authentication** : NextAuth.js (prévu)
- **Deployment** : Vercel/Docker

## Installation

```bash
npm install
npm run dev
```

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et configurez :

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

## Routes principales

### Site Public
- `/` - Accueil
- `/about` - À propos
- `/academics` - Programmes académiques
- `/admissions` - Candidatures
- `/news` - Actualités
- `/contact` - Contact

### Portails
- `/portal/student` - Dashboard étudiant
- `/portal/parent` - Dashboard parent

### Administration
- `/admin` - Dashboard admin
- `/admin/users` - Gestion utilisateurs
- `/admin/admissions` - Gestion candidatures
- `/admin/academic` - Gestion académique

### Enseignants
- `/teacher` - Dashboard enseignant
- `/teacher/classes` - Gestion des classes

## API

Les APIs sont organisées par logique :

- `/api/public/*` - APIs publiques
- `/api/portal/*` - APIs portails utilisateurs
- `/api/admin/*` - APIs administration
- `/api/auth/*` - Authentification

## Sécurité

Le middleware gère :
- Authentification par rôle
- Redirection selon les permissions
- Internationalisation
- Protection des routes sensibles

## Développement

1. Cloner le repository
2. Installer les dépendances : `npm install`
3. Configurer `.env.local`
4. Lancer : `npm run dev`
5. Ouvrir http://localhost:3000

## Déploiement

Voir `docs/deployment.md` pour les instructions détaillées.

## Contribution

Voir `docs/contributing.md` pour les guidelines de contribution.
