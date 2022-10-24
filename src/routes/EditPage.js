import { SafeAreaView } from "react-native-safe-area-context"
import { Appbar, IconButton, List } from "react-native-paper"
import TopBar from "../components/TopBar"
import { context as secretsContext } from "../storage/secret";
import { Sekre } from "../lib/Secret";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
const { useRealm } = secretsContext;
export function Editor({ navigation, route }) {
    const realm = useRealm()

    /**
     * @param {string} key 
     * @param {Sekre} sekre 
     */
    function remove(key, sekre) {
        //TODO verify key
        realm.write(() => {
            realm.delete(sekre)
        })
        navigation.goBack()
    }
    /**
     * @type {{
     * sekre: import("../lib/Secret").StoredSekre,
     * key:import("../storage/masterKey").Key
     * }}
     */
    const { sekre, key } = route.params

    const [preview, setPreview] = useState("")
    function tryWithDefault() {
        try {
            return Sekre.prepareDecrypt(sekre)(key.cipher)
        } catch (error) {

        }

        return ""
    }
    return <SafeAreaView>
        <TopBar title={`Show: ${sekre.name}`} onBack={navigation.goBack}>
            <Appbar.Action icon="delete"
                onPress={() => remove("todo", sekre)}
            />
        </TopBar>
        <List.Item
            onPress={() => setPreview(preview == "" ? tryWithDefault() : "")}
            left={props => <IconButton
                icon={preview == "" ? "eye" : "eye-off"}
            />}
            title={preview == "" ? "Tap to reveal" : preview}
        >
        </List.Item>
        <List.Item
            left={props => <IconButton icon="content-copy" />}
            title="copy"
            onPress={() => Clipboard.setString(tryWithDefault())}
        />
    </SafeAreaView>
}

const style = StyleSheet.create({

})