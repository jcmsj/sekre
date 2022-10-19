import { useState, useEffect } from 'react';
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
  const [clearSignal, setSignal] = useState(false)
  /**
   * @param {Sekre} sekre 
   */
  const onSubmit = async(sekre) => {
      try {
        await add(sekre);
        setSignal(!clearSignal)
        jumpTo(pages.list)
      } catch (error) {
        console.log(error);
      }
  }

  return <Form
    onSubmit={onSubmit}
    clearSignal={clearSignal}
  >
  </Form>
}

/**
 * @implNote {Everytime clearSignal changes the form is cleared}
 * @param {{onSubmit:(sekre:Sekre)=>void, clearSignal:any}} param0 
 */
export function Form({ onSubmit, clearSignal }) {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [purpose, setPurpose] = useState("");
  useEffect(() => {
    clear();
  }, [clearSignal])
  function make() {
    return new Sekre({ name: purpose, secret, key })
  }
  const clear = useClear(setSecret, setKey, setPurpose);

  return <SafeAreaView>
    <TopBar title="Create secret">
      <Appbar.Action
        disabled={secret == undefined}
        icon="check"
        onPress={() => {
          onSubmit(make());
        }}
      />
    </TopBar>
    <OutlinedInput
      label="Name"
      onChangeText={setPurpose}
      value={purpose}
    />
    <OutlinedInput
      label="Secret"
      keyboardType="password"
      secureTextEntry
      onChangeText={setSecret}
      value={secret}
    />
    <KeyField
      onChangeText={setKey}
      value={key}
    />
  </SafeAreaView>;
}

const style = StyleSheet.create({

})