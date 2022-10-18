import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import SettingsPage from './routes/SettingsPage';
import CreationPage from "./routes/CreationPage";
import ListPage from './routes/ListPage';

/**
 * @link https://callstack.github.io/react-native-paper/bottom-navigation.html
 */
export function Tabs() {
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
      shifting />
  );
}
