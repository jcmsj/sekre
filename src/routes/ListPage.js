import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import range from "../lib/range"
import ItemUI from "../components/ItemUI";
import TopBar from "../components/TopBar";

export function generate(size) {
    return range(size).map(i => { return { id: i, label: `Secret` } })
}

export default function ListPage() {
    const [count, setCount] = useState(5); //Test
    return <SafeAreaView>
        <TopBar title="List">
            <Appbar.Action icon="magnify" onPress={() => { }} />
        </TopBar>
        <FlatList
            keyExtractor={item => item.id}
            renderItem={({item}) => <ItemUI {...item} />}
            data={generate(count)}
            extraData={count}
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
