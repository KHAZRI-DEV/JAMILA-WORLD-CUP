# Raibi Jamila — World Cup Edition 2026 Landing

## Original problem statement
Cinematic landing page for Raibi Jamila (Moroccan fermented milk drink) celebrating the Atlas Lions' road to the 2026 FIFA World Cup. Apple-x-Nike polish, Linear scroll precision, Stripe motion fluidity, soaked in Moroccan crimson + zellige gold + pitch-green.

## User personas
- Moroccan diaspora in the US / Canada / EU — emotional brand bond with home & football
- Moroccan domestic consumers — fans, families, collectors
- Football fans worldwide discovering Moroccan culture via World Cup 2026
- Retail/media partners seeking limited-edition launch info

## Core requirements (static)
- Multi-language (FR / AR-RTL / EN) toggle, persisted in localStorage
- Cinematic hero with floating cup + parallax + double-exposure mosque/stadium background
- Horizontal scroll "Journey" Morocco ↔ USA with animated 8,000 km counter
- Product close-up section "La Saveur" with AR-style ingredient callouts + tilt-on-scroll
- "Feel the Roar" mic-based audio-reactive canvas visualizer + confetti burst on cheer
- Limited Edition section with rotating packshot, foil gold details, QR scan badge
- Footer: newsletter capture, store locator (MA/US filter), social fan wall, marquee
- Zellige tile dividers + ticket-tear transitions + grain texture overlays
- Magenta + crimson + Morocco green + gold palette (matches real product)

## Architecture
- Backend: FastAPI + MongoDB (motor)
  - `GET /api/` — health
  - `POST /api/newsletter` — email capture (idempotent on duplicate)
  - `GET /api/newsletter/count`
  - `POST /api/roar` — log mic-roar intensity, returns total + avg
  - `GET /api/roar/stats`
  - `GET /api/social/feed` — 6 static social posts
  - `GET /api/stores` — 8 stores, `?country=MA|US` filter
- Frontend: React 19 + Tailwind + Framer Motion + Lucide icons + Sonner toasts
  - Components: Header, Hero, Journey, Saveur, LionsRoar, Edition, Footer
  - i18n via React Context (dict in `/src/i18n.js`)
- Real product images from user upload used throughout

## What's been implemented (2026-12)
- All 7 sections wired into a single landing page
- Backend with 8 endpoints, 13/13 backend tests passing
- Real product imagery integrated (cup top-down, floating, splash, stadium QR)
- Audio Web API mic visualizer with graceful fallback if mic denied
- Confetti burst on intensity > 0.55
- RTL support for Arabic
- Newsletter capture wired to MongoDB

## Prioritized backlog
### P1
- Add real video embed in "When Lions Roar" (currently still background image)
- Connect a real social provider (Instagram Graph / X API) instead of static feed
- Implement 3D rotating packshot using react-three-fiber (currently animated 2D rotation)
- Geo-IP redirect language guess
- Email service integration (Resend) to send welcome email on subscribe

### P2
- A/B test variants of hero tagline
- Loyalty/giveaway flow tied to QR scan
- Player roster page for the Atlas Lions squad
- Match day countdown timer
- Spotify "stadium chants" playlist embed

## Next tasks
1. Hook real Instagram Graph API for #MoroccoUSA2026 feed
2. Add proper analytics (Plausible / GA) to track CTA clicks + roar events
3. SEO: og-image, structured data, sitemap, multilingual hreflang
