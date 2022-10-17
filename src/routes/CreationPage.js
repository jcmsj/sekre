import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Appbar,
  TextInput,
} from 'react-native-paper';
import Secret from '../lib/Secret';
import TopBar from "../components/TopBar";
function OutlinedInput(props) {
  return <TextInput
    mode="outlined"
    {...props}
  />;
}
export default function CreationPage() {
  /**
   * @type {[Secret, Dispatch<SetStateAction<Secret>]}
   */
  const [secret, setSecret] = useState();
  const [raw, setRaw] = useState("");
  return <SafeAreaView>
    <TopBar title="New secret">
      <Appbar.Action
        disabled={secret == undefined}
        icon="check"
        onPress={() => { }}
        style={{alignSelf:"flex-end"}}
      />
    </TopBar>
    <OutlinedInput
      label="for"
    />
    <OutlinedInput
      label="secret"
      keyboardType="password"
      secureTextEntry
      onSubmitEditing={e => {
        setRaw(e.nativeEvent.text)
      }}
    />
    <OutlinedInput
      label="Key"
      icon="eye"
      secureTextEntry
      onSubmitEditing={e => {
        const s = new Secret({ text: raw, key: e.nativeEvent.text, method: "AES" })
        setSecret(s)
      }}
    />
  </SafeAreaView>;
}

const style = StyleSheet.create({
  major_button: {
    width: "100%"
  }
})