# Strong Perimeter SEO Site Structure - 2026

Prepared for Strong Perimeter in May 2026.

## Executive Summary

Strong Perimeter should move from a single brochure-style homepage to a local service library built around how fence buyers actually search:

- Emergency and high-intent local searches: "fence company near me", "fence repair near me", "fence installation Dallas", "wood fence contractor near me".
- Material-specific searches: "wood fence installation", "wrought iron fence repair", "chain link fence installation", "pipe fence painting", "vinyl fence repair".
- Problem and use-case searches: "storm damaged fence repair", "rusty wrought iron fence restoration", "wood fence staining", "commercial fence repair", "pool fence installation".
- Cost and comparison searches: "how much does a fence cost in Dallas", "wood vs vinyl fence", "repair or replace fence".
- Visual searches: project photos, privacy fence ideas, front yard fence styles, wrought iron restoration before and after.

The goal is not to publish hundreds of keyword pages. The goal is to publish the fewest number of genuinely useful pages that cover distinct buyer intent, prove field experience, and make it easy for homeowners and property managers to request an estimate.

## 2026 SEO Principles For This Site

- Build pages around real customer decisions, not just keywords.
- Give every core service its own URL so Google and buyers can understand the offer.
- Give every major served city its own page only when Strong Perimeter can add local proof: project photos, reviews, neighborhood notes, material recommendations, permit/HOA guidance, and city-specific FAQs.
- Use original project photos and short videos heavily. Fencing is visual, and image/video visibility can create leads before a buyer is ready to call.
- Add structured data that describes the real business and real page content: `LocalBusiness`, `Service`, `BreadcrumbList`, `VideoObject`, `ImageObject`, and `FAQPage` where FAQs are visible on the page.
- Avoid thin doorway pages. A city page that only swaps "Dallas" for "Plano" is a liability.
- Create content that demonstrates first-hand expertise: what the crew sees in DFW yards, clay soil, wind damage, HOA expectations, rust patterns, staining timelines, privacy needs, pets, pools, and commercial security.

## Recommended Top-Level Navigation

Primary nav:

- Services
- Fence Types
- Service Areas
- Cost & Guides
- Projects
- Reviews
- Contact

Primary CTA:

- Get a Free Quote

Footer nav should expose the full SEO structure:

- Core services
- Fence types
- Top service areas
- Cost guide
- Project gallery
- Reviews
- Privacy policy

## Page Architecture

### 1. Homepage

URL:

- `/`

Primary intent:

- Brand search, "fence company DFW", "fence company Dallas Fort Worth", buyers evaluating trust.

Page role:

- Act as the central trust and routing page. It should not try to rank for every service. It should summarize the company, prove credibility, and route users to the right service, material, city, or guide page.

Required sections:

- H1 focused on the local offer, such as "Dallas-Fort Worth Fence Restoration, Repair, Installation, and Replacement".
- Fast quote CTA above the fold.
- Core services preview with links to dedicated pages.
- Fence type preview with links to material pages.
- Recent projects with images and locations.
- Review highlights.
- Team/credentials.
- Service area summary with link to the service area hub.
- FAQ with broad buying questions.

Schema:

- `LocalBusiness`
- `Organization`
- `WebSite`
- `BreadcrumbList`

### 2. Service Taxonomy

Strong Perimeter's SEO structure should mirror the actual offer:

- Wrought iron fence restoration, repair, painting, installation, and replacement.
- Wood fence restoration, repair, staining, installation, and replacement.
- Chain link fence repair, installation, and replacement.
- Pipe fence restoration, repair, and painting.
- Vinyl fence repair, installation, and replacement.
- All of the above for both residential and commercial customers.

Recommended URL pattern:

- Material hub: `/wrought-iron-fence/`
- Specific service: `/wrought-iron-fence-restoration/`
- Buyer type: `/residential-fencing/` and `/commercial-fencing/`

This creates clean keyword targeting without creating duplicate residential/commercial versions of every single service page. Residential and commercial intent should be handled with two strong buyer-type pages plus residential/commercial sections on each service page.

### 3. Services Hub

URL:

- `/services/`

Primary intent:

- "fence services", "fencing services DFW", users comparing what Strong Perimeter does.

Required sections:

- Restoration, repair, painting, staining, installation, and replacement service cards.
- Material rows for wrought iron, wood, chain link, pipe, and vinyl.
- Residential and commercial service callouts.
- "Restore, repair, or replace?" decision guide.
- Links to all material hubs and priority service pages.
- CTA.

Schema:

- `Service`
- `BreadcrumbList`

### 4. Action-Based Service Hubs

These pages catch broad, high-intent searches and route users into the right material-specific page.

#### Fence Restoration

URL:

- `/fence-restoration/`

Target intent:

- "fence restoration near me", "fence restoration Dallas", "restore old fence".

Page role:

- Explain restoration as a smarter alternative to full replacement when the structure can be saved. Route users to wrought iron, wood, and pipe restoration.

Child links:

- `/wrought-iron-fence-restoration/`
- `/wood-fence-restoration/`
- `/pipe-fence-restoration/`

#### Fence Repair

URL:

- `/fence-repair/`

Target intent:

- "fence repair near me", "fence repair Dallas", "fence repair DFW".

Page role:

- Broad repair page for storm damage, broken sections, leaning posts, rust, sagging gates, loose chain link, vinyl damage, and pipe fence issues.

Child links:

- `/wrought-iron-fence-repair/`
- `/wood-fence-repair/`
- `/chain-link-fence-repair/`
- `/pipe-fence-repair/`
- `/vinyl-fence-repair/`

#### Fence Installation and Replacement

URL:

- `/fence-installation-replacement/`

Target intent:

- "fence installation near me", "fence replacement near me", "new fence installation DFW".

Page role:

- Broad installation/replacement page for buyers who have not selected a material yet.

Child links:

- `/wrought-iron-fence-installation-replacement/`
- `/wood-fence-installation-replacement/`
- `/chain-link-fence-installation-replacement/`
- `/vinyl-fence-installation-replacement/`

#### Fence Painting

URL:

- `/fence-painting/`

Target intent:

- "fence painting near me", "metal fence painting", "paint rusty fence".

Page role:

- Broad painting page that routes to wrought iron and pipe fence painting.

Child links:

- `/wrought-iron-fence-painting/`
- `/pipe-fence-painting/`

#### Fence Staining

URL:

- `/fence-staining/`

Target intent:

- "fence staining near me", "wood fence staining Dallas", "stain new wood fence".

Page role:

- Wood-specific enough to be useful, but broad enough to catch "fence staining" searches.

Child link:

- `/wood-fence-staining/`

### 5. Fence Type Hub

URL:

- `/fence-types/`

Primary intent:

- "types of fences", "best fence types", homeowners and property managers choosing material.

Required sections:

- Quick comparison table: privacy, security, cost, maintenance, durability, and best use.
- Cards linking to each material hub.
- Residential vs commercial fit for each material.
- Project photos organized by material.
- CTA.

Material hubs:

- `/wrought-iron-fence/`
- `/wood-fence/`
- `/chain-link-fence/`
- `/pipe-fence/`
- `/vinyl-fence/`

### 6. Wrought Iron Fence Pages

#### Wrought Iron Fence Hub

URL:

- `/wrought-iron-fence/`

Target intent:

- "wrought iron fence Dallas", "wrought iron fence company", "iron fence contractor near me".

Required sections:

- Restoration, repair, painting, installation, and replacement.
- Where wrought iron works best: front yards, pools, estate properties, commercial frontage, security boundaries.
- Rust and maintenance guidance.
- Before/after photos and videos.
- Residential and commercial sections.
- CTA.

#### Wrought Iron Fence Restoration

URL:

- `/wrought-iron-fence-restoration/`

Target intent:

- "wrought iron fence restoration", "restore rusty iron fence", "iron fence restoration Dallas".

Required sections:

- Explain that restoration includes repairs and painting.
- Rust assessment.
- Repair scope.
- Prep and paint process.
- When restoration beats replacement.
- Before/after proof.
- CTA.

#### Wrought Iron Fence Repair

URL:

- `/wrought-iron-fence-repair/`

Target intent:

- "wrought iron fence repair", "iron fence repair near me", "rusted iron fence repair".

Required sections:

- Broken pickets, bent sections, loose panels, rust, failing welds, gate issues.
- Repair vs restoration vs replacement guidance.
- CTA.

#### Wrought Iron Fence Painting

URL:

- `/wrought-iron-fence-painting/`

Target intent:

- "wrought iron fence painting", "iron fence painting near me", "paint rusty iron fence".

Required sections:

- Rust prep.
- Primer/paint expectations.
- Finish options.
- Maintenance timeline.
- CTA.

#### Wrought Iron Fence Installation and Replacement

URL:

- `/wrought-iron-fence-installation-replacement/`

Target intent:

- "wrought iron fence installation", "iron fence replacement", "wrought iron fence company near me".

Required sections:

- New install and replacement use cases.
- Style/security considerations.
- Gate and access options if offered.
- Residential and commercial examples.
- CTA.

### 7. Wood Fence Pages

#### Wood Fence Hub

URL:

- `/wood-fence/`

Target intent:

- "wood fence Dallas", "wood fence company near me", "wood fence contractor".

Required sections:

- Restoration, repair, staining, installation, and replacement.
- Privacy fence options.
- Board-on-board, side-by-side, cap and trim, horizontal if offered.
- DFW-specific issues: sun, heat, storms, soil movement, aging pickets, stain timing.
- Residential and commercial sections.
- CTA.

#### Wood Fence Restoration

URL:

- `/wood-fence-restoration/`

Target intent:

- "wood fence restoration", "restore old wood fence", "wood fence restoration near me".

Required sections:

- Explain that restoration includes repairs and staining.
- When an old wood fence can be restored.
- Picket/rail/post repair.
- Cleaning/prep.
- Stain recommendations.
- Before/after proof.
- CTA.

#### Wood Fence Repair

URL:

- `/wood-fence-repair/`

Target intent:

- "wood fence repair near me", "wood fence repair Dallas", "repair leaning wood fence".

Required sections:

- Broken boards, leaning posts, rotten rails, storm damage, gate sag, missing pickets.
- Repair vs restoration vs replacement guidance.
- CTA.

#### Wood Fence Staining

URL:

- `/wood-fence-staining/`

Target intent:

- "wood fence staining near me", "fence staining Dallas", "stain wood fence".

Required sections:

- When to stain a new fence in North Texas.
- Stain color guidance.
- Prep process.
- Maintenance timeline.
- Photos showing finish quality.
- CTA.

#### Wood Fence Installation and Replacement

URL:

- `/wood-fence-installation-replacement/`

Target intent:

- "wood fence installation", "wood fence replacement", "privacy fence installation DFW".

Required sections:

- New install and full replacement.
- Privacy layouts.
- Post/material options.
- Staining add-on.
- Cost factors.
- CTA.

### 8. Chain Link Fence Pages

#### Chain Link Fence Hub

URL:

- `/chain-link-fence/`

Target intent:

- "chain link fence Dallas", "chain link fence company", "commercial chain link fence".

Required sections:

- Repair, installation, and replacement.
- Residential, commercial, utility, security, and pet containment use cases.
- Galvanized vs coated if offered.
- Height and gate options.
- CTA.

#### Chain Link Fence Repair

URL:

- `/chain-link-fence-repair/`

Target intent:

- "chain link fence repair near me", "chain link fence repair Dallas", "fix chain link fence".

Required sections:

- Loose fabric, damaged posts, bent rails, tension wire issues, gate problems, storm damage.
- Repair vs replacement guidance.
- CTA.

#### Chain Link Fence Installation and Replacement

URL:

- `/chain-link-fence-installation-replacement/`

Target intent:

- "chain link fence installation", "chain link fence replacement", "commercial chain link fencing".

Required sections:

- Residential and commercial installs.
- Security and boundary use cases.
- Gate/access options.
- Cost factors.
- CTA.

### 9. Pipe Fence Pages

#### Pipe Fence Hub

URL:

- `/pipe-fence/`

Target intent:

- "pipe fence contractor", "pipe fence repair", "pipe fence painting".

Required sections:

- Restoration, repair, and painting.
- Residential, commercial, ranch-style, and perimeter use cases.
- Rust and finish guidance.
- CTA.

#### Pipe Fence Restoration

URL:

- `/pipe-fence-restoration/`

Target intent:

- "pipe fence restoration", "restore pipe fence", "pipe fence restoration near me".

Required sections:

- Explain that restoration includes repairs and painting.
- Rust and structural assessment.
- Repair process.
- Paint process.
- Before/after proof.
- CTA.

#### Pipe Fence Repair

URL:

- `/pipe-fence-repair/`

Target intent:

- "pipe fence repair", "pipe fence repair near me".

Required sections:

- Bent rails, rust, broken sections, loose posts, gate issues.
- CTA.

#### Pipe Fence Painting

URL:

- `/pipe-fence-painting/`

Target intent:

- "pipe fence painting", "paint pipe fence", "metal pipe fence painting".

Required sections:

- Prep.
- Rust treatment.
- Paint system.
- Maintenance expectations.
- CTA.

### 10. Vinyl Fence Pages

#### Vinyl Fence Hub

URL:

- `/vinyl-fence/`

Target intent:

- "vinyl fence company", "vinyl fence repair", "vinyl fence installation".

Required sections:

- Repair, installation, and replacement.
- Privacy, low-maintenance, residential, and commercial applications.
- Common vinyl failures: cracked panels, loose posts, gate issues, storm damage.
- CTA.

#### Vinyl Fence Repair

URL:

- `/vinyl-fence-repair/`

Target intent:

- "vinyl fence repair near me", "vinyl fence repair Dallas", "repair vinyl fence panel".

Required sections:

- Cracked panels, damaged posts, gate alignment, wind damage, replacement parts.
- Repair vs replacement guidance.
- CTA.

#### Vinyl Fence Installation and Replacement

URL:

- `/vinyl-fence-installation-replacement/`

Target intent:

- "vinyl fence installation", "vinyl fence replacement", "vinyl privacy fence near me".

Required sections:

- New install and full replacement.
- Privacy and low-maintenance benefits.
- Color/style options if offered.
- Cost factors.
- CTA.

### 11. Buyer Type and Use-Case Pages

These pages handle residential and commercial intent without duplicating every service page.

Priority buyer-type pages:

- `/residential-fencing/`
- `/commercial-fencing/`

Priority use-case pages:

- `/privacy-fence-installation/`
- `/pool-fence-installation/`
- `/dog-fence-installation/`
- `/security-fencing/`
- `/storm-damaged-fence-repair/`
- `/hoa-fence-installation/`

Publish use-case pages only where Strong Perimeter truly serves that need through one of its material services.

Each page should include:

- Who this is for.
- Which materials fit best.
- Which Strong Perimeter services apply.
- Mistakes to avoid.
- Photos.
- Cost factors.
- Relevant city/HOA/permit notes, verified before publishing.
- Internal links to service, material, and city pages.
- CTA.

### 12. Service Area Hub

URL:

- `/service-areas/`

Primary intent:

- "fence company near me", "fence contractor DFW", local users browsing coverage.

Required sections:

- DFW coverage map or city grid.
- Top city links.
- County/service region overview.
- Photos from different parts of the metroplex.
- Review highlights with city names when available.
- CTA.

Schema:

- `LocalBusiness`
- `Service`
- `BreadcrumbList`

### 13. City Pages

City pages should be built in tiers. Start with cities where Strong Perimeter has jobs, photos, reviews, or a meaningful operational advantage.

Tier 1 city pages:

- `/service-areas/dallas-tx-fence-company/`
- `/service-areas/fort-worth-tx-fence-company/`
- `/service-areas/plano-tx-fence-company/`
- `/service-areas/frisco-tx-fence-company/`
- `/service-areas/arlington-tx-fence-company/`
- `/service-areas/mckinney-tx-fence-company/`
- `/service-areas/allen-tx-fence-company/`
- `/service-areas/richardson-tx-fence-company/`

Tier 2 city pages:

- `/service-areas/garland-tx-fence-company/`
- `/service-areas/irving-tx-fence-company/`
- `/service-areas/grand-prairie-tx-fence-company/`
- `/service-areas/carrollton-tx-fence-company/`
- `/service-areas/lewisville-tx-fence-company/`
- `/service-areas/flower-mound-tx-fence-company/`
- `/service-areas/grapevine-tx-fence-company/`
- `/service-areas/southlake-tx-fence-company/`
- `/service-areas/keller-tx-fence-company/`
- `/service-areas/coppell-tx-fence-company/`
- `/service-areas/mesquite-tx-fence-company/`
- `/service-areas/rockwall-tx-fence-company/`

City page template:

- H1: "Fence Company in [City], TX".
- Short city-specific intro.
- Services offered in that city.
- Material recommendations for local property types.
- Nearby neighborhoods or areas served.
- Local project photos or case studies.
- Review quote from that city when available.
- Local permitting/HOA note, verified and linked when possible.
- FAQ specific to that city.
- Links to material pages.
- CTA.

Do not publish a city page unless it has at least three of these:

- Original project photo from or near the city.
- Review from that city.
- City-specific permit, HOA, neighborhood, soil, storm, or property-type detail.
- A nearby project case study.
- Distinct service note, such as commercial corridors, estate properties, pool fencing demand, alley fences, or storm repair demand.

### 14. Cost and Estimate Pages

Cost content is critical because buyers search before they are ready to call. These pages should be honest, range-based, and careful not to overpromise.

Priority pages:

- `/fence-cost-dfw/`
- `/wood-fence-cost-dfw/`
- `/chain-link-fence-cost-dfw/`
- `/wrought-iron-fence-cost-dfw/`
- `/pipe-fence-cost-dfw/`
- `/vinyl-fence-cost-dfw/`
- `/fence-repair-cost-dfw/`
- `/fence-restoration-cost-dfw/`
- `/wood-fence-staining-cost-dfw/`
- `/wrought-iron-fence-painting-cost-dfw/`
- `/fence-cost-calculator/`

Required sections:

- Cost ranges if Strong Perimeter is comfortable publishing them.
- Factors that change price: linear footage, height, material, demolition, terrain, post type, restoration scope, repair scope, staining/painting prep, access, and commercial security requirements.
- What is included in an estimate.
- Photos of simple vs premium examples.
- "When to call for an exact quote."
- CTA.

Calculator notes:

- The calculator should collect fence length, height, material, restoration/repair/install need, removal, finish, city, residential/commercial use, and timeline.
- Output should be a planning range, not a final quote.
- The final CTA should request an estimate with the inputs attached.

### 15. Comparison and Decision Guides

These pages serve earlier-stage buyers and feed internal links to service pages.

Priority guide pages:

- `/restore-or-replace-fence/`
- `/wood-vs-vinyl-fence/`
- `/wood-vs-chain-link-fence/`
- `/repair-or-replace-fence/`
- `/wrought-iron-fence-restoration-vs-replacement/`
- `/wood-fence-restoration-vs-replacement/`
- `/pipe-fence-painting-vs-replacement/`
- `/vinyl-fence-repair-or-replace/`
- `/best-fence-for-dogs/`
- `/best-fence-for-privacy/`
- `/best-fence-for-pool/`
- `/how-long-does-a-wood-fence-last-in-texas/`
- `/when-to-stain-a-new-fence/`
- `/fence-height-rules-dfw/`
- `/do-i-need-a-permit-for-a-fence-in-dfw/`

Required sections:

- Direct answer near the top.
- Comparison table.
- Pros/cons grounded in field experience.
- DFW-specific recommendation.
- Photos.
- Links to relevant services.
- CTA.

### 16. Project Gallery and Case Studies

Fencing needs proof. A gallery should not be a generic slideshow; it should be an SEO asset.

Hub URLs:

- `/projects/`
- `/projects/wood-fences/`
- `/projects/wrought-iron-fences/`
- `/projects/chain-link-fences/`
- `/projects/pipe-fences/`
- `/projects/vinyl-fences/`
- `/projects/fence-restorations/`
- `/projects/fence-repairs/`
- `/projects/fence-staining-painting/`

Individual case study URL examples:

- `/projects/wood-privacy-fence-dallas-tx/`
- `/projects/wrought-iron-fence-restoration-dallas-tx/`
- `/projects/chain-link-fence-repair-fort-worth-tx/`
- `/projects/pipe-fence-painting-plano-tx/`
- `/projects/vinyl-fence-replacement-frisco-tx/`

Case study template:

- Project type.
- City/neighborhood.
- Problem.
- Recommended solution.
- Materials used.
- Timeline.
- Before/after photos.
- Short customer outcome.
- Links to relevant service, material, and city pages.

Image SEO requirements:

- Descriptive filenames, such as `cedar-privacy-fence-dallas-tx.jpg`.
- Alt text that describes the real image.
- Captions with material, location, and project type.
- Avoid hiding all photos in JavaScript-only sliders.

### 17. Reviews and Trust Pages

Priority pages:

- `/reviews/`
- `/about/`
- `/team/`
- `/faq/`
- `/contact/`

Reviews page:

- Organize reviews by service type.
- Include review date, customer first name/last initial, city when available, service performed, and link to relevant service pages.
- Do not mark up third-party reviews with review schema unless the reviews are first-party and compliant with Google's guidelines.

About/team pages:

- Show real people, real experience, credentials, associations, and what quality control looks like.
- Link team and trust content from service pages.

FAQ page:

- Use it as a navigation hub for broad questions.
- Also place specific FAQs on individual service and city pages.

### 18. GBP and Off-Site Alignment

The website structure should match the Google Business Profile:

- Primary category: Fence contractor.
- Services listed in GBP should match site service pages.
- Photos should be uploaded by material and project type.
- Posts should highlight recent projects, restoration work, seasonal fence repair, wood staining, metal painting, and installation/replacement availability.
- Review requests should ask customers to mention the service and city naturally when true.

Do not invent services or cities on the website that are absent from operations and GBP.

## First 90 Days Build Order

### Phase 1 - Foundation, Hubs, and Trust Pages

Build or rewrite:

1. `/`
2. `/services/`
3. `/fence-types/`
4. `/fence-restoration/`
5. `/fence-repair/`
6. `/fence-installation-replacement/`
7. `/fence-painting/`
8. `/fence-staining/`
9. `/wrought-iron-fence/`
10. `/wood-fence/`
11. `/chain-link-fence/`
12. `/pipe-fence/`
13. `/vinyl-fence/`
14. `/residential-fencing/`
15. `/commercial-fencing/`
16. `/service-areas/`
17. `/reviews/`
18. `/projects/`

### Phase 2 - Material-Specific Money Pages

Build:

1. `/wrought-iron-fence-restoration/`
2. `/wrought-iron-fence-repair/`
3. `/wrought-iron-fence-painting/`
4. `/wrought-iron-fence-installation-replacement/`
5. `/wood-fence-restoration/`
6. `/wood-fence-repair/`
7. `/wood-fence-staining/`
8. `/wood-fence-installation-replacement/`
9. `/chain-link-fence-repair/`
10. `/chain-link-fence-installation-replacement/`
11. `/pipe-fence-restoration/`
12. `/pipe-fence-repair/`
13. `/pipe-fence-painting/`
14. `/vinyl-fence-repair/`
15. `/vinyl-fence-installation-replacement/`

### Phase 3 - Local Expansion

Build only with local proof:

1. Dallas
2. Fort Worth
3. Plano
4. Frisco
5. Arlington
6. McKinney
7. Allen
8. Richardson

### Phase 4 - Cost and Decision Content

Build:

1. `/fence-cost-dfw/`
2. `/fence-cost-calculator/`
3. `/fence-restoration-cost-dfw/`
4. `/restore-or-replace-fence/`
5. `/repair-or-replace-fence/`
6. `/best-fence-for-privacy/`
7. `/best-fence-for-dogs/`
8. `/when-to-stain-a-new-fence/`
9. `/do-i-need-a-permit-for-a-fence-in-dfw/`

### Phase 5 - Project Proof Machine

Publish monthly:

- 2 to 4 project case studies.
- 10 to 20 optimized project photos.
- 1 short video or before/after walkthrough when available.

## Internal Linking Model

Homepage links to:

- Top service pages.
- Material pages.
- Service area hub.
- Recent projects.
- Reviews.

Service pages link to:

- Relevant material pages.
- Relevant cost pages.
- Relevant city pages.
- Project examples.

Material pages link to:

- Restoration, repair, staining, painting, and installation/replacement pages that apply to that material.
- Cost guides.
- Project gallery filtered by material.
- Top city pages.

City pages link to:

- Service pages.
- Material pages.
- City-specific projects.
- Reviews.

Guide pages link to:

- The service page that solves the problem.
- The most relevant material page.
- Quote CTA.

Project pages link to:

- The city page.
- The service page.
- The material page.
- Related projects.

## On-Page Template For Service Pages

Use this structure for most service pages:

1. H1 with service and DFW modifier.
2. Short direct answer/positioning paragraph.
3. CTA row: "Get a Free Quote" and phone number.
4. Proof block: reviews, AFA badge, team, project photo.
5. What we do.
6. When you need this service.
7. Material or option breakdown.
8. Process.
9. Cost factors.
10. Project photos or videos.
11. Service areas.
12. FAQs.
13. Final CTA.

## Metadata Pattern

Title examples:

- `Wrought Iron Fence Restoration in Dallas-Fort Worth | Strong Perimeter`
- `Wood Fence Repair in DFW | Strong Perimeter`
- `Pipe Fence Painting in Dallas-Fort Worth | Strong Perimeter`
- `Vinyl Fence Installation & Replacement in DFW | Strong Perimeter`
- `Fence Company in Dallas, TX | Strong Perimeter`

Meta description pattern:

- Say the service, area, key materials, and CTA in plain language.
- Keep it useful, not stuffed.

Example:

- `Strong Perimeter restores, repairs, paints, stains, installs, and replaces residential and commercial fences across Dallas-Fort Worth. Request a clear quote today.`

## Content Quality Rules

Every page must answer:

- Who is this for?
- What problem does it solve?
- What does Strong Perimeter actually do?
- What does it cost or what changes the cost?
- What should a buyer know before calling?
- What proof do we have?
- What is the next step?

Every page should include at least one of:

- Original project photos.
- Video.
- Review.
- Crew/process insight.
- Local detail.
- Cost guidance.
- Decision table.

Avoid:

- Publishing service pages for services not actually offered.
- Publishing city pages without local proof.
- Copying manufacturer or competitor content.
- Writing only generic "we are the best fence company" copy.
- Creating dozens of near-duplicate pages for every keyword variation.

## Measurement Plan

Track in Google Search Console:

- Queries by page cluster: service, material, city, cost, guide, project.
- Click-through rate for title/meta tests.
- Indexing status for new pages.
- Image search impressions for project pages.
- Pages with impressions but low clicks.
- Pages with clicks but low quote conversions.

Track in analytics:

- Quote form starts.
- Quote form submissions.
- Click-to-call.
- Email clicks.
- City page conversion rate.
- Service page conversion rate.
- Cost guide assisted conversions.

## Source Basis

- Google Search Central, Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, Generative AI Search Optimization: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, LocalBusiness Structured Data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- FenceWebs, fence company keyword patterns: https://fencewebs.com/fence-company-seo-keywords/
- D&D SEO Services, fence SEO page-structure patterns: https://dndseoservices.com/blog/fencing-seo-guide/
