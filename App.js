import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import WelcomePage from './src/routes/WelcomePage';
import { Tabs } from './src/Tabs';
import { context } from "./src/storage/secret"

const { RealmProvider } = context;
export default function () {
  //TODO: Dark THEME
  const prefersDark = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: prefersDark ? Colors.darker : Colors.lighter,
  };

  return <PaperProvider>
    <SafeAreaView style={styles.container}>
      <RealmProvider>
        <Checker />
      </RealmProvider>
    </SafeAreaView>
  </PaperProvider>;
}

export function Checker() {
  /** @type {string|null} */
  const [verified, setVerification] = useState(false)

  return verified ?
    <Tabs /> : <WelcomePage onVerify={setVerification} />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});