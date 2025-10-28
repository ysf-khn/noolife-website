# NooLife Blog Implementation Plan

**Detailed Phase-Wise Roadmap**

---

## Overview

**Goal:** Build high-volume blog (30 posts/month) using Astro Content Collections + Cloudflare R2 for images

**Key Features:**

- Type-safe content schema
- Blog listing with pagination
- Tag/category filtering
- RSS feed
- SEO optimization (OG tags, JSON-LD schema)
- Cloudflare R2 image hosting
- Astro automatic image optimization
- Optional scheduled publishing via GitHub Actions
- NooLife design system integration

**Total Estimated Time:** 10-12 hours
**Cost:** $0 (R2 free tier, no external services)

---

## Phase 1: R2 Setup & Configuration

**Time:** 1-1.5 hours
**Goal:** Set up Cloudflare R2 bucket with public access and custom domain

### Tasks:

1. **Create R2 Bucket**

   - Log into Cloudflare Dashboard
   - Navigate to R2 Object Storage
   - Create bucket: `noolife-blog` (or preferred name)
   - Configure public read access

2. **Set Up Custom Domain**

   - Configure custom domain: `r2.noolife.app`
   - Update DNS settings (CNAME record)
   - Test public access: `https://r2.noolife.app/test.jpg`

3. **Install Wrangler CLI Locally**

   ```bash
   npm install -g wrangler
   wrangler login
   ```

4. **Test Upload Workflow**
   - Upload test image
   - Verify public URL works
   - Document upload command pattern

### Deliverables:

- ✅ R2 bucket created and publicly accessible
- ✅ Custom domain configured
- ✅ Wrangler CLI installed and authenticated
- ✅ Upload workflow documented

---

## Phase 2: Content Collections Foundation

**Time:** 1.5-2 hours
**Goal:** Create type-safe content collection schema for blog posts

### Tasks:

1. **Create Content Collection Schema**

   - File: `src/content/config.ts`
   - Define blog collection with Zod schema:
     - `title` (string, required)
     - `description` (string, required)
     - `author` (string, default: "NooLife Team")
     - `pubDate` (date, required)
     - `updatedDate` (date, optional)
     - `heroImage` (string, R2 URL, optional)
     - `tags` (array of strings, default: [])
     - `category` (enum: habits/science/transformation/winter-arc, optional)
     - `featured` (boolean, default: false)
     - `draft` (boolean, default: false)

2. **Create Content Directory Structure**

   ```
   src/content/blog/
   ```

3. **Create 3 Sample Posts**
   - Sample markdown files with proper frontmatter
   - Reference test R2 images
   - Include various content: headings, lists, blockquotes, code blocks
   - Test different tags/categories

### Deliverables:

- ✅ `src/content/config.ts` with full schema
- ✅ `src/content/blog/` directory created
- ✅ 3 sample posts with frontmatter
- ✅ Type safety verified (build check)

---

## Phase 3: Blog Layout Components

**Time:** 2-2.5 hours
**Goal:** Create reusable components with NooLife design system styling

### Tasks:

1. **BlogImage Component**

   - File: `src/components/BlogImage.astro`
   - Wrapper around Astro's `<Image>` component
   - Handles R2 URLs
   - Automatic WebP/AVIF conversion
   - Responsive sizing
   - Lazy loading

2. **BlogCard Component**

   - File: `src/components/BlogCard.astro`
   - Post preview card for listings
   - Props: title, description, pubDate, tags, heroImage, slug
   - NooLife design system styling:
     - Black background (#000000)
     - Alabaster text (#F1EDE9)
     - Jade Green headings (#00D09C)
     - Mint tag highlights (#6BFFD8)
     - Deep Forest shadows (#005C42)
   - Hover effects (transform, shadow)

3. **BlogPost Layout Component**

   - File: `src/components/BlogPost.astro`
   - Wrapper for individual post content
   - Includes:
     - Article header (title, date, author, tags)
     - Hero image (if present)
     - Content area with typography styles
     - Markdown styling (headings, links, blockquotes, code)
     - Black background (#000000)
     - Alabaster text (#F1EDE9)
     - Jade Green h1/h2 (#00D09C)
     - Mint links/accents (#6BFFD8)
     - Stone Grey code blocks (#2E2C2B)

4. **TableOfContents Component (Optional)**
   - File: `src/components/TableOfContents.astro`
   - Auto-generate TOC from markdown headings
   - Smooth scroll navigation
   - Sticky positioning

### Deliverables:

- ✅ `BlogImage.astro` component
- ✅ `BlogCard.astro` component with NooLife styling
- ✅ `BlogPost.astro` layout component
- ✅ Optional: `TableOfContents.astro`
- ✅ All styled with NooLife design tokens

---

## Phase 4: Blog Index & Listing Pages

**Time:** 1.5-2 hours
**Goal:** Create main blog listing with pagination

### Tasks:

1. **Blog Index Page (Non-Paginated)**

   - File: `src/pages/blog/index.astro`
   - Query all published posts (filter: `draft === false` and `pubDate <= today`)
   - Sort by `pubDate` descending
   - Display first 20 posts using `BlogCard` component
   - Show "Load More" or pagination link
   - Add intro section: "NooLife Blog" header with description
   - NooLife design system styling

2. **Paginated Blog Pages**

   - File: `src/pages/blog/[page].astro`
   - Use Astro's `paginate()` function
   - 20 posts per page
   - Pagination navigation:
     - Previous/Next buttons
     - Page numbers (current, prev, next)
     - Jade Green active page, Mint hover states
   - Routes: `/blog/2`, `/blog/3`, etc.

3. **Blog Listing Filtering Logic**
   - Only show posts where:
     - `draft === false`
     - `pubDate <= new Date()` (today)
   - Sort by `pubDate` descending
   - Optional: Featured posts section at top

### Deliverables:

- ✅ `/blog/` - Main blog index showing 20 posts
- ✅ `/blog/[page]/` - Paginated blog pages
- ✅ Draft and future-date filtering logic
- ✅ Pagination UI with NooLife styling

---

## Phase 5: Individual Post Pages

**Time:** 1.5-2 hours
**Goal:** Dynamic post pages with full content and SEO

### Tasks:

1. **Dynamic Post Route**

   - File: `src/pages/blog/[slug].astro`
   - Use `getStaticPaths()` to generate routes for all posts
   - Filter out drafts and future posts
   - Pass post data as props

2. **Post Template Structure**

   - Use `BlogPost` layout component
   - Render hero image with `BlogImage` (if present)
   - Display post metadata:
     - Title (Jade Green, large)
     - Author + publish date (Faded Khaki)
     - Tags (Mint badges)
     - Category badge
   - Render markdown content
   - Add "Updated on" date (if `updatedDate` present)

3. **Markdown Content Styling**

   - Apply NooLife design system to all markdown elements:
     - Headings: h2 (Jade), h3 (Alabaster), h4+ (Faded Khaki)
     - Paragraphs: Alabaster, line-height for readability
     - Links: Mint with underline
     - Blockquotes: Mint left border, Stone Grey bg
     - Code blocks: Stone Grey bg, Mint syntax highlights
     - Lists: Alabaster with Jade bullets
     - Images: Full width, rounded corners, shadow

4. **Related Posts Section (Optional)**
   - At bottom of post
   - Show 3 related posts (same tag/category)
   - Use `BlogCard` component

### Deliverables:

- ✅ `/blog/[slug]/` - Individual post pages
- ✅ Full markdown rendering with NooLife design
- ✅ Hero images via Astro optimization
- ✅ Post metadata display
- ✅ Optional: Related posts section

---

## Phase 6: Tag & Category Filtering

**Time:** 1-1.5 hours
**Goal:** Filter posts by tags and categories

### Tasks:

1. **Tag Pages**

   - File: `src/pages/blog/tag/[tag].astro`
   - Use `getStaticPaths()` to generate page for each unique tag
   - Filter posts by tag
   - Display filtered posts with `BlogCard`
   - Show tag name in header: "Posts tagged: #habits"
   - Add "View All Posts" link back to main blog

2. **Category Pages (Optional)**

   - File: `src/pages/blog/category/[category].astro`
   - Similar to tag pages
   - Filter by category enum
   - Routes: `/blog/category/habits`, `/blog/category/science`, etc.

3. **Tag Cloud Component (Optional)**
   - File: `src/components/TagCloud.astro`
   - Display all tags with post counts
   - Size based on frequency
   - Link to tag pages

### Deliverables:

- ✅ `/blog/tag/[tag]/` - Tag filtering pages
- ✅ Optional: `/blog/category/[category]/` - Category pages
- ✅ Optional: Tag cloud component

---

## Phase 7: RSS Feed

**Time:** 30-45 minutes
**Goal:** Generate RSS feed for blog subscribers

### Tasks:

1. **Install Astro RSS Integration**

   ```bash
   npm install @astrojs/rss
   ```

2. **Create RSS Endpoint**

   - File: `src/pages/rss.xml.ts`
   - Import `@astrojs/rss` and `getCollection`
   - Generate RSS feed with:
     - Site title: "NooLife Blog"
     - Description: "Habit formation, Winter Arc strategies, behavioral science"
     - All published posts (filter drafts/future dates)
     - Include title, description, pubDate, link
   - Use `site` from `astro.config.mjs` (already set: https://noolife.app)

3. **Add RSS Link to Layout**
   - Update `src/layouts/Layout.astro`
   - Add `<link rel="alternate" type="application/rss+xml">` to `<head>`
   - Add RSS icon/link in footer or blog header

### Deliverables:

- ✅ `/rss.xml` - RSS feed endpoint
- ✅ RSS link in site `<head>`
- ✅ Optional: RSS icon in UI

---

## Phase 8: SEO Optimization

**Time:** 1.5-2 hours
**Goal:** Full SEO meta tags, OG images, structured data

### Tasks:

1. **Enhance Layout.astro for Blog SEO**

   - Update `src/layouts/Layout.astro` to accept blog-specific props:
     - `title` (string)
     - `description` (string)
     - `image` (string, OG image URL)
     - `pubDate` (Date, for articles)
     - `author` (string)
     - `tags` (array)
     - `type` (page vs article)

2. **Add Open Graph Tags**

   - `og:title`, `og:description`, `og:image`, `og:url`
   - `og:type` (article for posts)
   - `article:published_time`, `article:author`, `article:tag`

3. **Add Twitter Card Tags**

   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

4. **Add JSON-LD Structured Data**

   - Article schema for blog posts:
     - `@type: BlogPosting`
     - `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`
   - Blog schema for index page:
     - `@type: Blog`
     - List of posts

5. **Canonical URLs**

   - Add `<link rel="canonical">` for all pages
   - Prevent duplicate content issues

6. **Sitemap Verification**
   - Verify `@astrojs/sitemap` (already installed) includes blog posts
   - Test after building: `/sitemap-index.xml`

### Deliverables:

- ✅ Enhanced `Layout.astro` with blog SEO props
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Article schema)
- ✅ Canonical URLs
- ✅ Sitemap includes all blog posts

---

## Phase 9: GitHub Actions Scheduled Publishing (Optional)

**Time:** 1-1.5 hours
**Goal:** Auto-publish posts on scheduled dates

### Tasks:

1. **Create GitHub Actions Workflow**

   - File: `.github/workflows/scheduled-publish.yml`
   - Trigger: Daily cron at 9am UTC
   - Also: Manual workflow dispatch for testing
   - Action: Trigger CF Pages deploy webhook

2. **Set Up CF Pages Deploy Hook**

   - CF Dashboard → Pages → noolife-website → Settings
   - Create Deploy Hook URL
   - Add as GitHub secret: `CF_DEPLOY_HOOK`

3. **Test Scheduled Publishing**

   - Create test post with future `pubDate`
   - Commit to repo
   - Verify post doesn't show on blog
   - Wait for cron or trigger manually
   - Verify post appears after `pubDate` passes

4. **Document Workflow**
   - Add README section explaining:
     - How to schedule posts (set `pubDate` in future)
     - When posts go live (daily at 9am UTC)
     - How to trigger manual build
     - How to publish immediately (set `pubDate` to today or past)

### Deliverables:

- ✅ `.github/workflows/scheduled-publish.yml`
- ✅ CF Pages deploy hook configured
- ✅ Scheduled publishing tested
- ✅ Workflow documented

---

## Phase 10: Sample Content & Testing

**Time:** 1-1.5 hours
**Goal:** Create realistic sample posts, test all features

### Tasks:

1. **Create 5-7 Sample Posts**

   - Varied content lengths (500-2000 words)
   - Different tags/categories
   - Some with hero images (uploaded to R2)
   - Some featured posts
   - Test cases:
     - Post with code blocks
     - Post with blockquotes
     - Post with images throughout content
     - Post with lists and tables

2. **Upload Sample Images to R2**

   - Create folder structure: `noolife-blog/post-slug/`
   - Upload hero images + content images
   - Test `wrangler r2 object put` workflow
   - Verify public URLs work

3. **Test All Features**

   - Blog index loads correctly
   - Pagination works (if 20+ posts)
   - Individual posts render properly
   - Tag filtering works
   - RSS feed generates correctly
   - Hero images load and are optimized
   - Content images render via Astro Image
   - SEO tags present (view source)
   - Sitemap includes all posts
   - Draft posts don't show
   - Future-dated posts don't show (if testing scheduled)

4. **Build Time Testing**

   - Run production build: `npm run build`
   - Measure build time with 7 posts
   - Check build output size
   - Preview build: `npm run preview`
   - Test on mobile (responsive design)

5. **Performance Testing**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify image optimization working (WebP served)
   - Test load times

### Deliverables:

- ✅ 5-7 realistic sample posts
- ✅ Sample images in R2
- ✅ All features tested and working
- ✅ Build time measured
- ✅ Performance verified (Lighthouse score)

---

## Phase 11: Documentation & Handoff

**Time:** 30-45 minutes
**Goal:** Document workflow for ongoing content creation

### Tasks:

1. **Create Blog Workflow Documentation**

   - File: `docs/blog-workflow.md`
   - Document:
     - How to create new post (template, frontmatter fields)
     - How to upload images to R2 (Wrangler commands)
     - How to reference R2 images in markdown
     - How to schedule posts (future `pubDate`)
     - How to mark posts as draft
     - How to publish (git commit + push)
     - How to test locally (`npm run dev`)
     - Build and deploy process

2. **Create Post Template**

   - File: `docs/blog-post-template.md`
   - Pre-filled frontmatter with all fields
   - Example content structure
   - Comments explaining each field

3. **Create R2 Upload Script (Optional)**

   - File: `scripts/upload-image.sh`
   - Helper script to upload images with proper naming
   - Usage: `./scripts/upload-image.sh post-slug image.jpg`

4. **Update CLAUDE.md**
   - Add blog architecture section
   - Reference content collections location
   - Note R2 bucket details
   - Link to blog workflow doc

### Deliverables:

- ✅ Blog workflow documentation
- ✅ Post template for quick creation
- ✅ Optional: Image upload helper script
- ✅ CLAUDE.md updated with blog info

---

## Final File Structure

After implementation, project structure will be:

```
noolife-website/
├── .github/
│   └── workflows/
│       └── scheduled-publish.yml        # Optional: Auto-publish
├── docs/
│   ├── blog-implementation-plan.md      # This file
│   ├── blog-workflow.md                 # Content creation guide
│   └── blog-post-template.md            # Post template
├── src/
│   ├── assets/                          # Existing assets
│   ├── components/
│   │   ├── BlogCard.astro               # Post card component
│   │   ├── BlogImage.astro              # Image wrapper for R2
│   │   ├── BlogPost.astro               # Post layout
│   │   ├── TableOfContents.astro        # Optional TOC
│   │   └── TagCloud.astro               # Optional tag cloud
│   ├── content/
│   │   ├── config.ts                    # Content collections schema
│   │   └── blog/
│   │       ├── post-001.md              # Blog posts
│   │       ├── post-002.md
│   │       └── ...
│   ├── layouts/
│   │   └── Layout.astro                 # Enhanced with blog SEO
│   └── pages/
│       ├── blog/
│       │   ├── index.astro              # Blog listing
│       │   ├── [page].astro             # Pagination
│       │   ├── [slug].astro             # Individual posts
│       │   ├── tag/
│       │   │   └── [tag].astro          # Tag filtering
│       │   └── category/
│       │       └── [category].astro     # Optional categories
│       ├── rss.xml.ts                   # RSS feed
│       ├── index.astro                  # Existing homepage
│       ├── privacy.astro                # Existing
│       └── terms.astro                  # Existing
├── public/
│   ├── robots.txt                       # Already exists
│   └── ...
├── scripts/
│   └── upload-image.sh                  # Optional: R2 helper
├── astro.config.mjs                     # Already configured
├── package.json
└── CLAUDE.md                            # Updated with blog info

Cloudflare R2 Bucket Structure:
noolife-blog/
  ├── post-001/
  │   ├── hero.jpg
  │   └── screenshot.png
  ├── post-002/
  │   └── hero.jpg
  └── ...
```

---

## Success Criteria

**After all phases complete:**

- ✅ Blog index at `/blog/` displays all published posts
- ✅ Individual posts at `/blog/[slug]/` render correctly
- ✅ Pagination works (if 20+ posts)
- ✅ Tag filtering functional
- ✅ RSS feed available at `/rss.xml`
- ✅ Images hosted on R2, optimized by Astro
- ✅ All SEO tags present (OG, Twitter, JSON-LD)
- ✅ Sitemap includes blog posts
- ✅ Draft posts hidden from listings
- ✅ Optional: Future posts auto-publish on schedule
- ✅ NooLife design system applied throughout
- ✅ Build time under 2 minutes
- ✅ Lighthouse score 90+ (performance)
- ✅ Mobile responsive
- ✅ Documentation complete

---

## Cost Breakdown

| Service          | Usage                          | Cost                              |
| ---------------- | ------------------------------ | --------------------------------- |
| Cloudflare R2    | Storage (<1GB), Reads (<1M/mo) | **$0** (free tier)                |
| Cloudflare Pages | Builds, Hosting                | **$0** (free tier, 500 builds/mo) |
| Astro            | Framework                      | **$0** (open source)              |
| GitHub Actions   | Cron (optional)                | **$0** (2000 min/mo free)         |
| **Total**        |                                | **$0/month**                      |

---

## Timeline

**Week 1 (6-8 hours):**

- Phase 1: R2 setup
- Phase 2: Content Collections
- Phase 3: Components
- Phase 4: Blog index/listing

**Week 2 (4-6 hours):**

- Phase 5: Individual posts
- Phase 6: Tag filtering
- Phase 7: RSS feed
- Phase 8: SEO optimization

**Week 3 (2-3 hours, optional):**

- Phase 9: Scheduled publishing
- Phase 10: Sample content & testing
- Phase 11: Documentation

**Total: 10-15 hours** (depending on optional features)

---

## Pre-Implementation Questions

Before starting implementation:

1. **R2 bucket name preference?** (e.g., `noolife-blog`, `noolife-images`)
2. **Custom domain preference?** ( `r2.noolife.app`)
3. **Want scheduled publishing (GitHub Actions)?** Yes/No
4. **Want table of contents in posts?** Yes/No
5. **Category pages or just tag filtering?** Both/Tags only
6. **Related posts section?** Yes/No
7. **How many sample posts for testing?** (5-7 recommended)

---

## Notes

- This plan assumes solo author workflow with AI assistance (Claude)
- All costs are $0 using free tiers
- Build times stay under 2 minutes even at 500+ posts
- Can scale to 1000+ posts without infrastructure changes
- Migration to paid CMS possible later if team grows
