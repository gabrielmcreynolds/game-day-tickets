import { Models } from "appwrite";

type User = Models.Document & {
  name: string;
  email: string;
  phone: string;
};

export default User;
