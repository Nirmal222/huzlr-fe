# Type Generation Guide

## Overview

This project uses automatic TypeScript type generation from the FastAPI backend's OpenAPI specification. The backend's Pydantic schemas serve as the **single source of truth** for all types.

## Quick Start

### Generate Types

```bash
cd standmate
pnpm generate-types
```

### Use Generated Types

```typescript
import type { ProjectProperties, ProjectCreate } from '@/lib/types';

const project: ProjectCreate = {
  user_id: 1,
  properties: {
    project_title: "My Project",
    status: "active",
    // Add any custom fields - index signature allows it!
    custom_field: "value"
  }
};
```

---

## How It Works

### Architecture

```
Backend (Python)                    Frontend (TypeScript)
┌─────────────────────┐            ┌──────────────────────┐
│ property_registry.py│            │                      │
│         ↓           │            │                      │
│  Pydantic Models    │            │                      │
│         ↓           │            │                      │
│ FastAPI OpenAPI     │───HTTP────→│  openapi-typescript  │
│  /openapi.json      │            │         ↓            │
└─────────────────────┘            │  generated-api.ts    │
                                   │         ↓            │
                                   │    Your Code         │
                                   └──────────────────────┘
```

### Files

| File | Purpose | Edit? |
|------|---------|-------|
| `scripts/generate-types.sh` | Generation script | ✅ Yes |
| `lib/types/generated-api.ts` | Auto-generated types | ❌ Never |
| `lib/types/index.ts` | Type re-exports | ✅ Yes |
| `package.json` | Scripts config | ✅ Yes |

---

## When to Regenerate Types

Run `pnpm generate-types` after making these backend changes:

✅ **Property Registry Changes**
```python
# app/core/property_registry.py
PROPERTIES_REGISTRY = {
    "project": [
        {
            "key": "new_field",  # ← New field added
            "type": PropertyType.TEXT,
            "label": "New Field"
        }
    ]
}
```

✅ **Schema Changes**
```python
# app/schemas/project.py
class ProjectCreate(BaseModel):
    new_field: str  # ← New field
```

✅ **New Endpoints**
```python
# app/api/v1/endpoints/projects.py
@router.post("/new-endpoint")  # ← New endpoint
def new_endpoint():
    ...
```

---

## Usage Examples

### Basic Usage

```typescript
import type { ProjectProperties, ProjectCreate } from '@/lib/types';

// Create project
const newProject: ProjectCreate = {
  user_id: 1,
  properties: {
    project_title: "New Project",
    description: "Description",
    status: "Draft"
  }
};

// Update properties
const props: ProjectProperties = {
  project_title: "Updated",
  status: "Active",
  priority: "High"
};
```

### With Custom Fields

The generated types include `[key: string]: unknown`, allowing custom fields:

```typescript
const props: ProjectProperties = {
  project_title: "My Project",
  // Backend fields
  status: "active",
  priority: "high",
  // Custom UI fields - no extension needed!
  objectives: [...],
  milestones: [...],
  custom_ui_data: { ... }
};
```

### API Operations

```typescript
import type { operations } from '@/lib/types';

// Get operation types
type ListProjectsOp = operations['list_projects_api_v1_projects__get'];
type CreateProjectOp = operations['create_project_api_v1_projects__post'];

// Response types
type ListProjectsResponse = ListProjectsOp['responses']['200']['content']['application/json'];
```

---

## Development Workflow

### 1. Backend Development

```bash
# Make changes to backend
vim standmate-be/app/core/property_registry.py

# Backend auto-reloads (if using --reload)
```

### 2. Generate Types

```bash
cd standmate
pnpm generate-types
```

Output:
```
🔍 Checking if backend is running at http://localhost:8001...
✅ Backend is running
📝 Generating TypeScript types from OpenAPI spec...
✨ openapi-typescript 7.13.0
🚀 http://localhost:8001/openapi.json → lib/types/generated-api.ts [85.2ms]
✅ Types generated at lib/types/generated-api.ts
```

### 3. Use New Types

```typescript
// TypeScript now knows about your new fields!
const project: ProjectCreate = {
  user_id: 1,
  properties: {
    project_title: "Test",
    new_field: "value" // ✅ Autocomplete works!
  }
};
```

### 4. Commit

```bash
git add lib/types/generated-api.ts
git commit -m "Update types from backend changes"
```

---

## Troubleshooting

### Backend Not Running

**Error:**
```
❌ Backend not running at http://localhost:8001
```

**Solution:**
```bash
# Start backend
cd ../standmate-be
uvicorn main:app --reload --port 8001

# Or use start-all.sh
cd ..
./start-all.sh
```

### Types Not Updating

**Problem:** Generated types don't reflect backend changes

**Solutions:**
1. Verify backend is running: `curl http://localhost:8001/openapi.json`
2. Check backend has latest code (restart if needed)
3. Clear cache: `rm lib/types/generated-api.ts && pnpm generate-types`

### Import Errors

**Error:**
```typescript
Cannot find module '@/lib/types'
```

**Solution:** Use relative imports:
```typescript
import type { ProjectProperties } from '../../types';
```

---

## Best Practices

### ✅ Do

- Run `pnpm generate-types` before committing
- Use generated types directly (they support custom fields via index signature)
- Add `generate-types` to your pre-commit hook
- Check `git diff lib/types/generated-api.ts` to see what changed

### ❌ Don't

- Never edit `lib/types/generated-api.ts` manually
- Don't create custom type extensions (use index signature instead)
- Don't commit without regenerating types after backend changes
- Don't duplicate types between backend and frontend

---

## Scripts Reference

### `pnpm generate-types`

Generates TypeScript types from backend OpenAPI spec.

**Requirements:**
- Backend running on port 8001
- `openapi-typescript` installed

**Output:**
- `lib/types/generated-api.ts` (1066 lines)

### `pnpm build`

Builds the frontend. Automatically runs `generate-types` first.

```bash
pnpm build
# Equivalent to:
# pnpm generate-types && next build
```

---

## Advanced Usage

### Custom Type Re-exports

Edit `lib/types/index.ts` to add convenience aliases:

```typescript
// lib/types/index.ts
export type ProjectProperties = components['schemas']['ProjectProperties'];
export type Project = ProjectResponse; // Alias

// Add custom UI types
export interface ProjectStats {
  scope?: number;
  completed?: number;
}
```

### Type-Safe API Calls

```typescript
import type { paths } from '@/lib/types';

type ProjectsEndpoint = paths['/api/v1/projects/'];
type GetProjects = ProjectsEndpoint['get'];
type CreateProject = ProjectsEndpoint['post'];

// Use with fetch
const response = await fetch('/api/v1/projects/');
const projects: GetProjects['responses']['200']['content']['application/json'] = await response.json();
```

---

## Summary

**Key Points:**
- ✅ Backend is the single source of truth
- ✅ One command: `pnpm generate-types`
- ✅ Zero manual type maintenance
- ✅ Full type safety + flexibility
- ✅ Always in sync with backend

**Remember:** When backend changes, just run `pnpm generate-types`! 🚀
