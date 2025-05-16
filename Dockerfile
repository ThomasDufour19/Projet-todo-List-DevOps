FROM node:18-alpine

WORKDIR /app

# Installer les dépendances du backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Installer les dépendances du frontend
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copier les fichiers du backend
WORKDIR /app
COPY backend ./backend

# Copier les fichiers du frontend
COPY frontend ./frontend

# Construire le frontend
WORKDIR /app/frontend
RUN npm run build

# Retourner à la racine
WORKDIR /app

# Exposer les ports
EXPOSE 5000 80

# Script de démarrage
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"] 