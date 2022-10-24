import 'react-native-get-random-values';
import { Realm } from "@realm/react"
import { SHA256 } from 'crypto-js';

/**
 * @typedef {{
 * cipher:string,
 * id:string
 * }} Key
 */
export const MasterSchema = {
    name: "master-key",
    properties: {
        cipher: "string",
        id: "string"
    },
    primaryKey: "id",
}
export const keyOfMainKey = "main-key"

/**
 * @param {string} key 
 */
export function encrypt(key) {
    return SHA256(key).toString()
}

/**
 * @param {Realm} realm 
* @returns {Key}
 */
export function getMainkey(realm) {
    return realm.objectForPrimaryKey(MasterSchema.name, keyOfMainKey)
}