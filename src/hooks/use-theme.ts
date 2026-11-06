import { useColorScheme } from 'react-native';
import { Colors, type Theme } from '@/constants/theme';

// Returns the light or dark colours, following the phone's setting.
export function useTheme(): Theme {
  const scheme = useColorScheme();
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
