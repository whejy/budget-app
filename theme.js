import { Platform } from 'react-native';

const sliceColors = {
  Bills: '#ffe9e3',
  Entertainment: '#e6b2c6',
  Food: '#ffcbcb',
  Gifts: '#f2f2f2',
  Income: '#79c2d0',
  Medical: '#e3f6f5',
  Other: '#d4ebd0',
  Personal: '#ffb5b5',
  Savings: '#bbe4e9',
  Shopping: '#cdc9f0',
  Transport: '#cadefc',
};

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#cccccc',
    error: '#d73a4a',
    primary: sliceColors.Income,
    secondary: sliceColors.Bills,
    cancel: sliceColors.Entertainment,
    pieData: sliceColors,
  },
  fontSizes: {
    body: 14,
    subheading: 20,
    heading: 36,
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

export default theme;
