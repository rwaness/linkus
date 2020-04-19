const levels = {
  public: {
    label: 'Public',
    icon: 'mdi-shield-off',
  },
  shared: {
    label: 'Shared with Groups',
    icon: 'mdi-shield-alert',
  },
  private: {
    label: 'Private',
    icon: 'mdi-shield-lock',
  },
};
export const defaultLevel = 'public';

export function getLevelOrDefault(level) {
  return levels[level] || levels[defaultLevel];
}

export function getConfidentialityIcon(level) {
  return getLevelOrDefault(level).icon;
}

export function getConfidentialityLabel(level) {
  return getLevelOrDefault(level).label;
}
