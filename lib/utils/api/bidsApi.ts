import Bid from "../../types/bid";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";
import { Query } from "appwrite";
import Ticket from "../../types/ticket";
import { getTicket, getUsersTickets } from "./ticketsApi";
import { getUser } from "./account";
import { isError } from "../../types/myError";

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

export const getUserOffers = async (userId: string): Promise<Bid[]> => {
  const userTickets = await getUsersTickets(userId);
  const bids: Bid[] = [];
  for (const ticket of userTickets) {
    const max = await getMaxBid(ticket.$id);
    if (max && !ticket.sold) {
      bids.push(max);
    }
  }
  return bids;
};

export const getMaxBid = async (ticketId: string): Promise<Bid | undefined> => {
  const bids = await getBids(ticketId);
  if (bids.length === 0) {
    return undefined;
  }
  bids.sort((a, b) => (a.price > b.price ? -1 : a.price === b.price ? 0 : 1));
  return bids[0];
};

export const acceptBid = async (bid: Bid): Promise<Bid> => {
  await sdkProvider
    .provider()
    .database.updateDocument(
      Server.database,
      MyCollections.Tickets,
      bid.ticketId,
      {
        sold: true,
      }
    );
  const user = await getUser(bid.userId);
  await fetch("/api/sendsms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: user.phone,
      message: `Your bid for ${bid.eventName} has been accepted!`,
    }),
  });
  return await sdkProvider
    .provider()
    .database.updateDocument(Server.database, MyCollections.Bids, bid.$id, {
      accepted: true,
    });
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
  const user = await getUser(ticket.sellerId);
  if (isError(user)) {
    throw new Error("Uh oh");
  }
  const result = await sdkProvider
    .provider()
    .database.createDocument(Server.database, MyCollections.Bids, "unique()", {
      price,
      userId,
      accepted: false,
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

  await fetch("/api/sendsms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: user.phone,
      message: `A new bid for ${price} has been placed for your ticket`,
    }),
  });
  return result as Bid;
};
