import { getSports } from "./sportsApi";
import { sdkProvider } from "./sdkProvider";
import { MyCollections, Server } from "../config";
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
      Query.limit(25),
      Query.offset((page - 1) * 25),
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
