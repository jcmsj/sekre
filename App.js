import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Tabs } from './src/Tabs';

const App = () => {
  //TODO: Dark THEME
  const prefersDark = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: prefersDark ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider
    >
      <SafeAreaView style={styles.container}>
        <Tabs />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;