# Fix: "Get Pages site failed" / deploy HttpError: Not Found

The workflow fails because **GitHub Pages is not enabled** or not set to use GitHub Actions. Do this **once** in the repo on GitHub:

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

## Step 3: Re-run the workflow

1. Go to **Actions** → open the failed run **"Deploy to GitHub Pages"**
2. Click **Re-run all jobs** (top right)
3. Wait for the run to turn green (~1–2 min)
4. Then open: **https://lildeebs.github.io/godgpt-internal/2025-wrapped/**

---

## If you don’t see "Pages" in Settings

- You must have **admin** (or write) access to the repo. If it’s an org repo, an admin may need to enable Pages for the repo or for the organization first.

## URLs after it works

- Root: https://lildeebs.github.io/godgpt-internal/
- 2025 Wrapped: https://lildeebs.github.io/godgpt-internal/2025-wrapped/
