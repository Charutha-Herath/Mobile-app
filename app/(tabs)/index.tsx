import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import NewsList from '../../components/NewsList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NewsList category="general" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});