# Vyreka Community

This project uses a Django backend at the repository root and a React + Vite frontend inside `frontend/`. The frontend calls Django APIs for events and contact form submission, so both servers must run together during local development.

## Project structure

```text
VYREKA_COMMUNITY/
├── frontend/                  # React + Vite app
├── home/                      # Django app
├── vyreka_community/          # Django project settings and URLs
├── .env                       # Backend + Vite env values for local dev
├── .env.example               # Sample env file
├── db.sqlite3
├── manage.py
└── requirements.txt
```

## What runs where

- Django runs the backend API and admin panel from the repo root.
- React runs the frontend from `frontend/`.=
- The frontend uses `VITE_BACKEND_URL` to connect to Django.

## 1) Clone the project

```bash
git clone <your-repo-url>
cd VYREKA_COMMUNITY
```

## 2) Create `.env`

Create a `.env` file in the project root by copying `.env.example`. The backend reads email and debug settings from this file, and the frontend reads `VITE_BACKEND_URL` through Vite during local development.

```bash
cp .env.example .env
```

If you are on Windows and `cp` does not work, create `.env` manually and paste the values from `.env.example`.

Important:

- Fill `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` in your real `.env` file.
- Use a Gmail App Password for `EMAIL_HOST_PASSWORD`, not your normal Gmail password.
- Keep `.env` private and never commit it.

## 3) Backend setup

Create a Python virtual environment and install Django dependencies from the root of the repository.

### Windows PowerShell

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Windows CMD

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Optional: create an admin user:

```bash
python manage.py createsuperuser
```

Start Django:

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## 4) Frontend setup

Open a second terminal and go into the frontend folder. The frontend has its own dependencies and must be started separately from Django.

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually run at:

```text
http://127.0.0.1:5173/
```

## 5) Run in two terminals

### Terminal 1 — Django backend

```bash
cd VYREKA_COMMUNITY
.venv\Scripts\activate   # Windows example
python manage.py runserver
```

### Terminal 2 — Frontend

```bash
cd VYREKA_COMMUNITY/frontend
npm install
npm run dev
```

## 6) Open the app

- Frontend: `http://127.0.0.1:5173/`
- Backend: `http://127.0.0.1:8000/`
- Django admin: `http://127.0.0.1:8000/admin/`

## Common local workflow

1. Activate `.venv`.
2. Run Django from the root.
3. Open a second terminal.
4. Run the frontend from `frontend/`.
5. Edit backend files in `home/` and `vyreka_community/`.
6. Edit frontend files in `frontend/src/`.

## Deployment note

For frontend deployment on Vercel or Render, set `VITE_BACKEND_URL` in the hosting dashboard environment variables. Vite exposes only `VITE_` prefixed variables to frontend code and injects them at build time.

For backend deployment, add the Django and email variables on the backend host separately, including `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, email settings, CORS settings, and CSRF trusted origins.
