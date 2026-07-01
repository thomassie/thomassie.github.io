#!/usr/bin/env python3
"""Turn a long-form article markdown file into a clean, speech-ready transcript
for ElevenLabs. Strips front matter, references, superscript footnotes, markdown
syntax and HTML, and applies a few speech-friendly substitutions."""
import re
import sys

src, out_path = sys.argv[1], sys.argv[2]
text = open(src, encoding="utf-8").read()

# 1. Pull the title out of the front matter, then drop the front matter.
title = None
fm = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
if fm:
    m = re.search(r'^title:\s*"?(.*?)"?\s*$', fm.group(1), re.MULTILINE)
    if m:
        title = m.group(1).strip().strip('"')
    text = text[fm.end():]

# 2. Drop the References section (and anything after it).
text = re.split(r"\n#{1,6}\s*References", text)[0]

# 3. Remove <br> tags and superscript footnote digits.
text = re.sub(r"<br\s*/?>", "", text, flags=re.IGNORECASE)
text = text.translate({ord(c): None for c in "⁰¹²³⁴⁵⁶⁷⁸⁹"})

# 4. Markdown links -> just the link text (with optional kramdown {:...} attrs).
text = re.sub(r"\[([^\]]+)\]\([^)]*\)(?:\{[^}]*\})?", r"\1", text)

# 5. Numeric ranges with an en dash read better as "X to Y".
text = re.sub(r"(\d)\s*–\s*(\d)", r"\1 to \2", text)

out = []
for raw in text.split("\n"):
    line = raw.strip()
    if re.fullmatch(r"-{3,}", line):           # horizontal rule
        continue
    is_heading = bool(re.match(r"^#{1,6}\s", line))
    line = re.sub(r"^#{1,6}\s*", "", line)      # heading hashes
    line = re.sub(r"^[-*+]\s+", "", line)       # bullet markers
    line = line.replace("**", "").replace("`", "")           # bold / inline code
    line = re.sub(r"(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"\1", line)  # italics
    line = line.replace("*", "")                # stray asterisks
    line = re.sub(r"TL;DR", "In brief:", line)
    line = re.sub(r"\bi\.e\.,?", "that is,", line)
    line = re.sub(r"\be\.g\.,?", "for example,", line)
    line = re.sub(r"\bvs\.?\b", "versus", line)
    if is_heading and line and line[-1] not in ".?!:…":
        line += "."
    out.append(line)

body = re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip()
closing = ("This is the end of the article. "
           "The full list of references is available on the web page.")
result = (f"{title}\n\n" if title else "") + body + "\n\n" + closing
open(out_path, "w", encoding="utf-8").write(result + "\n")
print(f"Wrote {out_path} ({len(result.split())} words)")
