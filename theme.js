import { Platform } from 'react-native';

const sliceColors = {
  Bills: '#ffcbcb',
  Entertainment: '#e6b2c6',
  Food: '#ffb5b5',
  Gifts: '#f2f2f2',
  Income: '#79c2d0',
  Medical: '#ffe9e3',
  Other: '#e3f6f5',
  Personal: '#d4ebd0',
  Savings: '#bbe4e9',
  Shopping: '#cadefc',
  Transport: '#c3bef0',
};

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    error: '#d73a4a',
    primary: '#0366d6',
    appBar: '#24292e',
    pieData: sliceColors,
  },
  fontSizes: {
    body: 14,
    subheading: 20,
    heading: 32,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
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
