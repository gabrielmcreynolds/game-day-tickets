import { Models } from "appwrite";
import Sport from "./sport";

export type MyEvent = Models.Document & {
  name: string;
  date: Date;
  sport: Sport;
};

export type Day = {
  day: Date;
  events: MyEvent[];
};
