# Vista (YouChat) Deployment Setup

This document explains how the Vista app (from the private `skjapps/youchat` repository) is automatically deployed to `skjapps.github.io/vista`.

## Architecture

### Repositories
1. **Main Repository**: `skjapps/skjapps.github.io` (public)
   - Contains the main portfolio website
   - Deploys to GitHub Pages on `main` branch
   
2. **Vista Repository**: `skjapps/youchat` (private)
   - Contains the Vista/YouChat Next.js application
   - Triggers deployment when changes are pushed to `main` branch

## Workflow

### 1. Vista Repository Workflow
When changes are pushed to `skjapps/youchat` main branch:
- `.github/workflows/trigger-deploy.yml` triggers a repository dispatch event to the main site
- Uses GitHub PAT to authenticate

### 2. Main Repository Workflow
The main site's `.github/workflows/deploy.yml` runs when:
- Changes are pushed to the `next` branch
- A `youchat-updated` repository dispatch event is received
- Manually triggered via workflow_dispatch

The workflow:
1. Builds the main Next.js site → `out/`
2. Checks out the private `youchat` repository
3. Temporarily modifies youchat's `next.config.ts` to add:
   - `basePath: "/vista"`
   - `assetPrefix: "/vista"`
4. Builds youchat → `out/`
5. Copies youchat's build to `out/vista/`
6. Deploys combined `out/` directory to `main` branch

## Setup Requirements

### GitHub Secrets
Both repositories need a `GH_PAT` (Personal Access Token) with:
- `repo` scope (for private repository access)
- `workflow` scope (for triggering workflows)

### Steps to Create PAT:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` and `workflow` scopes
3. Add as `GH_PAT` secret in both repositories

### Icon File
Add a `vista.png` icon file to `/public/assets/img/vista.png` (60x60px recommended)

## Testing

### Test Locally
```bash
# In youchat repository
cd /path/to/youchat
npm run build
# Check that build works

# Simulate with basePath
# Temporarily edit next.config.ts to add basePath and assetPrefix
npm run build
```

### Test Deployment
1. Push changes to `skjapps/youchat` main branch
2. Check Actions tab in `skjapps/youchat` for trigger workflow
3. Check Actions tab in `skjapps.github.io` for build-and-deploy workflow
4. Visit `https://skjapps.github.io/vista` after deployment

## Troubleshooting

### Vista not updating
- Check if `GH_PAT` secret is valid in both repositories
- Verify trigger workflow ran successfully in youchat repository
- Check build-and-deploy workflow logs in main repository

### Vista showing 404
- Ensure basePath injection worked correctly
- Check that files are in `out/vista/` directory before deployment
- Verify `_next` folder paths are correct

### Assets not loading
- Check that assetPrefix is correctly set
- Verify image paths use relative paths or `basePath` aware paths
- Review console for 404 errors

## Manual Deployment

To manually trigger a full deployment including Vista:
1. Go to `skjapps.github.io` repository
2. Navigate to Actions tab
3. Select "Deploy Next.js to GitHub Pages" workflow
4. Click "Run workflow" button
5. Select `next` branch and run

## Future Improvements

1. Cache node_modules between builds
2. Add build status badges
3. Implement preview deployments
4. Add version tracking for Vista builds
5. Consider using Git submodules instead of checkout action
