import 'react-native-get-random-values';
import { Sekre } from '../lib/Secret';
import {createRealmContext} from "@realm/react"
import { MasterSchema } from './masterKey';
import { ChainSchema } from './list';

export const context = createRealmContext({
    schema:[Sekre, MasterSchema, ChainSchema],
    schemaVersion:3,
    migration: (oldReam, newRealm) => {
      //https://www.mongodb.com/docs/realm/sdk/react-native/examples/modify-an-object-schema/#std-label-react-native-modify-an-object-schema
      if (oldReam.schemaVersion < 2) {
        const oldItems = oldReam.objects(Sekre.schema.name)
        const newItems = newRealm.objects(Sekre.schema.name)
        for (const key in oldItems) {
          const updated = newItems[key]
          updated.id = oldItems[key].id.toHexString()
        }
      }
    }
    
});