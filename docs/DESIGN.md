---
name: Pastel Weather Wardrobe
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#3e484f'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#6e7980'
  outline-variant: '#bdc8d1'
  surface-tint: '#00668a'
  primary: '#00668a'
  on-primary: '#ffffff'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#7bd0ff'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffc329'
  on-secondary-container: '#6f5100'
  tertiary: '#a93349'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff919e'
  on-tertiary-container: '#841630'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffdadc'
  tertiary-fixed-dim: '#ffb2b9'
  on-tertiary-fixed: '#400010'
  on-tertiary-fixed-variant: '#891933'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system expresses a playful, character-driven weather curation experience built for daily mobile routines. It merges pastel warmth with tactile sticker-like graphics, tongue-in-cheek MZ meme callouts (such as "Freezing Coat Alert" or "Escaping Down Jacket No. 1"), and interactive avatar dressing. 

The aesthetic is Tactile & Playful Casual: soft pillowy containers, generous inner margins, subtle card tilts (-2deg to +3deg on hover/tap), and rounded borders. Surfaces feel like physical paper stickers and soft silicone badges rather than clinical digital panels. Characters take center stage as empathetic emotional proxies for daily comfort, translating dry meteorological metrics into witty, immediate clothing decisions.

## Colors

The palette balances airy sky tones with cozy warmth and punchy accents:
- **Primary (`#38BDF8`)**: Sky Breeze. Used for main interactive triggers, weather-state anchors, and core active tabs.
- **Secondary (`#FBBF24`)**: Sunshine Gold. Drives meme callouts, weather warning badges, and sunbeam highlights.
- **Tertiary (`#FB7185`)**: Coral Blossom. Highlights seasonal items, alert stickers, and playful reaction states.
- **Neutral (`#334155`)**: Slate Navy. Ensures high-legibility copy without the harshness of pure black.

Extended tokens support soft pastel canvas tiers:
- **Canvas Base**: `#FFFDF9` (Warm Cream).
- **Card Surface**: `#FFFFFF` with tinted variations: `#F0FDF4` (Mint Fresh), `#EFF6FF` (Ice Chill), `#FEF3C7` (Breezy Sun).
- **Subtle Outline / Stitching**: `#E2E8F0`.

## Typography

Plus Jakarta Sans brings a bouncy, geometric friendliness with wide apertures and softly curved terminals that match Korean hangul system fonts (such as Pretendard Rounded). 

- **Headlines**: Set at extra-bold weights (`700` and `800`) with tight letter spacing for crisp, sticker-like punchiness on short meme catchphrases and temperature callouts.
- **Body & Captions**: Prioritize comfortable legibility (`500` regular weights) over a warm background to make reading clothing layers and accessory lists effortless.
- **Labels & Badges**: Distinct uppercase or emphasized bold tracking (`700`) ensures micro-stickers remain clear even when scaled down to fit small outfit thumbnails.

## Layout & Spacing

The layout is built mobile-first, targeting an ergonomic one-handed viewport constrained to a max-width of 480px on desktop with centered positioning.

- **Grid Model**: A fluid 4-column layout on mobile, transitioning to a flexible container with unified outer gutters.
- **Rhythm**: 8px baseline rhythm tailored with specific half-steps (`0.875rem` / 14px) to retain tight, pillowy encapsulation inside cards.
- **Section Stack**: Top weather badge stage → Interactive avatar zone → Style switcher pill tabs → Layer-by-layer outfit cards → "Must-have" pouch sticker grid.

## Elevation & Depth

This design system uses tactile "squishy" depth over dark cast shadows:

- **Surface Tiers**: Base canvas (`#FFFDF9`) sits beneath elevated card components (`#FFFFFF`) with 1.5px soft borders (`#E2E8F0`).
- **Pillow Shadows**: Soft, diffused colored tints rather than murky grays. Level 1 cards use `0 6px 16px -2px rgba(56, 189, 248, 0.12)`.
- **Sticker Badges**: Sharp, micro-extrusion shadows (`0 3px 0px rgba(0, 0, 0, 0.08)`) simulating die-cut vinyl stickers applied over clothing cards.
- **Active State / Taps**: Physical depress effect—scaling down to `0.97` with the shadow flattening to zero depth (`translateY(2px)`).

## Shapes

The shape system utilizes pill and balloon-like curves:
- All buttons, chips, and quick-filter pills use complete pill radiuses (`rounded-full`).
- Major cards, the weather stage, and wardrobe modules feature `rounded-3xl` (24px–32px), creating a friendly, toy-box aesthetic.
- Sticker callouts feature slight asymmetric skewing (`rotate-[-2deg]` and `rotate-[2deg]`) with `rounded-2xl` corners to simulate hand-placed decals.

## Components

- **Buttons**: Bulbous pill shapes with bouncy spring transforms (`active:scale-95`). The primary button features a bold sky-blue fill with white bold text and a subtle inner top highlight border.
- **Chips & Style Tabs**: Floating pill toggles with smooth pill indicators for switching between "Daily Casual", "Office Clean", and "Cozy Sporty". Active state uses an accent fill with soft colored shadow.
- **Clothing Cards (Closet Cards)**: Elevated white cards featuring segmented apparel layers (outer, top, bottom, shoes) with micro-badges showing temperature fitness ("Windproof 99%", "Breathable").
- **Weather Stage & Avatar Box**: Centered interactive stage showcasing the mascot reacting with expressive weather emojis (🥶 to 🥵) based on real-feel wind and humidity sliders.
- **Sticker Badges & Gauges**: Angular, pill-shaped tilt tags ("얼죽코 경보", "패딩 탈출!") styled with contrasting pastel backgrounds, bright borders, and drop-emojis.
- **Input Fields & Sliders**: Chunky rounded tracks with oversized thumb grips styled as weather icons (sun, snowflake, raindrop) providing tactile dragging feedback.