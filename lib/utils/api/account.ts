import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";
import User from "../../types/user";
import MyError from "../../types/myError";

export const createAccount = async (
  email: string,
  password: string,
  phone: string,
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
      phone,
    });
  return userDoc as User;
};

export const getUser = async (id: string): Promise<User> => {
  return (await sdkProvider
    .provider()
    .database.getDocument(Server.database, MyCollections.Users, id)) as User;
};

export const getAccount = async (): Promise<User | MyError> => {
  try {
    const account = await sdkProvider.provider().account.get();
    return getUser(account.$id);
  } catch (e) {
    console.log(e);
    return {
      message: "no user defined",
      code: 1,
    };
  }
};

export const login = async (
  email: string,
  password: string
): Promise<User | MyError> => {
  try {
    const user = await sdkProvider
      .provider()
      .account.createEmailSession(email, password);
    console.log(`Id: ${user.$id}`);
    return (await sdkProvider
      .provider()
      .database.getDocument(
        Server.database,
        MyCollections.Users,
        user.userId
      )) as User;
  } catch (e) {
    console.log(e);
    return { message: e!.toString() };
  }
};

export const logout = () => {
  return sdkProvider.provider().account.deleteSession("current");
};
