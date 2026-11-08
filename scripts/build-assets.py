#!/usr/bin/env python3
"""Bundle the portfolio styles and give each page content-versioned assets."""

import hashlib
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
styles = [ROOT / 'assets/css/main.css', ROOT / 'assets/css/portfolio.css']
bundle = '\n\n'.join(path.read_text() for path in styles)
css_version = hashlib.sha256(bundle.encode()).hexdigest()[:12]
js_version = hashlib.sha256((ROOT / 'assets/js/main.js').read_bytes()).hexdigest()[:12]
(ROOT / 'assets/css/site.css').write_text(bundle)

pages = [ROOT / 'index.html', *sorted((ROOT / 'work').glob('*.html'))]
for page in pages:
    prefix = '../' if page.parent.name == 'work' else ''
    content = page.read_text()
    content = re.sub(
        r'\s*<link\s+rel="stylesheet"\s+href="(?:\.\./)?assets/css/(?:main|portfolio|site)\.css(?:\?[^\"]*)?"\s*/?>',
        '',
        content,
    )
    stylesheet = f'<link rel="stylesheet" href="{prefix}assets/css/site.css?v={css_version}" />'
    content = content.replace('</head>', f'{stylesheet}\n</head>', 1)
    content = re.sub(
        r'(<script\s+src=")(?:\.\./)?assets/js/main\.js(?:\?[^\"]*)?("\s*></script>)',
        lambda match: match.group(1) + f'{prefix}assets/js/main.js?v={js_version}' + match.group(2),
        content,
    )
    page.write_text(content)

print(f'Updated {len(pages)} pages: CSS {css_version}, JavaScript {js_version}')
