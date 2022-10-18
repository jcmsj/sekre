import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { Appbar } from "react-native-paper";
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";
import { getRealm, SekreSchema } from "../storage/secret";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Editor } from "./EditPage";
import { Sekre } from "../lib/Secret";

const Stack = createNativeStackNavigator();
export default function Page() {
    return <NavigationContainer>
        <Stack.Navigator
            initialRouteName="list"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="list"
                component={StatefulList}
            />
            <Stack.Screen
                name="edit"
                component={Editor}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

/**
 * @param {import("@react-navigation/native").Descriptor} param0 
 */
export function StatefulList({ navigation }) {
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
    const onRefresh = async () => {
        setRefreshing(true)
        await retrieve()
        setRefreshing(false)
    }

    const refreshControl = <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
    />

    /**
     * @param {Sekre} sekre
     */
    function goEdit(sekre) {
        navigation.navigate("edit", { sekre });
    }

    return <StatelessList
        title="List"
        secrets={secrets}
        flatListProps={{ refreshControl }}
        onSelect={goEdit}
    />
}

/**
 * 
 * @param {{
 *    title:string, 
 *    secrets:import("../lib/Secret").StoredSekre[],
 *    import("react-native").flatListProps,
 *    onSelect:(sekre:import("../lib/Secret").StoredSekre) => void 
 * }} param0 
 * @returns 
 */
export function StatelessList({ title, secrets, flatListProps, onSelect }) {
    /**
     * @param {{item:import("../lib/Secret").StoredSekre}} param0 
     */
    const renderItem = 
    ({item}) => <ItemUI
        item={item}
        onPress={e => onSelect(item, e)}
    />
    return <SafeAreaView
        style={{ height: "100%" }}
    >
        <TopBar
            title={title}
        >
            <Appbar.Action icon="magnify" onPress={() => { }} />
        </TopBar>
        <FlatList
            keyExtractor={item => item.id}
            renderItem={renderItem}
            data={secrets}
            extraData={secrets}
            {...flatListProps}
        />
    </SafeAreaView>;
}

export const style = StyleSheet.create({

})