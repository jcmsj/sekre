import { useEffect, useState } from "react";
import { Headline, Text } from "react-native-paper";
import { encrypt, keyOfMainKey, MasterSchema, getMainkey } from "../storage/masterKey";
import { context } from "../storage/secret"
import AuthPage from "./AuthPage"
import { Realm } from "@realm/react";
const { useRealm } = context;

export default function({ onVerify }) {
    const realm = useRealm()
    const maybeMainkey = getMainkey(realm);
    const [isRegistered, setRegistrationStatus] = useState(false)

    useEffect(() => {
        setRegistrationStatus(realm.objects(MasterSchema.name).length > 0)
    }, [maybeMainkey])

    const matches = key => {
        onVerify(encrypt(key) == maybeMainkey.cipher)
    }

    return isRegistered ? <LoginForm 
        onSubmit={matches}
    />: <GetStarted />
}

function LoginForm({onSubmit}) {
    return <AuthPage
        intent="Login"
        onSubmit={onSubmit}
    >

    </AuthPage>
}

function GetStarted() {
    const realm = useRealm()
    const onRegister = key => {
        realm.write(() => {
            realm.create(MasterSchema.name, {
                cipher: encrypt(key),
                id:keyOfMainKey
            }, Realm.UpdateMode.All)
        })
    }

    return <AuthPage
    intent="Getting started"
    onSubmit={onRegister}
    before={
        <>
            <Headline 
                variant="large"
                style={{textAlign:"center"}}
            >Please register a main password.</Headline>
            <Text style={{color:"red", textAlign:"center"}}>WARNING: You can only set this once.</Text>
        </>
    }
>
</AuthPage>
}