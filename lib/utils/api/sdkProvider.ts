import { Account, Client, Databases, Storage } from "appwrite";
import { Server } from "../config";

/**
 * Code below adapted from AppWrite demo: https://github.com/appwrite/demo-todo-with-react
 */

interface sdkProviderI {
  sdk: undefined | { database: Databases; account: Account; storage: Storage };
  provider: () => { database: Databases; account: Account; storage: Storage };
}

export const sdkProvider: sdkProviderI = {
  sdk: undefined,

  provider: () => {
    if (sdkProvider.sdk) {
      return sdkProvider.sdk;
    }
    const appwrite = new Client();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const storage = new Storage(appwrite);

    sdkProvider.sdk = { database, account, storage };
    return sdkProvider.sdk;
  },
};
