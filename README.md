# HTML color palettes

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-colorvault.vercel.app/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/tKHH3xcwK5K)

Overview
--------
This repository contains HTML color palettes exported from a v0.app chat. Each palette includes hex codes and example HTML/CSS snippets to use quickly in your projects. The repo is kept in sync automatically with your deployed v0.app chat.

Live demo
---------
The project is deployed and publicly available at:

**https://v0-colorvault.vercel.app/**

(If you are the project owner and want to edit the source on v0.app, use the editor link: https://v0.app/chat/tKHH3xcwK5K — that link may require v0.app access.)

What’s included
---------------
- HTML/CSS snippets for palettes generated from your v0.chat.
- A live demo deployed via Vercel.
- Simple components and styles to preview palettes in the browser.
- Auto-sync from v0.app so changes to your deployed chat are pushed here.

Quick start — use a palette
---------------------------
Copy this HTML block into any page to preview a palette (replace hexes with the palette you want):

<div class="palette" style="display:flex;gap:8px;">
  <div style="background:#FF6B6B;width:80px;height:80px;border-radius:6px"></div>
  <div style="background:#4ECDC4;width:80px;height:80px;border-radius:6px"></div>
  <div style="background:#556270;width:80px;height:80px;border-radius:6px"></div>
</div>

Example CSS variables (drop into :root):

:root {
  --palette-1-0: #FF6B6B;
  --palette-1-1: #4ECDC4;
  --palette-1-2: #556270;
}

Palette reference
-----------------
(Replace the sample list below with the palettes exported from v0.app. I can populate this automatically if you want.)

- Sunset Breeze — #FF6B6B, #FF8E72, #FFD166, #4ECDC4, #556270
- Ocean Calm — #0E9AA7, #3DA4AB, #F6CD61, #FFE66D, #F4F4F8

Screenshots / Preview
---------------------
Add one or two PNGs/GIFs under /public and link them here to show the palettes in action.

How sync works
-------------
1. Create and modify your project in v0.app.
2. Deploy your chats from the v0 interface.
3. v0.app pushes changes automatically to this repository.
4. Vercel redeploys the site from this repository.

Development
-----------
To run locally:
1. Install dependencies:
   pnpm install
2. Run dev server:
   pnpm dev
3. Build:
   pnpm build
4. Preview production locally:
   pnpm start

(Adjust commands for npm or yarn if you prefer.)

Project structure
-----------------
- /app — Next.js app source (pages/components)
- /public — static assets and demo screenshots
- components.json — v0 components manifest
- styles — global styles and palette preview CSS

Contributing
------------
Contributions are welcome! See CONTRIBUTING.md for guidelines. If you want to add palettes:
- Add a palette JSON or update the v0 chat and redeploy.
- Open a pull request with a short description and preview.

License
-------
This project is licensed under the MIT License — see LICENSE.md.

Credits
-------
Built with v0.app and deployed on Vercel.
