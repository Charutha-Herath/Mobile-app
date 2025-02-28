import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import NewsList from '../../components/NewsList';

export default function BusinessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NewsList category="business" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});