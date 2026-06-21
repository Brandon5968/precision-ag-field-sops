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
