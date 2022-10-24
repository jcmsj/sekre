import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";
import { context } from "../storage/secret";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Editor } from "./EditPage";
import { Sekre } from "../lib/Secret";
import { getMainkey, MasterSchema } from "../storage/masterKey";
import { ChainSchema } from "../storage/list";
const Stack = createNativeStackNavigator();
const { useQuery, useRealm } = context;
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
    const realm = useRealm()

    /**
     * @param {import("../lib/Secret").StoredSekre} sekre
     */
    function goEdit(sekre) {
        /**
         * @type {import("../storage/masterKey").Key | undefined}
         */
        let key = undefined;
        /**
         * @type {import("../storage/list").KeyChain | undefined}
         */
        const maybeKeyChain = realm.objectForPrimaryKey(ChainSchema.name, sekre.id)
        if (maybeKeyChain) {
            /**
             * @type {import("../storage/masterKey").Key}
             */
            key = realm.objectForPrimaryKey(MasterSchema.name, maybeKeyChain.keyID)
            maybeKeyChain.keyID
        }

        navigation.navigate("edit", { 
            sekre, key
        });
    }

    return <StatelessList
        title="Manage secrets"
        onSelect={goEdit}
        secrets={useQuery(Sekre)}
        onSearch={() => {/**TODO */ }}
    />
}

/**
 * @param {{
 *    title:string, 
 *    secrets:import("../lib/Secret").StoredSekre[],
 *    flatListProps:import("react-native").FlatListProps<import("../lib/Secret").StoredSekre>,
 *    onSelect:(sekre:import("../lib/Secret").StoredSekre) => void ,
 *    onSearch:(event:import("react-native").GestureResponderHandlers)
 * }} param0 
 * @returns 
 */
export function StatelessList({ title, secrets, flatListProps, onSelect, onSearch }) {
    /**
     * @param {{item:import("../lib/Secret").StoredSekre}} param0 
     */
    const renderItem =
        ({ item }) => <ItemUI
            item={item}
            onPress={e => onSelect(item, e)}
        />

    return <SafeAreaView
        style={{ height: "100%" }}
    >
        <TopBar
            title={title}
        >
            <Appbar.Action icon="magnify" onPress={onSearch} />
        </TopBar>
        <FlatList
            data={secrets}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            {...flatListProps}
        >
        </FlatList>
    </SafeAreaView>;
}

export const style = StyleSheet.create({

})