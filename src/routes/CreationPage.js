import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import TopBar from "../components/TopBar";
import OutlinedInput from "../components/OutlinedInput";
import { add } from '../storage/secret';
import { Sekre } from '../lib/Secret';

export default function CreationPage() {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [purpose, setPurpose] = useState("");
  function make() {
    const s =  new Sekre({name:purpose, secret, key})
    try {
      add(s);
    } catch (error) {
      console.log(error);      
    }
    return s
  }
  return <SafeAreaView>
    <TopBar title="New secret">
      <Appbar.Action
        disabled={secret == undefined}
        icon="check"
        onPress={() => {alert(JSON.stringify(make()))}}
        style={{ alignSelf: "flex-end" }}
      />
    </TopBar>
    <OutlinedInput
      label="for"
      onChangeText={setPurpose}
    />
    <OutlinedInput
      label="secret"
      keyboardType="password"
      secureTextEntry
      onChangeText={setSecret}
    />
    <OutlinedInput
      label="Key"
      icon="eye"
      secureTextEntry
      onChangeText={setKey}
    />
  </SafeAreaView>;
}

const style = StyleSheet.create({

})