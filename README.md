# thomassie.me

Personal website of Thomas M. Massie — data analysis, visualisation, and writing.

Built with [Jekyll](https://jekyllrb.com/) and served by GitHub Pages from the `main`
branch at [thomassie.me](https://thomassie.me).

## Structure

| Path | Contents |
|---|---|
| `_posts/` | Blog posts, rendered by `_layouts/post.html` |
| `articles/` | Long-form pieces, rendered by `_layouts/page.html` |
| `audio/` | Narration MP3s, transcripts, and `make_transcript.py` |
| `_layouts/`, `_includes/` | Templates |
| `css/`, `js/`, `img/` | Assets |
| `_config.yml` | Site settings and the navigation bar |

Project and CV pages live as Markdown files in the repository root and are wired
into the navigation via `navbar-links` in `_config.yml`.

## Local build

```
bundle install
bundle exec jekyll serve
```

The site is then at <http://localhost:4000>.

## Credits

Based on [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) by
Dean Attali, MIT licensed — see `LICENSE`. The theme has been substantially
modified since the fork.
