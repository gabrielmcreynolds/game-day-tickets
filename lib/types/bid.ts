import { Models } from "appwrite";

type Bid = Models.Document & {
  price: number;
  userId: string;
  ticketId: string;
  eventName: string;
  ticketLocation: string;
  userName: string;
};

export default Bid;
