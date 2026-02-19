# Kyaw Lay Myint — Personal Portfolio

A modern, responsive personal portfolio website with a premium dark/light theme, scroll-driven animations, and a full-featured contact form.

## Features

- **Dark / Light Mode** — Toggle with one click; preference saved in localStorage and respects system settings
- **Responsive Design** — Optimized for desktop, tablet, and mobile with a slide-out hamburger menu
- **SEO Optimized** — Open Graph, Twitter Card, meta description, semantic HTML5
- **Accessibility** — Skip-to-content link, ARIA labels, keyboard navigation, `prefers-reduced-motion` support
- **Project Showcase** — 8 project cards with gradient thumbnails, technology badges, and completion dates
- **Skills Section** — Animated progress bars that fill on scroll, organized by Frontend / Backend / Tools
- **About Section** — Profile image with animated stat counters (projects, skills, experience)
- **Testimonials** — 3 testimonial cards with star ratings
- **Blog Section** — 3 article preview cards
- **Contact Form** — Client-side validation with animated submit states (loading → success)
- **Contact Links** — Email, GitHub, Facebook, Twitter, Telegram
- **Scroll Progress Bar** — Thin gradient bar at the top of the viewport
- **Back to Top Button** — Appears after scrolling 300px
- **Smooth Scroll** — Anchor links scroll smoothly with offset for the fixed navbar
- **Parallax Hero** — Subtle parallax effect on the hero section
- **Staggered Animations** — Cards and sections fade in with staggered delays via Intersection Observer

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox, `clamp()`, glassmorphism, media queries)
- Vanilla JavaScript (ES6+, Intersection Observer, localStorage)
- Google Fonts (Poppins + Space Mono)
- Font Awesome 6

## Project Structure

```
Portfolio/
├── index.html          Main HTML
├── styles.css          All styles + dark/light themes + responsive
├── animations.css      Keyframes + scroll-reveal system
├── script.js           Theme toggle, form validation, animations, menu
├── KyawLayMyintID.png  Profile image
├── favicon.svg         SVG favicon
├── email.svg           Email icon asset
└── README.md           This file
```

## Sections

1. **Navbar** — Fixed glassmorphism header with gradient logo, navigation links, theme toggle, and hamburger menu
2. **Hero** — Greeting, gradient name, subtitle, two CTA buttons, floating accent circles
3. **About** — Profile image, bio paragraphs, animated stat counters
4. **Skills** — 3 categories with animated progress bars
5. **Projects** — 8 cards with gradient icon thumbnails, dates, descriptions, GitHub links
6. **Testimonials** — 3 quote cards with star ratings and author info
7. **Blog** — 3 article preview cards with tags and dates
8. **Contact** — Form (name, email, subject, message) + social/contact links
9. **Footer** — 3-column layout (about, quick links, social icons) + copyright

## Quick Start

Open `index.html` in any modern browser.

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| 1024px+ | Full 3-column grids, side-by-side contact |
| 768–1024px | 2-column grids, stacked contact |
| < 768px | Single column, slide-out mobile menu |
| < 480px | Compact spacing, full-width buttons |

## Color Themes

### Dark (default)
| Token | Value |
|---|---|
| Background | `#0a0e27` |
| Card | `#1a1f2e` |
| Accent | `#00d9ff` |
| Gold | `#ffd700` |
| Text | `#ffffff` / `#b8c5d6` |

### Light
| Token | Value |
|---|---|
| Background | `#f5f7fb` |
| Card | `#ffffff` |
| Accent | `#0088bb` |
| Gold | `#c49400` |
| Text | `#1a1f2e` / `#5a6577` |

## Links

- **GitHub**: [John-myint](https://github.com/John-myint)
- **Email**: kyawlaymyint@icloud.com
- **Facebook**: [kyawlay.myint.12](https://www.facebook.com/kyawlay.myint.12)
- **Twitter**: [@KyawLayMyint1](https://x.com/KyawLayMyint1)
- **Telegram**: [@king_alexander94](https://t.me/king_alexander94)

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari, Chrome Mobile

---

**Created**: January 2026
**Last Updated**: February 2026
