# Deploy PARAMPARA for SIH

The repository now contains a GitHub Pages workflow at `.github/workflows/deploy-parampara-pages.yml`. It publishes a lean proof site containing the selected jury film, research PDF, interactive dashboard, phone demo, 3D models and technical video.

## 1. Stage only the deployment files

Open PowerShell in the `winner` repository. Do **not** run `git add .`; the local project contains several ZIP packages larger than GitHub's normal 100 MiB file limit.

```powershell
git add .github/workflows/deploy-parampara-pages.yml
git add PARAMPARA/pages-index.html
git add PARAMPARA/showcase
git add PARAMPARA/submission/index.html
git add PARAMPARA/submission/simulation.js
git add PARAMPARA/submission/START_HERE.md
git add PARAMPARA/submission/docs
git add PARAMPARA/submission/video
git add PARAMPARA/submission/results/teaching-trace.json
git add PARAMPARA/submission/film-v3/PARAMPARA-4min-Jury-Film.mp4
git add PARAMPARA/submission/film-v3/PARAMPARA-Jury-Poster.jpg
git add PARAMPARA/submission/film-v3/PARAMPARA-Jury-English.srt
git add PARAMPARA/submission/film-v3/CREDITS.md
git add PARAMPARA/submission/film-v3/README.md
git add PARAMPARA/DEPLOY_SIH.md
```

Inspect exactly what will be committed:

```powershell
git status --short
git diff --cached --stat
```

The large root ZIP files and film build/assets folders must remain untracked.

## 2. Commit and push

```powershell
git commit -m "Deploy PARAMPARA SIH proof site"
git push -u origin main
```

If you cannot push to `HarshDubey23/winner`, fork the repository or create a new public repository you control, then push this branch there. GitHub Pages settings require repository administration access.

## 3. Enable GitHub Pages

1. Open the GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open the **Actions** tab.
5. Select **Deploy PARAMPARA proof site**.
6. If the push did not start it automatically, choose **Run workflow** and select branch `main`.
7. Wait for the deployment job to show a green check.

For the current repository, the expected project-site address is:

`https://harshdubey23.github.io/winner/`

The root redirects to the proof dashboard at:

`https://harshdubey23.github.io/winner/submission/`

## 4. Test before SIH submission

Open a private/incognito window and verify:

- The dashboard opens without signing in.
- The sleeve rotates and the teaching trace advances.
- **Explore all 3D models** opens and every model loads.
- **Try phone practice** opens on mobile.
- The final jury film streams with audio.
- The research PDF opens.
- The Wokwi link runs and displays serial output.

Test once on a phone using mobile data. A link that works only in your signed-in browser is not submission-ready.

## 5. Create backup viewer links

Upload these two files to one Google Drive folder:

- `submission/film-v3/PARAMPARA-4min-Jury-Film.mp4`
- `submission/docs/PARAMPARA-Research-Evidence.pdf`

Set each to **Anyone with the link → Viewer** and test both while signed out. Keep the GitHub Pages URL as the interactive proof; use Drive as the reliable film/PDF backup.

An unlisted YouTube upload is also suitable for the film. Copy the attribution section from `submission/film-v3/CREDITS.md` into the description.

## 6. Links to place in the SIH submission/PPT

Use short labels instead of raw file names:

1. **Interactive prototype and proof dashboard** — GitHub Pages URL
2. **Four-minute jury film** — Drive or unlisted YouTube URL
3. **Research evidence dossier** — Drive PDF URL
4. **Live ESP32 circuit simulation** — https://wokwi.com/projects/477036096886805505
5. **Source repository** — https://github.com/HarshDubey23/winner/tree/claude/gracious-albattani-baeanh/PARAMPARA

Keep the evidence ZIP as an optional technical download. Do not make a 100+ MB ZIP the first link a judge must open.
