# [skjapps](https://skjapps.github.io/)
My portfolio website : )

## Features

- **Portfolio**: Showcase of projects and interactive demos
- **Music**: Personal music tracks with audio player
- **Vista**: AI chat interface (deployed from private [youchat](https://github.com/skjapps/youchat) repository)

## Vista Deployment

Vista is automatically deployed from the private `skjapps/youchat` repository to `skjapps.github.io/vista`.

- When changes are pushed to `youchat` main branch, it triggers a rebuild of this site
- The Vista app is built with `basePath: '/vista'` and deployed alongside the main site
- See [VISTA_DEPLOYMENT.md](./VISTA_DEPLOYMENT.md) for detailed setup instructions

### Setup

Run the setup script to configure Vista deployment:
```bash
./setup-vista-deployment.sh
```

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to `next` branch to trigger automatic deployment to `main` branch via GitHub Actions.
