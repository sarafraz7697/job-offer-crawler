# Job Offers Crawler Backend

A scalable backend service to aggregate, unify, and expose job offers from multiple external APIs, built with NestJS, Drizzle ORM (PostgreSQL).

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Testing](#testing)
- [Building and Running](#building-and-running)
- [Modules Overview](#modules-overview)
- [Data Flow](#data-flow)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```text
├── .env                       # Local environment variables (not committed)
├── .env.sample                # Sample env file template
├── docker-compose.yml         # Docker setup for local dev and dependencies
├── drizzle.config.ts          # Drizzle ORM config for migrations & schema
├── nest-cli.json              # NestJS CLI configuration
├── package.json               # Project dependencies and scripts
├── pnpm-lock.yaml             # PNPM lock file for reproducible installs
├── tsconfig.json              # TypeScript config
├── tsconfig.build.json        # Build-specific TS config
├── libs                       # Shared libraries (core interfaces, dtos, frameworks, config)
│   ├── config/env             # Env var management and validation
│   ├── core                   # Core abstractions and interfaces for services, data sources
│   ├── dtos                   # Data Transfer Objects for external APIs and unified formats
│   ├── frameworks             # Implementations: Drizzle ORM, Redis, data-source fetchers
│   └── services               # Shared NestJS services (e.g. data service module)
├── src                        # Application source code
│   └── job-crawler            # Job crawling domain module
│       ├── services           # Business logic services (persist, mapping, cron jobs)
│       ├── sources            # External API crawler implementations
│       └── use-cases          # Application use cases (e.g. fetching job offers)
├── test                       # End-to-end tests
└── README.md                  # This file
```

---

## Setup

### Prerequisites

- Node.js >=18.x

- PNPM

- Docker & Docker Compose (for PostgreSQL)

- PostgreSQL database

### Installation

```
pnpm install
```

### Environment Variables

Copy .env.sample to .env and fill out:

- Database connection URI

- API keys if needed

- Other configuration variables

### Development

Start the local PostgreSQL database:

```
docker-compose up -d
```

Run database migrations:

```
npx drizzle-kit push
```

Start the development server:

```
pnpm start:dev
```

### Testing

Run tests with Jest:

```
pnpm test
```

### Building and Running

Build the project:

```
pnpm build
```

Run the production server:

```
pnpm start
```

## Modules Overview

- libs/config/env: Environment config & validation

- libs/core/interface: Interfaces for repositories, data services, data sources

- libs/dtos: API and unified DTOs with validation schemas

- libs/frameworks/data-services/drizzle: Drizzle ORM schemas, repositories, and modules

- libs/frameworks/data-sources: Base and specific API crawlers with HTTP client logic

- src/job-crawler: Domain logic for job crawling, including services, sources, and use-cases

## Data Flow

1. **Fetch:** External APIs are crawled by specific crawler classes under libs/frameworks/data-sources.

2. **Transform:** API responses are mapped to a unified DTO (UnifiedJobDto).

3. **Validate:** Incoming data validated against JOI or class-validator schemas.

4. **Persist:** Unified jobs and related entities (company, skills, location) saved via Drizzle ORM repositories.

5. **Expose:** A REST API (/api/job-offers) provides filtered and paginated access to aggregated job data.

### API Endpoints

**GET** `/api/job-offers`
Fetch job offers with optional filters and pagination:

**Query** / **Parameter** / **Type Description**

```
title	        string	        Filter by job title (partial)
locationId	number	        Filter by location ID
salaryMin	number	        Minimum salary filter
salaryMax	number	        Maximum salary filter
page	        number	        Pagination page number (default 1)
limit	        number	        Items per page (default 10)
```

Response includes data array and meta pagination info.

---

### Technologies Used

- [NestJS](https://nestjs.com) - Node.js framework

- [Drizzle ORM](https://orm.drizzle.team) - Type-safe SQL ORM

- [PostgreSQL](https://www.postgresql.org) - Relational database

- [RxJS](https://rxjs.dev) - Reactive programming (HTTP calls)

- [Class-validator](https://github.com/typestack/class-validator) - Input validation

- [Pino](https://getpino.io) - Logger

- [Docker](href="https://www.docker.com) - Containerization

- [Joi](https://joi.dev/) - Schema data validator
