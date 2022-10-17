/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  BottomNavigation,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SettingsPage from './src/routes/SettingsPage';
import CreationPage from "./src/routes/CreationPage"
import ListPage from './src/routes/ListPage';

const Tabs = () => {
  const [index, setIndex] = React.useState(2);
  const [routes] = React.useState([
    { key: 'settings', title: 'Settings', icon: "cog" },
    { key: 'create', title: 'Add', icon: "creation" },
    { key: 'list', title: 'List', icon: "view-list" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    settings: SettingsPage,
    create: CreationPage,
    list: ListPage,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

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
    paddingTop: StatusBar.paddingTop,
  },
});
export default App;