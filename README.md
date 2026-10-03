# Astro Blog

## Setup

```sh
pnpm install
cp src/example.config.ts src/config.ts
pnpm dev
```

## Writing posts

Each post is a folder in `src/content/blog/`. The folder name is the slug (`/blog/<slug>/`).

```
src/content/blog/my-post/
├── index.md
└── cover.png
```

```md
---
heading: My Post
description: Shown on the post card and in the meta description.
cover: ./cover.png
tags: [linux, astro]
publishedAt: 2026-10-04T12:00:00Z
updatedAt: 2026-10-05T12:00:00Z # optional
---

Post content…
```

## Importing from Strapi

```sh
node scripts/strapi-export.mjs http://localhost:1337
```

Downloads every post, its cover and any `/uploads/` images into `src/content/blog/`.

## Deploying

Everything is prerendered except `/search`, which runs on the Node server:

```sh
pnpm build
node dist/server/entry.mjs
```
