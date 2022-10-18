import { useEffect, useState, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { Appbar } from "react-native-paper";
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";
import { getRealm, SekreSchema } from "../storage/secret";

export default function StatefulList() {
    const [secrets, setSecrets] = useState();
    const [refreshing, setRefreshing] = useState(false);
    async function retrieve() {
        const r = await getRealm()
        const o = r.objects(SekreSchema.name)
        setSecrets(o)
    }

    useEffect(() => {
        retrieve()
    }, []);
    const onRefresh = useCallback(
        async() => {
            setRefreshing(true)
            await retrieve()
            setRefreshing(false)
        },
        [],
    )
    const refreshControl = <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
    />

    return <StatelessList
        secrets={secrets}
        flatListProps={{refreshControl}}
    />
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function StatelessList({ secrets, flatListProps }) {
    return <SafeAreaView
    >
        <TopBar title="List">
            <Appbar.Action icon="magnify" onPress={() => { }} />
        </TopBar>
        <FlatList
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemUI item={item} />}
            data={secrets}
            extraData={secrets}

            {...flatListProps}
        />
    </SafeAreaView>;
}

export const style = StyleSheet.create({
    appHeader: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
})
