import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import TopBar from "../components/TopBar";
import OutlinedInput from "../components/OutlinedInput";
import { add } from '../storage/secret';
import { Sekre } from '../lib/Secret';
import { KeyField } from '../components/KeyField';
import { useClear } from '../lib/useClear';

export default function CreationPage() {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [purpose, setPurpose] = useState("");
  const clear = useClear(secret, setKey, setPurpose);
  async function make() {
    const s = new Sekre({ name: purpose, secret, key })
    await add(s);
    return s
  }
  return <SafeAreaView>
    <TopBar title="New secret">
      <Appbar.Action
        disabled={secret == undefined}
        icon="check"
        onPress={async() => {
          try {
            await make()
          } catch (error) {
            console.log(error);
          }
          clear()
        }}
        style={{ alignSelf: "flex-end" }}
      />
    </TopBar>
    <OutlinedInput
      label="Name"
      onChangeText={setPurpose}
    />
    <OutlinedInput
      label="Secret"
      keyboardType="password"
      secureTextEntry
      onChangeText={setSecret}
    />
    <KeyField
      onChangeText={setKey}
    />
  </SafeAreaView>;
}

const style = StyleSheet.create({

})