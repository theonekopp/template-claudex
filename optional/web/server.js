'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_USER = process.env.AUTH_USER;
const AUTH_PASS = process.env.AUTH_PASS;

function basicAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Private"');
    return res.status(401).send('Authentication required.');
  }
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const colon = decoded.indexOf(':');
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);
  if (user === AUTH_USER && pass === AUTH_PASS) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Private"');
  return res.status(401).send('Invalid credentials.');
}

// Root redirects to private dashboard
app.get('/', (req, res) => res.redirect('/private/'));

// Public — no auth required
app.use('/public', express.static(path.join(__dirname, 'public')));

// Private — basic auth required
app.use('/private', basicAuth, express.static(path.join(__dirname, 'private')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
