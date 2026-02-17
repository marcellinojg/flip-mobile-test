import { semanticColors } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

export type ThemedTextVariant =
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'defaultBold'
  | 'link';

export type ThemedTextProps = TextProps & {
  variant?: ThemedTextVariant;
  color?: keyof typeof semanticColors;
};

export function ThemedText({
  style,
  variant = 'default',
  color = 'text-primary',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        { color: semanticColors[color] },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create<Record<ThemedTextVariant | 'base', TextStyle>>({
  base: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },

  default: {},

  defaultSemiBold: {
    fontFamily: typography.fontFamily.semibold,
  },

  defaultBold: {
    fontFamily: typography.fontFamily.bold,
  },

  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },

  subtitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },

  link: {
    fontFamily: typography.fontFamily.medium,
    color: semanticColors['text-brand'],
  },
});
