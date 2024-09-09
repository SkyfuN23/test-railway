const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        console.log('Iniciando Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necesario para entornos como Railway
        });

        console.log('Navegador iniciado, abriendo nueva página...');
        const page = await browser.newPage();
        
        console.log('Cargando página de Google...');
        await page.goto('https://www.google.com');
        console.log('Página cargada, tomando captura de pantalla...');

        // Guardar la captura de pantalla
        const filePath = path.join(__dirname, 'google.png');
        await page.screenshot({ path: filePath });
        console.log('Captura de pantalla tomada: google.png');

        await browser.close();
        console.log('Navegador cerrado.');

        // Enviar la captura de pantalla como respuesta
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error al tomar la captura de pantalla:', error);
        res.status(500).send('Hubo un error al tomar la captura de pantalla.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});