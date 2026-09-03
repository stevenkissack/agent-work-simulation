# RFC: Real-time, offline-first sync engine for Work Tasker

| | |
| --- | --- |
| **Status** | Draft (internal review) |
| **Ticket** | WT-482 |
| **Driver** | Sam (mid-level FSE) |
| **Approver** | TBD |
| **Reviewers** | (you) |
| **Contributors** | - |
| **Due date** | Before next sprint planning |
| **Links / Diagrams** | - |

> Drafted with AI help, keen for a sanity check before I take it to the team.

## Overview

Crews lose signal on site and the app stops working, so their changes get lost. For a field product
that's a critical problem and a real blocker on our growth. This RFC proposes an offline-first sync
engine so the app keeps working offline and syncs when signal returns.

## Context

The current setup has a few related issues. We only ever store the current state of a task, and only
on the server:

1. **Offline edits get lost.** If a supervisor edits a task in a car park with no signal, the change
   is gone the moment the app reloads. There's no local durability.
2. **Can only see changes when refreshing.** Two crew on the same site don't see each other's changes
   until they manually refresh. They step on each other constantly.

These aren't two separate bugs. They're both symptoms of a data layer that assumes one online client
at a time. That's why I think the fix is architectural rather than a set of patches.

## Proposal

Re-architect Work Tasker around an offline-first sync engine built on conflict-free replicated
data types (CRDTs). Three parts:

### 1. CRDTs (conflict-free replicated data types) for sync

Each client holds a local CRDT replica of its data: a full copy it can read and edit while offline.
Edits merge automatically with zero conflicts, even when several crew are offline at the same time
and reconnect later, because the merge rules are written so every replica lands on the same result
whatever order the edits arrive in. No more last-write-wins.

### 2. Real-time sync microservice

A new WebSocket service pushes events to all connected clients. I'd split this out from the main API
so it can scale independently as the number of concurrent editors grows.

### 3. Migrate the API to GraphQL

Move the existing REST endpoints over to a federated GraphQL graph so future clients can query
exactly what they need. Doing it now, as part of the same change, means we only touch the API layer
once.

## Staging Plan / Tickets

| **Summary** | **Description** | **Estimate** |
| --- | --- | --- |
| Feature flag infrastructure | Add a flag to gate the new engine so we can cut over and roll back safely | 2 days |
| CRDT client replicas | Local replica per client, offline persistence, merge on reconnect | 1 week |
| Real-time WebSocket service | New service pushing events to connected clients | 3 days |
| Migrate REST API to GraphQL | Move existing endpoints to a federated GraphQL graph | ~1 week |
| Cutover | Move the whole app onto the new engine in one release behind the feature flag | 2 days |
| **TOTAL** | | **~2 weeks** |

The plan is a single cutover: flip the feature flag, watch it, and roll back by flipping it off if
anything goes wrong.

## Considerations

Polling the existing REST API for changed rows every few seconds was considered. It would handle our
current load fine and is a fraction of the work, but it doesn't really solve offline or give us
proper conflict handling, and we'd only have to replace it once we're at scale. Going with CRDTs so
we build it robustly the first time and future-proof for the next 5+ years, the way collaborative
apps like Figma and Linear are built.

The main disadvantage of the chosen approach is that it's a lot of new surface area landing at once
(the CRDT layer, a new service, and an API migration). I think the feature flag covers us on the
rollout risk.

### Compatibility & Backwards Compatibility

| **Surface** | **Note** |
| --- | --- |
| Web client | Moves to the local CRDT model. |
| Mobile app | Same, needs the offline replica. Old app versions may not understand the new sync. |
| API | REST endpoints migrate to GraphQL. |
| Reporting / exports | Shouldn't change, haven't fully checked. |

## Risks

| **Risk** | **Likelihood** | **Impact** | **Mitigation** |
| --- | --- | --- | --- |
| Big change landing in one cutover | Medium | High | Feature flag, roll back by flipping it off |
| CRDTs are new to the team | High | Medium | Libraries are mature, short spike first |
| GraphQL migration under-estimated | Medium | Medium | It's the least certain item, but a week feels about right |

## Definition of success

1. Offline edits survive a reload and sync cleanly when the connection returns.
2. Changes on a site appear on other crew's devices within 30 seconds.

---

Keen for your honest read: is this the right direction, and what am I missing?

Write your review in [`../output.md`](../output.md) (what's valid, your concerns, and a recommendation).
