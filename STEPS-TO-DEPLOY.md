# Steps to Deploy to GodGPT-Marketing (Checklist)

Do these in order. You can tick them off as you go.

**Done for you:** Steps 1–5 (terminal in project, remote added, files staged, commit created).  
**You do:** Step 6 (push) — requires your GitHub login in Terminal.

---

## Step 1: Open Terminal

- Open Terminal (or the integrated terminal in Cursor).
- Go to your project folder:
  ```bash
  cd /Users/chronoai-dionne/Cursor/my-speckit-project
  ```

---

## Step 2: Add the GitHub Repo as “origin”

- Your repo: **https://github.com/lildeebs/GodGPT-Marketing**
- Run this **one** command (or skip if origin is already set):
  ```bash
  git remote add origin https://github.com/lildeebs/GodGPT-Marketing.git
  ```
- If you see “remote origin already exists”, you can skip this step or run:
  ```bash
  git remote set-url origin https://github.com/lildeebs/GodGPT-Marketing.git
  ```

---

## Step 3: (Optional) If GodGPT-Marketing Already Has Commits

- Check what’s on GitHub:
  ```bash
  git fetch origin
  ```
- See the default branch name (often `main` or `master`):
  ```bash
  git branch -r
  ```
- Merge that branch into your current branch (use the name you saw, e.g. `main`):
  ```bash
  git merge origin/main
  ```
- If there are conflicts, fix them, then:
  ```bash
  git add .
  git commit -m "Merge remote branch"
  ```
- If the repo is **empty** or you don’t care about existing history, you can skip this step.

---

## Step 4: Stage the Files You Want to Push

- Run:
  ```bash
  git add .gitignore index.html affiliate-landing-page/ "Affiliate Flow/" .cursor/ .specify/ .github/ DEPLOY-TO-GITHUB.md STEPS-TO-DEPLOY.md
  ```
- Check what will be committed:
  ```bash
  git status
  ```

---

## Step 5: Commit

- Run:
  ```bash
  git commit -m "Add affiliate landing page and deploy setup"
  ```
- If you get “nothing to commit”, your files are already committed; you can go to Step 6.

---

## Step 6: Push to GitHub

- Choose **one** of these, depending on which branch you want to use on GitHub:

  **Option A – Push your current branch (e.g. `001-landing-page-website`):**
  ```bash
  git push -u origin 001-landing-page-website
  ```

  **Option B – Push to `main`:**
  ```bash
  git checkout -b main
  git push -u origin main
  ```

- When prompted, sign in to GitHub if needed (browser or credentials).

---

## Step 7: (Optional) Turn On GitHub Pages So the Site Is Live

- In your browser, open: **https://github.com/lildeebs/GodGPT-Marketing**
- Go to **Settings** → **Pages** (left sidebar).
- Under **Build and deployment**, set **Source** to **GitHub Actions**.
- Save. After the next push (or the one you just did), the site will be at:
  **https://lildeebs.github.io/GodGPT-Marketing/**

---

## Quick Reference

| Step | What you do |
|------|----------------|
| 1 | Open terminal, `cd` to project folder |
| 2 | `git remote add origin https://github.com/lildeebs/GodGPT-Marketing.git` |
| 3 | (Optional) `git fetch origin` then `git merge origin/main` if repo has existing commits |
| 4 | `git add .gitignore index.html affiliate-landing-page/ "Affiliate Flow/" .cursor/ .specify/ .github/ DEPLOY-TO-GITHUB.md STEPS-TO-DEPLOY.md` |
| 5 | `git commit -m "Add affiliate landing page and deploy setup"` |
| 6 | `git push -u origin 001-landing-page-website` (or `main`) |
| 7 | (Optional) Repo **Settings** → **Pages** → Source: **GitHub Actions** |
