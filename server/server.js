const express = require('express');
const path = require('path');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const port = process.env.PORT || 80;

const mf = process.env.MF_NAME || 'pages-gessa';

const app = express();
app.use(compression());

var destinationDir = '';

if (mf == 'pages-gessa') {
  destinationDir = path.join(__dirname, 'pages-gessa/');
} else if (mf == 'view-page') {
  destinationDir = path.join(__dirname, 'view-page/');
}

app.use(
  '/',
  expressStaticGzip(destinationDir, {
    enableBrotli: true,
    customCompressions: [
      {
        encodingName: 'gzip',
        fileExtension: 'gz',
      },
    ],
    orderPreference: ['br'],
  })
);

app.listen(port);

app.on('listening', function () {
  console.log(
    'Express server started on port %s at %s',
    server.address().port,
    server.address().address
  );
});
