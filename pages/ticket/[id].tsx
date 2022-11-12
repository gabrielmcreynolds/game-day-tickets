import Layout from "../../components/Layout";
import { router } from "next/client";
import { useEffect } from "react";
import Ticket from "../../lib/types/ticket";
import { getTicket } from "../../lib/utils/api/ticketsApi";
import useRequest from "../../lib/hooks/useRequest";
import { dateFormatter } from "../../lib/utils/dateFormater";

const TicketPage = () => {
  const { id: ticketId } = router.query;

  useEffect(() => {
    if (typeof ticketId !== "string") {
      router.replace("/dashboard");
      return;
    }
  }, [ticketId]);

  const getTicketWrapper = (): Promise<Ticket> | undefined => {
    if (router.isReady) {
      return getTicket(ticketId as string);
    }
    return undefined;
  };

  const { loading, result: ticket } = useRequest<Ticket>(getTicketWrapper);

  return (
    <Layout title="Ticket">
      <main className="mt-20 max-w-2xl mx-auto">
        {ticket ? (
          <>
            <h1 className="text-4xl mb-4">{ticket.location}</h1>
            <h3 className="text-2xl">{ticket.eventName}</h3>
            <h3 className="text-2xl">{dateFormatter(ticket.date)}</h3>

            <p className="text-xl mt-10">Current Bid is at: ${ticket.price}</p>
            <div className="flex flex-col">
              <label htmlFor="bid" className="text-xl">
                Place Bid ($)
              </label>
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  name="bid"
                  placeholder={`${ticket.price + 5}`}
                  className="text-secondary max-w-min rounded p-2 text-xl border-2 border-secondary"
                />
                <button className="text-white bg-primary rounded px-4">
                  Place Bid
                </button>
              </div>
            </div>

            <section>
              <h2 className="text-2xl underline decoration-danger mt-12">
                Previous Bids
              </h2>
            </section>
          </>
        ) : (
          <>Loading...</>
        )}
      </main>
    </Layout>
  );
};

export default TicketPage;
