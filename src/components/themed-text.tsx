import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const typeClasses = {
  default: 'text-base leading-6',
  title: 'text-[32px] font-bold leading-8',
  defaultSemiBold: 'text-base leading-6 font-semibold',
  subtitle: 'text-xl font-bold',
  link: 'leading-[30px] text-base text-[#0a7ea4]',
};

export function ThemedText({
  className,
  lightColor,
  darkColor,
  type = 'default',
  style,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      className={`${typeClasses[type]} ${className ?? ''}`}
      style={[{ color }, style]}
      {...rest}
    />
  );
}
