import { existsOnDatabase, saveUserOnDatabase } from '../subscribers/database';

export default async function (from: string) {
    let user = existsOnDatabase(from)

    if (!user) {
        user = saveUserOnDatabase(from)
      }

      
     return user;
}

