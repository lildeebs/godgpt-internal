# GitHub Pages setup (godgpt-internal)

If **https://lildeebs.github.io/godgpt-internal/2025-wrapped/** shows "Content not found" or 404:

1. **Enable Pages from Actions**
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch")
   - Save

2. **Check the workflow run**
   - Repo → **Actions** → open the latest **Deploy to GitHub Pages** run
   - If it’s red (failed), open the job and read the error (e.g. "environment: github-pages" or permissions)
   - If it’s green, wait 1–2 minutes and try the URL again

3. **If another workflow deploys to Pages**
   - Only one deployment wins. If a different workflow also deploys to Pages, it may overwrite this one. Disable or remove the other workflow, or make this one run last.

4. **URLs after a successful deploy**
   - Root: https://lildeebs.github.io/godgpt-internal/
   - 2025 Wrapped: https://lildeebs.github.io/godgpt-internal/2025-wrapped/
