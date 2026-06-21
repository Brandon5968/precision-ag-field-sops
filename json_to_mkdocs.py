#!/usr/bin/env python3
"""Convert a manual JSON content file into MkDocs markdown chapter files.
Same source that feeds the PDF engine -> the website. Single source, two outputs.
Usage: python3 json_to_mkdocs.py content_em38.json docs/surveying
"""
import json, sys, os

FILEMAP = {
    "ch_intro":   "00-introduction.md",
    "ch_equip":   "01-equipment-needed.md",
    "ch_polaris": "02-setup-polaris.md",
    "ch_ute":     "03-setup-ute.md",
    "ch_survey":  "04-survey-setup.md",
    "ch_export":  "05-exporting.md",
    "ch_trouble": "06-troubleshooting.md",
    "ch_support": "07-support.md",
}
CALLOUT = {"note": "note", "warning": "warning", "safety": "danger",
           "tip": "tip", "info": "info"}


def block_md(b):
    t = b["type"]
    if t == "heading":
        return f"## {b['text']}\n"
    if t == "para":
        return f"{b['text']}\n"
    if t == "bullets":
        return "\n".join(f"- {i}" for i in b["items"]) + "\n"
    if t == "steps":
        return "\n".join(f"{n}. {i}" for n, i in enumerate(b["items"], 1)) + "\n"
    if t == "checklist":
        return "\n".join(f"- [ ] {i}" for i in b["items"]) + "\n"
    if t == "callout":
        kind = CALLOUT.get(b.get("kind", "note"), "note")
        title = b.get("title") or kind.upper()
        body = "\n".join("    " + ln for ln in b["text"].split("\n"))
        return f'!!! {kind} "{title}"\n{body}\n'
    if t == "table":
        h = "| " + " | ".join(b["header"]) + " |"
        sep = "| " + " | ".join("---" for _ in b["header"]) + " |"
        rows = ["| " + " | ".join(str(c) for c in r) + " |" for r in b["rows"]]
        return "\n".join([h, sep, *rows]) + "\n"
    if t == "image":
        cap = b.get("caption", "")
        # screenshots go in img/ next to the chapter; replace the filename below
        return (f"![{cap}](img/REPLACE-ME.png)\n"
                f"*{cap}*\n\n"
                f"<!-- TODO: drop the screenshot in img/ and update the filename above -->\n")
    return ""


def chapter_md(ch):
    out = [f"---\ntitle: {ch['label']}\n---\n",
           f"# {ch['label']}\n"]
    if ch.get("overview"):
        out.append(ch["overview"] + "\n")
    if ch.get("at_a_glance"):
        out.append(f'!!! note "At a glance"\n    {ch["at_a_glance"]}\n')
    for b in ch.get("blocks", []):
        out.append(block_md(b))
    return "\n".join(out)


def index_md(cfg):
    out = [f"---\ntitle: {cfg['title']}\n---\n",
           f"# {cfg['title']}\n",
           f"*{cfg.get('subtitle','')}*\n",
           cfg["chapters"][0].get("overview", "") + "\n",
           "## Chapters\n"]
    for i, ch in enumerate(cfg["chapters"]):
        fn = FILEMAP.get(ch["key"], ch["key"] + ".md")
        out.append(f"{i}. [{ch['label']}]({fn}) — {ch.get('tag','')}")
    return "\n".join(out)


if __name__ == "__main__":
    src, outdir = sys.argv[1], sys.argv[2]
    cfg = json.load(open(src))
    os.makedirs(os.path.join(outdir, "img"), exist_ok=True)
    open(os.path.join(outdir, "index.md"), "w").write(index_md(cfg))
    for ch in cfg["chapters"]:
        fn = FILEMAP.get(ch["key"], ch["key"] + ".md")
        open(os.path.join(outdir, fn), "w").write(chapter_md(ch))
    print("wrote", len(cfg["chapters"]) + 1, "files to", outdir)
