import { PaginationApi } from "../../hooks/usePagination";
import Ticket from "../../types/ticket";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, PAGINATION_SIZE, Server } from "../config";
import { Query } from "appwrite";

export const getTicketsPaginated = async (
  eventId: string,
  page: number
): Promise<PaginationApi<Ticket>> => {
  const tickets = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Tickets, [
      Query.equal("eventId", eventId),
      Query.offset((page - 1) * PAGINATION_SIZE),
      Query.limit(PAGINATION_SIZE),
    ]);

  return {
    size: tickets.total,
    data: tickets.documents.map((t) => t as Ticket),
  };
};
