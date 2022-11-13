import { PaginationApi } from "../../hooks/usePagination";
import Ticket from "../../types/ticket";
import { sdkProvider } from "./sdkProvider";
import { MyBuckets, MyCollections, PAGINATION_SIZE, Server } from "../config";
import { Query } from "appwrite";
import { MyEvent } from "../../types/event";

export const getTicketsPaginated = async (
  eventId: string,
  page: number
): Promise<PaginationApi<Ticket>> => {
  const tickets = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Tickets, [
      Query.equal("eventId", eventId),
      Query.equal("sold", false),
      Query.offset((page - 1) * PAGINATION_SIZE),
      Query.limit(PAGINATION_SIZE),
    ]);

  return {
    size: tickets.total,
    data: tickets.documents.map((t) => t as Ticket),
  };
};

export const getTicket = async (id: string): Promise<Ticket> => {
  const ticket = (await sdkProvider
    .provider()
    .database.getDocument(
      Server.database,
      MyCollections.Tickets,
      id
    )) as Ticket;
  ticket.date = new Date(ticket.date);
  return ticket;
};

export const getAllTickets = async (eventId: string): Promise<Ticket[]> => {
  const docs = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Tickets, [
      Query.equal("eventId", eventId),
      Query.equal("sold", false),
    ]);
  return docs.documents.map((d) => d as Ticket);
};

export const downloadTicket = async (ticketId: string) => {
  console.log("Downloading...");
  const ticket = await getTicket(ticketId);
  console.log(ticket);
  const result = await sdkProvider
    .provider()
    .storage.getFileDownload(MyBuckets.Tickets, ticket.fileId);
  window.open(result.href);
};

export const getUsersTickets = async (userId: string): Promise<Ticket[]> => {
  return (
    await sdkProvider
      .provider()
      .database.listDocuments(Server.database, MyCollections.Tickets, [
        Query.equal("sellerId", userId),
      ])
  ).documents.map((doc) => doc as Ticket);
};

export const createTicket = async (
  event: MyEvent,
  price: number,
  location: string,
  userId: string,
  file: File
): Promise<Ticket> => {
  const fileUpload = await sdkProvider
    .provider()
    .storage.createFile(MyBuckets.Tickets, "unique()", file);
  const ticket = await sdkProvider
    .provider()
    .database.createDocument(
      Server.database,
      MyCollections.Tickets,
      "unique()",
      {
        location,
        price,
        sold: false,
        eventId: event.$id,
        sellerId: userId,
        eventName: event.name,
        date: event.date,
        fileId: fileUpload.$id,
      }
    );
  return ticket as Ticket;
};
