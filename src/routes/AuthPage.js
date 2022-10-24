import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { KeyField } from "../components/KeyField";
import TopBar from "../components/TopBar";

/**
 * @param {{
 *  sekre: import("../lib/Secret").StoredSekre,
 *  intent:string
 * }} param0 
 */
export default function ({ intent, navigation, before, children, onSubmit }) {
    const [input, setInput] = useState("")

    const submit = e => onSubmit(input, e);

    return <SafeAreaView style={{ flex: 1 }}>
        <TopBar
            title={intent}
        >
            {
                navigation ?
                    <Appbar.BackAction onPress={navigation.goBack} /> :
                    null
            }
        </TopBar>
        <View style={{ margin: 8 }}>
            {before}
            <KeyField
                style={{ margin: 15 }}
                value={input}
                onChangeText={setInput}
            />
            {children}
            < Button 
                mode="contained"
                style={{ margin: 15 }}
                onPress={submit}
            >Submit</Button>
        </View>
    </SafeAreaView>
}