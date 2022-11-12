import { Account, Client, Databases } from "appwrite";
import { Server } from "../config";

/**
 * Code below adapted from AppWrite demo: https://github.com/appwrite/demo-todo-with-react
 */

interface sdkProviderI {
  sdk: undefined | { database: Databases; account: Account };
  provider: () => { database: Databases; account: Account };
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

    sdkProvider.sdk = { database, account };
    return sdkProvider.sdk;
  },
};
