const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // IMPORTANTE: Carga las variables del .env

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204); res.end(); return;
    }

    // 1. LIMPIEZA DE URL
    const cleanUrl = req.url.split('?')[0];
    const urlPath = cleanUrl === '/' ? 'index.html' : cleanUrl;
    
    // 2. CONSTRUIR RUTA: Apuntando a la carpeta /public
    const filePath = path.join(__dirname, 'public', urlPath.replace(/^\//, ''));

    // 3. VERIFICACIÓN DE EXISTENCIA
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>');
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500); res.end('Error interno del servidor');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg'
            };
            const contentType = mimeTypes[ext] || 'text/html';
            
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content);
        }
    });
});

// Usamos el puerto del .env o el 4000 por defecto
const PORT = process.env.PORT || 4000;

// Escuchamos en 0.0.0.0 para que funcione en la nube
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});