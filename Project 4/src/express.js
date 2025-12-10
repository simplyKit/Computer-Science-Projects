// ./src/express.js: Initialize and manage Express.js
const express = require('express');
const path = require('node:path'); //Yes I use node:path instead of path. Complain about it.
const PORT = "8080";
const { setKVData, getKVData, remKVData } = require('./database');
const app = express();
app.use(express.json());

/**
 * EXAMPLE QUERY PARAMS!!
 * ?db=database_location(name)&key=thisisakey.key1&value=thisisavalue
 * db defaults to 'database' if not provided
 */

app.get('/data/write', async (req, res) => { // Runs when the endpoint is hit by an HTTP GET Request
    const query = req.query || {}
    const dbl = query?.db || 'database'
    const key = query?.key
    const val = query?.value
    if (key == null || val == null) return res.status(400).json({ error: `Invalid key/query parameter value` });
    try {
        return res.json(await setKVData(dbl,key,val));
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
});

app.get('/data/delete', async (req, res) => { // Runs when the endpoint is hit by an HTTP GET Request
    const query = req.query || {}
    const dbl = query?.db || 'database'
    const key = query?.key
    if (key == null) return res.status(400).json({ error: `Invalid key/query parameter value` });
    try {
        return res.json(await remKVData(dbl,key));
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
});

app.get('/data/read', async (req, res) => { // Runs when the endpoint is hit by an HTTP GET Request
    const query = req.query || {}
    const dbl = query?.db || 'database'
    const key = query?.key
    if (key == null) return res.status(400).json({ error: `Invalid key/query parameter value` });
    try {
        return res.json(await getKVData(dbl,key));
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
});

app.get('/dash', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`[Express]: Server running on http://localhost:${PORT}`));
// Since this is a really basic project we don't need to check if this is running as a module. We assume it isn't.