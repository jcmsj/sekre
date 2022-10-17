import Realm, { UpdateMode } from "realm"
import { Sekre } from '../lib/Secret';

export const SekreSchema = {
  name: "sekre",
  properties: {
    id: "objectId",
    name: "string",
    secret: "string",
  }
}

export async function getRealm() {
  realm = realm ?? Realm.open({
    schema: [SekreSchema],
  });
  return realm;
}

/** @type {Realm} */
export let realm;
getRealm();
/**
 * @param {Sekre} s 
 */
export async function add(s) {
  const r = await getRealm();
  r.write(() => {
    r.create(SekreSchema.name, {
      //Auto increment - https://github.com/realm/realm-js/issues/746
      id: new Realm.BSON.ObjectID()
      , ...s
    })
  })
}

/**
* @param {string} key
* @param {Sekre} s
*/
export function remove(key, s) {
  console.log(
    s.decrypt(key)
  );
  //realm.delete(s)
}