import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";
import { getRealm, SekreSchema } from "../storage/secret";

export default function StatefulList() {
    const [secrets, setSecrets] = useState();
    useEffect(() => {
        async function retrieve() {
            const r = await getRealm()
            const o = r.objects(SekreSchema.name)
            setSecrets(o)
        }

        retrieve()
    }, []);

    return <StatelessList secrets ={secrets}/>
}
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function StatelessList({secrets}) {
    return <SafeAreaView>
        <TopBar title="List">
            <Appbar.Action icon="magnify" onPress={() => { }} />
        </TopBar>
        <FlatList
            keyExtractor={item => item.id}
            renderItem={({item}) => <ItemUI item={item} />}
            data={secrets}
            extraData={secrets}
        >
        </FlatList>
    </SafeAreaView>;
}

export const style = StyleSheet.create({
    appHeader: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
})
