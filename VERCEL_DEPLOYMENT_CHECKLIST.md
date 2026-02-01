# Vercel Deployment Checklist

## Pre-Deployment (Local)

- [ ] All code committed and pushed to GitHub
  ```bash
  git add .
  git commit -m "Prepare for Vercel deployment"
  git push origin main
  ```

- [ ] Build passes locally
  ```bash
  npm run build
  ```

- [ ] Type checking passes
  ```bash
  npm run type-check
  ```

- [ ] Linting passes
  ```bash
  npm run lint
  ```

- [ ] No hardcoded localhost references (check for `localhost:5000`, `127.0.0.1`)
  ```bash
  grep -r "localhost\|127.0.0.1" src/
  ```

- [ ] Backend is deployed first and has a production URL

## Vercel Dashboard Setup

- [ ] Vercel account created at [vercel.com](https://vercel.com)

- [ ] Project imported from GitHub

- [ ] Framework detected as Vite

- [ ] Build & Development Settings correct:
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

- [ ] Environment Variables added:
  - [ ] `VITE_API_URL` = `https://your-backend-url/api`
  - [ ] `VITE_APP_ENV` = `production`
  - [ ] (Optional) `VITE_VERCEL_ANALYTICS_ID` = your analytics ID

## Deployment

- [ ] Click "Deploy" in Vercel dashboard

- [ ] Wait for build to complete (typically 2-5 minutes)

- [ ] Build succeeds with no errors

- [ ] Deployment preview available

## Post-Deployment Verification

### Access & Loading
- [ ] Can access your Vercel URL in browser
- [ ] Page loads without errors
- [ ] No blank white screen
- [ ] All images load correctly

### Navigation
- [ ] Home page loads and displays correctly
- [ ] About page accessible and working
- [ ] Projects page shows projects with images
- [ ] Certifications page displays all certs
- [ ] Contact page loads with form

### Contact Form Testing
- [ ] Contact form is visible
- [ ] Can type in all fields
- [ ] Form validation works (try submitting empty form)
- [ ] Can submit a test message
- [ ] Success message appears after submission
- [ ] Backend receives the submission (check backend logs)

### Browser Console
- [ ] No JavaScript errors (F12 → Console)
- [ ] No CORS errors when submitting form
- [ ] API requests go to production backend URL

### Performance
- [ ] Page loads in < 3 seconds
- [ ] No console errors or warnings
- [ ] CSS loads and styles apply correctly

### Responsive Design
- [ ] Desktop view works (test at 1920px)
- [ ] Tablet view works (test at 768px)
- [ ] Mobile view works (test at 375px)
- [ ] All elements visible and accessible

## Custom Domain (Optional)

- [ ] Domain purchased (if using custom domain)
- [ ] DNS configured according to Vercel instructions
- [ ] SSL certificate auto-provisioned
- [ ] HTTPS working (lock icon in URL bar)
- [ ] Redirects from old domain to new domain (if applicable)

## Monitoring & Maintenance

- [ ] Analytics dashboard monitoring enabled
- [ ] Error logs monitored
- [ ] Performance metrics reviewed
- [ ] Contact form submissions tracked in backend

## Troubleshooting Completed (if applicable)

- [ ] Build errors resolved
- [ ] Contact form errors resolved
- [ ] API connection errors resolved
- [ ] CORS errors resolved
- [ ] Environment variables verified

## Success Criteria

✅ All checkboxes above should be checked
✅ App is live on Vercel
✅ URL is shareable
✅ Contact form works end-to-end
✅ All pages are accessible
✅ No errors in console
✅ Ready to share with recruiters!

---

## Quick Debug Commands

If something goes wrong, try these:

```bash
# Rebuild locally to test
npm run build

# Check environment variables are correct
cat .env.production

# Test if backend is accessible
curl https://your-backend-url/api/health

# Check Vercel logs
vercel logs [your-url]

# Redeploy without changes
vercel --prod
```

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Issues](link-to-your-repo/issues)
