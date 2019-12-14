require('custom-env').env(process.env.APP_ENV);
const NodeRSA = require('node-rsa');
const fs = require('fs');

let publicKey, privateKey;

if (fs.existsSync(process.env.JWT_PUBLIC_PATH) && fs.existsSync(process.env.JWT_PRIVATE_PATH)) {
    publicKey = fs.readFileSync(process.env.JWT_PUBLIC_PATH, 'utf8');
    privateKey = fs.readFileSync(process.env.JWT_PRIVATE_PATH, 'utf8');
} else {
    const key = new NodeRSA({b: 1024});
    publicKey = key.exportKey('pkcs8-public-pem');
    privateKey = key.exportKey('pkcs1-pem');
    fs.writeFileSync(process.env.JWT_PUBLIC_PATH, publicKey);
    fs.writeFileSync(process.env.JWT_PRIVATE_PATH, privateKey);
}

export = {
    publicKey: publicKey,
    privateKey: privateKey,
}
