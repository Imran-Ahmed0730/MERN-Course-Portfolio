# Personal Portfolio Website

A fully responsive, single-page personal portfolio built with **HTML**, **CSS**, **Tailwind CSS**, and vanilla **JavaScript**. It was created for the Personal Portfolio Website assignment and includes every required section: navbar, hero, about, skills, projects, education, contact, and footer.

The site uses a sample persona — **Arif Hossain**, a front-end developer and MERN stack learner from Dhaka — so you can see a complete, realistic design. All personal content is easy to replace.

---

## Preview

Open `index.html` in any modern browser. The page includes:

- Sticky glass navigation bar with a working mobile menu
- Animated hero section with portrait, status badges, and CTAs
- About section with a quick-facts card and career goals
- Skills grid with animated proficiency bars and extra badges
- Three project cards with local SVG previews, live-demo and source buttons
- Education timeline
- Contact details, social links, and a validated contact form (front-end demo)
- Footer with navigation, socials, and an auto-updating copyright year
- Back-to-top button and scroll-reveal animations

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic structure and accessibility |
| Tailwind CSS (CDN) | Layout, spacing, typography, and responsive utilities |
| Custom CSS (`assets/css/style.css`) | Gradients, glass effects, animations, and component polish |
| Vanilla JavaScript (`assets/js/main.js`) | Mobile menu, active nav, scroll reveal, form validation |
| Google Fonts | Outfit (display) and Inter (body) |

No build step or package installation is required.

---

## Project Structure

```
Assignment 4/
├── index.html                  # The complete one-page portfolio
├── requirement.md              # Original assignment brief
├── README.md                   # This file
└── assets/
    ├── css/
    │   └── style.css           # Custom styles and animations
    ├── js/
    │   └── main.js             # Navigation, scroll effects, form demo
    └── img/
        ├── avatar.svg          # Hero / profile illustration
        ├── project-devfolio.svg
        ├── project-taskflow.svg
        └── project-shoplane.svg
```

All images are local SVGs, so they stay sharp on every screen and load without an image host.

> **Note:** Tailwind CSS is loaded from the official CDN and Google Fonts are loaded from Google. An internet connection is needed for the full visual styling. To use the site completely offline, see [Using a compiled Tailwind build](#using-a-compiled-tailwind-build).

---

## Running the Project

### Option 1 — Open directly

Double-click `index.html`, or drag it into a browser. Everything works from the file system.

### Option 2 — Local development server (recommended)

From the project folder:

```bash
# Python
python -m http.server 5500

# or Node.js
npx serve .
```

Then visit <http://localhost:5500>.

---

## Customizing the Portfolio

1. **Name and brand** — search `index.html` for `Arif Hossain` and `Arif.` (navbar and footer logo).
2. **Hero copy** — update the title, introduction, availability badge, and statistics in the `#home` section.
3. **Portrait** — replace `assets/img/avatar.svg` with your own photo (keep the same filename, or update the `src`). A square image (600×600 or larger) works best.
4. **About and education** — edit the text, quick-facts list, goals, and timeline entries.
5. **Skills** — update the skill cards. Each bar uses `data-level="95"` and an `aria-valuenow="95"`; keep them in sync so the animation and accessible value match.
6. **Projects** — replace the three `<article class="project-card">` blocks. Swap the preview image, tags, title, description, and the `href` values. Update the alt text to describe the new screenshot.
7. **Contact** — replace the email, phone, location, and GitHub/LinkedIn URLs. These appear in the hero, contact section, and footer.
8. **Colors and fonts** — tweak the `tailwind.config` colors in `index.html`, or the CSS variables and gradients at the top of `assets/css/style.css`.

### Connecting the contact form

The form is intentionally a front-end demo. On submit, `main.js` validates the fields and shows a success message without sending anything. To receive messages, either:

- Point the form at a service such as [Formspree](https://formspree.io/) (set `action` and `method="post"`), or
- Send a `fetch()` request to a small Express endpoint in `main.js`.

If you connect a backend, remove `event.preventDefault()` or replace it with your request logic.

### Using a compiled Tailwind build

For an offline or production build:

```bash
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

Add the project files to `content`, create an input CSS file with `@tailwind base; @tailwind components; @tailwind utilities;`, then compile:

```bash
npx tailwindcss -i ./src/input.css -o ./assets/css/tailwind.css --minify
```

Finally, replace the CDN `<script>` in `index.html` with a link to the compiled stylesheet, before `style.css`.

---

## Responsive Design Checklist

- [x] Mobile-friendly navigation with an animated menu and `aria-expanded` state
- [x] All images responsive, with `width`/`height` attributes to prevent layout shift
- [x] Fluid type scale and layouts that adapt at `sm`, `md`, and `lg` breakpoints
- [x] No horizontal scrolling — decorative elements are contained, and `body` hides overflow
- [x] Project cards stack on mobile, two per row on tablets, three on desktop
- [x] Skills grid adapts from 1 to 2 to 4 columns
- [x] Comfortable spacing and readable line lengths on every screen
- [x] Large tap targets (buttons, links, and form fields)
- [x] Tested at 320 px, 390 px, 768 px, 1024 px, 1280 px, and 1440 px widths

---

## Accessibility Notes

- Skip-to-content link and semantic landmark elements (`header`, `nav`, `main`, `section`, `footer`)
- `aria-label` on icon-only links and the menu button
- Visible focus rings and keyboard-operable navigation; the mobile menu closes with `Escape`
- Form labels, inline error messages, `aria-invalid`, and a live status region
- Decorative SVGs marked `aria-hidden`; meaningful images have descriptive alt text
- Respects `prefers-reduced-motion` by disabling animations and smooth scrolling

---

## Assignment Requirement Coverage

| Requirement | Where |
| --- | --- |
| Navbar with logo, links, mobile menu | `header#site-header` |
| Hero with name, title, intro, image, CTA | `section#home` |
| About with background, goals, interests | `section#about` |
| Skills (cards + progress bars) | `section#skills` |
| 3 projects with image, description, demo/source buttons | `section#projects` |
| Education with institution and qualification | `section#education` |
| Contact details, social links, 3-field form | `section#contact` |
| Footer with name, links, socials, copyright | `footer` |
| Fully responsive layout | Tailwind breakpoints + custom media queries |

---

## Credits

Designed and coded as a personal assignment project. Icons are inline SVG, illustrations and project previews are original SVG artwork, and fonts are provided by Google Fonts.
