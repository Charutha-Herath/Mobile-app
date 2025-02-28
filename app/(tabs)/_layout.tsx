import { Tabs } from 'expo-router';
import { Chrome as Home, Briefcase, Trophy } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Latest News',
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: 'Business',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
          headerTitle: 'Business News',
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: 'Sports',
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
          headerTitle: 'Sports News',
        }}
      />
    </Tabs>
  );
}