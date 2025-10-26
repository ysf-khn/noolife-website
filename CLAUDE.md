# CLAUDE.md

Whenever you present a plan or solution, sacrifice grammar for the sake of concision to make sure you're always to the point and concise and efficient

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NooLife marketing website built with Astro 5.15.1. This is the landing page for the NooLife habit-tracking mobile app, designed around the "Winter Arc" 66-day transformation concept.

## Development Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview production build locally
npm run astro ...  # Run Astro CLI commands (add, check, etc.)
```

## Project Architecture

### Core Structure

- **Pages**: File-based routing in `src/pages/` (currently just `index.astro`)
- **Components**: Reusable Astro components in `src/components/`
- **Layouts**: Page templates in `src/layouts/` (base Layout.astro provides HTML shell)
- **Assets**: Static images/SVGs in `src/assets/` (processed by Astro)
- **Public**: Unprocessed static files in `public/` (served as-is)

### Astro-Specific Patterns

- Components use `.astro` format with frontmatter (---) for logic, followed by HTML template
- Styles are component-scoped by default when using `<style>` tags
- Images imported from `src/assets/` get optimization (use `.src` property in templates)
- TypeScript is configured with `astro/tsconfigs/strict`

## Design System

Defined in [docs/landing-page.md](docs/landing-page.md) - reference this for all UI work.

### Color Palette

- **Rich Earth** (#1C1B1A): Primary background
- **Stone Grey** (#2E2C2B): Cards/surfaces
- **Alabaster** (#F1EDE9): Primary text
- **Faded Khaki** (#918B85): Secondary text
- **Jade Green** (#00D09C): Primary accent/CTAs
- **Mint** (#6BFFD8): Highlights
- **Deep Forest** (#005C42): Shadows

### Visual Philosophy

- GTA-inspired aspirational imagery
- "Frame and Painting" - clean UI showcasing compelling content
- Neo-brutalism on CTAs (Jade fills, Mint outlines, Deep Forest shadows)
- Mobile-first responsive design

## Content Blueprint

The complete landing page structure is documented in [docs/landing-page.md](docs/landing-page.md). This includes:

- 10 major sections (Hero, Problem Agitation, How It Works, Features Grid, etc.)
- Copy tone: Confrontational challenge → Competitive separation → Accountability-driven urgency
- 3 CTA placements with different messaging strategies
- Science-backed credibility section (66-day research, identity-based habits, habit stacking)

When building sections, follow the exact copy and structure in this document.

## Policy Documents

Pre-written policy pages exist in [docs/policies-docs/](docs/policies-docs/):

- `privacy.md` / `privacy.html` - Privacy Policy
- `tnc.md` / `tnc.html` - Terms & Conditions

These need to be integrated as Astro pages when building the footer/legal section.

## Build Approach

### Recommended Component Breakdown

1. `Hero.astro` - Main hero with 5 iPhone mockups
2. `ProblemAgitation.astro` - Two-column "Stop Lying" section
3. `WinterArcHook.astro` - 66-day timeline
4. `HowItWorks.astro` - 3-step process
5. `FeaturesGrid.astro` - 8 feature cards
6. `ScienceBacked.astro` - Research credibility blocks
7. `VisualComparison.astro` - Before/After split screen
8. `FAQ.astro` - Collapsible accordion
9. `FinalCTA.astro` - Bottom conversion section
10. `Footer.astro` - Links, social, policies

### Technical Enhancements (from docs)

- Sticky header with CTA appearing on scroll
- Exit-intent popup (confrontational messaging)
- Scroll-triggered animations for mockups
- Winter arc countdown (dynamic, updates daily)
- Fast loading (leverage Astro's zero-JS default)
- OG tags optimized for social sharing

## TypeScript Configuration

Using `astro/tsconfigs/strict` - expect strict type checking. The `.astro/` directory contains auto-generated type definitions.

## Deployment Context

Site will be deployed to CF Pages. Static site generation (SSG) is the default mode - no server-side rendering needed for this landing page.
