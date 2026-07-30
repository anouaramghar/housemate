# HouseMate

## Prerequisites

- Node.js 24+, npm
- Docker Desktop (for running tests with Testcontainers)

## Quick start

```bash
# Install dependencies
npm install

# Copy environment file and configure your database
cp .env.example .env
# Edit .env with your Postgres connection string
# drizzle-kit reads .env only — .env.local is not picked up

# Apply migrations
npm run db:migrate

# Start the dev server
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `npm run lint` | Run ESLint |
| `npm run test` | Run test suite (one command from clean checkout) |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply pending migrations |

## Testing

The test suite uses Testcontainers to start a real Postgres container,
applies migrations automatically, and tears down the container when done.
No developer-installed Postgres is needed.

```bash
npm test
```

## Architectural constraints

### 1. No Server Actions for mutations — every write goes through a Hono route

All data mutations must be handled by Hono API routes under `app/api/[[...route]]/`.
Server Actions are not used for writes. Reads may use Server Components or the Hono
API as appropriate.

### 2. Server Components read through the service layer, never the ORM directly

React Server Components must import service functions from `src/services/`, never
import Drizzle or the database client directly. This ensures both the Hono API layer
and the Server Component page layer share one path to the data.

### 3. `household_events` is append-only and written in the same transaction as the state change it records

Every state change to a Household writes an event to the `household_events`
table in the same database transaction. The table is append-only — no updates,
no deletes.
