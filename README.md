# Tasks Management Project

This project consists of a backend (Node.js/Express) and a frontend (Angular/React) for managing tasks.

---

## Backend Setup

1. **Navigate to the backend directory**:

```bash
cd path-to-backend
```

2. **Create an `.env` file** with the following content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=db_password
DB_DATABASE=db_name
DB_SSL=false
```

3. **Install dependencies**:

```bash
npm install
```

4. **Start the backend server**:

```bash
npm start
```

The backend should now be running on `http://localhost:3000` (or the port configured).

---

## Frontend Setup

1. **Navigate to the frontend directory**:

```bash
cd path-to-frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the frontend server**:

For Angular:

```bash
ng serve
```

For React:

```bash
npm start
```

The frontend should now be running on `http://localhost:4200` (Angular) or `http://localhost:3000` (React).

---

## Notes

* Ensure PostgreSQL is running and accessible with the credentials in the `.env` file.
* Adjust ports in `.env` or project configuration if necessary.
* Use the backend API endpoints to interact with tasks from the frontend.
