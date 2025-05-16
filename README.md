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

## Installation

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

## Lancement du Projet

### Backend

Pour lancer le serveur backend (JSON Server) :
```bash
cd backend
npm install
npm start
```
Le serveur backend sera accessible sur http://localhost:5000

### Frontend

Pour lancer l'application frontend :
```bash
cd frontend
npm install
npm run dev
```
L'application frontend sera accessible sur http://localhost:5173

## Scripts Disponibles

### Frontend
- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile le projet pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

### Backend
- `npm start` : Lance le serveur JSON Server
