# Deploy This Project to GitHub

Using your **existing repo**: **lildeebs/GodGPT-Marketing**  
https://github.com/lildeebs/GodGPT-Marketing

---

## 1. Connect this project to GodGPT-Marketing and push

In your project folder, run:

```bash
# Add your existing repo as the remote
git remote add origin https://github.com/lildeebs/GodGPT-Marketing.git

# Stage the files you want to deploy (landing page + assets)
git add .gitignore index.html "Affiliate Landing Page V1/" "Affiliate Flow/" .cursor/ .specify/ .github/ DEPLOY-TO-GITHUB.md
# Optional: add specs
# git add "Affiliate Landing Page V1/specs/"

# Commit
git commit -m "Add affiliate landing page and deploy setup"

# Push (use the branch your repo expects: main, or 001-landing-page-website)
git push -u origin 001-landing-page-website
```

To push to `main` instead:

```bash
git checkout -b main
git add .gitignore index.html "Affiliate Landing Page V1/" "Affiliate Flow/" .cursor/ .specify/ .github/ DEPLOY-TO-GITHUB.md
git commit -m "Add affiliate landing page and deploy setup"
git remote add origin https://github.com/lildeebs/GodGPT-Marketing.git
git push -u origin main
```

**If GodGPT-Marketing already has commits:** fetch and either merge or rebase before pushing, e.g.:

```bash
git fetch origin
git merge origin/main   # or origin/master, depending on default branch
# resolve any conflicts, then:
git push -u origin 001-landing-page-website
```

---

## 3. (Optional) Host the site with GitHub Pages

After the first push:

1. On GitHub: **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: "GitHub Actions" (if you use the workflow below)  
     **or** "Deploy from a branch"
   - If "Deploy from a branch": choose branch (e.g. `main` or `001-landing-page-website`) and folder **/ (root)**.
3. Save. The site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

---

## 4. What was created for you

- **`.github/workflows/deploy-pages.yml`**  
  If you use this workflow, every push to the branch you use for deployment will build and publish the site with GitHub Actions. No need to choose "Deploy from a branch" in Settings → Pages if you use this.

---

## Quick reference

| Step              | Action |
|-------------------|--------|
| Add remote        | `git remote add origin https://github.com/lildeebs/GodGPT-Marketing.git` |
| Commit & push     | `git add ...` → `git commit -m "..."` → `git push -u origin BRANCH` |
| Turn on Pages     | Repo **Settings** → **Pages** → Source: **GitHub Actions** |
| Live URL          | `https://lildeebs.github.io/GodGPT-Marketing/` |
