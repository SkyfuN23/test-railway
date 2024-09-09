const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necesario para entornos como Railway
        });

        const page = await browser.newPage();
        await page.goto('https://www.google.com');

        // Guardar la captura de pantalla
        const filePath = path.join(__dirname, 'google.png');
        await page.screenshot({ path: filePath });

        console.log('Captura de pantalla tomada: google.png');

        await browser.close();

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
