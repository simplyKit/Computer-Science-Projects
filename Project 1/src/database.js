const fs = require('node:fs');
const path = require('node:path');

// INTERNAL FUNCTIONS
function pullData(name,key) { // Read
    const fpath = path.join(__dirname, `../data/${name}.json`);
    let data
    try {
        data = fs.readFileSync(fpath, 'utf8');
    } catch {
        data = null
    }
    requestKey = key;
    if (data.requestKey) { return data.requestKey; }
    else { return false; }
}

function pushData(name,key,value) { // Write
    const fpath = path.join(__dirname, `../data/${name}.json`);
    let data;
    try {
        const raw = fs.readFileSync(fpath, 'utf8');
        data = JSON.parse(raw);
    } catch {
        data = {};
    }
    data[key] = value;
    const JsonString = JSON.stringify(data, null, 4);
    try {
        fs.writeFileSync(fpath, JsonString, 'utf8');
    } catch(err) {
        console.error("Failed to write JSON:", err);
    }
}


// PUBLIC FUNCTIONS
async function getKVData(n,k) {
    pullData(n,k);
}

async function setKVData(n,k,v) {
    pushData(n,k,v);
}

async function remKVData(n,k) {
    pushData(n,k,null);
}
module.exports = {
    getKVData,
    setKVData,
    remKVData
}