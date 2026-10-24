/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ih: {
          /* Mapped 1:1 to INHAND Design System v0.1 Semantic Tokens */
          blue: "var(--inhand-color-brand-primary)",           /* #092B8B */
          "blue-deep": "var(--inhand-color-brand-dark)",       /* #09286F */
          cobalt: "var(--inhand-color-brand-primary)",         /* #092B8B */
          "cobalt-deep": "var(--inhand-color-brand-dark)",     /* #09286F */
          action: "var(--inhand-color-action-primary)",        /* #092B8B */
          "action-hover": "var(--inhand-color-action-hover)",  /* #09286F */
          "action-disabled": "var(--inhand-color-action-disabled)", /* #E7E5DF */
          focus: "var(--inhand-color-focus)",                  /* #3459DF */

          /* Brand Deep Tones */
          navy: "#071326",
          "navy-deep": "#050C1A",
          surface: "var(--inhand-color-surface-raised)",

          /* Surfaces */
          cream: "var(--inhand-color-surface-canvas)",         /* #FBF6EE */
          canvas: "var(--inhand-color-surface-canvas)",        /* #FBF6EE */
          raised: "var(--inhand-color-surface-raised)",        /* #FFFAF3 */
          ivory: "var(--inhand-color-surface-raised)",         /* #FFFAF3 */
          soft: "var(--inhand-color-surface-soft)",            /* #E4E8DF */
          sand: "var(--inhand-color-accent-soft)",             /* #F5DFCD */

          /* Typography */
          text: "var(--inhand-color-text-primary)",            /* #172C52 */
          charcoal: "var(--inhand-color-text-primary)",        /* #172C52 */
          muted: "var(--inhand-color-text-secondary)",         /* #646A78 */
          "on-action": "var(--inhand-color-text-onAction)",    /* #FBF6EE */

          /* Borders */
          border: "var(--inhand-color-border-subtle)",         /* #DDDCD3 */
          "border-control": "var(--inhand-color-border-control)", /* #7C8390 */

          /* Accents */
          coral: "var(--inhand-color-accent-decorative)",      /* #FF6638 */
          salmon: "var(--inhand-color-accent-soft)",           /* #F5DFCD */

          /* Semantic Status Tokens */
          "success-fg": "var(--inhand-color-success-foreground)", /* #216249 */
          "success-bg": "var(--inhand-color-success-background)", /* #E8F2EC */
          "warning-fg": "var(--inhand-color-warning-foreground)", /* #81510C */
          "warning-bg": "var(--inhand-color-warning-background)", /* #FFF1D8 */
          "danger-fg": "var(--inhand-color-danger-foreground)",   /* #B33836 */
          "danger-bg": "var(--inhand-color-danger-background)"    /* #FBECEA */
        }
      },
      spacing: {
        "ds-1": "var(--inhand-space-1)", /* 4px */
        "ds-2": "var(--inhand-space-2)", /* 8px */
        "ds-3": "var(--inhand-space-3)", /* 12px */
        "ds-4": "var(--inhand-space-4)", /* 16px */
        "ds-5": "var(--inhand-space-5)", /* 24px */
        "ds-6": "var(--inhand-space-6)", /* 32px */
        "ds-7": "var(--inhand-space-7)", /* 48px */
        "ds-8": "var(--inhand-space-8)"  /* 64px */
      },
      borderRadius: {
        control: "var(--inhand-radius-control)", /* 4px */
        card: "var(--inhand-radius-card)",       /* 8px */
        dialog: "var(--inhand-radius-dialog)",   /* 12px */
        pill: "var(--inhand-radius-pill)",       /* 999px */
        "ih-sm": "var(--inhand-radius-control)",
        "ih-md": "var(--inhand-radius-card)",
        "ih-lg": "var(--inhand-radius-dialog)",
        "ih-xl": "var(--inhand-radius-pill)"
      },
      height: {
        "control-sm": "var(--inhand-control-sm)", /* 36px */
        "control-md": "var(--inhand-control-md)", /* 44px */
        "control-lg": "var(--inhand-control-lg)", /* 52px */
        touch: "var(--inhand-control-touchTarget)" /* 44px */
      },
      minHeight: {
        "control-sm": "var(--inhand-control-sm)",
        "control-md": "var(--inhand-control-md)",
        "control-lg": "var(--inhand-control-lg)",
        touch: "var(--inhand-control-touchTarget)"
      },
      minWidth: {
        touch: "var(--inhand-control-touchTarget)"
      },
      boxShadow: {
        floating: "var(--inhand-shadow-floating)",
        editorial: "var(--inhand-shadow-floating)"
      },
      transitionDuration: {
        fast: "var(--inhand-motion-fast)",   /* 160ms */
        panel: "var(--inhand-motion-panel)"  /* 240ms */
      },
      fontFamily: {
        display: ["Georgia", '"Space Grotesk"', "serif"],
        subheading: ["Georgia", '"Plus Jakarta Sans"', "serif"],
        sans: ['"Manrope"', "Arial", "sans-serif"]
      },
      maxWidth: {
        content: "var(--inhand-layout-maxWidth)" /* 1280px */
      }
    }
  },
  plugins: []
};
