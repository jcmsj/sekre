import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Appbar, Button, Text,
} from 'react-native-paper';
import TopBar from "../components/TopBar";
import OutlinedInput from "../components/OutlinedInput";
import { Sekre } from '../lib/Secret';
import { KeyField } from '../components/KeyField';
import { useClear } from '../lib/useClear';
import { pages } from '../Tabs';
import { context } from "../storage/secret";
import { getMainkey } from '../storage/masterKey';
import { ChainSchema } from '../storage/list';
const { useRealm, RealmProvider, useQuery } = context;
export default function CreationPage(props) {
  return <RealmProvider>
    <StatefulForm {...props} />
  </RealmProvider>
}

export function StatefulForm({ route, jumpTo, }) {
  const [clearSignal, setSignal] = useState(false)
  const realm = useRealm()
  const mainKey = getMainkey(realm);
  /**
   * @param {import('../lib/Secret').VisibleSekre} sekre 
   */
  const onSubmit = async (sekre) => {
    realm.write(() => {
      mainKey == sekre.key
      /** @type {Sekre} */
      const result = realm.create(Sekre.schema.name, Sekre.generate(sekre))
      if (
        mainKey.cipher == sekre.key
      ) {
        realm.create(ChainSchema.name, { targetID: result.id, keyID: mainKey.id})
      }
    })
    setSignal(!clearSignal)
    jumpTo(pages.list)
  }
  return <Form
    onSubmit={onSubmit}
    clearSignal={clearSignal}
    defaultKey={mainKey.cipher}
  >
  </Form>
}

/**
 * @implNote {Everytime clearSignal changes the form is cleared}
 * @param {{onSubmit:(sekre:Sekre)=>void, clearSignal:any}} param0 
 */
export function Form({ onSubmit, clearSignal, defaultKey = "" }) {
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
  const isInvalid = () => [secret, key, purpose].some(input => input.length <= 0)
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
    <View style={{ margin: 8 }}>
      <OutlinedInput
        label="Name"
        autoComplete="email"
        onChangeText={setPurpose}
        value={purpose}
      />
      <OutlinedInput
        label="Secret"
        keyboardType="password"
        secureTextEntry
        onChangeText={setSecret}
        autoComplete="password-new"
        value={secret}
      />
      <KeyField
        onChangeText={setKey}
        value={key}
      />
      <Button>Generate key</Button>
      <Button
        mode="contained"
        onPress={() => setKey(defaultKey)}
      >Use main key</Button>
    </View>
  </SafeAreaView>;
}

const style = StyleSheet.create({

})