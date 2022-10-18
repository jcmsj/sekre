import { SafeAreaView } from "react-native-safe-area-context"
import TopBar from "../components/TopBar"
import { Sekre } from "../lib/Secret"
/**
 * @param {{sekre:Sekre}} param0 
 */
export function Editor({navigation, route}) {
    const {sekre} = route.params
    return <SafeAreaView>
        <TopBar title={`Show: ${sekre.name}`} onBack={navigation.goBack}></TopBar>
    </SafeAreaView>
}