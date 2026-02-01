# Deployment Guide

This guide covers deploying both frontend and backend to production.

## Frontend Deployment (Vercel)

Vercel is the recommended platform for React applications and offers excellent integration with GitHub.

### Prerequisites
- Vercel account (free tier available)
- GitHub repository connected to Vercel

### Setup Steps

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure Environment Variables**
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

3. **Build Settings**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Preview deploys created for pull requests

### Performance Optimization
- Automatic image optimization
- Code splitting and lazy loading
- CDN distribution worldwide
- Serverless functions for backend API routes (optional)

### Custom Domain
- Settings > Domains
- Add your domain and configure DNS records
- SSL certificate auto-provisioned

---

## Backend Deployment (Render)

Render offers free and paid tiers with excellent Node.js support.

### Prerequisites
- Render account at [render.com](https://render.com)
- GitHub repository
- MongoDB Atlas account (for database)

### Setup Steps

1. **Create MongoDB Atlas Database**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

2. **Deploy on Render**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository
   - Select backend directory: `./backend`

3. **Configure Environment**
   ```
   Environment Variables:
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cyber_canvas
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

4. **Build & Start Commands**
   ```
   Build: npm install
   Start: npm start
   ```

5. **Deploy**
   - Render automatically deploys on push to main branch
   - Monitor deploy logs in dashboard

### Database Backup

MongoDB Atlas provides:
- Automatic daily backups
- Point-in-time restore
- Free backups retained for 7 days
- Paid backups for longer retention

### Monitor API Health

Add health check endpoint monitoring:
```
GET https://your-api.onrender.com/health
```

Render can ping this endpoint periodically to keep free dyno awake.

---

## Alternative Backend Options

### Railway
- Similar to Render
- Deploy from [railway.app](https://railway.app)
- Good free tier

### Heroku
- Classic option (paid plan required)
- Scale up easily
- Multiple environment options

### AWS
- EC2 for traditional deployment
- Lambda for serverless
- RDS for managed database
- More complex but highly scalable

---

## Production Checklist

### Before Deploying
- [ ] All tests passing locally
- [ ] No console errors in development
- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] Email service configured (optional)

### Deployment Day
- [ ] Review deployment checklist
- [ ] Test in staging environment
- [ ] Deploy backend first, then frontend
- [ ] Monitor logs for errors
- [ ] Test all endpoints in production
- [ ] Verify analytics tracking
- [ ] Check performance metrics

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check application logs
- [ ] Verify email delivery
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Measure performance metrics
- [ ] Set up alerting/monitoring

---

## Scaling Considerations

### Frontend
- Vercel automatically scales
- CDN distribution worldwide
- Consider caching strategies

### Backend
- Render/Railway: vertical scaling or multiple instances
- Database: add read replicas if needed
- Caching: implement Redis for frequently accessed data
- Load balancing: use reverse proxy

### Database
- MongoDB Atlas auto-scaling available
- Set up monitoring and alerts
- Regular backup testing

---

## Troubleshooting

### Frontend Not Loading
- Check build output in Vercel dashboard
- Verify environment variables
- Clear browser cache
- Check network tab in DevTools

### API Connection Issues
- Verify CORS configuration in backend
- Check FRONTEND_URL environment variable
- Test API directly: `curl https://api.example.com/health`
- Check rate limiting is not blocking requests

### Database Connection Errors
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions
- Test connection string locally first

### 500 Errors
- Check application logs in Render dashboard
- Verify all environment variables set
- Check database connectivity
- Look for unhandled errors in code

### Performance Issues
- Monitor database query times
- Check for N+1 queries
- Implement caching
- Profile application performance
- Consider increasing dyno size

---

## Security Hardening

### HTTPS/SSL
- Vercel: automatic
- Render/Railway: automatic for custom domains
- Ensure HSTS header set
- Use only HTTPS for API calls

### Database
- Enable network access restrictions
- Use strong passwords
- Regular security updates
- Enable encryption at rest

### API
- Rate limiting enabled
- CORS properly configured
- Input validation on all endpoints
- No sensitive data in logs
- Use environment variables for secrets

### Monitoring
- Set up error alerting
- Monitor unusual traffic patterns
- Log important events
- Regular security audits

---

## Continuous Integration

GitHub Actions workflow runs:
- Linting & formatting checks
- TypeScript type checking
- Unit tests
- Build verification

Failures block deployment. All checks must pass before merging to main.

---

## Rollback Plan

If deployment causes issues:

### Frontend (Vercel)
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

### Backend (Render)
1. Go to Logs tab
2. Identify what changed
3. Redeploy previous commit
4. Or manually revert code in GitHub

---

## Cost Estimation (Monthly)

### Free Tier
- **Vercel**: Free for frontend
- **Render**: Free for backend (1 web service + 1 Postgres)
- **MongoDB Atlas**: Free tier (512MB)
- **Total**: $0

### Production Tier
- **Vercel Pro**: $20
- **Render**: $7-12 (basic paid plan)
- **MongoDB Atlas**: $45-100+ (scaled)
- **Custom Domain**: $10-15
- **Total**: ~$100+/month

### Optimization Tips
- Keep free tiers while building
- Migrate to paid only when needed
- Use reserved instances for better pricing
- Monitor and optimize database queries

---

## Monitoring & Alerts

### What to Monitor
- Application error rate
- Response time / latency
- Database connection pool
- CPU and memory usage
- Request rate and traffic patterns

### Tools
- Render/Railway: built-in monitoring
- Vercel: Speed Insights (built-in)
- MongoDB Atlas: Performance Advisor
- Uptime monitoring: updownio.com or statuspages.io

### Alerting
- Email alerts for deployment failures
- Slack integration for errors
- PagerDuty for critical issues
- Dashboard for status overview

---

For questions or issues, contact: ankur.sharma2003920@gmail.com
