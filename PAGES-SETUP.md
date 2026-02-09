# Fix: "There isn't a GitHub Pages site here" / 404

GitHub Pages must be **enabled** and set to **GitHub Actions**. Do this **once** in the repo on GitHub:

---

## Step 1: Open Pages settings

1. Go to **https://github.com/lildeebs/godgpt-internal**
2. Click **Settings** (repo tabs: Code, Issues, … **Settings**)
3. In the left sidebar, under **Code and automation**, click **Pages**

---

## Step 2: Set source to GitHub Actions

1. Under **Build and deployment**
2. Find **Source** (dropdown or radio)
3. Select **GitHub Actions** (not "Deploy from a branch")
4. Do **not** pick a branch or folder — leave that for "Deploy from a branch"
5. Save if there’s a button

---

## Step 3: Trigger deployment

- Push a commit to `main`, or go to **Actions** → **Deploy to GitHub Pages** → **Re-run all jobs**.
- Wait for the run to finish (~1–2 min).

---

## If you don’t see "Pages" in Settings

- You must have **admin** (or write) access to the repo. If it’s an org repo, an admin may need to enable Pages for the repo or for the organization first.

## URLs after it works

- **Root:** https://lildeebs.github.io/godgpt-internal/
- **Affiliate landing page:** https://lildeebs.github.io/godgpt-internal/affiliate-landing-page/
- **2025 Wrapped:** https://lildeebs.github.io/godgpt-internal/2025-wrapped/
