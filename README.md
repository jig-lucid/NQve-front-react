# NQve Frontend

## Local

```bash
npm ci
npm run dev
```

## Docker

```bash
docker build -t nqve-front-react .
docker run -d --name nqve-front -p 80:80 nqve-front-react
```

## GitHub Actions deploy flow

Push to `main` will:

1. install dependencies
2. build the Vite app
3. build and push `ghcr.io/<owner>/nqve-front-react:latest`
4. ssh into the Linux desktop server
5. pull the latest image and restart the `nqve-front` container

Required GitHub repository secrets:

- `VITE_BACKEND_URL`
- `SERVER_HOST`
- `SERVER_PORT`
- `SERVER_USER`
- `SERVER_SSH_KEY`
- `GHCR_PAT`
