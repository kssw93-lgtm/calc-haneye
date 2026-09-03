"""Read official PDF, compare grid and text extraction, emit reviewed table JSON."""
import json
import re
import sys
import pdfplumber

rows = []
with pdfplumber.open(sys.argv[1]) as doc:
    for page in doc.pages[1:]:
        text_rows = []
        for line in page.extract_text().splitlines():
            cells = line.split()
            if len(cells) == 13 and all(re.fullmatch(r'[\d,]+|-', c) for c in cells):
                text_rows.append([0 if c == '-' else int(c.replace(',', '')) for c in cells])
        grid_rows = []
        for table in page.extract_tables():
            for cells in table:
                if len(cells) == 13 and all(c and re.fullmatch(r'[\d,]+|-', c) for c in cells):
                    grid_rows.append([0 if c == '-' else int(c.replace(',', '')) for c in cells])
        assert text_rows == grid_rows, f'Extraction disagreement page {page.page_number}'
        rows.extend(text_rows)
assert rows[0][0] == 770 and rows[-1][1] == 10000
assert all(a[1] == b[0] for a, b in zip(rows, rows[1:]))
assert all(len(r) == 13 and r[0] < r[1] for r in rows)
print(json.dumps(rows, separators=(',', ':')))
