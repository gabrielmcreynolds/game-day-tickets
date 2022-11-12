import { sdkProvider } from "./sdkProvider";
import { Models } from "appwrite/src/models";
import { MyCollections, Server } from "../config";
import User from "../../types/user";
import MyError from "../../types/myError";

export const createAccount = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  // create the user in accounts
  const user = await sdkProvider
    .provider()
    .account.create("unique()", email, password, name);

  // create the user doc
  const userDoc = await sdkProvider
    .provider()
    .database.createDocument(Server.database, MyCollections.Users, user.$id, {
      name,
      email,
    });
  return userDoc as User;
};

export const getAccount = (): Promise<Models.Account<Models.Preferences>> => {
  return sdkProvider.provider().account.get();
};

export const login = async (
  email: string,
  password: string
): Promise<User | MyError> => {
  try {
    const user = await sdkProvider
      .provider()
      .account.createEmailSession(email, password);

    const userDoc = await sdkProvider
      .provider()
      .database.getDocument(Server.database, MyCollections.Users, user.$id);
    return userDoc as User;
  } catch (e) {
    console.log(e);
    return { message: e!.toString() };
  }
};

export const logout = () => {
  return sdkProvider.provider().account.deleteSession("current");
};
