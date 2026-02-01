# Environment Variables Reference Guide

## Overview

Your app uses environment variables to configure different behaviors for development, staging, and production.

## Available Variables

### API Configuration

**`VITE_API_URL`**
- **Purpose**: Backend API endpoint
- **Type**: String (URL)
- **Required**: Yes
- **Default**: `http://localhost:5000/api`

**Development:**
```
VITE_API_URL=http://localhost:5000/api
```

**Production (Vercel):**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Staging:**
```
VITE_API_URL=https://your-backend-staging.onrender.com/api
```

### Analytics

**`VITE_VERCEL_ANALYTICS_ID`**
- **Purpose**: Vercel Analytics tracking
- **Type**: String (ID)
- **Required**: No (optional)
- **Where to get**: Vercel Dashboard → Analytics

```
VITE_VERCEL_ANALYTICS_ID=your-analytics-id-here
```

### Environment Mode

**`VITE_APP_ENV`**
- **Purpose**: Application environment mode
- **Type**: String (enum)
- **Required**: No
- **Default**: `development`
- **Allowed values**: `development`, `staging`, `production`

```
# Development
VITE_APP_ENV=development

# Production
VITE_APP_ENV=production
```

## Setup Instructions

### Local Development (.env.local)

```env
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
VITE_VERCEL_ANALYTICS_ID=
```

To use:
1. Create `.env.local` in project root
2. Copy values from `.env.example`
3. Adjust as needed
4. **Don't commit** `.env.local` to git

### Vercel Deployment

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend-prod.onrender.com/api` |
| `VITE_APP_ENV` | `production` |
| `VITE_VERCEL_ANALYTICS_ID` | (from Analytics) |

5. Redeploy project

### GitHub (Never Commit!)

**Do NOT add .env files to git:**

```bash
# Good - already in .gitignore
.env
.env.local
.env.*.local
.env.production
```

**Safe to commit:**
- `.env.example` - template only, no secrets

## Environment Variable Priority

When building:

1. **Command line**: Highest priority
2. **.env file**: Local override
3. **Vercel Settings**: Production environment
4. **Defaults**: In code (fallback)

## How Variables are Used

### During Build (Vite)

```typescript
// vite.config.ts
define: {
  "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  "process.env.VITE_APP_ENV": JSON.stringify(process.env.VITE_APP_ENV || "development"),
}
```

Variables are embedded at build time.

### In Code

```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Access via `import.meta.env.VITE_*`

## Common Scenarios

### Scenario 1: Local Development

```env
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

**Commands:**
```bash
npm run dev    # Local dev server
npm run build  # Build for production
```

### Scenario 2: Production Deployment (Vercel)

**Vercel Environment Variables:**
```
VITE_API_URL=https://cyber-canvas-backend.onrender.com/api
VITE_APP_ENV=production
```

**What happens:**
- Variables injected at build time
- Build artifact includes hardcoded values
- Deployment contains production API URL

### Scenario 3: Multiple Backends

If you have multiple backend environments:

**Development (local):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

**Staging (preview):**
```env
VITE_API_URL=https://staging-api.onrender.com/api
VITE_APP_ENV=staging
```

**Production (main):**
```env
VITE_API_URL=https://prod-api.onrender.com/api
VITE_APP_ENV=production
```

## Debugging Environment Variables

### Check What's Being Used

```typescript
// Add to any component temporarily
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('App Env:', import.meta.env.VITE_APP_ENV);
```

### During Local Build

```bash
# Show environment variables
echo %VITE_API_URL%           # Windows
echo $env:VITE_API_URL         # PowerShell
echo $VITE_API_URL             # Linux/Mac
```

### In Vercel

1. Vercel Dashboard → Deployments
2. Click on deployment
3. Click "Runtime Logs" or "Build Logs"
4. Look for environment variable output

## Troubleshooting

### API Requests Failing

1. Check `VITE_API_URL` is correct
   ```
   console.log(import.meta.env.VITE_API_URL)
   ```

2. Verify backend URL is reachable
   ```bash
   curl https://your-backend-url/api/health
   ```

3. Check CORS configuration in backend
   - Should allow your Vercel domain
   - `FRONTEND_URL` in backend should point to your Vercel URL

### Variables Not Loading

1. Restart dev server after changing `.env`
   ```bash
   npm run dev
   ```

2. Verify file is named `.env.local` (not `.env`)

3. Check for typos in variable names
   - Must start with `VITE_`
   - Case-sensitive

4. Verify Vercel environment variables are set
   - Check Vercel dashboard
   - Redeploy after adding variables

### Build Succeeds but API Fails

1. API URL works locally but fails on Vercel?
   - Check Vercel environment variable is set
   - Verify backend CORS allows Vercel domain
   - Check backend `FRONTEND_URL` is correct

## Best Practices

✅ **Do:**
- Use `.env.local` for development
- Keep `.env.example` with template values
- Use VITE_ prefix for Vite variables
- Set variables in Vercel dashboard
- Commit `.env.example` to git
- Update backend FRONTEND_URL with Vercel URL

❌ **Don't:**
- Commit `.env` or `.env.production` to git
- Hardcode secrets in code
- Use sensitive data in public variables
- Forget to redeploy after changing variables
- Use localhost URLs in production

## Reference: Backend Environment Variables

These go in your backend's `.env` file:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server
PORT=5000
NODE_ENV=production

# Frontend (update with Vercel URL)
FRONTEND_URL=https://your-vercel-project.vercel.app

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Complete Setup Checklist

### For Development:

- [ ] Create `.env.local`
- [ ] Set `VITE_API_URL=http://localhost:5000/api`
- [ ] Backend running on localhost:5000
- [ ] `npm run dev` starts correctly
- [ ] Contact form works locally

### For Production:

- [ ] Backend deployed to Render/Railway/Heroku
- [ ] Get backend production URL
- [ ] Add to Vercel environment variables
- [ ] Set `VITE_APP_ENV=production`
- [ ] Redeploy Vercel project
- [ ] Test contact form on Vercel

---

**Still stuck?** See:
- `VERCEL_SETUP.md` - Detailed Vercel setup
- `DEPLOYMENT.md` - Backend deployment
- `VERCEL_QUICK_START.md` - Quick reference
