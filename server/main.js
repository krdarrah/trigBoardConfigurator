const path = require('path');
const express = require('express');
const https = require('https');
const CertificateFactory = require('./CertificateFactory.js');
const app = express();
const httpsOptions = {};

app.use(express.static(path.resolve(__dirname, '../'), {'index': ['index.html']}));
const selfSignedCertificateFactory = new CertificateFactory({});
Object.assign(httpsOptions, selfSignedCertificateFactory.getStaticBundle('buffer'));
https.createServer(httpsOptions, app).listen(1337);

console.log('Trigboard server running at https://localhost:1337/');
