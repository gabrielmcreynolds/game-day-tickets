import Bid from "../../types/bid";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";
import { Query } from "appwrite";
import Ticket from "../../types/ticket";
import { getTicket } from "./ticketsApi";

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

export const getUserBids = async (userId: string): Promise<Bid[]> => {
  const result = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Bids, [
      Query.equal("userId", userId),
    ]);
  return result.documents.map((d) => d as Bid);
};

export const deleteBid = async (bid: Bid) => {
  await sdkProvider
    .provider()
    .database.deleteDocument(Server.database, MyCollections.Bids, bid.$id);

  const ticket = await getTicket(bid.ticketId);
  if (ticket.price === bid.price) {
    const bids = await getBids(bid.ticketId);
    const newPrice = Math.max(...bids.map((bid) => bid.price));
    await sdkProvider
      .provider()
      .database.updateDocument(
        Server.database,
        MyCollections.Tickets,
        bid.ticketId,
        {
          price: newPrice,
        }
      );
  }
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
