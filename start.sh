#!/bin/sh

# Démarrer le backend en arrière-plan
cd /app/backend
npm start &
BACKEND_PID=$!

# Démarrer le serveur frontend en arrière-plan
cd /app/frontend
npm run preview -- --host 0.0.0.0 --port 80 &
FRONTEND_PID=$!

# Attendre que les deux processus se terminent
wait $BACKEND_PID
wait $FRONTEND_PID 