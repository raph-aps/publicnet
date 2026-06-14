# Professional Publications Site

A clean, animated, GitHub Pages-ready publications website built on the **Massively** HTML5 UP template.

---

## 🚀 Quick Start — Deploy to GitHub Pages

1. Push this entire folder to a GitHub repository.
2. Go to **Settings → Pages → Source** and select `main` branch / `root`.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.

---

## ➕ How to Add a New Publication

### Step 1 — Create the folder
Inside `publications/`, create a new folder whose name will become the page title.
Use hyphens instead of spaces. Example:
```
publications/My-New-Paper-2025/
```

### Step 2 — Add your two files
```
publications/My-New-Paper-2025/
├── My-New-Paper-2025.pdf    ← the PDF (same name as folder)
└── cover.jpg                ← cover image (portrait, ~600×840 px recommended)
```

### Step 3 — Register the publication
Open `publications.json` at the root and add a new entry:
```json
{
  "folder": "My-New-Paper-2025",
  "date": "2025-01-15",
  "featured": false
}
```
Set `"featured": true` for the **first** entry only — it will appear as a large hero card.

### Step 4 — Push to GitHub
```bash
git add publications/ publications.json
git commit -m "Add My-New-Paper-2025"
git push
```
GitHub Pages will rebuild in ~30 seconds. Done!

---

## ✏️ Personalise the Site

### Update your personal info
Edit `contact.html` and replace:
- `Your Name` — your full name
- `Your Title · Your Institution` — job title and affiliation
- `your@email.com` — your email
- LinkedIn, GitHub URLs
- The biography text and research area tags
- Place a `images/avatar.jpg` for your profile photo

### Update the contact form
The form uses [Formspree](https://formspree.io) (free tier: 50 submissions/month, no backend).
1. Create a free account at formspree.io
2. Create a new form and copy your endpoint ID
3. In `contact.html`, replace `YOUR_FORMSPREE_ID` with your actual ID

### Update social links
In both `index.html` and `contact.html`, update the `href="#"` values in the nav and footer icons.

### Change site title / branding
- Edit the `<title>` tags in `index.html` and `contact.html`
- Change the `.logo` text in the `<header>` of each page
- Update the copyright line in `#copyright`

---

## 📁 File Structure
```
/
├── index.html              ← Publications grid page
├── contact.html            ← Personal contact page
├── publications.json       ← List of publications (edit to add new ones)
├── README.md               ← This file
├── assets/
│   ├── css/
│   │   ├── main.css        ← Massively base styles (don't edit)
│   │   └── custom.css      ← Your custom styles (safe to edit)
│   └── js/
│       ├── publications.js ← Auto-renders the grid from publications.json
│       └── main.js         ← Massively base JS (don't edit)
├── images/
│   ├── avatar.jpg          ← YOUR profile photo (replace this)
│   └── bg.jpg              ← Background image for the hero
└── publications/
    └── My-Paper-2024/
        ├── My-Paper-2024.pdf
        └── cover.jpg
```

---

## 🎨 Customising the Design

All design variables are in `assets/css/custom.css` at the top:
```css
:root {
  --accent:        #e8c97a;   /* gold accent colour */
  --surface-card:  #222222;   /* card background */
  --radius:        10px;      /* border radius */
  ...
}
```
Change `--accent` to any colour to instantly re-theme the site.

---

*Built on [Massively by HTML5 UP](https://html5up.net) · CCA 3.0 License*
