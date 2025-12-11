# Week 3 Quick Reference Guide

## Commands

### Database
```bash
npm run db:migrate              # Run pending migrations
npm run db:migrate status       # Check migration status
npm run db:migrate down 1       # Rollback last migration
npm run db:generate             # Generate new migrations
```

### Development
```bash
npm run dev                     # Start dev server
npm run build                   # Build for production
npm run start                   # Start production server
npm run lint                    # Run ESLint
```

### Utilities
```bash
npm run db-test                 # Test database connection
npm run db:migrate reset --force # Rollback all (DANGEROUS)
```

---

## Key Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection with Clerk |
| `lib/auth.ts` | Authentication utilities |
| `lib/migrations.ts` | Database migration system |
| `lib/security.ts` | Logging and security utilities |
| `lib/journal-schema.ts` | Journal database schema |
| `app/security-journal/page.tsx` | Security journal page |
| `.env.example` | Environment variables template |
| `.env.local` | Local environment (never commit) |
| `next.config.mjs` | Security headers configuration |

---

## Protected Routes

| Route | Protection | Purpose |
|-------|-----------|---------|
| `/admin` | Authentication | Admin dashboard |
| `/resources` | Authentication | Resource library |
| `/projects` | Authentication | Project showcase |
| `/security-journal` | Authentication | Mini project tracking |

---

## Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

**Optional:**
- `CLERK_WEBHOOK_SECRET` - For Clerk webhooks
- `NODE_ENV` - Environment (development/production)
- `NEXT_PUBLIC_SITE_URL` - Site URL for redirects

---

## Mini Projects

| # | Project | Key Skills |
|---|---------|------------|
| 1 | Authentication & Authorization | Clerk, RBAC, Protected routes |
| 2 | Secure Environment Variables | .env setup, Security headers |
| 3 | Vercel Storage Integration | Database provisioning, Connection pooling |
| 4 | Drizzle ORM Migrations | Schema versioning, Rollback support |
| 5 | Deployment Security & Logging | Audit trails, Sensitive data masking |
| 6 | Custom Domain Configuration | DNS setup, SSL/HTTPS, Domain routing |
| 7 | Security Journal Implementation | CRUD operations, Filtering, Form validation |

---

## Database Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User accounts | id, email, clerkId, role, isFirstUser |
| `journal_entries` | Mini project submissions | id, userId, link, lesson, status, category |
| `_migrations` | Migration tracking | id, name, executed_at, status |
| `blog_posts` | Blog articles | id, title, slug, content, author |
| `projects` | Portfolio items | id, title, description, icon, items |
| `subscribers` | Newsletter | id, email, name, createdAt |

---

## Security Checklist

- [ ] .env.local created and filled
- [ ] .env.local in .gitignore
- [ ] Database migrations run
- [ ] Clerk keys configured
- [ ] Protected routes working
- [ ] First user is admin
- [ ] Logs directory created
- [ ] Security headers configured
- [ ] No sensitive data in code

---

## Troubleshooting Quick Links

**Authentication Issues**
→ Check Clerk dashboard, clear cookies, verify .env.local

**Database Issues**
→ Run `npm run db-test`, check DATABASE_URL, review logs

**Route Protection**
→ Check middleware.ts, verify user synced to database

**Logging Issues**
→ Check `logs/` directory exists, verify write permissions

**Migration Issues**
→ Run `npm run db:migrate status`, check SQL syntax

---

## Documentation Files

| Document | Content |
|----------|---------|
| `README.md` | Project overview and setup |
| `WEEK_3_IMPLEMENTATION.md` | Complete Week 3 guide |
| `VERCEL_STORAGE_SETUP.md` | Database configuration |
| `CUSTOM_DOMAIN_SETUP.md` | Domain deployment guide |
| `IMPLEMENTATION_SUMMARY.md` | Detailed implementation summary |

---

## Testing Endpoints

```
GET /                           # Home page
GET /sign-in                    # Clerk sign-in
GET /sign-up                    # Clerk sign-up
GET /security-journal           # Protected - Requires auth
GET /admin                      # Protected - Requires admin
GET /projects                   # Protected - Requires auth
GET /resources                  # Protected - Requires auth
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] Migrations run successfully
- [ ] Environment variables set in Vercel
- [ ] Database backup taken
- [ ] Custom domain DNS prepared
- [ ] SSL certificate ready
- [ ] Logs monitoring configured
- [ ] Error tracking setup
- [ ] Performance optimized
- [ ] Security audit complete

---

## Useful Commands for Deployment

```bash
# Pre-deployment
npm run build                   # Test production build
npm run lint                    # Check code quality

# Post-deployment
npm run db:migrate status       # Verify migrations
tail -f logs/app.log           # Monitor application logs
tail -f logs/audit.log         # Monitor security events
```

---

## Support Resources

**Clerk Issues**
- Check dashboard: https://dashboard.clerk.com
- Documentation: https://clerk.com/docs
- Support: support@clerk.dev

**Database Issues**
- Neon Dashboard: https://console.neon.tech
- Vercel Dashboard: https://vercel.com/dashboard
- Drizzle Docs: https://orm.drizzle.team

**Deployment Issues**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

## Quick Stats

- **Lines of Code Added:** ~2,500+
- **Files Created:** 5 new documentation files
- **Files Modified:** 8 existing files
- **Database Tables:** 6 total (3 new/enhanced)
- **Security Features:** 5 major implementations
- **Mini Projects Documented:** 7 complete projects

---

## Version Info

- **Next.js:** 15.3.1
- **React:** 19
- **Drizzle ORM:** 0.43.1
- **Clerk:** 6.16.0
- **Tailwind CSS:** 3.4.17
- **Node.js:** 18+

---

## Next Steps

1. **Run migrations:** `npm run db:migrate`
2. **Start dev server:** `npm run dev`
3. **Test authentication:** Visit `/security-journal`
4. **Add journal entry:** Test the journal functionality
5. **Review logs:** Check `logs/` directory
6. **Deploy to Vercel:** Push to GitHub
7. **Configure domain:** Follow `CUSTOM_DOMAIN_SETUP.md`

---

**Last Updated:** December 11, 2025  
**Status:** ✅ Complete
