import { Models } from "appwrite";

type Ticket = Models.Document & {
  location: string;
  sellerId: string;
  price: number;
  eventId: string;
  eventName: string;
  date: Date;
  sold: boolean;
};

export default Ticket;
