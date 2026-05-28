# Plan: Surface UI-GATE to Site Visitors

## Context

UI-GATE is live at `/uig` but has no discovery path from the rest of the site. Visitors arriving on the homepage or reading other content have no way to know it exists. The site already has:

- `/uig` page (live)
- `/authority-layer` page
- `/manifesto` page
- Blog section
- Scroll-based navigation on Home

## Goals

1. Any site visitor can discover UI-GATE within 2 clicks
2. Discovery feels natural to the site's existing content flow, not forced
3. Options should be evaluated with trade-offs

---

## Option A: Add "UI-GATE" as a third hero CTA

**Approach:** In `src/components/Home/Home.tsx`, add a third button next to "Read Authority Layer" and "Request Briefing" that links to `/uig`.

**Pros:**

- Zero friction — visitors see it on first load
- Mirrors pattern already used for Authority Layer
- High discoverability

**Cons:**

- Already 3 CTAs in the hero (violetek.com link too). Adding a 4th risks button overload
- "UI-GATE" as a button label may be opaque to new visitors who haven't seen the term
- Low intent signal — someone clicking it might not know what it is

**Verdict:** Not recommended as a button. Could work as a text link instead.

---

## Option B: Add a text link in the hero bio paragraph

**Approach:** In `Home.tsx`, the "I write about..." paragraph mentions execution-time authorization and ambient authority. Add "UI-GATE methodology" as a natural mention in that paragraph with a link to `/uig`.

**Pros:**

- Feels editorial, not commercial
- Explains what UI-GATE is at first mention
- No button proliferation

**Cons:**

- Easy to skip over
- Paragraph is already dense with terms

**Verdict:** Recommended as a primary surface — editorial fit is strong.

---

## Option C: Add "UI-GATE" to Navigation (navElements)

**Approach:** In `Navigation.api.ts`, add a nav element for "UI-GATE" linking to `/uig`.

**Pros:**

- Persistent visibility on all scroll-based pages
- Clear discoverability path

**Cons:**

- Navigation.api appears to be scroll-anchored section links (About, Projects, CV, Blog, Contact), not top-level pages — adding a standalone page link may feel inconsistent with the existing pattern
- Mobile drawer space is limited

**Verdict:** Lower priority. Better suited for a persistent nav (not scroll-section nav).

---

## Option D: Mention on Authority Layer page

**Approach:** In `authority-layer.tsx`, add a line in the "Start Here" or body section that references UI-GATE with a link.

**Pros:**

- Thematically related — both deal with agentic systems and structured methodology
- Captures visitors who came specifically for authority layer content
- Low effort, existing page

**Cons:**

- Only reaches visitors who landed on authority-layer, not homepage visitors

**Verdict:** Recommended as a secondary surface.

---

## Option E: Add to Blog

**Approach:** Write a short blog post announcing or explaining UI-GATE, linking to `/uig`.

**Pros:**

- Shareable, SEO-indexed
- Demonstrates UI-GATE with an example rather than just describing it

**Cons:**

- More effort; requires a full blog post
- Blog readership may be self-selecting (only people already interested in these topics)
- Duplicates content that already exists on `/uig`

**Verdict:** Good long-term content strategy, not a priority for initial discovery.

---

## Recommendation

**Primary:** Option B — Add a natural textual reference with link in the Home hero bio paragraph. Minimal effort, editorial fit, no button clutter.

**Secondary:** Option D — Add a reference on the Authority Layer page in the "Start Here" section.

**Tertiary:** Option C — Add "UI-GATE" to nav elements only if `navElements` supports standalone page links (not scroll-anchors). Needs verification in `Navigation.api.ts`.

**Future:** Option E — Blog post once the methodology matures.

---

## Implementation Steps

### Step 1: Verify navElements structure

Read `src/components/Navigation/Navigation.api.ts` to confirm whether it supports standalone page links or only scroll anchors.

### Step 2: Add text link to Home hero bio

In `src/components/Home/Home.tsx`, add to the paragraph:

> "I write about execution-time authorization, ambient authority, **UI-GATE methodology**, and verifiable enforcement..."

Link `/uig` on "UI-GATE methodology". Styling should be inline text link matching the paragraph's font weight.

### Step 3: Add reference to Authority Layer page

In `src/pages/authority-layer.tsx`, add "UI-GATE methodology" to the "Start Here" section or a new "Related methodology" callout, linking to `/uig`.

### Step 4 (optional): Add nav element

Only if Navigation.api supports standalone links, add "UI-GATE" to `navElements`.

---

## Verification

- Home page renders with "UI-GATE methodology" as a link in the hero paragraph
- Authority Layer page has a reference to UI-GATE
- All links resolve correctly to `/uig`
- No new buttons added to the hero (text link only)
