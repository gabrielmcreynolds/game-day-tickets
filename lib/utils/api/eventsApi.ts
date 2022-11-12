import { getSports } from "./sportsApi";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, PAGINATION_SIZE, Server } from "../config";
import { Query } from "appwrite";
import { Day, MyEvent } from "../../types/event";
import { PaginationApi } from "../../hooks/usePagination";

export const getEventsPaginated = async (
  page: number
): Promise<PaginationApi<Day>> => {
  const sports = (await getSports()).sports;
  const events = await sdkProvider
    .provider()
    .database.listDocuments(Server.database, MyCollections.Events, [
      Query.orderAsc("date"),
      Query.limit(PAGINATION_SIZE),
      Query.offset((page - 1) * PAGINATION_SIZE),
    ]);
  const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  const days: Day[] = [];

  // map events to days
  events.documents.forEach((e) => {
    e.date = new Date(e.date);
    e.sport = sports.filter((s) => s.$id === e.sport)[0];
    if (
      days.length !== 0 &&
      datesAreOnSameDay(days[days.length - 1].day, e.date)
    ) {
      days[days.length - 1].events.push(e as MyEvent);
    } else {
      days.push({
        day: e.date,
        events: [e as MyEvent],
      });
    }
  });
  return { size: events.total, data: days };
};

export const getEvent = async (id: string): Promise<MyEvent> => {
  const event = (await sdkProvider
    .provider()
    .database.getDocument(
      Server.database,
      MyCollections.Events,
      id
    )) as MyEvent;
  event.date = new Date(event.date);
  return event;
};
