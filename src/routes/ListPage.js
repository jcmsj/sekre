import { useEffect, useState, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { Appbar } from "react-native-paper";
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";
import { getRealm, SekreSchema } from "../storage/secret";

/**
 * @param {{route,jumpTo}} param0 
 */
export default function StatefulList({route, jumpTo}) {
    console.log(route, jumpTo);
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
        title={route.title}
        secrets={secrets}
        flatListProps={{refreshControl}}
    />
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function StatelessList({ title, secrets, flatListProps }) {
    return <SafeAreaView
    style={{height:"100%"}}
    >
        <TopBar 
            title={title}
        >
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

})
