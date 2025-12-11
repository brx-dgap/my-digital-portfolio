# Custom Domain Setup Guide

## Overview
This guide explains how to configure a custom domain for your digital portfolio deployed on Vercel.

## Prerequisites
- A custom domain registered with a domain registrar (GoDaddy, Namecheap, Route 53, etc.)
- Access to your domain registrar's DNS management panel
- Project deployed on Vercel

## Step-by-Step Domain Setup

### 1. Add Domain to Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" → "Domains"
4. Enter your custom domain (e.g., `cybersecurity-portfolio.com`)
5. Click "Add"

Vercel will show you the DNS records you need to add.

### 2. Configure DNS Records

There are two approaches: **Recommended** (Vercel Nameservers) or **Alternative** (CNAME record).

#### Option A: Recommended - Use Vercel Nameservers

1. Vercel will display 4 nameserver addresses (NS records)
2. Go to your domain registrar's DNS settings
3. Update the nameservers to point to Vercel's servers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
4. Wait 24-48 hours for DNS propagation

**Advantages:**
- Easier to manage all DNS records in Vercel
- Automatic SSL certificate generation
- Better performance optimization

**Common Registrar Instructions:**
- **GoDaddy:** Domain Settings → Nameservers
- **Namecheap:** Domain List → Manage → Nameservers
- **Route 53:** Hosted Zones → Edit NS records

#### Option B: Alternative - CNAME Record

1. Vercel will provide a CNAME target (usually `cname.vercel-dns.com`)
2. Go to your domain registrar's DNS settings
3. Create a CNAME record:
   - **Name:** `@` or leave blank for root
   - **Target:** Use the CNAME from Vercel
4. For `www` subdomain:
   - **Name:** `www`
   - **Target:** Same CNAME target

**Note:** CNAME records cannot be used for apex domains (`example.com`) with some registrars. Use nameservers if this fails.

### 3. Configure Apex Domain

For the root domain (`example.com` without `www`):

#### Using A Records (if not using Vercel nameservers):
Add A records pointing to Vercel's IP addresses:
- `76.76.19.132`
- `76.76.43.140`
- `2610:28:3090:3001:0:0:0:0`
- `2610:28:3090:3002:0:0:0:0`

#### Using WWW Redirect:
Some registrars allow redirecting the apex domain to `www.example.com`:
1. Create a redirect from `example.com` → `www.example.com`
2. Vercel handles the `www` subdomain via CNAME

### 4. SSL Certificate Configuration

Vercel automatically provisions and renews SSL certificates via Let's Encrypt.

**Wait for:**
- DNS records to propagate (24-48 hours)
- Vercel to provision the certificate
- HTTPS to be enabled automatically

**Check Status:**
1. Go to Vercel Project → Domains
2. Your domain should show "Valid Configuration" with a green checkmark
3. A lock icon appears when SSL is ready

### 5. Redirect HTTP to HTTPS

Add to [next.config.mjs](next.config.mjs):

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      destination: '/:path*',
      permanent: false,
    }
  ]
}
```

### 6. Update Environment Variables

Update your site URL in environment variables:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Vercel Project Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Troubleshooting

### Domain Shows "Invalid Configuration"

**Check:**
1. DNS records are correctly added at your registrar
2. DNS propagation is complete (use [whatsmydns.net](https://whatsmydns.net))
3. Nameservers or CNAME target is correct

**Wait:** Sometimes Vercel needs up to 48 hours to recognize the configuration.

### HTTPS Certificate Pending

This typically takes 24 hours after DNS is configured correctly.

**Check Vercel Logs:**
1. Go to Deployments → Select latest deployment
2. Look for SSL certificate issuance messages

### Mixed Content Warnings (HTTP + HTTPS)

Ensure your application uses:
```typescript
// Use protocol-relative URLs
const imageUrl = "//cdn.example.com/image.jpg"

// Or absolute HTTPS
const imageUrl = "https://cdn.example.com/image.jpg"

// Avoid hardcoded HTTP
const imageUrl = "http://cdn.example.com/image.jpg" // ❌ Wrong
```

### DNS Cache Issues

**Clear your local DNS cache:**
```bash
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved
```

## Verify Domain Setup

Use these tools to verify your domain configuration:

1. **MX Toolbox:** [mxtoolbox.com](https://mxtoolbox.com) - Check DNS records
2. **What's My DNS:** [whatsmydns.net](https://whatsmydns.net) - Check DNS propagation
3. **SSL Labs:** [ssllabs.com](https://www.ssllabs.com) - Test SSL certificate
4. **HTTP Status:** [httpstatus.io](https://httpstatus.io) - Test redirects

## Advanced Configuration

### Email Service with Custom Domain

If you want to use email with your custom domain:

1. Configure MX records at your registrar:
   ```
   Priority 10: mx.google.com  (for Google Workspace)
   Or use your email provider's MX records
   ```

2. Add SPF, DKIM, DMARC records for email security:
   ```
   SPF:  v=spf1 include:_spf.google.com ~all
   DKIM: <provider-specific key>
   DMARC: v=DMARC1; p=none
   ```

### Subdomain Configuration

For subdomains like `api.example.com` or `blog.example.com`:

1. Create CNAME record:
   - **Name:** `api` or `blog`
   - **Target:** `cname.vercel-dns.com`

2. Add each subdomain to Vercel:
   - Vercel Dashboard → Domains → Add `api.example.com`

## Security Considerations

1. **Enable Security Headers:**
   - Already configured in [next.config.mjs](next.config.mjs)
   - CSP, X-Frame-Options, X-XSS-Protection enabled

2. **HSTS (HTTP Strict Transport Security):**
   Add to next.config:
   ```javascript
   {
     key: 'Strict-Transport-Security',
     value: 'max-age=31536000; includeSubDomains'
   }
   ```

3. **Monitor SSL Certificate:**
   - Vercel auto-renews before expiration
   - Check email for renewal notifications

## Next Steps

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [DNS Best Practices](https://cloud.google.com/dns/docs/best-practices)
