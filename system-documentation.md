# VibeUI Clone — Full Reverse Engineering Report

**Site:** https://vibeui.online/  
**Date:** May 2026  
**Report Type:** Complete Architecture, Feature, Navigation & Tech Stack Analysis

---

## 01 — Site Overview & Purpose

VibeUI is a **fully static, no-login, no-backend** prompt reference library. Its core value proposition is providing structured layout descriptions (not style descriptions) that work as AI prompts. Every prompt ends with the same style-matching sentence, making them composable with any screenshot.

### Core Mechanic
The user picks a layout structure → copies the prompt → pastes it into an AI tool with their own screenshot → the AI generates a component that matches both the layout structure and their visual style.

### Cross-Promotion Model
The site is a lead-generation funnel for **GlowUp UI** (glowupui.io). Every prompt card has a secondary "Generate in GlowUp" button that deep-links to GlowUp with the prompt pre-filled via URL query parameter. A persistent ad banner is placed below the navigation header on the main page.

### Statistics
- **92 Total Prompts**
- **15 Categories**
- **2 Pages** (index + about)
- **0 Backend / Database / API**

---

## 02 — Pages & Routes

| Route | Page Title | Purpose |
|-------|-----------|---------|
| `/` | Prompt Library | Main library page. Full prompt grid with category filter tabs. The only content-rich page. |
| `/about` | About | Explains the library concept, 3-step usage instructions, keyboard shortcuts, and companion tool promo. |

These are the only two distinct routes. No auth pages, no individual prompt detail pages, no search results page — everything lives on the single landing page with in-page filtering.

---

## 03 — Navigation System

### Top Navigation Bar
Horizontal bar fixed at top.
- **Left:** "Prompt Library" logo/wordmark text link → routes to `/`
- **Center:** Category filter tabs (All · Auth Forms · Pricing · Features/Bento · Hero Sections · CTA Banners · Stats Bars · Nav Bars · Testimonials · Footer · FAQ · Dashboards · Onboarding · Blog/Content · Contact · Bonus)
- **Right:** "About" text link → `/about`

### Category Tabs (Horizontal Scrollable)
- Rendered as clickable pills/tabs below the hero text on the index page
- Clicking a tab filters the visible prompt cards in-place without a page reload
- The count of prompts per category is shown inline (e.g. "All 92", "Auth Forms 6")

### Keyboard Navigation
- **`/` key** — focuses the search input
- **`Esc` key** — clears the search
- Documented on the About page

### Anchor-Based Category Navigation
- Each category section has an anchor ID on the page
- The category tabs scroll-to or filter to that anchor
- The "All" view shows every prompt grouped by category header in a single scrollable page

### External Navigation (GlowUp Deep Links)
Each prompt card has a "Generate in GlowUp" external link that navigates to:
```
https://glowupui.io/?prompt=ENCODED_PROMPT&utm_source=vibeui&utm_medium=referral&utm_campaign=prompt_library&utm_content=CARD_ID
```

The prompt is URL-encoded and pre-fills GlowUp's input field. UTM parameters track referral source and specific card.

---

## 04 — Categories & Prompt Counts

| Category | Count | Purpose |
|----------|-------|---------|
| All | 92 | Everything |
| Auth Forms | 6 | Login, signup, password reset flows |
| Pricing | 8 | Pricing tables, toggles, tiered cards |
| Features / Bento | 8 | Feature showcases, bento grids, accordions |
| Hero Sections | 8 | Landing page hero layouts |
| CTA Banners | 7 | Call-to-action sections, announcements |
| Stats Bars | 7 | Key metrics, KPI displays |
| Nav Bars | 8 | Navigation patterns, menus, sidebars |
| Testimonials | 8 | Customer quotes, reviews, social proof |
| Footer | 5 | Footer layouts, sitemap, links |
| FAQ | 5 | Accordion, tabs, searchable FAQ |
| Dashboards | 6 | Admin dashboards, data views, layouts |
| Onboarding | 4 | Guided tours, checklists, empty states |
| Blog / Content | 4 | Blog layouts, reading views, article grids |
| Contact | 3 | Contact forms, support channels |
| Bonus | 5 | Misc: competitor comparison, 404, cookie banner, loading states |

**Bonus Category** (5 prompts) covers miscellaneous UI patterns that don't fit the standard marketing-page sections: Competitor comparison table, Feature announcement banner, Cookie banner, 404 page, Loading/skeleton state.

---

## 05 — All 92 Prompts — Full Details

Every prompt card contains:
- **Layout Name** (short title)
- **Description** (1-line structural summary)
- **Full Prompt Text**
- **Copy button**
- **Generate in GlowUp button** (deep link)

### Universal Prompt Template

```
Create a [COMPONENT TYPE] as a [LAYOUT DESCRIPTION]. 
[STRUCTURAL DETAILS WITH ELEMENTS AND BEHAVIOUR]. 
Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.
```

The final sentence *"Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot"* is appended to **every single prompt** — it's the core innovation that makes these prompts screenshot-composable.

---

### 🔐 Auth Forms (6 prompts)

| # | Layout Name | Description | Key Structural Elements in Prompt |
|---|---|---|---|
| 1 | **Split-screen with visual** | Form fields on one side, visual panel on the other | Email, password, primary CTA; split container; product screenshot or branded graphic area |
| 2 | **Centered card on background** | Floating card on full-page background | Heading, email, password, primary CTA, link to switch to sign-up; centered card; full-page background |
| 3 | **Minimal single-column** | No card container — just stacked elements | Logo, heading, fields, CTA stacked cleanly; no card wrapper |
| 4 | **Social-first stack** | Social login buttons primary, email secondary | Google, GitHub, Apple buttons at top; "or continue with email" divider; collapsed email/password below |
| 5 | **Magic link only** | Single email input, no password | Single email input; one primary CTA; helper text explaining magic link delivery |
| 6 | **Multi-step wizard** | Progress indicator, 2–3 logical steps | Progress indicator at top; email → password → profile steps; back/next navigation |

---

### 💰 Pricing (8 prompts)

| # | Layout Name | Description | Key Structural Elements in Prompt |
|---|---|---|---|
| 1 | **Classic 3-tier cards** | Three side-by-side cards, middle highlighted | Starter/Pro/Business tiers; middle visually recommended; plan names, prices, feature lists, CTAs |
| 2 | **Monthly/annual toggle** | Billing toggle with save badge, dynamic prices | Monthly/annual toggle at top; "save X%" badge; prices visibly update |
| 3 | **Comparison table** | Plans as columns, features as rows | Checkmarks and dashes; detailed feature comparison grid |
| 4 | **Single-tier hero** | One large centered card | Price, full feature list, prominent CTA; single large centered layout |
| 5 | **Usage slider** | Interactive slider updates price dynamically | Users/requests/seats slider; price dynamically updates below |
| 6 | **Credit pack grid** | Grid of credit pack tiles with badges | Credit amount, price, "best value"/"most popular" badge per tile |
| 7 | **Free vs Pro split** | Two-column with strong visual contrast | Free vs Pro; strong contrast making upgrade path obvious |
| 8 | **Stacked mobile-first cards** | Full-width stacked, one per tier | No horizontal comparison; each card stands alone with full feature list |

---

### ⚡ Features / Bento (8 prompts)

| # | Layout Name | Description | Key Structural Elements in Prompt |
|---|---|---|---|
| 1 | **3-column icon grid** | Three columns: icon, title, description | Uniform grid; icon + feature title + short description per column |
| 2 | **Bento grid** | Asymmetric tiles, varying sizes | Important features in larger tiles; varied grid layout; asymmetric arrangement |
| 3 | **Alternating rows** | Zigzag rows, text/visual alternating sides | Each feature: text on one side, visual/screenshot placeholder on other; sides swap per row |
| 4 | **Tabbed features** | Tabs switch between features with visuals | Tab reveals screenshot + description; each tab = one feature |
| 5 | **Accordion list** | Collapsible rows, expand on click | Feature title visible; description + visuals expand on click |
| 6 | **Scroll-triggered reveal** | Sticky visual, scrolling descriptions | Sticky visual on one side; features scroll past on other; each highlights in turn |
| 7 | **Icon wall** | Dense grid of compact icon tiles | Icon + short label only; compact; shows many features at a glance |
| 8 | **Before/after comparison** | Without vs. with product split | Side-by-side without/with comparison panels |

---

### 🚀 Hero Sections (8 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Centered text + screenshot** | Centered heading + subheading + CTAs at top; large product screenshot below |
| 2 | **Split hero** | Heading/subheading/CTAs on one side; product mockup/visual on other |
| 3 | **Video background** | Looping video/animated background; text overlaid with readable contrast |
| 4 | **Animated gradient mesh** | Animated gradient mesh background; heading, subheading, CTAs layered centrally on top |
| 5 | **Terminal/code hero** | Terminal or code-editor visual as central element; animated typing effect or code snippet; heading + CTAs |
| 6 | **Floating UI elements** | Multiple product screenshots/UI cards floating, tilted, or layered around central heading and CTAs |
| 7 | **Big bold typography** | Oversized bold headline dominating viewport; minimal supporting elements |
| 8 | **Hero with inline form** | Email capture inline under heading; single input + CTA button inline (no separate button) |

---

### 📣 CTA Banners (7 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Full-bleed gradient banner** | Full-bleed gradient background; centered heading; short supporting line; prominent CTA button |
| 2 | **Split CTA card** | Contained card; heading + description on one side; CTA button aligned on other |
| 3 | **Sticky bottom bar** | Fixed bar at viewport bottom; short message; CTA button; dismiss option |
| 4 | **Patterned background** | Subtle dots/grid/noise pattern background; centered message and button |
| 5 | **Dual-CTA** | Two buttons side by side; primary action + secondary action; heading and supporting text above |
| 6 | **Inline email capture CTA** | Heading, subheading, then email input + submit button inline beneath |
| 7 | **Testimonial + CTA combo** | Customer quote above heading and CTA; social proof reinforces action |

---

### 📊 Stats Bars (7 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Horizontal 4-column numbers** | Horizontal row of four large numbers; small descriptive label underneath each |
| 2 | **Animated count-up** | Numbers animate counting up on scroll into view; supporting label per number |
| 3 | **Icon + stat pairs** | Relevant icon next to each stat; icon + number + label per item |
| 4 | **Logo bar + stats combo** | Customer/partner logos above or beside key stats like "10k+ users" |
| 5 | **Vertical stacked stats** | Vertical stack suited for narrow column/sidebar; number and label stacked per item |
| 6 | **Stats over full-bleed image** | Full-bleed image or gradient background; stats overlaid with strong contrast |
| 7 | **Card-based stats** | Row of individual bordered cards; one stat + label per card |

---

### 🔗 Nav Bars (8 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Minimal logo + links + CTA** | Logo left; nav links middle/right; primary CTA button far right |
| 2 | **Centered logo split nav** | Logo centered; nav links split evenly either side |
| 3 | **Mega menu** | Full-width mega menu dropdown on hover; categorized sub-links; optional visuals |
| 4 | **Sidebar nav** | Vertical sidebar left; logo at top; links stacked; user/account section at bottom |
| 5 | **Floating pill nav** | Rounded pill detached from top edge; centered horizontally; subtle shadow |
| 6 | **Transparent over hero** | Transparent when over hero; becomes solid on scroll |
| 7 | **Command-palette nav** | Prominent search/⌘K input as central element; minimal links around it |
| 8 | **Bottom mobile nav** | Bottom tab bar for mobile; icons with labels; fixed to viewport bottom |

---

### 💬 Testimonials (8 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **3-column quote cards** | Three side-by-side quote cards; customer photo, name, role, quote per card |
| 2 | **Marquee scroll** | Infinite horizontally scrolling marquee of testimonial tiles |
| 3 | **Masonry grid** | Pinterest-style masonry grid of varied-height testimonial cards |
| 4 | **Single featured testimonial** | One large featured quote; customer photo, name, role, company logo prominently displayed |
| 5 | **Video testimonial grid** | Grid of clickable video thumbnails; play icon, name, company per tile |
| 6 | **Tweet wall** | Cards styled like X/Twitter posts; avatar, handle, timestamp, quote content |
| 7 | **Logo cloud** | Clean grid or row of customer/partner logos; short heading above |
| 8 | **Carousel with dots** | Single-testimonial carousel; navigation dots or arrows to cycle through |

---

### 🏁 Footer (5 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Multi-column sitemap** | Grouped links (Product, Company, Resources, Legal); logo + tagline left; copyright bottom |
| 2 | **Minimal single-row** | Logo, few key links, copyright text inline in one row |
| 3 | **Giant logo footer** | Huge wordmark as centerpiece; smaller links arranged around/below it |
| 4 | **Newsletter-first footer** | Newsletter signup dominant (large heading, email input, CTA); nav links secondary below |
| 5 | **Status indicator footer** | Live system status indicator ("All systems operational") alongside links and logo |

---

### ❓ FAQ (5 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Accordion single column** | Single-column accordion; question expands answer on click |
| 2 | **Two-column accordion** | Questions split across two columns in accordion layout |
| 3 | **Chat-bubble Q&A** | Questions and answers in alternating chat bubbles |
| 4 | **Searchable FAQ** | Search bar filters question list as user types |
| 5 | **Categorized tabs** | Category tabs (Billing, Product, Technical) switch between filtered question sets |

---

### 📊 Dashboards (6 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Sidebar + main content** | Vertical sidebar with nav; main content fills rest of viewport |
| 2 | **Top nav + content** | Horizontal top nav; full-width content beneath — no sidebar |
| 3 | **Three-pane layout** | Sidebar nav; middle list/feed pane; detail panel right |
| 4 | **Kanban board** | Columns representing stages; draggable cards within each |
| 5 | **Metric cards + chart** | Grid of metric cards at top; larger chart/visualization below |
| 6 | **Empty state** | Centered illustration/icon; heading; CTA to get started |

---

### 🎯 Onboarding (4 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Checklist onboarding** | Setup task checklist; progress indicators; expandable items with instructions and CTA |
| 2 | **Tour tooltips** | Guided tour; tooltip callouts pointing to UI elements; explanation + next/skip buttons |
| 3 | **Video walkthrough modal** | Modal with embedded walkthrough video; dismiss/get-started CTA |
| 4 | **Illustrated empty state** | Custom illustration; short heading; supporting sentence; single CTA |

---

### 📝 Blog / Content (4 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Magazine grid** | Large featured post at top; smaller post cards in grid beneath |
| 2 | **Single column reading view** | Clean single-column; generous line spacing; readable column width |
| 3 | **Sidebar TOC** | Sticky table of contents sidebar highlighting current section on scroll |
| 4 | **Card grid with filters** | Post card grid; category filter tags above filter visible posts on click |

---

### 📞 Contact (3 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Split form + details** | Contact form one side; details (email, phone, address, hours) other side |
| 2 | **Support channel cards** | Grid of cards for channels (live chat, email, docs, community); icon + CTA per card |
| 3 | **Full-page minimal form** | Full-page centered form; single heading; minimal fields; one submit button |

---

### 🎁 Bonus (5 prompts)

| # | Layout Name | Key Structural Elements in Prompt |
|---|---|---|
| 1 | **Comparison table (vs competitors)** | Your product vs competitors as columns; checkmarks and dashes for feature differences |
| 2 | **Feature announcement banner** | Slim top bar; "new" tag; short message; inline link; dismiss button |
| 3 | **Cookie banner** | Bottom-corner card; short message; accept/reject buttons; settings link |
| 4 | **404 page** | "Page not found" message; explanation; CTAs for home/support |
| 5 | **Loading state** | Skeleton layout mirroring final content structure; shimmer animation on placeholder blocks |

---

## 06 — User Flow — Landing to Last Action

### Step 1: Arrival
User lands on the main page at `vibeui.online/`. Sees:
- Header with category tabs
- Hero heading ("UI Prompt Library for Vibe Coders")
- Subheading
- GlowUp ad banner
- Full prompt grid starting with "All" category active

### Step 2: Browse / Filter Prompts
**Option A — Category Tab Filtering:**
- Click a category tab (e.g. "Pricing")
- Prompts filter in place, page scrolls/jumps to that section
- Shows "Pricing — 8 prompts" heading followed by the 8 pricing prompt cards

**Option B — Keyboard Search:**
- Press `/` → search input focuses
- Type keyword (e.g. "bento")
- Matching cards filter in real-time

**Option C — Manual Scroll:**
- Scroll through the "All" view top-to-bottom through all 92 prompts grouped by category

### Step 3: Find a Prompt Card
Each card displays:
- Layout name (bold)
- 1-line structural description
- Two action buttons

### Step 4A: Copy Prompt (Exit to External Tool)
- User clicks **"Copy prompt"** button
- Full prompt text is copied to clipboard
- Button shows confirmation state (e.g. "Copied!")
- User opens their own AI tool (Claude, ChatGPT, Cursor, etc.)
- Pastes the prompt
- Attaches a screenshot of their desired aesthetic
- Submits to AI tool
- **VibeUI session ends here**

### Step 4B: Generate in GlowUp (Exit to Partner)
- User clicks **"Generate in GlowUp"**
- Opens `glowupui.io` in new tab with the prompt pre-filled via URL param
- **This is the primary monetization/referral exit**
- User leaves VibeUI and lands on GlowUp to complete generation
- UTM tracking records the source card

### Step 5: Optional — Visit About Page
- User clicks "About" in the top-right nav
- Navigates to `/about`
- Reads 3-step usage instructions
- Learns about keyboard shortcuts
- Sees GlowUp promo
- Clicks "Back to library" to return to `/`

### Step 6: Session End
User has their prompt(s) copied. They leave the site to use them in AI tools. **No account, no saved state, no return flow needed.** Pure utility-focused single-session tool.

---

## 07 — Data Flow

**Key insight:** There is **NO backend**. All data is static — prompts are hardcoded in the HTML/JS source. No database, no API calls, no authentication. The only "data flow" is client-side filtering and the clipboard API.

| Data | Source | Flow |
|------|--------|------|
| **Prompt content** | Hardcoded in static build (HTML or JS data array) | Rendered on page load → filtered by category/search on client |
| **Category filter state** | Client-side JS state / URL hash | Tab click → update active category → re-render/filter visible cards |
| **Search query** | User input (keyboard) | `/` shortcut → input focused → keyup → filter cards by title/description match |
| **Prompt to clipboard** | Prompt text string from data | Click "Copy prompt" → `navigator.clipboard.writeText(prompt)` → button confirmation |
| **GlowUp deep link** | Prompt text + UTM params hardcoded per card | Click "Generate in GlowUp" → `window.open(url)` or anchor with `target="_blank"` |
| **UTM tracking** | Hardcoded per card in link href | utm_source=vibeui · utm_medium=referral · utm_campaign=prompt_library · utm_content=CARD_ID |
| **Page routing** | Static site generator or server | `/` → index page · `/about` → about page. No dynamic routing. |

---

## 08 — Key Interactions & Visual Behaviour

### Prompt Cards
- Each card: layout name, 1-line description (muted), two buttons inline at bottom
- The "Copy prompt" button shows a temporary "Copied!" state after click
- Cards may have hover effects (border glow, subtle lift)
- No expand/modal for the prompt — it goes direct to clipboard

### Category Tab Filtering
- Clicking a tab immediately hides/shows relevant prompt sections
- Active tab has a distinct style (underline, background, or text color)
- "All" tab shows everything
- The tab list is horizontally scrollable on mobile

### Keyboard Search (`/` to focus)
- Pressing `/` anywhere on the page focuses a search input
- Typing filters prompt cards by title or description text in real-time
- `Esc` clears the search and restores all prompts

### GlowUp Ad Banner
A prominent promotional card placed below the hero text on the main page. Contains:
- Product name "GLOWUP UI"
- Tagline "Stop shipping ugly UI"
- Description: "Generate UI variants across Claude, GPT-5 & Gemini. Paste the winner straight into your builder. Zero wasted credits."
- Logo row (Lovable, Cursor, Bolt, v0)
- CTA button "Try GlowUp UI"
- Trust signal "Trusted by 3,000+ vibe coders"

### About Page Navigation
- Simple static page
- "Back to library" text link at top returns to `/`
- No header/sidebar — stripped-down layout
- GlowUp companion promo section at bottom

---

## 09 — Recommended Tech Stack (Client-Side Only)

Since VibeUI has **zero backend requirements** — all data is static, no auth, no DB — the ideal clone is a client-side static site. The stack below is chosen for fast build, excellent DX, zero runtime cost, and perfect fit for the content type.

### Primary Framework: Next.js 14+ (Static Export)

**Why:** App Router with `output: 'export'` gives a fully static HTML/JS bundle with file-based routing. `/` and `/about` map naturally to files. No server needed.

**Recommendation:** ★ Primary recommendation

**Key Features:**
- Zero server dependencies
- Perfect SEO (static HTML is crawlable)
- Lightning-fast builds
- Automatic code splitting and optimization
- Built-in image optimization

---

### Alternative Framework: Astro

**Why:** Zero JS by default — perfect for a static prompt library. Islands architecture means only the filter/search/copy logic is JS. Fastest possible build for this content type.

**Recommendation:** ★ Best for pure performance

**Key Features:**
- No JavaScript shipped by default
- Minimal CSS payload
- Perfect for content-heavy sites
- Less overhead than React

---

### Styling: Tailwind CSS v4

**Why:** Zero runtime CSS. Utility classes keep prompt card styles consistent. Dark mode trivial. The site's clean, minimal aesthetic maps perfectly to Tailwind primitives.

**Recommendation:** ★ Essential

---

### Data Layer: TypeScript Data File

**Why:** All 92 prompts stored in a single `prompts.ts` typed data file (array of objects: id, category, name, description, promptText). No DB, no CMS. Edit file to add prompts.

**Recommendation:** ★ Only data layer needed

---

### Search / Filter: React useState + useMemo

**Why:** Filter by category (exact match) and search (string includes on name + description). useMemo memoizes the filtered list. No search library needed — dataset is only 92 items.

**Recommendation:** Built-in, no dependencies

---

### Clipboard: navigator.clipboard API

**Why:** Native browser API. No library needed. `navigator.clipboard.writeText(text)` with a `setTimeout` to reset button state after 2s.

**Recommendation:** Native — zero dependencies

---

### Deployment: Vercel / Netlify / Cloudflare Pages

**Why:** Free tier covers this entirely. Push to git → auto-deploy.
- **Vercel:** Best Next.js integration. Free tier includes analytics.
- **Netlify:** Excellent DX, flexible build setup.
- **Cloudflare Pages:** Fastest globally, zero-config deploys.

**Recommendation:** Free tier sufficient

---

### Routing: File-based (Next.js App Router)

**Why:** 
- `app/page.tsx` → homepage
- `app/about/page.tsx` → about page
- Category filtering is in-page state, not routing
- Clean, zero config

**Recommendation:** Built into Next.js

---

### Analytics (Optional): Plausible / Umami

**Why:** Privacy-focused, script-tag analytics. Track page views and "Copy prompt" / "Generate in GlowUp" click events. GlowUp referral links already have UTM params built in.

**Recommendation:** Optional but useful for tracking engagement

---

## Why NOT a Full React SPA (Vite/CRA)?

You lose SEO benefits. The prompt library should be indexable. Next.js static export gives you React interactivity + HTML that search engines can crawl. Astro gives even better SEO with less JS shipped.

---

## 10 — Suggested Project Structure

### Next.js App Router — File Tree

```
vibeui-clone/
├── app/
│   ├── page.tsx              ← Main library page (/)
│   ├── about/page.tsx        ← About page (/about)
│   ├── layout.tsx            ← Root layout (header, fonts, metadata)
│   ├── globals.css           ← Base styles + Tailwind
│   └── favicon.ico
├── components/
│   ├── Header.tsx            ← Nav bar with category tabs + About link
│   ├── PromptCard.tsx        ← Individual card (name, desc, copy btn, GlowUp link)
│   ├── PromptGrid.tsx        ← Filtered grid of PromptCard components
│   ├── CategoryTabs.tsx      ← Horizontal scrollable category filter tabs
│   ├── SearchInput.tsx       ← / shortcut search input
│   ├── GlowUpBanner.tsx      ← Ad/promo banner component
│   └── Footer.tsx            ← Site footer (optional)
├── data/
│   └── prompts.ts            ← All 92 prompts as typed data array
├── hooks/
│   └── usePromptFilter.ts    ← Filter + search logic (useMemo)
├── lib/
│   └── constants.ts          ← Constants (category names, counts)
├── types/
│   └── prompt.ts             ← Prompt type definition
├── styles/
│   └── globals.css           ← Global Tailwind + custom CSS
├── public/
│   ├── favicon.ico
│   └── opengraph-image.png   ← Social meta image
├── .env.local                ← (Optional) GlowUp affiliate ID
├── next.config.ts            ← output: 'export' for static build
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11 — Prompt Data Type Definition

```typescript
// types/prompt.ts

export type Category =
  | 'all'
  | 'auth'
  | 'pricing'
  | 'features'
  | 'hero'
  | 'cta'
  | 'stats'
  | 'nav'
  | 'testimonials'
  | 'footer'
  | 'faq'
  | 'dashboards'
  | 'onboarding'
  | 'blog'
  | 'contact'
  | 'bonus';

export interface Prompt {
  id: string;                    // e.g. "auth-1"
  category: Exclude<Category, 'all'>;
  name: string;                  // e.g. "Split-screen with visual"
  description: string;           // 1-line structural summary
  prompt: string;                // Full prompt text (without screenshot reminder)
  glowupUrl: string;             // Pre-built GlowUp deep link
}

export const CATEGORY_COUNTS: Record<Category, number> = {
  all: 92,
  auth: 6,
  pricing: 8,
  features: 8,
  hero: 8,
  cta: 7,
  stats: 7,
  nav: 8,
  testimonials: 8,
  footer: 5,
  faq: 5,
  dashboards: 6,
  onboarding: 4,
  blog: 4,
  contact: 3,
  bonus: 5,
};
```

---

## 12 — Implementation Guide & Key Code Snippets

### 1. Core Interaction — Copy to Clipboard

```typescript
// components/PromptCard.tsx

'use client';

import { useState } from 'react';
import { Prompt } from '@/types/prompt';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-3 hover:border-gray-700 transition-colors">
      <h3 className="font-semibold text-white mb-1">{prompt.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy prompt'}
        </button>
        <a
          href={prompt.glowupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Generate in GlowUp
        </a>
      </div>
    </div>
  );
}
```

---

### 2. Keyboard Search Shortcut

```typescript
// hooks/useKeyboardShortcuts.ts

import { useEffect, useRef } from 'react';

interface UseKeyboardShortcutsProps {
  onSearchFocus: () => void;
  onSearchClear: () => void;
}

export function useKeyboardShortcuts({
  onSearchFocus,
  onSearchClear,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // "/" to focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        onSearchFocus();
      }

      // "Escape" to clear search
      if (e.key === 'Escape') {
        onSearchClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchFocus, onSearchClear]);
}
```

---

### 3. Filter Logic

```typescript
// hooks/usePromptFilter.ts

'use client';

import { useMemo, useState } from 'react';
import { Prompt, Category } from '@/types/prompt';

export function usePromptFilter(prompts: Prompt[]) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = prompts;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, search, prompts]);

  return {
    filtered,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
  };
}
```

---

### 4. GlowUp Deep Link Construction

```typescript
// lib/glowup.ts

export function createGlowUpUrl(
  prompt: string,
  cardId: string
): string {
  const encodedPrompt = encodeURIComponent(prompt);
  const baseUrl = new URL('https://glowupui.io/');
  
  baseUrl.searchParams.set('prompt', encodedPrompt);
  baseUrl.searchParams.set('utm_source', 'vibeui');
  baseUrl.searchParams.set('utm_medium', 'referral');
  baseUrl.searchParams.set('utm_campaign', 'prompt_library');
  baseUrl.searchParams.set('utm_content', cardId);

  return baseUrl.toString();
}

// In your data file:
const prompt: Prompt = {
  id: 'auth-1',
  category: 'auth',
  name: 'Split-screen with visual',
  description: 'Form fields on one side, visual panel on the other',
  prompt: 'Create an auth form as a split-screen layout...',
  glowupUrl: createGlowUpUrl('Create an auth form...', 'auth-1'),
};
```

---

### 5. Category Tabs Component

```typescript
// components/CategoryTabs.tsx

'use client';

import { Category, CATEGORY_COUNTS } from '@/types/prompt';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  auth: 'Auth Forms',
  pricing: 'Pricing',
  features: 'Features / Bento',
  hero: 'Hero Sections',
  cta: 'CTA Banners',
  stats: 'Stats Bars',
  nav: 'Nav Bars',
  testimonials: 'Testimonials',
  footer: 'Footer',
  faq: 'FAQ',
  dashboards: 'Dashboards',
  onboarding: 'Onboarding',
  blog: 'Blog / Content',
  contact: 'Contact',
  bonus: 'Bonus',
};

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const categories: Category[] = [
    'all',
    'auth',
    'pricing',
    'features',
    'hero',
    'cta',
    'stats',
    'nav',
    'testimonials',
    'footer',
    'faq',
    'dashboards',
    'onboarding',
    'blog',
    'contact',
    'bonus',
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? 'bg-lime-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {CATEGORY_LABELS[category]} {CATEGORY_COUNTS[category]}
        </button>
      ))}
    </div>
  );
}
```

---

### 6. Next.js Config for Static Export

```typescript
// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Static export doesn't support Image optimization
  },
  basePath: '',
  trailingSlash: false,
};

export default nextConfig;
```

---

## 13 — Visual Design Notes for Accurate Clone

- **Color scheme:** Dark theme (dark gray/near-black background, not pure black)
- **Typography:** Minimal sans-serif — clean, modern (Inter, Geist, or Syne work well)
- **Cards:** Subtle border, slight background elevation, no heavy shadows
- **Category tabs:** Pill or underline style; horizontally scrollable on mobile
- **Layout:** Two-column on desktop: sticky left sidebar nav + scrollable main content (or tabs at top)
- **Prompt count badge:** Shown next to category name (e.g. "Auth Forms 6")
- **Section headings:** Per category group in the "All" view (e.g. "## Auth Forms — 6 prompts")
- **Accent color:** Likely a lime/green or blue for active state highlights
- **GlowUp banner:** Distinct styling — treated as a sponsored/ad card
- **Images:** None on the site — pure text + UI chrome

---

## 14 — SEO & Metadata

### Homepage Metadata
```typescript
export const metadata: Metadata = {
  title: 'VibeUI — 92 Free UI Prompts for Vibe Coders (Auth, Pricing, Hero, Bento)',
  description:
    'A curated library of layout prompts for vibe coders. Pick a structure, copy the prompt, paste it into your AI tool with a screenshot — get a matching UI.',
  openGraph: {
    title: 'VibeUI — 92 Free UI Prompts',
    description:
      'Structural layout prompts for AI-generated UI. Screenshot-composable.',
    url: 'https://vibeui.online',
    type: 'website',
  },
};
```

### About Page Metadata
```typescript
export const metadata: Metadata = {
  title: 'About VibeUI — How to Use the UI Prompt Library',
  description:
    'Learn how to use VibeUI prompts with any AI tool. 3-step guide + keyboard shortcuts.',
};
```

### Key SEO Points
- Static HTML is highly crawlable — no JS-heavy rendering needed
- File-based routing means clean URLs (`/`, `/about`)
- No sitemap needed for 2 pages but good practice to add
- Open Graph tags for social sharing
- Structured content is naturally SEO-friendly

---

## 15 — Monetization / Cross-Promo Pattern to Replicate

- **Ad banner:** At top of main content area (below hero, above prompts)
- **Card secondary CTA:** Every card has a secondary CTA button pointing to the companion product
- **About page promo:** Ends with companion product promo section
- **UTM tracking:** On all outbound links for attribution
- **Trust signals:** "Trusted by 3,000+ vibe coders" in the banner
- **Compatible tool logos:** Lovable, Cursor, Bolt, v0 increase credibility
- **Call-to-action copy:** "Stop shipping ugly UI" and "Try GlowUp UI"

---

## 16 — Deployment Checklist

- [ ] Next.js configured with `output: 'export'`
- [ ] All 92 prompts data loaded in `prompts.ts`
- [ ] Tailwind CSS v4 configured
- [ ] TypeScript types defined
- [ ] Search and filter working on client
- [ ] Clipboard copy working
- [ ] GlowUp deep links properly encoded with UTM params
- [ ] `/` keyboard shortcut working
- [ ] `Esc` to clear search working
- [ ] Responsive design tested on mobile
- [ ] About page complete
- [ ] SEO metadata set
- [ ] Deployed to Vercel/Netlify/Cloudflare Pages
- [ ] Custom domain configured
- [ ] Analytics set up (optional)

---

## Summary

**VibeUI is a brilliantly simple tool** — a static prompt library with zero backend complexity that drives referral traffic to a paid companion product (GlowUp UI). The clone should follow the exact same architecture: static file-based routing, client-side filtering, and dual CTAs (copy for power users, GlowUp link for convenience users).

**Recommended tech stack:** Next.js 14 (static export) + Tailwind CSS v4 + TypeScript data file. Deploy to Vercel for free. Ship in days, not weeks.

---

**Report compiled:** May 2026  
**Site analyzed:** https://vibeui.online/  
**Cloning difficulty:** Easy (fully static, no backend)  
**Estimated dev time:** 2–3 days for a competent frontend engineer