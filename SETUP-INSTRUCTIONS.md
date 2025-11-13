# Church Website Backend Setup Instructions

## 🚀 Quick Start Guide

### 1. Database Setup (You need to do this)

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/bcmmlrlabyzizvcgxxzf
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste the entire content from `database-schema.sql`
4. Click "Run" to create all tables and security policies

### 2. Create Admin User (You need to do this)

1. In Supabase dashboard, go to "Authentication" → "Users"
2. Click "Add user" 
3. Enter your admin email and password
4. This will be your login for the admin dashboard

### 3. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit these URLs:
   - Main site: http://localhost:3000
   - Admin login: http://localhost:3000/admin
   - Admin dashboard: http://localhost:3000/admin/dashboard (after login)

### 4. Test APIs with Postman

1. Import `postman-collection.json` into Postman
2. Set the `baseUrl` variable to `http://localhost:3000`
3. Test all endpoints

## 📋 What's Been Created

### ✅ Backend APIs
- `/api/programs` - Manage church programs
- `/api/announcements` - Church announcements
- `/api/leadership` - Leadership team
- `/api/archives` - Books, videos, pictures, journals

### ✅ Admin Dashboard
- Login system with Supabase Auth
- Content management for all sections
- Responsive design matching your site

### ✅ Database Schema
- 4 main tables with proper relationships
- Row Level Security enabled
- Public read, authenticated write policies

## 🔧 Next Steps

### Connect Frontend to Backend
Update your existing pages to fetch from the APIs:

```typescript
// Example: Update your programs page
const { data: programs } = await fetch('/api/programs').then(r => r.json())
```

### File Upload (Optional)
If you want image/video uploads:
1. Enable Supabase Storage
2. Add upload endpoints
3. Update admin forms

### Deployment
1. Deploy to Vercel: `vercel --prod`
2. Update environment variables in Vercel dashboard
3. Update Postman baseUrl to your live domain

## 🛠️ Troubleshooting

### Common Issues:
1. **Database connection errors**: Check your .env.local file
2. **Auth not working**: Verify admin user exists in Supabase
3. **API errors**: Check browser console and network tab

### Support:
- Check Supabase logs in dashboard
- Use browser dev tools for debugging
- Test APIs individually with Postman

## 🎯 Features Ready to Use

- ✅ Full CRUD operations for all content
- ✅ Secure admin authentication
- ✅ Public API access for frontend
- ✅ Responsive admin interface
- ✅ Database with proper security
- ✅ Postman collection for testing

Your church website now has a complete backend system! 🎉