import { useEffect, useState, useCallback } from "react";
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
 * @param {{route,jumpTo}} param0 
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
    const onRefresh = useCallback(
        async () => {
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
 * @param {*} param0 
 * @returns 
 */
export function StatelessList({ title, secrets, flatListProps, onSelect }) {
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
            renderItem={({ item }) => <ItemUI 
                    item={item} 
                    onPress={e => onSelect(item,e)} 
                />
            }
            data={secrets}
            extraData={secrets}

            {...flatListProps}
        />
    </SafeAreaView>;
}

export const style = StyleSheet.create({

})