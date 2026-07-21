# Fixed Ruler

A React app that pins physical-scale rulers to the edges of the browser
viewport — measure real objects on your screen in mm, cm, or inches.

Built with **Vite + React** (no backend, no external APIs — deploys as a
static site).

## How it works

- **Ticks are drawn in real pixels-per-inch (PPI)**, not just CSS units.
  Browsers don't expose a monitor's true physical DPI, so by default the
  app assumes the common 96 DPI baseline and warns "UNCALIBRATED SCALE."
- **Calibrate** (button in the panel footer) lets you match an on-screen
  bar against something you actually own — a bank card, A4/Letter paper,
  or a dollar bill — and derives your screen's true PPI from that.
- **Zoom tracking**: once calibrated, the app snapshots
  `window.devicePixelRatio` at that moment. Because most browsers scale
  `devicePixelRatio` with page zoom, later zoom changes are detected as a
  ratio against that snapshot and the tick spacing is corrected live, so
  the ruler stays physically accurate as you zoom in or out.
- Calibration is saved to `localStorage` so it persists across visits on
  the same device/browser.

## Project structure

```
fixed-ruler/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── src/
    ├── main.jsx
    ├── App.jsx                 – top-level layout, hero text, state
    ├── units.js                 – unit math + reference object list
    ├── index.css                – design tokens (dark/light themes)
    ├── hooks/
    │   ├── useCalibratedPPI.js  – calibration + live zoom tracking
    │   └── useDraggable.js      – makes the control panel draggable
    └── components/
        ├── Ruler.jsx            – renders ticks along one edge
        ├── RulerPanel.jsx       – floating control panel
        ├── SegButton.jsx        – shared toggle-button style
        └── CalibrationModal.jsx – "match an object" calibration flow
```

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Deploy to Vercel

You have two easy paths — pick whichever fits how you're working.

### Option A — Vercel CLI (fastest, no GitHub needed)

1. Install the CLI once, globally:
   ```bash
   npm install -g vercel
   ```
2. From inside the `fixed-ruler` project folder, run:
   ```bash
   vercel
   ```
   - First run asks you to log in (opens a browser) and asks a few setup
     questions — accept the defaults, Vercel auto-detects this as a Vite
     project (build command `npm run build`, output directory `dist`).
3. That deploys a preview URL. To publish it as your production URL:
   ```bash
   vercel --prod
   ```

### Option B — Git + Vercel dashboard (recommended for ongoing work)

1. Push this folder to a new GitHub (or GitLab/Bitbucket) repository:
   ```bash
   git init
   git add .
   git commit -m "Fixed Ruler app"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project**, and import that repository.
3. Vercel auto-detects the **Vite** framework preset:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   (These are also pinned explicitly in `vercel.json`, so they'll be
   correct even if auto-detection is off.)
4. Click **Deploy**. Every future push to `main` redeploys automatically;
   pushes to other branches get their own preview URLs.

No environment variables, database, or API keys are needed — this is a
fully static, client-only app.

## Notes on accuracy

Perfect physical accuracy from a browser is fundamentally limited: the
platform doesn't expose real monitor DPI, only reported resolution and
(sometimes) devicePixelRatio. The calibration flow here gets you very
close by measuring against a real object you already have, but for
best results:

- Recalibrate if you switch monitors or displays.
- Recalibrate after changing your OS-level display scaling setting
  (not just browser zoom — the app tracks browser zoom automatically,
  but OS scaling changes can shift the baseline).
