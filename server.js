const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204); res.end(); return;
    }

    // 1. LIMPIEZA DE URL: Fundamental para que funcione el formulario
    const cleanUrl = req.url.split('?')[0];
    const urlPath = cleanUrl === '/' ? 'index.html' : cleanUrl;
    
    // 2. CONSTRUIR RUTA: Usamos cleanUrl quitando la barra inicial
    const filePath = path.join(__dirname, 'public', urlPath.replace(/^\//, ''));

    // 3. VERIFICACIÓN DE EXISTENCIA: Evita que el servidor muera
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>');
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500); res.end('Error');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'text/html';
            const mimeTypes = {
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg'
            };
            contentType = mimeTypes[ext] || 'text/html';
            
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content);
        }
    });
});

server.listen(3000, () => console.log("Servidor en http://localhost:3000"));