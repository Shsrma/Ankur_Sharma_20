# Quick Vercel Deployment Guide

## Prerequisites

- GitHub account with your code pushed
- Backend deployed (optional but recommended for contact form to work)
- Vercel account (free)

## 1️⃣ Push Code to GitHub

```bash
cd d:\A\ankur-s-cyber-canvas
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## 2️⃣ Deploy on Vercel (5 minutes)

### Option A: Using Vercel Dashboard (Easiest)

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Click **"New Project"**
5. Find and select: `ankur-s-cyber-canvas`
6. Click **"Import"**

### Option B: Using Vercel CLI (Advanced)

```bash
npm install -g vercel
vercel
# Follow the prompts to deploy
```

## 3️⃣ Configure Environment Variables

In **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

Add these variables:

```
VITE_API_URL = https://your-backend-url/api
VITE_APP_ENV = production
```

**Important:** Replace `https://your-backend-url/api` with your actual backend URL

### Where to get Backend URL:
- If using **Render**: `https://your-project-name.onrender.com/api`
- If using **Railway**: Check Railway dashboard for service URL
- If running locally: `http://localhost:5000/api` (only for development)

## 4️⃣ Trigger Deployment

After setting environment variables:
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **Redeploy** button OR
4. Push a commit to main branch to auto-deploy

## 5️⃣ Verify Deployment ✅

Your app is live! You'll see a URL like:
```
https://your-project-ankur-s-cyber-canvas.vercel.app
```

### Test Everything:

- [ ] Page loads without errors
- [ ] All pages are accessible (Home, About, Projects, Contact, Certifications)
- [ ] Images load correctly
- [ ] Contact form submits successfully
- [ ] No console errors (F12 → Console)

## 6️⃣ Custom Domain (Optional)

To use your own domain:

1. Buy domain from GoDaddy, Namecheap, etc.
2. In Vercel → **Settings** → **Domains**
3. Add your domain
4. Follow Vercel's DNS instructions
5. Update nameservers at your domain registrar

## Automatic Deployments

From now on:
- **Every push to `main`** → Automatic deployment
- **Pull requests** → Get preview URLs
- **Rollback anytime** → Click previous deployment

## Environment Variables for Different Stages

### Development (Local)
```bash
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development
```

### Production (Vercel)
```
VITE_API_URL=https://your-backend-prod.onrender.com/api
VITE_APP_ENV=production
```

## Troubleshooting

### Blank Page?
- Check browser console (F12) for errors
- Verify environment variables are set
- Check that backend is running (if contact form needed)

### Build Fails?
- Check Vercel build logs (Deployments tab)
- Run locally: `npm run build`
- Ensure all dependencies are in `package.json`

### Contact Form Not Working?
1. Open browser console (F12 → Network tab)
2. Try submitting form
3. Check if API request goes to correct backend URL
4. Verify backend `CORS` allows your Vercel domain
5. Check backend is running and responding

### API Errors?
- Verify `VITE_API_URL` in environment variables
- Check backend is deployed and running
- Update backend `FRONTEND_URL` to your Vercel URL

## Share Your Portfolio

Your live portfolio URL:
```
https://your-project-ankur-s-cyber-canvas.vercel.app
```

Share this with:
- Recruiters
- LinkedIn profile
- Resume
- GitHub profile
- Portfolio websites

## Next Steps

1. ✅ Deploy frontend (this guide)
2. 📦 Deploy backend (see DEPLOYMENT.md)
3. 🔧 Connect frontend + backend
4. 🧪 Test everything works
5. 📢 Share your portfolio!

---

**Questions?** See full deployment guide in `VERCEL_SETUP.md` and `DEPLOYMENT.md`
