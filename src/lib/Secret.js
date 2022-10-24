/**
 * @implNote https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values';
import { AES, enc } from "crypto-js"
import {Realm} from "@realm/react"
/**
 * @typedef {{name:string, secret:string}} Credential
 * @typedef {{id:string} & Credential} StoredSekre
 * @typedef {{key:string} & Credential} VisibleSekre
 */

export const decrypt = cipher => key => AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
export const encrypt = secret => key => AES.encrypt(secret, key).toString();


export class Sekre  extends Realm.Object {
    /** @type {string} */
    name;
    /** @type {string} */
    secret;
    /** @type {import("realm").BSON.ObjectId} */
    id;
    static schema = {
        name: "sekre",
        properties: {
          id: "string",
          name: "string",
          secret: "string",
        },
    }

    /**
     * @param {VisibleSekre} param0 
     */
    static generate({name,secret, key}) {
        return {
            id:(new Realm.BSON.ObjectID()).toHexString(),
            name,
            secret:encrypt(secret)(key),
            key,
        }
    }
    /**
     * @param {string} key 
     */
    decrypt(key) {
        return AES.decrypt(
            this.secret,
            key
        ).toString(CryptoJS.enc.Utf8);
    }

    /**
     * @param {StoredSekre} sekre 
     */
    static prepareDecrypt(sekre) {
        return key => AES.decrypt(sekre.secret, key).toString(enc.Utf8)
    }
}