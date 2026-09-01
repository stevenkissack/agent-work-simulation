'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const tasksRouter = require('./routes/tasks');
const rollupRouter = require('./routes/rollup');

const app = express();
app.use(express.json());

const seed = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'seed.json'), 'utf8'));

app.get('/api/sites', function (req, res) {
  res.json({ sites: seed.sites });
});

app.use('/api/tasks', tasksRouter);
app.use('/api/rollup', rollupRouter);

// Serve the phone UI (index.html lives in the client/ folder).
app.use(express.static(path.join(__dirname, '..', 'client')));

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log('Work Tasker running on http://localhost:' + PORT);
  });
}
