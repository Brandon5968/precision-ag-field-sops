# CLAUDE.md — rules for editing this repo

This repo is the Precision Ag field SOP site (MkDocs Material, deployed on
Cloudflare Pages). Follow these rules exactly. They exist so edits are safe,
consistent, and never break the build.

## Golden rules
1. **Content only.** Edit Markdown under `docs/`. Do **not** touch `mkdocs.yml`
   theme/plugin settings, or `docs/stylesheets/`, unless the task explicitly says so.
2. **One chapter = one file.** Chapters live at `docs/<book>/NN-kebab-name.md`
   where `NN` is a two-digit order number (`00`, `01`, …).
3. **Adding a chapter** = two steps, both required:
   a. Create the file (copy `templates/chapter-template.md`).
   b. Add a line for it under the correct book in `mkdocs.yml` → `nav:`.
   A file not listed in `nav` is invisible and will trigger a build warning.
4. **Never edit dates by hand.** "Last updated" is generated automatically from
   the git commit history. Just commit your change; the date takes care of itself.
5. **Always validate before finishing.** Run `mkdocs build --strict`. It must pass
   with zero warnings. `--strict` turns broken links and orphan pages into errors —
   fix them, don't ignore them.

## Front matter (top of every chapter file)
```yaml
---
title: Equipment Needed     # shows in the browser tab and breadcrumbs
---
```
Keep it minimal. Do not add `date:` — it's automatic.

## Callout / SWMS conventions (use these exact forms)
```
!!! danger "SWMS"          ← safety / SWMS blocks (red)
!!! warning "WARNING"      ← things that can ruin data or break gear (amber)
!!! note "NOTE"            ← useful context (blue)
!!! tip "TIP"              ← field shortcuts (green)
!!! info "AT A GLANCE"     ← chapter summary box
```
Indent the body text **4 spaces** under the `!!!` line.

## Checklists and steps
- Checklist (tickable): `- [ ] item`
- Ordered steps: `1. step` (let Markdown auto-number; always start at 1.)
- Bullets: `- item`

## Images / screenshots
- Put image files in the **same book's** `img/` folder: `docs/<book>/img/`.
- Reference relatively: `![alt text](img/filename.png)`
- Name files descriptively: `polaris-mount-height.png`, not `IMG_4821.png`.
- Add a one-line italic caption under each image.

## Placeholders
- Unknown/unconfirmed steps must be written as `[CONFIRM: what's unknown]`.
- Never invent a field procedure. A blank `[CONFIRM]` is safer than a wrong step.

## Commit messages
`docs(surveying): add cable connection photos to Polaris setup`
Format: `docs(<book>): <what changed>`

## Local preview (optional)
`mkdocs serve` then open http://127.0.0.1:8000 — live-reloads as you edit.
