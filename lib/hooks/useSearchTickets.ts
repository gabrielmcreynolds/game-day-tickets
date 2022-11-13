import { useEffect, useState } from "react";
import Ticket from "../types/ticket";
import { searchTickets } from "../utils/api/ticketsApi";

const useSearchTickets = (
  query: string,
  eventId: string
): { tickets: Ticket[] | undefined; isLoading: boolean } => {
  const [tickets, setTickets] = useState<undefined | Ticket[]>(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (query === "") {
      setLoading(false);
      setTickets(undefined);
      return;
    }
    const fetchTickets = async () => {
      setLoading(true);
      const searchedTickets = await searchTickets(eventId, query);
      setLoading(false);
      setTickets(searchedTickets);
    };
    fetchTickets();
  }, [query, eventId]);

  return { tickets, isLoading };
};

export default useSearchTickets;
