import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');

// Serve static assets from the Vite build output directory
app.use(express.static(distPath));

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'mardigras-nightclub', timestamp: new Date().toISOString() });
});

// SPA fallback: send index.html for all client-side routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Aplicação em inicialização</title>
          <style>
            body { font-family: sans-serif; background: #0a0a0a; color: #f5f5f5; text-align: center; padding: 50px 20px; }
            h1 { color: #d4af37; }
            code { background: #222; padding: 4px 8px; border-radius: 4px; color: #4ade80; }
          </style>
        </head>
        <body>
          <h1>Mardigras NightClub</h1>
          <p>O diretório de compilação <code>dist/</code> ainda não foi encontrado.</p>
          <p>Execute <code>npm run build</code> no painel da Hostinger para compilar os arquivos estáticos.</p>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Mardigras NightClub server running on http://${HOST}:${PORT}`);
});
