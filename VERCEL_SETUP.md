# Vercel Deployment Guide

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub (or GitLab/Bitbucket):

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Create Vercel Account & Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "New Project"
5. Select your repository: `ankur-s-cyber-canvas`
6. Click "Import"

## Step 3: Configure Environment Variables

In the Vercel dashboard:

1. **Project Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-backend-url/api` | Backend API URL (from Render) |
| `VITE_APP_ENV` | `production` | Environment mode |
| `VITE_VERCEL_ANALYTICS_ID` | (optional) | Analytics ID from Vercel |

**Important:** Replace `https://your-backend-url/api` with your actual backend URL from Render

### Example:
```
VITE_API_URL=https://cyber-canvas-backend.onrender.com/api
VITE_APP_ENV=production
```

## Step 4: Configure Build Settings

In **Project Settings** → **Build & Development Settings**:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

(These should auto-detect, but verify they're correct)

## Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-5 minutes)
3. You'll get a deployment URL like: `https://your-project.vercel.app`

## Step 6: Verify Deployment

1. Open your Vercel URL in browser
2. Check all pages load correctly
3. Test the contact form:
   - Submit a message
   - Verify it reaches your backend
4. Check browser console for errors

## Post-Deployment

### Update Your DNS (Optional)

If you have a custom domain:

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `portfolio.yourname.com`)
3. Follow Vercel's DNS configuration instructions
4. Update nameservers at your domain registrar

### Set Production URL in Backend

Update your backend's `FRONTEND_URL` environment variable:

```
FRONTEND_URL=https://your-vercel-url.vercel.app
```

This allows your backend to accept requests from your frontend.

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Run locally: `npm run build`
3. Ensure all dependencies are in `package.json`
4. Check for hardcoded paths or localhost references

### Contact Form Not Working

1. Verify `VITE_API_URL` is correct
2. Check backend CORS allows your Vercel domain
3. Check backend is running
4. Open browser console → Network tab → test form submission

### Blank Page on Load

1. Check browser console for errors
2. Verify environment variables are set
3. Check that `dist/index.html` exists (build artifacts)
4. Try hard refresh (Ctrl+Shift+R)

## Automatic Deployments

After the first deployment:

- Every push to `main` branch → auto-deploys
- Pull requests get preview URLs
- Rollback to previous deployment anytime

## Environment Variables per Environment

### Development (Local)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

### Preview (Vercel PR Preview)
```
VITE_API_URL=https://your-backend-staging.onrender.com/api
VITE_APP_ENV=staging
```

### Production (Vercel Main)
```
VITE_API_URL=https://your-backend-prod.onrender.com/api
VITE_APP_ENV=production
```

## Next Steps

1. Deploy backend to Render first (see DEPLOYMENT.md)
2. Get backend production URL
3. Set `VITE_API_URL` in Vercel environment
4. Deploy frontend to Vercel
5. Test end-to-end flow

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel Guide](https://vercel.com/guides/build-frameworks#vite)
