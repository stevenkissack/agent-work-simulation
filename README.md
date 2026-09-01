# Agent Work Simulation

Work Tasker is a small task management app for construction field crews. It's a Node/Express API
with a plain-JS, phone-style client. This repo is a "day at work" exercise you tackle with AI coding
agents: you pick up a normal agenda and work through it.

Tip: read the markdown files in rendered view, not raw, so tables and formatting show properly.

### 📋 Start with [`tasks/TASKS.md`](./tasks/TASKS.md)

That's your agenda for the day: a support issue, a new feature, and an RFC to review. Work through it
however you like, running one or more agent sessions.

## Running the app

```bash
cd app
npm install     # also installs the api workspace
npm start       # http://localhost:3000
```

Open http://localhost:3000. The app draws its own phone frame, so it looks like a mobile screen. Run
the tests with `npm test` from the `app/` folder.

## Layout

```
README.md               this file
output.md               write all your deliverables here

tasks/                  your agenda and task briefs
  TASKS.md              start here
  support_notes.md      support call notes
  design_jam_notes.md   design jam notes for the new feature
  rfc.md                a teammate's RFC to review

app/                    the Work Tasker app (run npm install / npm start here)
  package.json          app scripts (start, test)
  api/                  Express API: server, routes, data, helpers
  client/               index.html, the phone UI (calls the API)
  tests/                a couple of sanity tests
```
