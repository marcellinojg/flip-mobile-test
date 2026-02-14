import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/themed-text';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ backgroundColor: 'red' }} edges={['top']}>
      <ScrollView style={{ paddingBottom: insets.bottom }}>
        <ThemedText>
          Hello World
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
