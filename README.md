# 🗒 ️next-notes
## A collaborative web app where users can share and edit notes in real-time.

🗒️ next-notes is a collaborative web application for note-taking, powered by Next.js.

![next-notes-updated](https://github.com/raumildhandhukia/nextnotes/assets/72497060/97d262ef-9231-4f5a-b503-edfca1fbbb4d)



## Features

- OAuth Integration: Seamless authentication through Google or GitHub.
- Realtime Data Storage: Instantaneous data updates and synchronization.
- Collaborative Note Writing: Real-time collaboration capabilities for note-taking.
- Modern, User-Friendly UI: Intuitive and aesthetically pleasing user interface design.
- Light/Dark Mode.

## Tech

🗒️ next-notes uses a number of open source projects to work properly:

- Next.js: React framework for server-side rendering.
- TypeScript: Typed JavaScript for safer code.
- Auth.js: Authentication library for web applications.
- MongoDB: NoSQL database for scalable storage.
- Prisma: ORM for database management.
- TailwindCSS: Utility-first CSS framework.
- shadcn: Styled component library for React.

## Installation

🗒 ️next-notes requires Next.js (https://nextjs.org/) v14 to run. 

Install the dependencies and devDependencies and start the server.

## Environment Variables

#### 1) .env.local
```sh
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```
#### 2) .env
```sh
DATABASE_URL=
```

For testing production builds in local environments, 
(if Next gives error)
```sh
NEXT_AUTH_HOST=
```

####  For development environments
```sh
npm install
npm run dev
```

#### For production environments...

```sh
npm run build
npm run start
```
