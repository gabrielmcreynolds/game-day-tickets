import { Models } from "appwrite";

type Ticket = Models.Document & {
  location: string;
  sellerId: string;
  price: number;
  eventId: string;
};

export default Ticket;
