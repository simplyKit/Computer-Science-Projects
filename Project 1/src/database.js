const fs = require('node:fs');
const path = require('node:path');

// INTERNAL FUNCTIONS
function pullData(name, key) { // Read
    const fpath = path.join(__dirname, `../data/${name}.json`);
    let data;
    try {
        const raw = fs.readFileSync(fpath, 'utf8');
        data = JSON.parse(raw);
    } catch {
        data = {};
    }
    if (key in data) {
        return data[key];
    } else {
        return false;
    }
}

function pushData(name, key, value) { // Write
    const fpath = path.join(__dirname, `../data/${name}.json`);
    let data;
    try {
        const raw = fs.readFileSync(fpath, 'utf8');
        data = JSON.parse(raw);
    } catch {
        data = {};
    }
    if (value === null) {
        delete data[key];
    } else {
        data[key] = value;
    }
    const jsonString = JSON.stringify(data, null, 4);
    try {
        fs.writeFileSync(fpath, jsonString, 'utf8');
    } catch (err) {
        console.error("Failed to write JSON:", err);
    }
    return data[key];
}

// PUBLIC FUNCTIONS
async function getKVData(n, k) {
    return pullData(n, k);
}

async function setKVData(n, k, v) {
    return pushData(n, k, v);
}

async function remKVData(n, k) {
    return pushData(n, k, null); 
}

module.exports = {
    getKVData,
    setKVData,
    remKVData
};