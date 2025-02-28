import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';

// Ignore specific warnings that might be related to serialization issues
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Failed to execute \'postMessage\' on \'MessagePort\'',
]);

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen 
          name="article/[id]" 
          options={{ 
            presentation: 'card', 
            headerShown: true, 
            title: 'Article',
            // Ensure we're not passing non-serializable data in navigation
            headerBackTitleVisible: false,
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}