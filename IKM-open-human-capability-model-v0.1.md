# Open Human-Capability Model (IKM) — v0.1

**Working name:** IKM (Inhimillisen Kyvykkyyden Malli) / Open Human-Capability Model
**Status:** Draft v0.1 — for discussion
**Proposed license:** CC BY 4.0 (free to adopt, implement, and extend)

---

## Purpose

An open, vendor-neutral data model for representing **human capability**, **task demands**, and the **cognitive load and fit** between them — over time, privacy-first.

It captures what existing learning-data standards do not: *human capacity and adaptation*, not clicks and completions. It is designed to sit **on top of** existing systems — reading identity, study rights, courses, and credentials from them — and to be implemented first in a hands-on workshop context.

**Design principle for v0.1: coarse, simple, adoptable.** Few levels, traffic-light load, minimal fields. Refinement comes later, only if real use demands it.

---

## Core objects (5)

1. **Person** — a pseudonymous actor. Carries a role and consent scope only; never personal data.
2. **Capability** — one competence a person holds, at a coarse autonomy level. (This is paja-ajokortti as data.)
3. **TaskEnvironment** — the demand side: what a task in a given environment requires.
4. **LoadState** — the dynamic state: a person's cognitive-load traffic light at a point in time. (For students *and* staff.)
5. **FitDecision** — the decision layer: given capability and load, what the situation recommends.

---

## Levels (coarse, by design)

- **capabilityLevel:** `observed` → `supervised` → `independent` → `instructor`
  - `independent` means the person holds the work permit / paja-ajokortti for that domain.
- **loadState:** `green` / `yellow` / `red`
- **complexity:** `low` / `medium` / `high`

---

## Interoperability (build on open standards, do not reinvent)

- **LoadState ↔ xAPI** — a load event is expressible as an xAPI statement (actor = pseudonymous person, verb = reported/experienced, object = task/environment, result = state).
- **Capability ↔ Open Badges / Comprehensive Learner Record (CLR)** — a capability maps to a badge/assertion.
- **Identity, study rights, enrolments ↔ referenced, never stored** — resolved in Haka (identity), Peppi / Sisu (study data) via opaque references only.

---

## Privacy & ethics (normative — not optional)

- **Pseudonymous only.** No personally identifying information lives in this model; identity resolves in source systems.
- **Data minimization & purpose limitation.** Collect the least that serves a stated purpose.
- **Explicit consent + scope.** A person consents to what is collected and for what use.
- **Self-access.** A person can always see their own data.
- **Non-punitive.** Load and wellbeing data must never be used to sanction a student or a staff member. Management views default to aggregate.
- **Retention limits.** Time-bound storage; expire by default.
- **Invisible first.** The least-briefed, most-exposed people (support staff, visitors) are first-class actors, not afterthoughts.

---

## Reference implementation

The workshop safety layer is the first instantiation:
- **paja-ajokortti** → the first real `Capability` records.
- **Pajapeli simulator** load logic → the first real `LoadState` source.

The model itself stays domain-neutral and open, so it can be adopted in any hands-on or learning context beyond the workshop.

---

## JSON Schema (draft 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ikm.example/spec/v0.1/ikm.schema.json",
  "title": "Open Human-Capability Model (IKM) v0.1",
  "description": "Coarse, privacy-first model of human capability, task demand, load, and fit.",
  "type": "object",
  "properties": {
    "persons": { "type": "array", "items": { "$ref": "#/$defs/Person" } },
    "capabilities": { "type": "array", "items": { "$ref": "#/$defs/Capability" } },
    "tasks": { "type": "array", "items": { "$ref": "#/$defs/TaskEnvironment" } },
    "loadStates": { "type": "array", "items": { "$ref": "#/$defs/LoadState" } },
    "fitDecisions": { "type": "array", "items": { "$ref": "#/$defs/FitDecision" } }
  },
  "additionalProperties": false,
  "$defs": {
    "Role": {
      "type": "string",
      "enum": ["student", "lecturer", "workshopMaster", "supervisor", "support", "visitor"]
    },
    "CapabilityLevel": {
      "type": "string",
      "enum": ["observed", "supervised", "independent", "instructor"],
      "description": "independent = holds work permit / paja-ajokortti for the domain"
    },
    "Complexity": { "type": "string", "enum": ["low", "medium", "high"] },
    "LoadValue": { "type": "string", "enum": ["green", "yellow", "red"] },
    "Recommendation": {
      "type": "string",
      "enum": ["assign", "support", "defer", "restaff"]
    },
    "Person": {
      "type": "object",
      "properties": {
        "pseudonymousId": { "type": "string" },
        "role": { "$ref": "#/$defs/Role" },
        "consentScopes": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["pseudonymousId", "role"],
      "additionalProperties": false
    },
    "Capability": {
      "type": "object",
      "description": "Maps to an Open Badge / CLR assertion.",
      "properties": {
        "pseudonymousId": { "type": "string" },
        "domain": { "type": "string", "description": "e.g. cnc.bacci, chem.handling, laser.co2" },
        "level": { "$ref": "#/$defs/CapabilityLevel" },
        "evidenceRef": { "type": "string", "format": "uri", "description": "link to work permit / sign-off" },
        "validUntil": { "type": "string", "format": "date" },
        "assessorRef": { "type": "string" }
      },
      "required": ["pseudonymousId", "domain", "level"],
      "additionalProperties": false
    },
    "RequiredCapability": {
      "type": "object",
      "properties": {
        "domain": { "type": "string" },
        "minLevel": { "$ref": "#/$defs/CapabilityLevel" }
      },
      "required": ["domain", "minLevel"],
      "additionalProperties": false
    },
    "TaskEnvironment": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "label": { "type": "string" },
        "requiredCapabilities": {
          "type": "array",
          "items": { "$ref": "#/$defs/RequiredCapability" }
        },
        "complexity": { "$ref": "#/$defs/Complexity" },
        "environmentFactors": {
          "type": "array",
          "items": { "type": "string" },
          "description": "tags, e.g. noise, hazard, timePressure, chemical"
        },
        "maxSupervisionRatio": {
          "type": "number",
          "description": "max students per supervisor for this task"
        }
      },
      "required": ["id"],
      "additionalProperties": false
    },
    "LoadState": {
      "type": "object",
      "description": "Maps to an xAPI statement.",
      "properties": {
        "pseudonymousId": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "state": { "$ref": "#/$defs/LoadValue" },
        "note": { "type": "string" },
        "contextRef": { "type": "string", "description": "task id or room" }
      },
      "required": ["pseudonymousId", "timestamp", "state"],
      "additionalProperties": false
    },
    "FitDecision": {
      "type": "object",
      "properties": {
        "pseudonymousId": { "type": "string" },
        "taskId": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "recommendation": { "$ref": "#/$defs/Recommendation" },
        "rationale": { "type": "string" }
      },
      "required": ["pseudonymousId", "taskId", "recommendation"],
      "additionalProperties": false
    }
  }
}
```

---

## Example (one person, one capability, one load reading, one decision)

```json
{
  "persons": [
    { "pseudonymousId": "p-7Q2X", "role": "student", "consentScopes": ["load", "capability"] }
  ],
  "capabilities": [
    {
      "pseudonymousId": "p-7Q2X",
      "domain": "cnc.bacci",
      "level": "supervised",
      "evidenceRef": "https://paja.example/permits/cnc-bacci/p-7Q2X",
      "validUntil": "2027-06-30"
    }
  ],
  "tasks": [
    {
      "id": "task-bacci-finfoam-mill",
      "label": "BACCI Finfoam milling",
      "requiredCapabilities": [{ "domain": "cnc.bacci", "minLevel": "independent" }],
      "complexity": "high",
      "environmentFactors": ["hazard", "noise", "timePressure"],
      "maxSupervisionRatio": 4
    }
  ],
  "loadStates": [
    { "pseudonymousId": "p-7Q2X", "timestamp": "2026-09-12T10:15:00Z", "state": "yellow", "contextRef": "task-bacci-finfoam-mill" }
  ],
  "fitDecisions": [
    {
      "pseudonymousId": "p-7Q2X",
      "taskId": "task-bacci-finfoam-mill",
      "timestamp": "2026-09-12T10:15:30Z",
      "recommendation": "support",
      "rationale": "Capability below required (supervised < independent) and load is yellow."
    }
  ]
}
```
