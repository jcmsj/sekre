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
import { pages } from '../Tabs';

export default function CreationPage({route, jumpTo, }) {
  /**
   * @param {Sekre} sekre 
   */
  const onSubmit = async(sekre) => {
      try {
        await add(sekre);
        //clear()
        jumpTo(pages.list)
      } catch (error) {
        console.log(error);
      }
  }

  //const clear = useClear(setSecret, setKey, setPurpose);

  return <Form
    onSubmit={onSubmit}
  >
  </Form>
}
export function Form({onSubmit}) {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [purpose, setPurpose] = useState("");
  function make() {
    return new Sekre({ name: purpose, secret, key })
  }
  return <SafeAreaView>
    <TopBar title="New secret">
      <Appbar.Action
        disabled={secret == undefined}
        icon="check"
        onPress={async() => {
          onSubmit(make())
        }}
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