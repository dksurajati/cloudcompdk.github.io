# Gunakan image Node.js
FROM node:14

# Buat direktori kerja
WORKDIR /app

# Salin backend
COPY app/backend /app/backend
WORKDIR /app/backend
RUN npm install

# Salin frontend
COPY app/frontend /app/frontend

# Jalankan server
EXPOSE 3000
CMD ["npm", "start"]
