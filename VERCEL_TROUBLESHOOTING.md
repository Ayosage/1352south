# Vercel DNS Configuration Checklist

## DNS Setup
- Ensure that your domain (1352south.vercel.app) is properly configured in Vercel
- If using a custom domain, make sure CNAME records are pointing to cname.vercel-dns.com
- Check for any DNS conflicts or misconfiguration

## SSL/TLS Troubleshooting
- Verify SSL certificates are issued correctly in Vercel dashboard
- Check for any certificate chain issues
- Ensure SSL/TLS settings in Vercel are set to "Auto" or "TLS 1.2"

## Network Configuration
- The PR_CONNECT_RESET_ERROR typically indicates:
  - SSL handshake failure
  - Connection being reset during TLS negotiation
  - Possible firewall or security settings interference

## Vercel Project Configuration
- Set NODE_VERSION to 18.x or higher in Environment Variables
- Consider disabling Edge Runtime if enabled
- Verify deployment logs for any build errors

## Common Solutions
1. Refresh the SSL certificate (in Vercel dashboard)
2. Check for domain conflicts
3. Try deploying a minimal static site first (test.html)
4. Contact Vercel support if persistent issues with domains

## Contact Vercel Support
If issues persist, reach out to Vercel support with:
- Domain name
- Deployment ID
- Error messages
- Timestamps of errors
