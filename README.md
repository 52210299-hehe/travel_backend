# hehe travels 2 — Backend

Node/Express backend API for the `hehe travels 2` project (CSCI426). This server exposes REST endpoints for authentication, travels (flights), and bookings; it persists data in MySQL and is intended to be run locally during development or hosted on a platform (Railway, Render, etc.).

## Project Summary

- **Purpose:** Provide a lightweight API for the frontend to list travels, manage bookings, and handle authentication with role-based access (user/admin).
- **Stack:** Node.js, Express, mysql2 (connection pool), dotenv

## Key Endpoints

- `POST /api/login` — authenticate a user, returns user info + token/session
- `POST /api/SignUp` — create a new user
- `GET /api/travels` — list available travels (public)
- `GET /api/travels/:id` — get one travel
- `POST /api/travels` — create a travel (admin)
- `PUT /api/travels/:id` — update a travel (admin)
- `DELETE /api/travels/:id` — delete a travel (admin)
- `GET /api/bookings` — list bookings for current user (requires auth)
- `POST /api/bookings` — create a booking (requires auth)
- `PUT /api/bookings/:id` — update booking (e.g., mark paid)
- `DELETE /api/bookings/:id` — cancel booking

Exact endpoints may vary slightly — check route files (`login.js`, `travels.js`, `bookings.js`, `SignUp.js`) for the canonical request/response shapes.

## Environment & Configuration

Create a `.env` in the project root with these variables (example):

```
PORT=5000
DB_HOST=interchange.proxy.rlwy.net
DB_PORT=10339
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=railway
```

- For local development with a local MySQL server, set `DB_HOST=127.0.0.1` and `DB_PORT=3306`.
- Never commit real secrets — use your environment or secrets manager in production.

## Setup & Run (development)

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
# or for hot reload if you have nodemon
npm run dev
```

3. The API will run by default at `http://localhost:5000`.

## DB Notes

- The backend uses `mysql2` with a connection pool (`db.js`). `db.js` will read `process.env` values and log the active DB config at startup to help debugging.
- Common connection errors:
  - `ECONNREFUSED ::1:3306` / `127.0.0.1:3306`: MySQL isn't listening on that port (service stopped, different port, firewall). Start your local MySQL server or update `DB_HOST`/`DB_PORT` to point to a working instance.

## Recommended Improvements

- Use JWTs for stateless auth and refresh-token flow.
- Add request validation (e.g., `express-validator`) and centralized error handling.
- Move secrets to a secrets manager in production.
- Add tests for routes and DB interactions (supertest + a test DB or mocks).

## Troubleshooting

- If the server starts but the DB connection fails, check the `DB config` log printed at startup and verify accessibility with a MySQL client.
- To see which process is listening on the MySQL port (Windows PowerShell):

```powershell
netstat -ano | findstr :3306
```

- To start the MySQL service on Windows (name may vary):

```powershell
Get-Service -Name MySQL*
net start MySQL80
```

## Project Structure (backend)

```
./
├── index.js        # Express app + server start
├── db.js           # mysql2 pool configuration and connection test
├── login.js        # login routes
├── SignUp.js       # signup routes
├── travels.js      # travels CRUD routes
├── bookings.js     # bookings CRUD routes
├── package.json
└── README_BACKEND.md
```

## License

MIT

---

If you'd like, I can: (A) convert this into `README.md` (replace the frontend README), (B) add sample `.env.example`, or (C) add a small health-check endpoint that waits for DB connectivity before listening. Which do you prefer?
