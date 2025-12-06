# Production Fix Guide - Supabase Data Fetching

## Issues Fixed

1. ✅ Consolidated to single `.env.local` file
2. ✅ Removed duplicate `.env.development.local`
3. ✅ Added cache revalidation (`revalidate = 0`)
4. ✅ Added dynamic rendering to pages
5. ✅ Improved error logging
6. ✅ Created RLS policy script

## Steps to Deploy

### 1. Configure Vercel Environment Variables

Go to your Vercel project settings and add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://bcmmlrlabyzizvcgxxzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbW1scmxhYnl6aXp2Y2d4eHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODkzNDgsImV4cCI6MjA3ODU2NTM0OH0.alUzfGlFtDUgNu3NI08pvCleyVQoM-VdDNePv1G2o-U
```

### 2. Enable RLS Policies in Supabase

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the script: `scripts/enable-rls-policies.sql`
4. This ensures public read access to all tables

### 3. Verify Supabase Configuration

Check in Supabase Dashboard:
- **Authentication** → Settings → Disable email confirmations if not needed
- **Database** → Tables → Verify RLS is enabled with public read policies
- **API** → Check that your anon key matches the one in `.env.local`

### 4. Clear Vercel Cache

After deploying:
```bash
# In Vercel dashboard
Deployments → [Latest] → ... → Redeploy → Clear Build Cache
```

### 5. Test Locally First

```bash
npm run dev
```

Visit http://localhost:3000 and verify data loads correctly.

### 6. Deploy to Vercel

```bash
git add .
git commit -m "Fix production data fetching"
git push
```

## Common Issues & Solutions

### Issue: Data still not loading in production

**Solution 1: Check Vercel Logs**
- Go to Vercel Dashboard → Deployments → [Latest] → Functions
- Look for error messages in the logs

**Solution 2: Verify Environment Variables**
- Ensure variables are set in Vercel (not just locally)
- Redeploy after adding variables

**Solution 3: Check Supabase RLS**
- Run the RLS policy script again
- Verify policies exist in Supabase Dashboard → Authentication → Policies

### Issue: "Missing Supabase environment variables" error

**Solution:**
- Add environment variables in Vercel project settings
- Redeploy the project

### Issue: Stale data showing

**Solution:**
- The app now uses `revalidate = 0` for fresh data
- Clear browser cache or use incognito mode

## What Changed

### `.env.local` (Single source of truth)
- Removed `NEXT_PUBLIC_BASE_URL` (not needed)
- Kept only Supabase credentials

### `lib/data.ts`
- Added `export const revalidate = 0` to disable caching
- Added detailed error logging
- Better error handling

### `app/page.tsx`
- Added `export const dynamic = 'force-dynamic'`
- Added `export const revalidate = 0`
- Ensures fresh data on every request

### `lib/supabase.ts`
- Added environment variable validation
- Added `persistSession: false` for better server-side rendering
- Throws error if credentials are missing

## Testing Checklist

- [ ] Environment variables set in Vercel
- [ ] RLS policies enabled in Supabase
- [ ] Local development works
- [ ] Production deployment successful
- [ ] Data loads on production site
- [ ] No console errors in browser
- [ ] Check Vercel function logs for errors

## Support

If issues persist:
1. Check Vercel function logs
2. Check Supabase logs (Dashboard → Logs)
3. Verify network requests in browser DevTools
4. Ensure Supabase project is not paused
