# Campus Impact — Next.js

A Next.js 14 (App Router) conversion of the Campus Impact landing page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
campus-impact/
├── app/
│   ├── globals.css       # All global styles (CSS variables, component styles)
│   ├── layout.tsx        # Root layout with font imports & metadata
│   └── page.tsx          # Home page assembling all sections
├── components/
│   ├── Nav.tsx           # Fixed navigation bar
│   ├── Ticker.tsx        # Scrolling ticker strip
│   ├── Hero.tsx          # Hero section with poster grid
│   ├── AboutStrip.tsx    # About / description strip
│   ├── Pillars.tsx       # Two pillars (Workshop + Reel Competition)
│   ├── Roadmap.tsx       # Step-by-step roadmap table
│   ├── Tracks.tsx        # 5 workshop tracks grid
│   ├── Prizes.tsx        # Prize cards
│   ├── CtaBand.tsx       # Call-to-action banner
│   └── Footer.tsx        # Footer
├── next.config.js
├── tsconfig.json
└── package.json
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS** (plain CSS via globals.css — no Tailwind)
- Google Fonts: DM Serif Display, DM Sans, Space Mono
