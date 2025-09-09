# MiniShop (Node + React + SQLite)

A minimal e-commerce admin demo with:
- User registration and login (cookie-based JWT)
- Public product listing
- Admin-only create, edit, and delete for products

## Quick start

1) Clone or download this repository, then open a terminal at the project root.

2) Install dependencies: npm i

3) Build: npm run build

4) Start in development: npm run dev

5) The API and client will start according to the configured scripts.

6) ## Environment

- Copy .env.example to .env in the server directory and set:
  - PORT
  - JWT_SECRET
  - CORS_ORIGIN

## Database

- SQLite is used locally. If running for the first time:
- npm run migrate
- npm run seed

  - Use a specific origin for CORS in development (e.g., http://localhost:5173).
- For production hosting without a persistent filesystem, use a managed database instead of SQLite.

##Credentials
Admin Login - 
email: "admin@example.com", password:Admin@123

User Login - 
email: "user@example.com", password:User@123
 
