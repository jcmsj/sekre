import {
    Appbar,
    Text,
} from 'react-native-paper';

/**
 * 
 * @param {{title:string}} param0 
 * @returns 
 */
export function InDev({ title = "Add title" }) {
    return <>
        <Appbar.Header >
            <Text>
                TODO: {title}
            </Text>
        </Appbar.Header>
        <Text>
            Page is in Development
        </Text>
    </>
}