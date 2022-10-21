import { SafeAreaView } from "react-native-safe-area-context"
import { Appbar, Button, Text } from "react-native-paper"
import TopBar from "../components/TopBar"
import { context as secretsContext } from "../storage/secret";
import { Sekre } from "../lib/Secret";
import { StyleSheet } from "react-native";
const { useRealm } = secretsContext;

export function Editor({ navigation, route }) {
    const realm = useRealm()

    /**
     * 
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
     * sekre: import("../lib/Secret").StoredSekre},
     * defaultKey:string
     * }
     */
    const { sekre, defaultKey } = route.params
    return <SafeAreaView>
        <TopBar title={`Show: ${sekre.name}`} onBack={navigation.goBack}>
            <Appbar.Action icon="delete" 
            onPress={() => remove("todo", sekre)}
            />
        </TopBar>
        <Button
        icon="eye"
        >
        </Button>
    </SafeAreaView>
}

const style = StyleSheet.create({

})