// ./src/express.js: Initialize and manage Express.js
const express = require('express');
const path = require('path');
const settings = require('../../settings.json');
const PORT = "8080";

const app = express();
app.use(express.json());

app.get('/api/:action', async (req, res) => {

});

app.listen(PORT, () => logRoute("Server", `Server running on http://localhost:${PORT}`));