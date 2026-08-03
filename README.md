# Signature Admin Panel

A modern, reusable admin panel starter built with **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**.

Designed to be used as a **GitHub Template** so you can start every new project with a solid admin foundation.

---

## Features

- Clean & modern UI (shadcn/ui + Nova style)
- Collapsible Sidebar + Header
- Dark / Light mode
- Authentication (Login / Register)
- Protected Routes
- Dashboard with stats cards
- Users management (CRUD)
- TanStack Query for data fetching
- TanStack Table (sorting, filtering, pagination)
- Form validation with Zod + React Hook Form
- Fully typed with TypeScript
- Ready to use as a GitHub Template

---

## Tech Stack

| Technology            | Purpose                    |
|-----------------------|----------------------------|
| Vite                  | Build tool                 |
| React 19              | UI library                 |
| TypeScript            | Type safety                |
| Tailwind CSS v4       | Styling                    |
| shadcn/ui (Base UI)   | Component library          |
| React Router          | Routing                    |
| TanStack Query        | Server state               |
| TanStack Table        | Advanced tables            |
| Zod + React Hook Form | Form validation            |
| next-themes           | Dark mode                  |
| Lucide React          | Icons                      |
| Sonner                | Toast notifications        |

---

## Getting Started

### 1. Use this template

Click the green **Use this template** button on GitHub,  
or use the CLI:

```bash
npx degit YOUR_USERNAME/my-admin-panel my-new-project
cd my-new-project

2. Install dependencies
Bashnpm install
3. Start the development server
Bashnpm run dev
Open http://localhost:5173

Project Structure
src/
├── components/
│   ├── layout/          # Sidebar, Header, AppLayout
│   ├── ui/              # shadcn components
│   └── ProtectedRoute.tsx
├── context/
│   └── AuthContext.tsx  # Authentication state
├── pages/
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── ...
├── lib/
│   ├── api/             # Mock API functions
│   ├── query-client.ts
│   └── utils.ts
├── hooks/
└── types/