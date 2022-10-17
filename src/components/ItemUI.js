import { useState } from "react";
import { Button, Card, Checkbox, IconButton, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyle from "../lib/GlobalStyle"
export function useToggle(value = false) {
    const [on, setOn] = useState(value);
    return { on, setOn, toggle() { setOn(!on) } };
}
export default function ItemUI({ id, label }) {
    const { on, toggle } = useToggle();
    return <Card
        style={style.card}
    >
        <View
            style={[GlobalStyle.row, style.view]}
        >
            <Text
                style={style.titleText}
            >
                {label}
            </Text>
            <Card.Actions>
                <IconButton
                    icon="pencil"
                    rippleColor="rgba(0, 0, 0, .22)"
                    onPress={() => { }}
                />
                <IconButton
                    icon="eye"
                    rippleColor="rgba(0, 0, 0, .22)"
                    onPress={() => { }}
                />
                <IconButton
                    icon="content-copy"
                    rippleColor="rgba(0, 0, 0, .22)"
                    onPress={() => { }}
                />
            </Card.Actions>

        </View>
    </Card>;
}

const style = StyleSheet.create({
    titleText: {
        fontSize: 23,
        fontWeight: "bold"
    },
    card: {
        marginVertical: 2,
    },
    view: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingStart: 7,
        paddingRight: 2,
        paddingVertical: 2
    },
});