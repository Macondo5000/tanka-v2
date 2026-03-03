const AVATAR_COLORS = [
  '#93C5FD', // blue
  '#86EFAC', // green
  '#C4B5FD', // violet
  '#FDA4AF', // rose
  '#FDBA74', // orange
  '#67E8F9', // cyan
];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getAvatarLetter(name: string): string {
  return name.charAt(0).toUpperCase();
}
