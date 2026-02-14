/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const baseColors = {
  brand: {
    50: "#E6F0FF",
    100: "#CCE0FF",
    200: "#99C2FF",
    300: "#66A3FF",
    400: "#3385FF",
    500: "#0066FF", // Primary Brand
    600: "#0052CC",
    700: "#003D99",
    800: "#002966",
    900: "#001433",
  },
  blue: {
    50: "#F2F7FF",
    100: "#D9E8FF",
    200: "#B3D1FF",
    300: "#8CBAFF",
    400: "#66A3FF",
    500: "#338CFF",
    600: "#1A75FF",
    700: "#005CE6",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  success: {
    50: "#f2fdf6",
    100: "#def7e5",
    200: "#baf0ce",
    300: "#7ce1a2",
    400: "#43bc6e",
    500: "#16A34A",
    600: "#15813e",
    700: "#166533",
    800: "#124f29",
    900: "#0d331b",
  },
  warning: {
    100: "#FFF7E0",
    200: "#FFE7B3",
    300: "#FFD178",
    400: "#FFB938",
    500: "#F59E0B",
    600: "#C98308",
    700: "#A36507",
    800: "#7E4C05",
    900: "#4E2D02",
  },
  error: {
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#DC2626",
    600: "#B91C1C",
    700: "#991B1B",
    800: "#7F1D1D",
    900: "#470B0B",
  },
  info: {
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#2563EB",
    600: "#1D4ED8",
    700: "#1E40AF",
    800: "#1E3A8A",
    900: "#16204C",
  },
};

export const semanticColors = {
  // TEXT
  "text-primary": baseColors.neutral[900],
  "text-secondary": baseColors.neutral[600],
  "text-tertiary": baseColors.neutral[500],
  "text-inverse": baseColors.neutral[0],
  "text-brand": baseColors.brand[500],
  "text-success": baseColors.success[500],
  "text-error": baseColors.error[500],

  // BACKGROUND
  "background-primary": baseColors.neutral[0],
  "background-secondary": baseColors.neutral[50],
  "background-brand": baseColors.brand[500],

  // BUTTON
  "button-primary-background": baseColors.brand[500],
  "button-primary-pressed": baseColors.brand[600],
  "button-primary-text": baseColors.neutral[0],

  "button-secondary-background": baseColors.neutral[100],
  "button-secondary-pressed": baseColors.neutral[200],
  "button-secondary-text": baseColors.neutral[900],

  // BORDER
  "border-default": baseColors.neutral[200],
  "border-strong": baseColors.neutral[400],
  "border-brand": baseColors.brand[500],

  // STATUS
  "status-success": baseColors.success[500],
  "status-warning": baseColors.warning[500],
  "status-error": baseColors.error[500],
  "status-info": baseColors.info[500],
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
