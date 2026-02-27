// Animation presets — matching Work B exactly
export const SPRING = { type: 'spring' as const, damping: 30, stiffness: 300 };
export const SPRING_SNAPPY = { type: 'spring' as const, damping: 25, stiffness: 200 };
export const SPRING_TAB = { type: 'spring' as const, damping: 25, stiffness: 300 };

export const FADE_UP = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_SCALE = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
};

export const SLIDE_RIGHT = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

export const DROPDOWN_ANIM = {
  initial: { opacity: 0, y: -4, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, scale: 0.95 },
  transition: { duration: 0.12 },
};

export const staggerDelay = (index: number, base = 0.03) => ({
  delay: index * base,
});

export const EASE_SMOOTH: [number, number, number, number] = [0.23, 1, 0.32, 1];

// Z-index scale
export const Z = {
  sidebar: 10,
  topNav: 20,
  dropdown: 30,
  panel: 40,
  overlay: 50,
  modal: 60,
  toast: 70,
} as const;

// Popup layer widths — 5-tier system
// Popover / Dropdown menus
export const POPOVER_SM = 200;   // compact menu (settings, add org)
export const POPOVER_LG = 300;   // info card (user profile card)
// Modal dialogs (centered)
export const MODAL_SM = 420;     // single-focus content, confirmations
export const MODAL_MD = 560;     // lists, artifacts, timeline
export const MODAL_LG = 720;     // complex forms, multi-section

// Layout dimensions
export const SIDEBAR_WIDTH = 280;
export const DETAIL_PANEL_WIDTH = 340;
export const AI_PANEL_WIDTH = 440;
export const TOP_NAV_HEIGHT = 56;
