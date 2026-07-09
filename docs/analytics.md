# Analytics (GA4)

The portfolio sends events to Google Analytics 4. This doc is the source of
truth for **what we track**, **how it's wired**, and **how to turn the raw
events into useful reports** in the GA4 UI.

## Setup

- Measurement ID comes from `NEXT_PUBLIC_GA_ID` (see [.env.example](../.env.example)).
  Falls back to the production property `G-SYDGLK4LKX` if unset — defined once in
  [lib/ga.ts](../lib/ga.ts).
- The gtag snippet lives in [app/layout.tsx](../app/layout.tsx) and is loaded with
  `send_page_view: false`. **Page views are sent manually** by
  [GA4PageView.tsx](../components/GA4PageView.tsx) on every route change (including
  the first load) so SPA navigations are counted and the landing page isn't
  double-counted.
- All event dispatch goes through `trackEvent` in
  [lib/analytics.ts](../lib/analytics.ts). Console logging is gated behind
  `GA_DEBUG` (dev only) — production is silent.

### Dev testing

In the browser console (dev build):

- `analytics.testAll()` — fires one of every event.
- `checkGA4Status()` — shows whether gtag/dataLayer are ready and the active property ID.

Then watch **GA4 → Reports → Realtime** to confirm events arrive.

## Event catalog

| Event name | Trigger | Key params |
|---|---|---|
| `page_view` | Every route change / initial load | `page_path`, `page_location`, `page_title` |
| `project_click` | Project card click (when instrumented) | `project_title`, `project_slug`, `project_tags` |
| `project_view` | Case-study page viewed | `project_title`, `project_slug` |
| `project_time_spent` | Time on a case study (on leave/hide) | `project_title`, `project_slug`, `time_spent_seconds` |
| `project_section_click` | Section link within a case study | `project_title`, `project_slug`, `section_name` |
| `filter_change` | Work/timeline filter selected | `filter_name` |
| `grid_toggle` | Work grid density toggle | `grid_size` (`1x1` / `2x2`) |
| `navigation_click` | Internal nav / section jump | `page_name`, `link_text` |
| `video_play` | Project thumb video starts | `video_title`, `video_src` |
| `video_hover` | Pointer enters a hover-play thumb | `video_title` |
| `portfolio_chat_message` | User sends a Ti chat message | `message_length_bucket` (no content — privacy) |
| `portfolio_chat_open` | Ti chat opened | `chat_surface` (`global`/`project`), `project_slug` |
| `outbound_click` | Any external link click (site-wide) | `link_url`, `link_domain`, `link_category`, `link_text` |
| `email_click` | mailto / "Email me" click | `link_location` |

**Coverage notes**
- `project_click` fires from `ProjectListLink`, `FeaturedProjectCard`, and `ProjectThumbGrid`.
- `navigation_click` is emitted by [NavigationLinkTracker.tsx](../components/NavigationLinkTracker.tsx) — hash section links (`/#timeline`, …), home, playground, workshops, and chat routes.
- `video_hover` / `video_play` fire from hover-play thumbs in `ProjectListLink`, `ProjectThumbGrid`, and `FeaturedProjectCard` (plus autoplay on touch for featured cards).
- `filter_change` and `grid_toggle` helpers remain in [lib/analytics.ts](../lib/analytics.ts) for GA4 parity with the legacy work page; there is no active filter/grid UI in the current home shell — wire them again if those controls return.
- `outbound_click` is emitted by a single delegated listener in
  [OutboundLinkTracker.tsx](../components/OutboundLinkTracker.tsx) — it catches every
  external anchor and `mailto:`, so new links are tracked automatically without
  per-component wiring. `link_category` is coarse (`social:linkedin`,
  `social:youtube`, `external`, …).
- `email_click` also fires from the JS-based [HomeDeEmailLink](../components/HomeDeEmailLink.tsx)
  button (not an anchor, so the global listener can't see it).

## Making the data usable in GA4

GA4 does **not** show custom event params in standard reports until you register
them. Do this once in the GA4 admin:

### 1. Register custom dimensions

**Admin → Custom definitions → Create custom dimension** (scope: *Event*) for each
param you want to slice by:

| Dimension name | Event parameter |
|---|---|
| Project slug | `project_slug` |
| Section name | `section_name` |
| Link domain | `link_domain` |
| Link category | `link_category` |
| Chat surface | `chat_surface` |
| Message length | `message_length_bucket` |
| Filter name | `filter_name` |
| Grid size | `grid_size` |
| Page name | `page_name` |
| Video title | `video_title` |

For a numeric metric (avg time on a case study), also create a **custom metric**
for `time_spent_seconds`.

> Note: dimensions only apply to data collected *after* they're created.

### 2. Mark conversions (key events)

**Admin → Events → mark as key event** the actions that represent real interest:

- `email_click` — strongest intent signal
- `outbound_click` (or a filtered version where `link_category = social:linkedin`)
- `portfolio_chat_message`
- `project_view`

### 3. Reports to build (Explore → Free form)

- **Project performance** — rows: `project_slug`; metrics: `project_view` count,
  avg `time_spent_seconds`, `project_section_click` count. Which case studies hold
  attention.
- **Funnel** — `page_view` → `project_click` → `project_view` → `email_click` /
  `portfolio_chat_message`. Where people drop off.
- **Outbound** — rows: `link_category` / `link_domain`; metric: `outbound_click`.
  Where traffic goes (LinkedIn vs Dribbble vs live projects).
- **Chat engagement** — `portfolio_chat_open` vs `portfolio_chat_message` by
  `chat_surface`, split global vs per-case-study widget.

## Privacy

- No message content is ever sent — chat only reports a length bucket.
- No cookie-consent banner is implemented (deliberate, personal-portfolio scope).
  If EU-compliant analytics is needed later, add Google Consent Mode v2 + a banner.
