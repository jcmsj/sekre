import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function TopBar({ title, children, onBack, ...props }) {
    return <Appbar
        {...props}
    >
        <Appbar.Header
            style={[style.appHeader]}
        >   
            {
                onBack ?
                <Appbar.BackAction onPress={onBack}/>
                :null
            }
            <Appbar.Content title={title} />
            {children}
        </Appbar.Header>
    </Appbar>;
}

export const style = StyleSheet.create({
    appHeader: {
        flex:1,
        justifyContent: "space-evenly",
        alignItems: "center",
        width:"100%"
    },
})