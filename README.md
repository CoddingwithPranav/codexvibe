# CodexVibe 🚀

An AI-powered code generation platform that transforms natural language prompts into fully functional Next.js applications. Built with Next.js 15, tRPC, Prisma, and powered by AI agents running in isolated E2B sandboxes.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [System Design](#system-design)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)

---

## Overview

CodexVibe is a sophisticated AI-powered development platform that allows users to describe applications in natural language and receive fully functional, production-ready Next.js code. The platform leverages:

- **AI Agents**: Autonomous coding agents powered by GPT-4.1-nano via Inngest Agent Kit
- **Sandboxed Execution**: Isolated E2B sandboxes for safe code execution and preview
- **Real-time Collaboration**: Live preview of generated applications with hot-reload support
- **Credit-based Usage**: Rate-limited access with free and pro tiers

---

## Features

✨ **Natural Language to Code** - Describe what you want, get working code  
🔒 **Secure Sandboxes** - Each generation runs in an isolated E2B sandbox  
👁️ **Live Preview** - See your generated app running in real-time  
📁 **Code Explorer** - Browse and inspect all generated files  
🔐 **Authentication** - Secure user authentication via Clerk  
💳 **Usage Tracking** - Credit-based system with free/pro tiers  
📱 **Responsive UI** - Built with Shadcn UI and Tailwind CSS  

---

## Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Next.js Frontend                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │   │
│  │  │   Home Page  │  │ Project View │  │    Authentication        │   │   │
│  │  │   (Prompt)   │  │  (Chat+Code) │  │       (Clerk)            │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘   │   │
│  │                              │                                        │   │
│  │                    ┌─────────┴─────────┐                             │   │
│  │                    │   tRPC Client     │                             │   │
│  │                    │  (React Query)    │                             │   │
│  │                    └─────────┬─────────┘                             │   │
│  └──────────────────────────────┼───────────────────────────────────────┘   │
└──────────────────────────────────┼───────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                  SERVER                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       Next.js API Routes                             │   │
│  │  ┌──────────────────────┐     ┌──────────────────────────────────┐  │   │
│  │  │    tRPC Router       │     │      Inngest Endpoint            │  │   │
│  │  │  ┌───────────────┐   │     │   (Background Job Handler)       │  │   │
│  │  │  │  Projects     │   │     └──────────────┬───────────────────┘  │   │
│  │  │  │  Messages     │   │                    │                       │   │
│  │  │  │  Usages       │   │                    │                       │   │
│  │  │  └───────────────┘   │                    │                       │   │
│  │  └──────────┬───────────┘                    │                       │   │
│  └─────────────┼────────────────────────────────┼───────────────────────┘   │
│                │                                │                            │
│                ▼                                ▼                            │
│  ┌─────────────────────────┐     ┌─────────────────────────────────────┐   │
│  │      Prisma ORM         │     │         Inngest Functions           │   │
│  │   (Database Access)     │     │  ┌───────────────────────────────┐  │   │
│  └───────────┬─────────────┘     │  │      Code Agent Network       │  │   │
│              │                   │  │  ┌─────────────────────────┐  │  │   │
│              │                   │  │  │   AI Agent (GPT-4.1)    │  │  │   │
│              │                   │  │  │  ┌───────────────────┐  │  │  │   │
│              │                   │  │  │  │ Tools:            │  │  │  │   │
│              │                   │  │  │  │ • terminal        │  │  │  │   │
│              │                   │  │  │  │ • createFiles     │  │  │  │   │
│              │                   │  │  │  │ • readFiles       │  │  │  │   │
│              │                   │  │  │  └───────────────────┘  │  │  │   │
│              │                   │  │  └─────────────────────────┘  │  │   │
│              │                   │  └───────────────────────────────┘  │   │
│              │                   └──────────────┬──────────────────────┘   │
└──────────────┼──────────────────────────────────┼───────────────────────────┘
               │                                  │
               ▼                                  ▼
┌──────────────────────────┐       ┌─────────────────────────────────────────┐
│      PostgreSQL DB       │       │           E2B Sandbox                   │
│  ┌────────────────────┐  │       │  ┌─────────────────────────────────┐   │
│  │ • Projects         │  │       │  │     Next.js 15.3.3 Template     │   │
│  │ • Messages         │  │       │  │  ┌───────────────────────────┐  │   │
│  │ • Fragments        │  │       │  │  │ • Shadcn UI Components    │  │   │
│  │ • Usage            │  │       │  │  │ • Tailwind CSS            │  │   │
│  └────────────────────┘  │       │  │  │ • Hot Reload Server       │  │   │
└──────────────────────────┘       │  │  │ • File System Access      │  │   │
                                   │  │  └───────────────────────────┘  │   │
                                   │  └─────────────────────────────────┘   │
                                   │              │                          │
                                   │              ▼                          │
                                   │    Live Preview URL (Port 3000)        │
                                   └─────────────────────────────────────────┘
```

### Component Interaction Flow

```
┌────────┐    ┌────────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐
│  User  │───▶│  Frontend  │───▶│  tRPC    │───▶│   Inngest   │───▶│  E2B     │
│        │    │  (React)   │    │  Server  │    │   (Agent)   │    │  Sandbox │
└────────┘    └────────────┘    └──────────┘    └─────────────┘    └──────────┘
    │              │                 │                 │                 │
    │  1. Enter    │                 │                 │                 │
    │   Prompt     │                 │                 │                 │
    │─────────────▶│                 │                 │                 │
    │              │  2. Create      │                 │                 │
    │              │   Project       │                 │                 │
    │              │────────────────▶│                 │                 │
    │              │                 │  3. Trigger     │                 │
    │              │                 │   code-agent    │                 │
    │              │                 │────────────────▶│                 │
    │              │                 │                 │  4. Create      │
    │              │                 │                 │   Sandbox       │
    │              │                 │                 │────────────────▶│
    │              │                 │                 │                 │
    │              │                 │                 │  5. Execute     │
    │              │                 │                 │   Commands &    │
    │              │                 │                 │   Write Files   │
    │              │                 │                 │◀───────────────▶│
    │              │                 │                 │                 │
    │              │                 │  6. Save        │                 │
    │              │                 │   Results       │                 │
    │              │                 │◀────────────────│                 │
    │              │                 │                 │                 │
    │              │  7. Poll for    │                 │                 │
    │              │   Messages      │                 │                 │
    │              │◀───────────────▶│                 │                 │
    │              │                 │                 │                 │
    │  8. Display  │                 │                 │                 │
    │   Preview    │                 │                 │                 │
    │◀─────────────│                 │                 │  9. Serve       │
    │              │                 │                 │   Live App      │
    │              │─────────────────────────────────────────────────────▶│
    │              │                 │                 │                 │
```

---

## System Design

### Data Flow Architecture

```
                              ┌─────────────────────────┐
                              │    User Request         │
                              │  "Build a todo app"     │
                              └───────────┬─────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AUTHENTICATION LAYER                               │
│                              (Clerk Middleware)                              │
│  • Validates JWT tokens                                                      │
│  • Protects routes                                                           │
│  • Provides user context                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RATE LIMITING LAYER                                │
│                         (RateLimiterPrisma)                                 │
│  • Free tier: 5 generations / 30 days                                       │
│  • Pro tier: 100 generations / 30 days                                      │
│  • Per-user credit tracking                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API LAYER (tRPC)                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  Projects Router                │  Messages Router                    │  │
│  │  • create() - New project       │  • create() - New message           │  │
│  │  • getOne() - Single project    │  • getMany() - List messages        │  │
│  │  • getMany() - List projects    │                                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       EVENT QUEUE (Inngest)                                  │
│  • Durable function execution                                               │
│  • Step-based workflow orchestration                                        │
│  • Automatic retries and error handling                                     │
│  • Event: "code-agent/run"                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI AGENT NETWORK                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      Code Agent (Primary)                              │ │
│  │  Model: GPT-4.1-nano  │  Max Iterations: 9                            │ │
│  │                                                                        │ │
│  │  Tools Available:                                                      │ │
│  │  ┌─────────────┐ ┌──────────────────┐ ┌──────────────┐               │ │
│  │  │  terminal   │ │ createOrUpdate   │ │  readFiles   │               │ │
│  │  │  ─────────  │ │ Files            │ │  ──────────  │               │ │
│  │  │ Run shell   │ │ ────────────────  │ │ Read file   │               │ │
│  │  │ commands    │ │ Write/update     │ │ contents    │               │ │
│  │  │ in sandbox  │ │ files in sandbox │ │ from sandbox│               │ │
│  │  └─────────────┘ └──────────────────┘ └──────────────┘               │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                          │                                  │
│                                          ▼                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Post-Processing Agents                                                │ │
│  │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐ │ │
│  │  │ Fragment Title Generator │  │     Response Generator              │ │ │
│  │  │ ───────────────────────  │  │     ──────────────────              │ │ │
│  │  │ Creates 3-word title     │  │     User-friendly summary          │ │ │
│  │  │ for the code fragment    │  │     of what was built              │ │ │
│  │  └─────────────────────────┘  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         E2B SANDBOX ENVIRONMENT                              │
│  Template: vib-next-js                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Pre-configured Next.js 15.3.3 Environment                            │ │
│  │  • Hot-reload dev server running on port 3000                         │ │
│  │  • Shadcn UI components pre-installed                                 │ │
│  │  • Tailwind CSS configured                                            │ │
│  │  • TypeScript ready                                                   │ │
│  │  • Writable file system                                               │ │
│  │  • Command execution capability                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                          │                                  │
│  Sandbox Timeout: Configurable (default in SANDBOX_TIMEOUT)                │
│  Access URL: https://{sandboxId}.e2b.dev:3000                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PERSISTENCE LAYER                                    │
│  ┌────────────────────────────────────────────────────────────────────────┐│
│  │                        PostgreSQL Database                              ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  ││
│  │  │   Project    │  │   Message    │  │   Fragment   │  │   Usage   │  ││
│  │  │  ──────────  │  │  ──────────  │  │  ──────────  │  │ ───────── │  ││
│  │  │ id           │  │ id           │  │ id           │  │ key       │  ││
│  │  │ name         │◀─│ projectId    │◀─│ messageId    │  │ points    │  ││
│  │  │ userId       │  │ content      │  │ title        │  │ expire    │  ││
│  │  │ createdAt    │  │ role         │  │ sandboxUrl   │  └───────────┘  ││
│  │  │ updatedAt    │  │ type         │  │ files (JSON) │                 ││
│  │  └──────────────┘  │ createdAt    │  │ createdAt    │                 ││
│  │                    └──────────────┘  └──────────────┘                 ││
│  └────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Database Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐         ┌─────────────────┐         ┌───────────────┐ │
│  │     Project     │         │     Message     │         │   Fragment    │ │
│  ├─────────────────┤         ├─────────────────┤         ├───────────────┤ │
│  │ id: UUID (PK)   │◀────────│ projectId: FK   │         │ id: UUID (PK) │ │
│  │ name: String    │         │ id: UUID (PK)   │◀────────│ messageId: FK │ │
│  │ userId: String  │         │ content: String │         │ title: String │ │
│  │ createdAt: Date │         │ role: Enum      │         │ sandboxUrl:   │ │
│  │ updatedAt: Date │         │   (USER/ASSIST) │         │   String      │ │
│  └─────────────────┘         │ type: Enum      │         │ files: JSON   │ │
│                              │   (RESULT/ERROR)│         │ createdAt:    │ │
│                              │ createdAt: Date │         │   Date        │ │
│                              │ updatedAt: Date │         │ updatedAt:    │ │
│                              └─────────────────┘         │   Date        │ │
│                                                          └───────────────┘ │
│  ┌─────────────────┐                                                        │
│  │      Usage      │    Role: USER | ASSISTANT                              │
│  ├─────────────────┤    Type: RESULT | ERROR                                │
│  │ key: String(PK) │                                                        │
│  │ points: Int     │                                                        │
│  │ expire: Date?   │                                                        │
│  └─────────────────┘                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15.3, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Shadcn UI, Radix UI |
| **State Management** | TanStack React Query, tRPC |
| **Authentication** | Clerk |
| **Database** | PostgreSQL 16, Prisma ORM 7.1 |
| **Background Jobs** | Inngest |
| **AI/LLM** | OpenAI GPT-4.1-nano, Inngest Agent Kit |
| **Code Execution** | E2B Code Interpreter |
| **Rate Limiting** | rate-limiter-flexible |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)
- **Docker & Docker Compose** (for local PostgreSQL)
- **Git**

You'll also need accounts and API keys for:

- [Clerk](https://clerk.com) - Authentication
- [E2B](https://e2b.dev) - Code sandboxes
- [OpenAI](https://platform.openai.com) - AI models
- [Inngest](https://inngest.com) - Background jobs

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codexvibe.git
cd codexvibe
```

### 2. Install Dependencies

```bash
npm install
```

This will also run `prisma generate` automatically via the `postinstall` script.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) section for required values.

### 4. Start the Database

```bash
docker-compose up -d
```

This starts a PostgreSQL 16 container with:
- **Host**: localhost:5432
- **Database**: coderdb
- **User**: coder
- **Password**: coder123

### 5. Run Database Migrations

```bash
npx prisma db push
```

Or to create migration files:

```bash
npx prisma migrate dev --name init
```

### 6. (Optional) Seed the Database

```bash
npx tsx prisma/seed.ts
```

### 7. Set Up E2B Sandbox Template

The project uses a custom E2B sandbox template. To deploy it:

```bash
cd sandbox-templates/nextjs
e2b template build
```

---

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://coder:coder123@localhost:5432/coderdb"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# E2B Sandbox
E2B_API_KEY=e2b_xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# Inngest
INNGEST_EVENT_KEY=xxx
INNGEST_SIGNING_KEY=signkey-xxx

# App URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Setup

### Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker ps

# View logs
docker-compose logs -f postgres
```

### Manual PostgreSQL Setup

If you prefer a local PostgreSQL installation:

1. Create a database named `coderdb`
2. Create a user with credentials matching your `.env`
3. Update `DATABASE_URL` accordingly

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Create migrations (production)
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## Running the Application

### Development Mode

```bash
# Start the development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Start Inngest Dev Server

In a separate terminal:

```bash
npx inngest-cli@latest dev
```

This starts the Inngest dev server at [http://localhost:8288](http://localhost:8288).

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
codexvibe/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
│
├── sandbox-templates/
│   └── nextjs/
│       ├── e2b.Dockerfile     # E2B sandbox Docker config
│       ├── e2b.toml           # E2B template configuration
│       └── compile_page.sh    # Sandbox startup script
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (home)/            # Public pages (landing, auth)
│   │   │   ├── page.tsx       # Home page with prompt input
│   │   │   ├── pricing/       # Pricing page
│   │   │   ├── sign-in/       # Clerk sign-in
│   │   │   └── sign-up/       # Clerk sign-up
│   │   │
│   │   ├── projects/
│   │   │   └── [projectId]/   # Dynamic project pages
│   │   │       └── page.tsx   # Project view with chat + preview
│   │   │
│   │   └── api/
│   │       ├── inngest/       # Inngest webhook endpoint
│   │       └── trpc/          # tRPC API handler
│   │
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── code-view/         # Code syntax highlighting
│   │   ├── file-explorer.tsx  # File tree component
│   │   └── tree-view.tsx      # Tree view component
│   │
│   ├── generated/
│   │   └── prisma/            # Generated Prisma client
│   │
│   ├── hooks/                 # Custom React hooks
│   │
│   ├── inngest/
│   │   ├── client.ts          # Inngest client initialization
│   │   ├── functions.ts       # AI agent function definitions
│   │   ├── types.ts           # Inngest type definitions
│   │   └── utils.ts           # Sandbox utilities
│   │
│   ├── lib/
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── usage.ts           # Rate limiting utilities
│   │   └── utils.ts           # General utilities (cn, etc.)
│   │
│   ├── modules/
│   │   ├── home/              # Home module components
│   │   ├── messages/
│   │   │   └── server/
│   │   │       └── procedures.ts  # Message tRPC procedures
│   │   ├── projects/
│   │   │   ├── server/
│   │   │   │   └── procedures.ts  # Project tRPC procedures
│   │   │   └── ui/
│   │   │       ├── components/    # Project UI components
│   │   │       └── views/         # Project views
│   │   └── usages/                # Usage tracking module
│   │
│   ├── trpc/
│   │   ├── client.tsx         # tRPC React client
│   │   ├── init.ts            # tRPC initialization
│   │   ├── query-client.ts    # TanStack Query client
│   │   ├── routers/
│   │   │   └── _app.ts        # Root tRPC router
│   │   └── server.ts          # Server-side tRPC caller
│   │
│   ├── middleware.ts          # Clerk authentication middleware
│   ├── prompt.ts              # AI system prompts
│   └── types.ts               # Shared TypeScript types
│
├── docker-compose.yml         # Docker Compose for PostgreSQL
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

---

## How It Works

### 1. User Authentication Flow

```
User → Clerk Sign-In/Sign-Up → JWT Token → Protected Routes
```

- Users authenticate via Clerk (supports OAuth, email, etc.)
- Clerk middleware protects routes requiring authentication
- User ID is attached to all project/message operations

### 2. Project Creation Flow

```
1. User enters a prompt (e.g., "Build a todo app with drag and drop")
2. Frontend calls `trpc.projects.create` mutation
3. Server checks rate limits (consumeCredit)
4. New Project + initial USER Message created in database
5. Inngest event "code-agent/run" triggered with projectId and prompt
6. User redirected to /projects/[projectId]
```

### 3. AI Agent Execution Flow

The Inngest function `codeAgentFunction` orchestrates the AI agent:

```
Step 1: Create E2B Sandbox
    └── Spins up isolated Next.js environment (vib-next-js template)
    └── Dev server already running on port 3000

Step 2: Load Previous Messages
    └── Fetches last 5 messages for context

Step 3: Initialize Agent State
    └── Creates state object with { summary: "", files: {} }

Step 4: Run Code Agent Network
    └── Agent uses tools to:
        • terminal: Run npm install, shell commands
        • createOrUpdateFiles: Write/update code files
        • readFiles: Read existing file contents
    └── Agent iterates until task_summary is generated (max 9 iterations)

Step 5: Post-Processing
    └── Fragment Title Generator: Creates 3-word title
    └── Response Generator: Creates user-friendly summary

Step 6: Save Results
    └── Creates ASSISTANT message with fragment (files, sandbox URL)
```

### 4. Live Preview Flow

```
1. Frontend polls for messages via `trpc.message.getMany`
2. When ASSISTANT message with fragment arrives:
   └── Fragment contains sandboxUrl pointing to E2B sandbox
   └── Preview iframe loads https://{sandboxId}.e2b.dev:3000
   └── Code explorer displays files from fragment.files JSON
```

### 5. Rate Limiting System

```
Free Users: 5 generations per 30 days
Pro Users: 100 generations per 30 days

Each generation:
1. Check user's remaining credits
2. If credits available → consume 1 credit → proceed
3. If no credits → throw TOO_MANY_REQUESTS error
```

---

## API Reference

### tRPC Routers

#### Projects Router

| Procedure | Type | Description |
|-----------|------|-------------|
| `projects.create` | Mutation | Create new project with initial prompt |
| `projects.getOne` | Query | Get single project by ID |
| `projects.getMany` | Query | List all user's projects |

#### Messages Router

| Procedure | Type | Description |
|-----------|------|-------------|
| `messages.create` | Mutation | Add new message to project |
| `messages.getMany` | Query | Get all messages for a project |

### Inngest Events

| Event | Payload | Description |
|-------|---------|-------------|
| `code-agent/run` | `{ value: string, projectId: string }` | Triggers AI code generation |

---

## License

MIT License - see LICENSE file for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

For support, please open an issue on GitHub or contact the maintainers.
