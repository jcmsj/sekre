import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import TopBar from "../components/TopBar";
import OutlinedInput from "../components/OutlinedInput";
import { Sekre } from '../lib/Secret';
import { KeyField } from '../components/KeyField';
import { useClear } from '../lib/useClear';
import { pages } from '../Tabs';
import { context } from "../storage/secret";
const { useRealm, RealmProvider } = context;

export default function CreationPage(props) {
  return <RealmProvider>
    <StatefulForm {...props} />
  </RealmProvider>
}

export function StatefulForm({ route, jumpTo, }) {
  const [clearSignal, setSignal] = useState(false)
  const realm = useRealm()
  /**
   * @param {import('../lib/Secret').VisibleSekre} sekre 
   */
  const onSubmit = async(sekre) => {
    realm.write(() => {
      realm.create(Sekre.schema.name, Sekre.generate(sekre))
    })
    setSignal(!clearSignal)
    jumpTo(pages.list)
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
    return { name: purpose, secret, key }
  }
  const clear = useClear(setSecret, setKey, setPurpose);
  const isInvalid = () => [secret,key,purpose].some(input => input.length <=0)
  return <SafeAreaView>
    <TopBar title="Create secret">
      <Appbar.Action
        disabled={isInvalid()}
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