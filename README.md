# 🗒 ️next-notes
## A collaborative web app where users can share and edit notes in real-time.

🗒️ next-notes is a collaborative web application for note-taking, powered by Next.js.

![next-notes-gif](https://github.com/raumildhandhukia/nextnotes/assets/72497060/40dea818-5cb2-4869-830c-fbedab7464ac)


## Features

- OAuth Integration: Seamless authentication through Google or GitHub.
- Realtime Data Storage: Instantaneous data updates and synchronization.
- Collaborative Note Writing: Real-time collaboration capabilities for note-taking.
- Modern, User-Friendly UI: Intuitive and aesthetically pleasing user interface design.

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
```
#### 2) .env
```sh
DATABASE_URL=
```

####  For development environments
```sh
npm install
npm run dev
```

#### For production environments...

```sh
not available for poduction yet
```
