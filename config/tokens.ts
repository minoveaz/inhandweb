/**
 * INHAND Design System v0.1 — Centralized Design Tokens
 * Source of truth synced with foundation/INHAND-design-system-kit/output/tokens.json
 */
export const INHAND_TOKENS = {
  version: '0.1.0',
  status: 'active',
  color: {
    brand: {
      primary: '#092B8B',
      dark: '#09286F',
    },
    surface: {
      canvas: '#FBF6EE',
      raised: '#FFFAF3',
      soft: '#E4E8DF',
    },
    text: {
      primary: '#172C52',
      secondary: '#646A78',
      onAction: '#FBF6EE',
    },
    action: {
      primary: '#092B8B',
      hover: '#09286F',
      disabled: '#E7E5DF',
    },
    border: {
      subtle: '#DDDCD3',
      control: '#7C8390',
    },
    focus: '#3459DF',
    accent: {
      decorative: '#FF6638',
      soft: '#F5DFCD',
    },
    success: {
      foreground: '#216249',
      background: '#E8F2EC',
    },
    warning: {
      foreground: '#81510C',
      background: '#FFF1D8',
    },
    danger: {
      foreground: '#B33836',
      background: '#FBECEA',
    },
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
  },
  radius: {
    control: '4px',
    card: '8px',
    dialog: '12px',
    pill: '999px',
  },
  font: {
    display: {
      family: 'Georgia, "Space Grotesk", serif',
      size: '64px',
      lineHeight: 1.05,
    },
    heading: {
      family: 'Georgia, "Space Grotesk", serif',
      size: '40px',
      lineHeight: 1.15,
    },
    subheading: {
      family: 'Georgia, "Plus Jakarta Sans", serif',
      size: '28px',
      lineHeight: 1.2,
    },
    body: {
      family: '"Manrope", Arial, sans-serif',
      size: '16px',
      lineHeight: 1.5,
    },
    label: {
      family: '"Manrope", Arial, sans-serif',
      size: '14px',
      lineHeight: 1.4,
    },
    helper: {
      family: '"Manrope", Arial, sans-serif',
      size: '12px',
      lineHeight: 1.5,
    },
  },
  control: {
    sm: '36px',
    md: '44px',
    lg: '52px',
    touchTarget: '44px',
  },
  motion: {
    fast: '160ms',
    panel: '240ms',
  },
  breakpoint: {
    tablet: '768px',
    desktop: '1024px',
  },
  layout: {
    maxWidth: '1280px',
    mobileGutter: '20px',
    desktopGutter: '56px',
  },
  shadow: {
    floating: '0 12px 32px rgba(9, 43, 139, 0.12)',
  },
} as const;

export type InhandTokens = typeof INHAND_TOKENS;
