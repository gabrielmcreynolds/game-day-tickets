import { Models } from "appwrite";

type Bid = Models.Document & {
  price: number;
  userId: string;
  tickedId: string;
  eventName: string;
  ticketLocation: string;
  userName: string;
};

export default Bid;
