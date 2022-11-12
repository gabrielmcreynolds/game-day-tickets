import useLockedRoute from "../../lib/hooks/useLockedRoute";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useRequest from "../../lib/hooks/useRequest";
import { getEvent } from "../../lib/utils/api/eventsApi";
import { MyEvent } from "../../lib/types/event";
import { dateFormatter } from "../../lib/utils/dateFormater";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import Ticket from "../../lib/types/ticket";
import { PaginationApi } from "../../lib/hooks/usePagination";
import { getTicketsPaginated } from "../../lib/utils/api/ticketsApi";
import ListTile from "../../components/ListTile";
import { getSportIcon } from "../../lib/types/sport";
import Image from "next/image";
import Link from "next/link";

const EventPage = () => {
  useLockedRoute();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id !== "string") {
      router.replace("/dashboard");
      return;
    }
  }, [id]);

  const getEventWrapper = (): Promise<MyEvent> => {
    return getEvent(id as string);
  };
  const getTicketsWrapper = (page: number): Promise<PaginationApi<Ticket>> => {
    return getTicketsPaginated(id as string, page);
  };
  const { result: event, loading } = useRequest(getEventWrapper);

  return (
    <Layout title="Event">
      <main className="mt-20 max-w-2xl mx-auto">
        <h1 className="text-4xl">{loading ? "Loading..." : event?.name}</h1>
        <h3 className="text-2xl">
          {loading || !event ? "Loading..." : dateFormatter(event.date)}
        </h3>
        <div className="mt-4">
          <Pagination
            getData={getTicketsWrapper}
            itemBuilder={(ticket) => (
              <Link key={ticket.$id} href={`/ticket/${ticket.$id}`}>
                <div className="my-4">
                  <ListTile>
                    <div className="flex flex-row justify-between my-4">
                      <p className="text-xl text-primary">{ticket.location}</p>
                      <div className="flex flex-row justify-end">
                        <p className="mr-8 text-xl text-primary">
                          ${ticket.price}
                        </p>
                        {event ? (
                          <Image
                            height={35}
                            src={getSportIcon(event.sport)}
                            alt={event.sport.name}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </ListTile>
                </div>
              </Link>
            )}
          />
        </div>
      </main>
    </Layout>
  );
};

export default EventPage;
