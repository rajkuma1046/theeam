# SSCExamPrep — Site Strategy & Operating Manual

**Domain:** sscexamprep.online  
**Stack:** Pure HTML/CSS/JS → GitHub Pages  
**Goal:** Long-term growing SSC exam resource and live updates hub

---

## 📁 File Structure

```
sscexamprep.online/
│
├── index.html                ← Homepage (main landing page)
├── CNAME                     ← GitHub Pages custom domain config
├── .nojekyll                 ← Disables Jekyll, serves raw HTML
├── robots.txt                ← SEO: search engine instructions
├── sitemap.xml               ← SEO: all URLs for Google to crawl
│
├── css/
│   └── main.css              ← All shared styles (mobile-first)
│
├── js/
│   └── main.js               ← Shared JS (menu, updates renderer)
│
├── data/
│   └── updates.json          ← ★ EDIT THIS to add new updates daily
│
├── latest-updates/
│   └── index.html            ← Live updates page (like sarkariresult)
│
├── ssc-cgl/
│   └── index.html            ← SSC CGL full hub (duplicate for others)
│
├── ssc-chsl/index.html       ← (duplicate ssc-cgl/index.html, edit)
├── ssc-gd/index.html
├── ssc-mts/index.html
├── ssc-cpo/index.html
├── ssc-je/index.html
│
├── syllabus/index.html       ← Syllabus hub (all exams)
├── previous-papers/index.html
├── mock-tests/index.html
├── current-affairs/index.html
├── study-notes/index.html
├── results/index.html        ← Results quick-access page
├── admit-cards/index.html
├── answer-keys/index.html
├── notifications/index.html
└── cut-off/index.html
```

---

## ✏️ HOW TO ADD A NEW UPDATE (Daily Task — 5 minutes)

Open `/data/updates.json`. **Add a new item at the very top of the `items` array:**

```json
{
  "id": 13,
  "title": "SSC CGL 2025 Notification Released — Apply Before August 10",
  "type": "notif",
  "exam": "SSC CGL",
  "date": "11 Jun 2025",
  "isNew": true,
  "link": "/ssc-cgl/",
  "officialLink": "https://ssc.gov.in"
},
```

**Types:** `result` | `admit` | `answer` | `notif` | `job`

Set `"isNew": true` for the first 2–3 days, then change to `false`.

**After editing**, commit and push to GitHub. The site updates in ~1 minute.

---

## 🔴 DAILY WORKFLOW (5–10 mins)

1. **Check ssc.gov.in** for new notices
2. **Check SSC regional sites** (NRCGL, MRPQ, NWRCGL, etc.)
3. If there's an update → add to `data/updates.json`
4. Also update the relevant exam page status badge if needed
5. Commit and push

**Reliable SSC sources to monitor:**
- https://ssc.gov.in (official)
- https://ssc.nic.in (backup)
- SSC regional portals: NRCGL, MRPQ, NWRCGL, SSCNER, SSCNR

---

## 📈 SEO STRATEGY (Month-by-Month)

### Month 1–2: Foundation
- [x] Mobile-first, fast-loading HTML
- [x] Schema.org structured data on all pages
- [x] sitemap.xml submitted to Google Search Console
- [x] robots.txt configured
- [ ] Submit sitemap: https://search.google.com/search-console
- [ ] Set up Google Analytics (add GA4 tag to all pages)
- [ ] Verify domain in Google Search Console
- [ ] Create favicon.ico and apple-touch-icon.png

### Month 3–4: Content Build-Up
Target these high-volume, low-competition keywords first:
- "SSC GD 2025 notification" (high volume, new exam cycle)
- "SSC MTS 2025 apply online" 
- "SSC CHSL syllabus in Hindi"
- "SSC CGL previous year paper PDF"
- "SSC cut off 2024 category wise"

**Content to add:**
- Detailed syllabus pages for each exam (already templated)
- Cut-off marks tables (year-wise, category-wise) — these rank very well
- Previous year paper pages with embedded Google Drive PDFs
- "How to apply for SSC CGL" step-by-step guide

### Month 5–6: Authority Building
- Write 2–3 long-form guides per month:
  - "SSC CGL vs SSC CHSL: Which Is Better?"
  - "Complete SSC Exam Calendar 2025–26"
  - "SSC CGL Salary After 7th Pay Commission"
- Create a Current Affairs page with monthly PDFs
- Add an FAQ section to each exam page (rich results in Google)

### Ongoing: Link-Earning
- Share updates on Telegram channels (Govt Job groups)
- Share on Reddit r/UPSC, r/IndianStudents
- Get listed on JOSAA, Coaching aggregators
- Post on Quora for SSC-related questions

---

## 📱 PERFORMANCE CHECKLIST

Before each major push:
- [ ] Run Google PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Target: Mobile score ≥ 90, Desktop ≥ 95
- [ ] Images: Use WebP format, add alt text
- [ ] Fonts: Already preconnected to Google Fonts
- [ ] CSS/JS: Already minimal, no jQuery needed

---

## 🏗️ ADDING NEW EXAM PAGES

To add SSC CHSL page (example):
1. Copy `ssc-cgl/index.html` → paste into `ssc-chsl/index.html`
2. Find & replace "CGL" → "CHSL" throughout
3. Update `<title>`, `<meta name="description">`, and `<link rel="canonical">`
4. Update the Schema.org JSON-LD block
5. Update exam-specific details: eligibility, syllabus, posts, pay scale
6. Update the breadcrumb and active nav link
7. Add the new URL to `sitemap.xml`

---

## 🗺️ SITE ARCHITECTURE (URL Plan)

```
sscexamprep.online/
│
├── /latest-updates/          ← HIGH PRIORITY: Updates daily, ranks for news
├── /ssc-cgl/                 ← PRIMARY EXAM HUB
│   ├── /ssc-cgl/result/      ← Result-specific page
│   ├── /ssc-cgl/admit-card/  ← Admit card page
│   ├── /ssc-cgl/syllabus/    ← Syllabus page
│   └── /ssc-cgl/apply/       ← How to apply guide
│
├── /ssc-chsl/                ← Same structure as CGL
├── /ssc-gd/
├── /ssc-mts/
├── /ssc-cpo/
└── /ssc-je/
```

Build these in order of search demand. SSC CGL and SSC GD have the most searches.

---

## 🔧 GITHUB PAGES — TECHNICAL NOTES

**Custom domain setup (sscexamprep.online):**
1. GitHub repo → Settings → Pages → Custom domain: `sscexamprep.online`
2. At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   ```
   Type: A    Name: @    Value: 185.199.108.153
   Type: A    Name: @    Value: 185.199.109.153
   Type: A    Name: @    Value: 185.199.110.153
   Type: A    Name: @    Value: 185.199.111.153
   Type: CNAME Name: www  Value: yourusername.github.io
   ```
3. Enable "Enforce HTTPS" in GitHub Pages settings
4. DNS propagation takes up to 48 hours

**For the `/data/updates.json` fetch to work:**
- The site must be served from HTTPS (GitHub Pages does this automatically)
- JSON must be in the root of your repo (not a subfolder)
- No CORS issues since everything is same-domain

---

## 📊 WHAT SARKARIRESULT.COM DOES WELL (Learn From)

| Feature | Their Approach | Your Approach |
|---------|----------------|---------------|
| Updates frequency | Multiple times daily | Target: 1–3 per day |
| Mobile layout | Basic table layout | Better: Card-based, readable |
| Page speed | Slow (ads bloat) | Fast: No ads initially |
| SEO | Strong domain authority | Build with content & links |
| Trust signals | Established (2012) | Show official source badges |

**Your advantage:** Mobile-first design, faster load, cleaner UX, official source transparency.

---

## 📣 TRAFFIC GROWTH CHANNELS

1. **Telegram** — Create a channel "SSC Exam Prep Updates" — share every update with a link back to site. Telegram is #1 channel for SSC aspirants.

2. **WhatsApp** — Set up broadcast list for coaching students

3. **Google Search** — Long-form content + daily updates = organic traffic

4. **YouTube SEO** — Create simple "SSC CGL Result 2025 — How to Check" videos with link in description

5. **Quora** — Answer SSC questions, link to your guides (not spammy — genuinely helpful)

---

## 💰 MONETISATION ROADMAP (Long-term)

Once you reach 10,000+ monthly visitors:
1. **Google AdSense** — Display ads (non-intrusive placement)
2. **Affiliate links** — SSC coaching courses (Unacademy, Adda247 affiliate program)
3. **Premium PDF packs** — Curated study notes PDFs (Gumroad/Razorpay)
4. **Email newsletter** — Daily SSC digest with sponsorship

**Do NOT monetise early** — it hurts SEO and user trust. Build content and audience first.

---

*Last updated: June 2025*
