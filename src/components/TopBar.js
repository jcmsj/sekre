import { Appbar } from "react-native-paper";
import GlobalStyle from "../lib/GlobalStyle";
import { StyleSheet } from "react-native";

export default function TopBar({ title, children, ...props }) {
    return <Appbar
        {...props}
    >
        <Appbar.Header
            style={[GlobalStyle.row, style.appHeader]}
        >
            <Appbar.Content title={title} />
            {children}
        </Appbar.Header>
    </Appbar>;
}

export const style = StyleSheet.create({
    appHeader: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
})