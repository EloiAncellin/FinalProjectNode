require('custom-env').env(process.env.APP_ENV);
const NodeRSA = require('node-rsa');
const fs = require('fs');

const key = new NodeRSA({b: 1024});
const publicKey = key.exportKey('pkcs8-public-pem');
const privateKey = key.exportKey('pkcs1-pem');

fs.writeFile(process.env.JWT_PUBLIC_PATH, publicKey, (err) => {
    if (err) throw err;
});

fs.writeFile(process.env.JWT_PRIVATE_PATH, privateKey, (err) => {
    if (err) throw err;
});

export = {
    publicKey: publicKey,
    privateKey: privateKey,
}
