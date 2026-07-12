# My Portfolio

A single-file, dependency-free personal portfolio website. Just `index.html` — open it in a browser to preview, edit the text to make it yours, then deploy.

## ✏️ How to customize

Open `index.html` and search-and-replace these placeholders:

| Placeholder | Replace with |
|---|---|
| `Your Name` | Your actual name |
| `you@example.com` | Your email |
| `yourusername` (GitHub/LinkedIn) | Your usernames |
| Project One–Four | Your real projects + links |
| Experience items | Your internships / education |
| `/resume.pdf` | Drop a `resume.pdf` in this folder |

Colors live in the `:root { ... }` CSS variables near the top. Change `--accent` to rebrand the whole site.

## 🚀 Deploy (pick ONE — all free)

### Option A — GitHub Pages (recommended, gives you a free URL)
1. Create a new repo on github.com (e.g. `portfolio`).
2. Push this folder (commands below).
3. Repo → **Settings → Pages** → Source: `main` branch, `/root` → **Save**.
4. Live in ~1 min at `https://YOURUSERNAME.github.io/portfolio/`.

### Option B — Netlify or Vercel (drag-and-drop)
- Go to [netlify.com/drop](https://app.netlify.com/drop) or [vercel.com](https://vercel.com), and drag this folder in. Instant live URL.

## 🌐 Add a custom domain (e.g. yourname.com)

1. **Buy a domain** from Namecheap, Cloudflare, Porkbun, or Google Domains (~$10/yr).
2. **Point it at your host:**
   - **GitHub Pages:** In your registrar's DNS, add these `A` records for the apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
     and a `CNAME` record for `www` → `YOURUSERNAME.github.io`.
     Then in repo **Settings → Pages → Custom domain**, enter `yourname.com` and check **Enforce HTTPS**.
   - **Netlify/Vercel:** Just add the domain in the dashboard — it shows you the exact DNS records to paste.
3. DNS can take a few minutes to a few hours to go live. HTTPS is automatic and free.

## 📤 Push to GitHub

```bash
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/portfolio.git
git push -u origin main
```
