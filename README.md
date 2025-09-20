# Maartand — Vite + React + Tailwind (Netlify + Forms)

## Deploy on Netlify (simplest)
1. Create a GitHub repo and upload these files.
2. In Netlify → **Add new site → Import from Git** → choose the repo.
3. Netlify reads `netlify.toml` automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy. Add your custom domain in **Domain management**.

## Form submissions (no backend)
- This project is wired for **Netlify Forms**.
- The visible React form posts to Netlify, and a hidden form in `index.html` lets Netlify parse fields.
- View submissions in **Netlify → Forms**.

## Local run (optional)
```bash
npm i
npm run dev
```
