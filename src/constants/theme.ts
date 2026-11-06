// Pipbook theme: colours are named by their role, not by how they look.
export const Colors = {
  light: {
    text: '#111827',
    muted: '#6B7280',
    background: '#F5F7FA',
    card: '#FFFFFF',
    border: '#E2E6EC',
    primary: '#2F5BEA', // Pipbook blue
    onPrimary: '#FFFFFF', // text on primary, win and loss
    win: '#15803D',
    loss: '#DC2626',
    breakeven: '#6B7280',
  },
  dark: {
    text: '#F3F4F6',
    muted: '#9CA3AF',
    background: '#0E1420', // dark blue-grey, not pure black
    card: '#182030',
    border: '#2A3445',
    primary: '#7C9BFF', // lighter blue, readable on dark
    onPrimary: '#0E1420',
    win: '#4ADE80',
    loss: '#F87171',
    breakeven: '#9CA3AF',
  },
} as const;

export type Theme = Record<keyof typeof Colors.light, string>;

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;

export const Radius = { sm: 8, md: 12, pill: 999 } as const;
