---
name: Artisanal Açaí Experience
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4f434a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#81737a'
  outline-variant: '#d3c2ca'
  surface-tint: '#824d72'
  primary: '#320729'
  on-primary: '#ffffff'
  primary-container: '#4b1d3f'
  on-primary-container: '#bf83ab'
  inverse-primary: '#f5b3dd'
  secondary: '#396a00'
  on-secondary: '#ffffff'
  secondary-container: '#b6f47c'
  on-secondary-container: '#3d7100'
  tertiary: '#191915'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e2e2a'
  on-tertiary-container: '#97958f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8ee'
  primary-fixed-dim: '#f5b3dd'
  on-primary-fixed: '#35092b'
  on-primary-fixed-variant: '#683659'
  secondary-fixed: '#b6f47c'
  secondary-fixed-dim: '#9bd764'
  on-secondary-fixed: '#0d2000'
  on-secondary-fixed-variant: '#2a5000'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  price-tag:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  card-gap: 24px
---

## Brand & Style

The design system is centered around a "Fresh-to-Table" artisanal aesthetic, blending the efficiency of a modern SaaS platform with the organic warmth of a premium health-food brand. The target audience includes health-conscious urbanites and fitness enthusiasts who value both speed and quality.

The UI utilizes a **Modern-Organic** style. It leverages high-quality whitespace and crisp typography to maintain a professional e-commerce feel, while introducing tactile elements—subtle grain and leaf motifs—to evoke the raw, natural origin of the product. The interface should feel energized and clean, avoiding the "heavy" feeling often associated with dark-themed food apps.

## Colors

The palette is anchored by "Deep Açaí" (#4B1D3F), used for primary actions, branding, and high-level hierarchy. "Leaf Green" (#6BA336) serves as the accent for health-positive indicators, prices, and organic highlights. 

The background is not a flat white but "Natural Kraft" (#F4F1EA), providing a soft, paper-like warmth that reduces screen glare. A subtle, low-opacity (2-3%) repeating açaí leaf pattern is overlaid on the main container background to add depth without distracting from the content. Secondary buttons and inactive states use a desaturated version of the primary purple to maintain tonal consistency.

## Typography

The system uses a tiered typographic approach. **Plus Jakarta Sans** provides a modern, geometric, and friendly foundation for all functional UI elements, ensuring high legibility in a fast-paced ordering environment. 

For brand highlights, special offers, and section introductions, **Playfair Display** (an elegant serif/script alternative) is used to inject a sense of craft and premium quality. Headers should use tight letter spacing and bold weights to command attention, while body copy maintains generous line heights for readability against the textured backgrounds.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **single-column flow** for mobile. A strict 8px base unit governs all dimensions. 

- **Desktop:** The shopping cart is a persistent sidebar (320px - 380px) on the right, while the product grid occupies the remaining fluid space.
- **Mobile:** The cart is accessible via a floating bottom bar or a full-screen slide-up overlay. 
- **Margins:** Horizontal padding scales from 16px on mobile to 40px on large displays to maintain an airy, breathable feel. 
- **Product Grid:** Elements are spaced with a 24px gap to ensure touch targets are clear and the visuals do not feel cluttered.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of physical presence. 

- **Surface 0:** The base Kraft/Wood texture.
- **Surface 1 (Cards):** Pure white backgrounds with a very soft, high-diffusion shadow (0px 4px 20px, 5% opacity of the primary purple) to make them appear slightly lifted.
- **Surface 2 (Active Elements/Cart):** A slightly higher elevation with a more pronounced shadow to indicate interactive priority.

Border treatments are kept minimal; instead of heavy strokes, depth is achieved through subtle shifts in background color and the softest possible drop shadows, ensuring the UI remains "clean" and "fresh."

## Shapes

The shape language is **Rounded (Level 2)**, mirroring the organic shapes of fruits and bowls. Standard buttons and input fields utilize an 8px (0.5rem) radius. Large product cards and the cart sidebar use 16px (1rem) for a friendlier, softer appearance. Category buttons use a full pill-shape (32px+) to distinguish them from functional action buttons.

## Components

### Buttons
- **Primary:** Deep Açaí background, white text, 8px border radius. High-contrast and bold.
- **Category:** Pill-shaped, light green or purple tint background with matching colored icons and text. 
- **Quantity Adjuster:** A compact, rounded-pill component with a neutral gray background and clear +/- icons.

### Product Cards
Cards feature a high-resolution top-aligned image with a slight zoom-on-hover effect. The bottom section contains the product name, a brief description in secondary text, and the price in "Leaf Green" bold type.

### Shopping Cart Sidebar
A clean, white vertical container. Item rows are separated by thin, light-gray dividers. The "Checkout" button is pinned to the bottom, using the primary purple to ensure it is the most prominent element on the screen.

### Inputs & Selection
Checkboxes and radio buttons for "Add-ons" (toppings) use the primary purple when active. Text inputs for special instructions use a subtle white background with a 1px border in a lightened version of the Kraft base color.