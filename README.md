# MistressHypno Pics Server

Image hosting server for the MistressHypno autodrainer extension.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` (or Railway URL in production)

## Endpoints

- `GET /api/images` — List all images
- `GET /api/random-image` — Get random image JSON
- `GET /health` — Health check

## Image Upload

Place images in the `uploads/` folder:

```
mistresshypno-pics-server/
├── uploads/
│   ├── pic1.jpg
│   ├── pic2.jpg
│   └── ...
```

Images are served at: `https://mistresshypno-pics-production.up.railway.app/uploads/pic1.jpg`

## Autodrainer Integration

The autodrainer extension points to:
```
https://mistresshypno-pics-production.up.railway.app/api/random-image
```

Each drain spawns a random image from the uploads folder.

## Deployment

Deploy to Railway:

1. Push to GitHub repo
2. Connect Railway to GitHub
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `PORT=3000`

Creates `mistresshypno-pics-production.up.railway.app` (or custom domain)
