# CyberShield: Cybersecurity Portfolio Application

## Purpose of the app 

This is a demonstrator app that is intended to be used by the Ausbiz Cyber Security Bootcamp to teach the foundations of building, shipping, and securing a modern web application. It serves as a professional portfolio for cybersecurity specialists to showcase their expertise and services.

## Product Vision 

A web-based digital solution that allows cybersecurity professionals to showcase their experience and expertise. The application demonstrates how to secure and protect resources that require authentication, and includes SaaS features that allow authorized users to perform sensitive CRUD operations.

## Application Overview

CyberShield is a comprehensive cybersecurity portfolio application built with Next.js, featuring:

- **Modern UI Components**: Built with a comprehensive UI component library (shadcn/ui)
- **Authentication**: Secure user authentication via Clerk with social login options
- **Role-Based Access Control**: Different privileges for visitors, authenticated users, and administrators
- **Database Integration**: PostgreSQL (Neon or Vercel) for persistent data storage
- **Server Actions**: Secure server-side operations for data manipulation
- **Security Journal**: Track mini projects and submission requirements
- **Comprehensive Security**: Logging, environment variable management, and deployment security

## Functional Features

### For Unauthenticated Users
1. **Home Page**: Visually appealing landing page with a high-impact hero section showcasing cybersecurity services
2. **Newsletter Subscription**: Simple form to collect user contact information
3. **Blog Access**: Public access to cybersecurity articles and insights
4. **About Page**: Information about the cybersecurity specialist/company
5. **Legal Pages**: Access to privacy policy, terms of service, and cookie policy

### For Authenticated Users
1. **Project Showcase**: View secured cybersecurity project portfolios and case studies
2. **Resource Access**: View specialized cybersecurity resources, tools, guides, and checklists
3. **Security Journal**: Track mini projects with category filtering and requirements verification
4. **Personalized Experience**: User-specific content and interactions

### For Admin Users
1. **User Management**: Control user permissions and roles
2. **Project Administration**: Create, read, update, and delete project entries
3. **Newsletter Management**: View and manage newsletter subscribers
4. **Debugging Tools**: Special admin interfaces for system monitoring
5. **Audit Logs**: Access to security event logs and deployment reports

## UI Components and Features

1. **Responsive Design**: Fully responsive layout for all device sizes
2. **Theming Support**: Light/dark mode toggle with system preference detection
3. **Modern UI Elements**: Cards, forms, modals, and other interactive components
4. **Navigation System**: Intuitive navbar and footer for easy site navigation
5. **Security Journal Interface**: Category filters, status tracking, and requirements checklist


## Technical Architecture

### Frontend
- **Framework**: Next.js 15+ (App Router architecture)
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Components**: Comprehensive shadcn/ui component library
- **State Management**: React hooks and context for client-side state

### Backend
- **Database**: PostgreSQL (Neon or Vercel Postgres) for data persistence
- **ORM**: Drizzle ORM for type-safe database operations with migrations
- **Authentication**: Clerk authentication service with social login providers
- **Server-Side Rendering**: Leveraging Next.js App Router for dynamic server-rendered pages
- **Server Actions**: Implementation of secure server-side operations for data mutations

### Application Structure
- **Middleware**: Route protection and authorization checks (Clerk)
- **Components**: Reusable UI components with clear separation of concerns
- **Hooks**: Custom React hooks for shared functionality
- **Actions**: Server actions for secure data operations
- **Public Assets**: Static images and resources

### Code Organization
- **/app**: Next.js App Router pages and layouts
- **/components**: UI components (both custom and shadcn/ui)
- **/lib**: Utility functions, database connections, types, and security utilities
- **/hooks**: Custom React hooks for shared functionality
- **/actions**: Server-side actions for data operations
- **/scripts**: Database migration and utility scripts
- **/public**: Static assets and images

### Security Features
- **Authentication**: Secure user authentication via Clerk with role-based access control
- **Protected Routes**: Server-side route protection with middleware
- **Secure Environment Variables**: .env.local for development, Vercel deployment variables
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, CSP, and more
- **Logging & Auditing**: Comprehensive security event logging with sensitive data sanitization
- **Database Migrations**: Version-controlled schema changes with rollback support

## Week 3 Implementation

All Week 3 requirements have been fully implemented. See [WEEK_3_IMPLEMENTATION.md](WEEK_3_IMPLEMENTATION.md) for complete details.

### Implemented Features
1. ✅ **Clerk Authentication with Protected Routes** - Protected `/admin`, `/resources`, `/projects`, `/security-journal`
2. ✅ **Secure Environment Variables** - .env.example, .env.local, security headers in next.config
3. ✅ **Vercel Storage Integration** - PostgreSQL configuration with connection pooling guide
4. ✅ **Drizzle ORM Migrations** - Full migration infrastructure with rollback support
5. ✅ **Deployment Security & Logging** - Comprehensive logging, sanitization, and audit trails
6. ✅ **Custom Domain Preparation** - Complete DNS setup guide with SSL/HTTPS configuration
7. ✅ **Security Journal** - Enhanced journal page with 7 mini projects and submission tracking

### Documentation
- [WEEK_3_IMPLEMENTATION.md](WEEK_3_IMPLEMENTATION.md) - Complete Week 3 guide
- [VERCEL_STORAGE_SETUP.md](VERCEL_STORAGE_SETUP.md) - Database configuration
- [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md) - Domain deployment guide

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- pnpm or npm package manager
- PostgreSQL database (Neon or Vercel Postgres)
- Clerk account for authentication

### Environment Variables
Create a `.env.local` file in the root directory. Use `.env.example` as a template:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@hostname:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Application
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Database URL Format
For Neon PostgreSQL:
```
postgresql://[user]:[password]@[neon-hostname]/[database]?sslmode=require
```

### Installation
1. Clone the repository
2. Install dependencies with `npm install` or `pnpm install`
3. Set up environment variables in `.env.local` file
4. Initialize and migrate database:
   ```bash
   npm run db:migrate
   ```
5. Start the development server with `npm run dev`

### Drizzle ORM Configuration

The project uses Drizzle ORM for type-safe database operations.

#### Database Schema
The schema is defined in:
- `lib/db.ts` - Main tables (users, projects, subscribers, blog posts)
- `lib/journal-schema.ts` - Journal entries with extended metadata

#### Running Migrations
```bash
# Apply pending migrations
npm run db:migrate

# Check migration status
npm run db:migrate status

# Rollback last migration
npm run db:migrate down 1

# Rollback all (dangerous!)
npm run db:migrate reset --force
```

#### Available Tables
- `users` - User accounts with roles and Clerk integration
- `blog_posts` - Blog articles and posts
- `projects` - Project portfolio items
- `subscribers` - Newsletter subscribers
- `journal_entries` - Mini project submissions with categories and requirements tracking
- `_migrations` - Migration tracking (internal)

## Testing the Implementation

### Test Authentication
```bash
npm run dev
# Visit http://localhost:3000/security-journal
# Should redirect to sign-in
# Sign in with test account
# Should be redirected to journal
```

### Test Database
```bash
# Check migrations
npm run db:migrate status

# View logs
tail -f logs/app.log

# View audit logs
tail -f logs/audit.log
```

### Test Security Journal
```bash
# Navigate to /security-journal
# Add entry with category
# Filter by category and status
# Verify entry appears in journal
```

## Deployment

### To Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel project settings
4. Deploy

### Custom Domain
Follow [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md) for complete domain configuration with:
- Nameserver or CNAME setup
- SSL/HTTPS configuration
- Security headers
- Environment variable updates

## Scripts Available

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build           # Build for production
npm start               # Start production server

# Database
npm run db:migrate      # Run migrations
npm run db:migrate status  # Check migration status
npm run db:generate     # Generate new migrations

# Linting
npm run lint            # Run ESLint
```

## Troubleshooting

### Authentication Issues
- Clear browser cookies and cache
- Check Clerk dashboard API keys
- Verify `.env.local` has correct keys
- Review middleware.ts route patterns

### Database Issues
- Check DATABASE_URL format
- Verify database is running and accessible
- Review migration logs in console
- Check `logs/app.log` for errors

### Route Protection
- Ensure middleware.ts includes all protected routes
- Clear browser cache if routing issues persist
- Check Clerk user is properly synced to database

For more detailed troubleshooting, see [WEEK_3_IMPLEMENTATION.md](WEEK_3_IMPLEMENTATION.md#troubleshooting).

## Learning Outcomes

Through this implementation, you'll learn:
- Secure authentication patterns with Clerk
- Role-based access control implementation
- Database migration and versioning
- Security headers and environment variable management
- Logging and audit trail creation
- Full-stack CRUD operations
- Deployment security best practices

## Licensing

Ausbiz Consulting Pty Ltd provides licenses for non-commercial use only.

### Copyright

© Ausbiz Consulting. All rights reserved.