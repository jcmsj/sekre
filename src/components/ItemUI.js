import { useState } from "react";
import { Card, IconButton, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyle from "../lib/GlobalStyle"
export function useToggle(value = false) {
    const [on, setOn] = useState(value);
    return { on, setOn, toggle() { setOn(!on) } };
}

const rippleColor = "rgba(0, 0, 0, .15)"
export default function ItemUI({ item: { id, name }, onPress }) {
    return <Card
        style={style.card}
    >
        <TouchableRipple
            rippleColor={rippleColor}
            onPress={onPress}
        >
            <View
                style={[GlobalStyle.row, style.view]}
            >
                <Text
                    style={style.titleText}
                >
                    {name}
                </Text>
                <Card.Actions>
                    <IconButton
                        icon="eye"
                        rippleColor={rippleColor}
                        onPress={() => {}}/* TODO! */
                    />
                    <IconButton
                        icon="content-copy"
                        rippleColor={rippleColor}
                        onPress={() => { }}
                    />
                </Card.Actions>
            </View>
        </TouchableRipple>
    </Card>;
}

const style = StyleSheet.create({
    titleText: {
        fontSize: 23,
        fontWeight: "bold"
    },
    card: {
        marginVertical: 2,
        marginHorizontal: 6,
    },
    view: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingStart: 7,
        paddingRight: 2,
        paddingVertical: 2
    },
});