'use strict';

// Ordering + overdue helpers for the task list.

/**
 * Sort tasks by when they're due, soonest first.
 * @param {Array<{dueAt: string}>} tasks
 */
function sortByDue(tasks) {
  return tasks.slice().sort(function (a, b) {
    // Compare on the local timestamp, to the second.
    var ta = a.dueAt.slice(0, 19);
    var tb = b.dueAt.slice(0, 19);
    return new Date(ta) - new Date(tb);
  });
}

/**
 * Is this task overdue (its due time has already passed)?
 * @param {{dueAt: string}} task
 */
function isOverdue(task) {
  return new Date(task.dueAt).getTime() < Date.now();
}

/**
 * How many outstanding tasks are already overdue? Powers the Home summary.
 * @param {Array<{dueAt: string, status: string}>} tasks
 */
function dueOrOverdueCount(tasks) {
  var now = Date.now();
  return tasks.filter(function (t) {
    return t.status !== 'done' && new Date(t.dueAt).getTime() < now;
  }).length;
}

module.exports = { sortByDue: sortByDue, isOverdue: isOverdue, dueOrOverdueCount: dueOrOverdueCount };
