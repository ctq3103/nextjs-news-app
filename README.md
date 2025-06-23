This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# User Stories for News App 

<!-- - [ ] Replace current manual article tracking with a central system   -->
- [ ] Add a public homepage showing top headlines and categories  
- [x] Add a passwordless login for team members  
- [ ] Show a dashboard with all current published posts  
- [ ] Provide easy navigation & search for posts and authors  
- [x] Provide a logout option  
- [x] Require users to log in at least once per week  
<!-- - [ ] Allow instant removal of user access when needed   -->
- [x] Authors have an ID, first name, last name, email, bio, avatar URL, active status, and timestamps
- [x] Posts have an ID, title, slug, content, category, thumbnail URL, and timestamps  
- [x] Posts are either DRAFT or PUBLISHED  
- [x] Posts are assigned to specific authors  
- [x] Users can have Author, Editor, or Admin roles  
- [ ] All users can create and view posts  
- [ ] Authors can edit only their own draft posts  
- [ ] Editors and Admins can view, edit, and publish all posts  
- [ ] Only Admins can delete posts or manage user access  
- [ ] Public visitors can view only published posts  
- [ ] App should be optimized for desktop, but usable on mobile/tablet  
- [x] Include Light / Dark mode toggle for reading comfort  
- [ ] Support team should respond quickly to publishing or login issues  

