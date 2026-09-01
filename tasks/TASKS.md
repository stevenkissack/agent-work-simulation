# Your tasks for today

You're a full-stack engineer on Work Tasker (task management for construction field crews). You've
just come out of standup with three things to move today.

You've got about 30 minutes - There is a lot, so you may not finish everything within the time.
Where you start, what you run in parallel, and what you skip is up to you.

## Today

1. **Support issue** - Tasks are showing in the wrong order
   - What: Review the customer complaints, find the root cause and fix it.
   - Deliverable: Provide an update to Support in [`../output.md`](../output.md), plus fix the bug.
   - More information: [`support_notes.md`](./support_notes.md)

2. **New feature (POC)** - Solving multi-site visibility problems
   - What: Build a prominent Home-screen card showing overdue and top-priority tasks across all
     sites.
   - Deliverable: A demo-able POC, plus your reply to the Product Team in [`../output.md`](../output.md).
   - More information: [`design_jam_notes.md`](./design_jam_notes.md)

3. **RFC review** - A teammate's plan to implement offline sync support
   - What: Read the RFC and give your review before it goes to the team.
   - Deliverable: Your review in [`../output.md`](../output.md) (what's valid, your concerns, a recommendation).
   - More information: [`rfc.md`](./rfc.md)

Put all three written deliverables in the one file: [`../output.md`](../output.md).

## Running the app

From the repo root:

```bash
cd app
npm install && npm start
```

Then open http://localhost:3000. Tests: `npm test` (from `app/`).
