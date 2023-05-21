import { Platform } from 'react-native';

const sliceColors = {
  Bills: '#ffe9e3',
  Entertainment: '#fcdff8',
  Food: '#ffcbcb',
  Gifts: '#f2f2f2',
  Groceries: '#bbe4e9',
  Income: '#79c2d0',
  Medical: '#CAF5F0',
  Other: '#cbeef8',
  Personal: '#ffb5b5',
  Savings: '#e6b2c6',
  Shopping: '#cdc9f0',
  Transport: '#cadefc',
  Utilities: '#d4ebd0',
};

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#cccccc',
    error: '#d73a4a',
    primary: sliceColors.Income,
    secondary: sliceColors.Bills,
    cancel: sliceColors.Savings,
    menu: sliceColors.Gifts,
    pieData: sliceColors,
  },
  fontSizes: {
    body: 14,
    subheading: 20,
    heading: 42,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
    secondary: Platform.select({
      android: 'monospace',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export const gradient = [theme.colors.primary, theme.colors.secondary];

export default theme;
