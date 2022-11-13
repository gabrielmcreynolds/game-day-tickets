import Bid from "../../types/bid";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";
import { Query } from "appwrite";
import Ticket from "../../types/ticket";

export const getBids = async (ticketId: string): Promise<Bid[]> => {
  const result = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Bids, [
      Query.equal("ticketId", ticketId),
      Query.orderDesc("$createdAt"),
    ]);

  console.log(`Bids ${JSON.stringify(result.documents)}`);
  return result.documents.map((doc) => doc as Bid);
};

export const placeBid = async (
  price: number,
  userId: string,
  userName: string,
  ticket: Ticket
): Promise<Bid> => {
  const result = await sdkProvider
    .provider()
    .database.createDocument(Server.database, MyCollections.Bids, "unique()", {
      price,
      userId,
      eventName: ticket.eventName,
      ticketLocation: ticket.location,
      userName,
      ticketId: ticket.$id,
    });
  await sdkProvider
    .provider()
    .database.updateDocument(
      Server.database,
      MyCollections.Tickets,
      ticket.$id,
      {
        price,
      }
    );
  return result as Bid;
};
