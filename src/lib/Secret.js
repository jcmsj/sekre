/**
 * @implNote https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values'; 
import {AES} from "crypto-js"
import CryptoJS from "crypto-js";
/**
 * @typedef {{text:string, key:string, method:string}} RawProps
 */

export default class Secret {
    /** @type string */
    SALT;
    /** @type string */
    IV;
    /** @type string */
    SECRET;
    /** @type string */
    METHOD;
    /** @type string */
    cipher;
    /**
     * 
     * @param {RawProps} props
     */
    constructor(props) {
        this.encrypt(props)
    }

    /**
     * TODO: Decide whether to use cipher or keep those 3
     * @param {RawProps} param0
     */
    encrypt({text, key, method}) {
        CryptoJS.format.OpenSSL
        const cipher = AES.encrypt(text, key);
        this.cipher = cipher.toString();
        //Keep secret, salt, iv
        this.SALT = cipher.salt.toString();
        this.IV = cipher.iv.toString();
        this.SECRET = cipher.ciphertext.toString(CryptoJS.enc.Base64);
    }

    /**
     * @todo read encrypt todo
     * @param {string} key 
     */
    decrypt(key) {
        const decripted = AES.decrypt(this.prepareParse(), key);
        return decripted.toString(CryptoJS.enc.Utf8);
    }

    /**
     * @implNote restores the iv and salt
     */
    prepareParse() {
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(this.SECRET),
            iv: CryptoJS.enc.Hex.parse(this.IV),
            salt:CryptoJS.enc.Hex.parse(this.SALT)
        });
        return cipherParams;
    }
}