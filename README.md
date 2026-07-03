# Prestige Banking — Frontend

A React + TypeScript frontend for the `SimpleBankingAPI` (.NET) backend, built with Vite,
Tailwind CSS, and TanStack Query/Router. Visual identity (navy `#0A1628` / gold `#D4A853`)
is pulled directly from the backend's transactional email templates (`Utilities/MailUtils.cs`).

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, with brand tokens in `tailwind.config.js`
- **TanStack Query** for server state, caching, and mutations
- **TanStack Router** (code-based routing) for navigation
- **React Hook Form + Zod** for form state and validation
- **react-hot-toast** for notifications
- **axios** for HTTP

## Getting started

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if needed
npm run dev
```

The app runs on `http://localhost:5173`. In development, requests to `/api/*` are proxied
to `http://localhost:5018` (see `vite.config.ts`), matching the backend's default
`launchSettings.json` HTTP profile. For production, set `VITE_API_BASE_URL` to your deployed
API origin, e.g. `https://api.prestigebanking.ng/api`.

## Required backend change: enable CORS

The provided `SimpleBankingAPI` project does not yet configure CORS, so browser requests from
the Vite dev server (a different origin) will be blocked. Add this to `Program.cs` before
`var app = builder.Build();` and `app.UseAuthorization();`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ...after var app = builder.Build();
app.UseCors("Frontend");
```

Place `app.UseCors("Frontend")` before `app.UseHttpsRedirection()` and before `app.UseAuthorization()`.

## API coverage

Every endpoint on `AccountController` has a corresponding UI action:

| Endpoint                                             | UI                                                  |
| ---------------------------------------------------- | --------------------------------------------------- |
| `POST /api/Account/open-account`                     | Open Account page                                   |
| `GET /api/Account/{accountNumber}`                   | Account detail page                                 |
| `PUT /api/Account/{accountNumber}`                   | "Edit Details" modal                                |
| `DELETE /api/Account/delete-account/{accountNumber}` | "Close Account" modal                               |
| `POST /api/Account/activate-account/{accountNumber}` | "Reactivate" modal                                  |
| `GET /api/Account/all-accounts`                      | Dashboard list                                      |
| `POST /api/Account/deposit`                          | "Deposit" modal                                     |
| `POST /api/Account/withdraw`                         | "Withdraw" modal                                    |
| `POST /api/Account/transfer-fund`                    | "Transfer" modal + standalone Transfer page         |
| `GET /api/Account/balance/{accountNumber}`           | `useAccountBalance` hook (available for future use) |

## Project structure

```
src/
  api/          axios calls per endpoint (accounts-api.ts)
  components/
    accounts/   account list, card, header, actions, details table
    forms/      react-hook-form + zod forms (open, edit, deposit, withdraw, transfer)
    layout/     header + app shell
    ui/         Button, Card, Input, Badge, Modal, Spinner, EmptyState, StatCard
  hooks/        TanStack Query hooks (queries + mutations)
  lib/          axios instance, query client, query key factory
  pages/        route-level page components
  routes/       TanStack Router route + router definitions
  types/        TypeScript types mirroring backend DTOs
  utils/        currency/date formatting, zod schemas
```

Every file is kept small and single-purpose (under ~300 lines) so features are easy to find
and change independently.

## Build

```bash
npm run build   # type-checks then outputs static assets to dist/
npm run preview # serve the production build locally
```
