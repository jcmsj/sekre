/**
 * @typedef {{
 *  targetID:"string", 
 *  keyID:"string"
 * }} KeyChain
 */

export const ChainSchema = {
    name: "chains",
    properties: {
        targetID:"string",
        keyID:"string"
    },
    primaryKey: "targetID",
}