import { Models } from "appwrite";

type Sport = Models.Document & {
  name: string;
};

export default Sport;
