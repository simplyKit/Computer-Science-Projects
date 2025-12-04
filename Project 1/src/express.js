// ./src/express.js: Initialize and manage Express.js
const express = require('express');
const path = require('node:path'); //Yes I use node:path instead of path. Complain about it.
const PORT = "8080";
const { setKVData, getKVData, remKVData } = require('./database');
const app = express();
app.use(express.json());

/**
 * EXAMPLE REQUEST BODY!!
 * {
 *  "dbl": "database_location(name)" or 'default'
 *  "key":"thisisakey.key1"
 *  "value(o)":"thisisavalue"
 * }
 */

app.post('/data/write', async (req, res) => { // Runs when the endpoint is hit by an HTTP POST Request
    let body = req.body || {}
    const dbl = body?.dbl || 'default'
    const key = body?.key
    const val = body?.value
    if (key == null || val == null) return res.status(400).json({ error: `Invalid key/body object value` });
    try {
        await setKVData(dbl,key,val)
        res.status(200).json({ error: `Success!` });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
});

app.delete('/data/delete', async (req, res) => { // Runs when the endpoint is hit by an HTTP DELETE Request
    let body = req.body || {}
    const dbl = body?.dbl || 'default'
    const key = body?.key
    if (key == null) return res.status(400).json({ error: `Invalid key/body object value` });
    try {
        await remKVData(dbl,key)
        res.status(200).json({ error: `Success!` });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
});

app.get('/data/read', async (req, res) => { // Runs when the endpoint is hit by an HTTP GET Request
    let body = req.body || {}
    const dbl = body?.dbl || 'default'
    const key = body?.key
    if (key == null) return res.status(400).json({ error: `Invalid key/body object value` });
    try {
        await getKVData(dbl,key)
        res.status(200).json({ error: `Success!` });
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