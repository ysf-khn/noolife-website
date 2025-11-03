# CLAUDE.md

Whenever you present a plan or solution, sacrifice grammar for the sake of concision to make sure you're always to the point and concise and efficient

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NooLife marketing website built with Astro 5.15.1. This is the landing page for the NooLife habit-tracking mobile app, designed around the "Winter Arc" 66-day transformation concept.

## About the NooLife App

Understanding the product is essential for effective marketing copy and feature presentation.

### Core Functionality

**Habit Tracking**: Users track 8 core habits + 2 optional habits:

- **8 Core Habits**: Wake time, water intake, workout, running, meditation, reading, cold showers, social media usage
- **8 Optional Habits** (user selects 2): No fap, no alcohol, no smoke, praying, sit ups, pushups, journaling, studying

**66-Day Plan**: After entering current habit baselines, app generates personalized 66-day improvement plan with ~450 tasks spread across the duration. Tasks help users incrementally improve and "become the main character in their lives."

**Streak System**: User must complete minimum 2 tasks/day to initiate and maintain streak.

### Rating System

App provides ratings out of 100:

- **Overall Rating**: Calculated from the 5 sub-ratings below
- **5 Sub-Ratings**: Discipline, Strength, Wisdom, Focus, Confidence

Users see three views: Current rating, Potential rating (if 66-day plan completed), Day 1 rating (baseline)

### App Screens

1. **Home**: Streak count, overall rating, current day of plan, daily motivational message, task tabs (todos/completed/skipped). Task cards have GTA-inspired backgrounds with character performing the task.

2. **Stats**: Time elapsed since plan start, heatmap for every habit showing consistency, stats graphs showing rating improvements over time.

3. **Journey**: Daily journal for all 66 days with 4 cards per day:

   - Today's mood
   - Completed tasks
   - Visual journal (photo/video)
   - Text journal (challenges, wins, reflections)

4. **Assets**: Mini apps including guided meditation sessions (varying lengths), pomodoro focus timers, workout tracker (separate from main workout task).

5. **My NooLife Rating**: Three-tab view showing Current/Potential/Day 1 ratings with beautiful GTA-inspired character shot background.

### Visual Identity

- **All visuals**: Cinematic, GTA-inspired aesthetics
- **Character customization**: Task card characters match user's selected gender for maximum relatability
- **Theme**: "Main character in your own life" - aspirational, empowering imagery

This context informs how we present features, write FAQ responses, and craft conversion messaging on the marketing site.

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

## Content Blueprint

- 10 major sections (Hero, Problem Agitation, How It Works, Features Grid, etc.)
- Copy tone: Confrontational challenge → Competitive separation → Accountability-driven urgency
- 3 CTA placements with different messaging strategies
- Science-backed credibility section (66-day research, identity-based habits, habit stacking)
