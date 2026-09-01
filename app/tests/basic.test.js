'use strict';

// Basic sanity tests for the Work Tasker data + helpers.

const test = require('node:test');
const assert = require('node:assert');
const { isOverdue, dueOrOverdueCount } = require('../api/lib/taskSort');
const seed = require('../api/data/seed.json');

test('isOverdue flags past vs future due times', () => {
  assert.strictEqual(isOverdue({ dueAt: '2000-01-01T00:00:00+10:00' }), true);
  assert.strictEqual(isOverdue({ dueAt: '2999-01-01T00:00:00+10:00' }), false);
});

test('every seeded task references a known site', () => {
  const siteIds = new Set(seed.sites.map((s) => s.id));
  for (const t of seed.tasks) {
    assert.ok(siteIds.has(t.siteId), `task ${t.id} has unknown site ${t.siteId}`);
  }
});

test('dueOrOverdueCount counts outstanding, past-due tasks only', () => {
  const tasks = [
    { status: 'todo', dueAt: '2000-01-01T00:00:00+10:00' }, // overdue -> counts
    { status: 'done', dueAt: '2000-01-01T00:00:00+10:00' }, // done -> excluded
    { status: 'todo', dueAt: '2999-01-01T00:00:00+10:00' }  // future -> excluded
  ];
  assert.strictEqual(dueOrOverdueCount(tasks), 1);
});
