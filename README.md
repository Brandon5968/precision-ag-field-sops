# Precision Ag — Field SOPs

MkDocs Material site of field standard operating procedures, deployed on
Cloudflare Pages. Each "book" (Surveying, Grid, Carbon, Gamma) is a folder under
`docs/`.

## Editing
Read **CLAUDE.md** first — it's the rulebook. In short: edit Markdown under
`docs/`, copy `templates/chapter-template.md` for new chapters, add them to
`nav:` in `mkdocs.yml`, then run `mkdocs build --strict`.

## Run locally
```
pip install -r requirements.txt
mkdocs serve      # live preview at http://127.0.0.1:8000
mkdocs build --strict   # production build into ./site
```

## Deploy (Cloudflare Pages)
Connect this repo in the Cloudflare dashboard. Build settings:
- Build command:  `pip install -r requirements.txt && mkdocs build`
- Output directory: `site`
Every push to the main branch redeploys automatically, and the whole fleet sees
the update on next connection. Cloudflare keeps every deploy, so you can roll back.

## Replicating this repo for another process (GIS, NA Pro uploads, …)
This repo is the template for capturing any single-person process so others can learn it.
To stand up a new SOP repo (or a new book here):

1. **Copy a book folder** under `docs/` (e.g. copy `surveying/` or `equipment/`). Keep the
   shape: `index.md` overview + numbered `NN-kebab.md` chapters.
2. **Wire the nav + a home card together** — add the pages to `nav:` in `mkdocs.yml` and a
   `grid cards` entry in `docs/index.md` (see CLAUDE.md, "Adding a book").
3. **Keep the safety/draft defaults** — every unverified step stays `[CONFIRM]`; mechanical
   or risky procedures carry a `!!! danger "SWMS"` block; pages open with a
   `!!! warning "DRAFT — pending sign-off"` banner until reviewed.
4. **Use role-based contacts**, never a personal mobile (this site is publicly reachable).
5. **Validate**: `mkdocs build --strict` must pass with zero warnings before committing.

Each book goes through a review meeting with the people who do the work, and final sign-off,
before it's passed out for field use.
