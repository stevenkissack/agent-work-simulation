'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const { sortByDue, isOverdue, dueOrOverdueCount } = require('../lib/taskSort');

const router = express.Router();
const seed = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'seed.json'), 'utf8'));

// GET /api/tasks?sort=due&siteId=s_perth
// Returns tasks with an `overdue` flag. Default order is due-soonest-first.
router.get('/', function (req, res) {
  let tasks = seed.tasks;

  if (req.query.siteId) {
    tasks = tasks.filter((t) => t.siteId === req.query.siteId);
  }

  if (req.query.sort === 'due' || !req.query.sort) {
    tasks = sortByDue(tasks);
  }

  const withFlags = tasks.map((t) => Object.assign({}, t, { overdue: isOverdue(t) }));
  res.json({ tasks: withFlags });
});

// GET /api/tasks/summary  → count used by the Home screen
router.get('/summary', function (req, res) {
  res.json({ dueOrOverdue: dueOrOverdueCount(seed.tasks) });
});

module.exports = router;
