require('babel-core/register');
import fs from 'fs';
import path from 'path';
import Schema from '../gql/RootSchema';
import {graphql}  from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

// on prend le schema du serveur et on l'enregistre au format format json pour
// que le client (mobile) va interpreter cette schema et valide les données
// qu'on lui demande de nous donner
(() => {
  graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
      console.error(
        'ERROR reading schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, '../data/schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
  });
})();
