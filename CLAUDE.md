# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site for **DELRIUM** — a Visual Rock / Metalcore band based in Seoul, Korea.

- **Repo**: https://github.com/cokez3r0/delrium
- **Live**: https://delrium.com (CNAME → GitHub Pages)
- **Stack**: Jekyll 4.3 + GitHub Pages, Ruby 3.1
- **Primary language for content/commits**: Korean

## Commit messages

The repo is **public**. Write commit messages in English using short conventional-commit prefixes (`feat:`, `fix:`, `docs:`, `style:`, etc.) and keep them understated — describe the shape of the change, not unannounced lineup, guest bands, or popup content the band hasn't publicly revealed.

## Commands

```bash
bundle install                  # install gems (first time / after Gemfile change)
bundle exec jekyll serve        # local dev server, http://localhost:4000, with live reload
bundle exec jekyll build        # one-shot build → ./_site
```

There is no test suite, linter, or JS toolchain. Deployment is automatic via `.github/workflows/jekyll.yml` on push to `main`.

## Architecture

This is a **single-page Jekyll site**. Almost everything renders from one template + a couple of YAML data files; there is no SPA framework, no build step beyond Jekyll.

### Page composition

- `index.md` — the only page. Each `<section>` (Hero, About, Members, Schedule, Video, Streaming, Guestbook, Contact) is hand-written HTML inside the markdown, iterating over `site.data.*` for repeated content.
- `_layouts/default.html` — the only layout. Wraps `index.md` with nav/footer and contains **all client-side JavaScript inline** (hamburger, fade-in observer, schedule popups, poster modal, calendar render, past-show pruning). When adding interactive behavior, this is where it goes — there is no separate JS bundle.
- `assets/css/main.css` — the only stylesheet.
- `assets/js/guestbook.js` — the only external JS file (Supabase client).

### Data-driven content

- `_data/schedule.yml` — live shows, grouped by month. Each show may declare:
  - `ticket: <url>` → clicking the row opens the ticket URL.
  - `popup: { title, info }` → clicking opens an inline modal instead (`info` supports multi-line text and bare URLs that get auto-linkified). `popup` takes precedence over `ticket`.
  - `poster: <filename in assets/images/>` → renders a thumbnail; clicking opens a full-size poster modal.
- `_data/videos.yml` — YouTube embeds (`id`, `title`, `channel`).

### Schedule behavior (subtle, easy to miss)

The schedule is rendered three ways from the same `_data/schedule.yml`:

1. **Calendar grid** (in `_layouts/default.html`, IIFE near the bottom): marks show dates; for **past** dates with a poster, clicking the day opens the poster modal.
2. **Month list** below the calendar: each `.show-row` carries `data-show-year` / `data-show-md`. A small script at the end of `_layouts/default.html` **removes past show rows on page load** and removes month blocks that end up empty. This is intentional — don't try to "fix" missing past shows by re-adding them; if you need to display history, design a separate section.
3. The `popup` vs `ticket` vs nothing decision is made in `index.md`'s Liquid (`{% if show.popup %}` … `{% elsif show.ticket %}`).

### Guestbook (Supabase)

- `_config.yml` exposes `supabase_url` and `supabase_anon_key`; `_layouts/default.html` injects them to `window.SUPABASE_URL` / `window.SUPABASE_ANON_KEY` via Liquid.
- `assets/js/guestbook.js` reads from / inserts into the `guestbook` table. New entries are **not shown immediately** — moderation is enforced server-side (RLS); the client just shows a "확인 후 게시됩니다" notice.
- The anon key in `_config.yml` is intentionally public (Supabase anon keys are designed to be client-side); RLS on the `guestbook` table is what actually protects writes/visibility. Don't move it to a secret.

### Deployment

`.github/workflows/jekyll.yml` builds with `JEKYLL_ENV=production` and deploys to GitHub Pages on every push to `main`. The `CNAME` file pins the custom domain. There is no staging environment — `main` is production.
