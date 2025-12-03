// ./src/express.js: Initialize and manage Express.js
const express = require('express');
const path = require('path');
const settings = require('../../settings.json');
const PORT = "8080";

const app = express();
app.use(express.json());

/**
 * EXAMPLE REQUEST BODY!!
 * {
 *  "key":"thisisakey.key1"
 *  "value(o)":"thisisavalue"
 * }
 */

app.any('/data/write', async (req, res) => {
    // Normally we don't accept writes from GET requests, but this should be able to be interacted with by the browser
});

app.get('/data/write', async (req, res) => {
    // 
});

app.listen(PORT, () => logRoute("Server", `Server running on http://localhost:${PORT}`));