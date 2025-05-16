# TODO List Application

Une application de gestion de tâches avec un frontend React/TypeScript et un backend JSON Server.

## Structure du Projet

```
.
├── frontend/          # Application React/TypeScript
└── backend/          # API JSON Server
```

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (généralement installé avec Node.js)
- Docker et Docker Compose (pour la version conteneurisée)

## Installation

### Installation Locale

1. Installer les dépendances du frontend :
```bash
cd frontend
npm install
```

2. Installer les dépendances du backend :
```bash
cd backend
npm install
```

### Installation avec Docker

Pour construire et lancer l'application avec Docker :
```bash
docker-compose up --build
```

## Lancement du Projet

### Version Locale

#### Backend

Pour lancer le serveur backend (JSON Server) :
```bash
cd backend
npm start
```
Le serveur backend sera accessible sur http://localhost:5000

#### Frontend

Pour lancer l'application frontend :
```bash
cd frontend
npm run dev
```
L'application frontend sera accessible sur http://localhost:5173

### Version Docker

Une fois les conteneurs lancés avec `docker-compose up` :
- Frontend : http://localhost
- Backend : http://localhost:5000

## Scripts Disponibles

### Frontend
- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile le projet pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

### Backend
- `npm start` : Lance le serveur JSON Server

## Docker

### Commandes Docker utiles

- Construire et démarrer les conteneurs :
```bash
docker-compose up --build
```

- Démarrer les conteneurs en arrière-plan :
```bash
docker-compose up -d
```

- Arrêter les conteneurs :
```bash
docker-compose down
```

- Voir les logs :
```bash
docker-compose logs -f
```
