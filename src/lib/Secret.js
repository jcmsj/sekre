/**
 * @implNote https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values';
import { AES } from "crypto-js"
/**
 * @typedef {{name:string, secret:string}} Credential
 * @typedef {{id:string} & Credential} StoredSekre
 * @typedef {{key:string} & Credential} VisibleSekre
 */

export const decrypt = cipher => key => AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
export const encrypt = secret => key => AES.encrypt(secret, key).toString();

export class Sekre {
    /** @type {string} */
    name;
    /** @type {string} */
    secret;
    /** @type {import("realm").BSON.ObjectId} */
    id;

    /**
     * @param {VisibleSekre | StoredSekre} props 
     */
    constructor({ name, secret, key,id }) {
        this.name = name;
        if (key ?? false) {
            this.secret = encrypt(secret)(key);
        } else {
            this.secret = secret;
            this.id = id;
        }
    }

    decrypt(key) {
        return AES.decrypt(
            this.secret,
            key
        ).toString(CryptoJS.enc.Utf8);
    }
}