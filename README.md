# Nocturnal Notebook - A Blog Website

This is a Turborepo that contain both both frontend and backend inside ./apps directory.

## Install Dependencies

Run the following command:

```
npm install
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `api`: an [Hono.js] api for cloudfare workers
- `frontend`: an [React.js] app
- `@repo/common`: common types and zod validators used in both api and frontend
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd Blog-Website
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd Blog-Website
npm run dev
```
