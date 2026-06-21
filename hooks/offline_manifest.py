"""MkDocs build hook: emit /offline-manifest.json listing every page, image and
asset in the built site. The header "Save offline" button fetches this so the
whole site (chapters AND their screenshots) is cached for offline field use.
Runs as part of `mkdocs build`, so it stays correct on every Cloudflare deploy."""

import os
import json

CACHE_EXTS = ('.html', '.png', '.jpg', '.jpeg', '.svg', '.css', '.js',
              '.woff2', '.woff', '.json')


def on_post_build(config, **kwargs):
    site_dir = config['site_dir']
    urls = set()
    for root, _dirs, files in os.walk(site_dir):
        for f in files:
            if not f.lower().endswith(CACHE_EXTS):
                continue
            rel = os.path.relpath(os.path.join(root, f), site_dir).replace('\\', '/')
            if rel == 'offline-manifest.json':
                continue
            if rel.endswith('index.html'):
                urls.add('/' + rel[:-len('index.html')])  # directory URL
            else:
                urls.add('/' + rel)
    out = os.path.join(site_dir, 'offline-manifest.json')
    with open(out, 'w', encoding='utf-8') as fh:
        json.dump(sorted(urls), fh)
