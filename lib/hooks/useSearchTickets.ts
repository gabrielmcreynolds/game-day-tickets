import { useEffect, useState } from "react";
import Ticket from "../types/ticket";
import { getAllTickets } from "../utils/api/ticketsApi";

const useSearchTickets = (
  query: string,
  eventId: string
): { tickets: Ticket[] | undefined; isLoading: boolean } => {
  const [tickets, setTickets] = useState<undefined | Ticket[]>(undefined);
  const [allTickets, setAllTickets] = useState<Ticket[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (query === "") {
      setLoading(false);
      setTickets(undefined);
      return;
    }
    const fetchTickets = async () => {
      setLoading(true);
      const allTicks = await getAllTickets(eventId);
      const searchedDocs = allTicks.filter((doc) =>
        doc.location.toLowerCase().includes(query.toLowerCase())
      );
      setTickets(searchedDocs);
      setLoading(false);
      setAllTickets(allTicks);
    };
    if (allTickets === undefined) {
      fetchTickets();
    } else {
      const searchedDocs = allTickets.filter((doc) =>
        doc.location.toLowerCase().includes(query.toLowerCase())
      );
      setTickets(searchedDocs);
    }
  }, [query, eventId]);

  return { tickets, isLoading };
};

export default useSearchTickets;
