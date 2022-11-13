import Layout from "../../components/Layout";
import { router } from "next/client";
import { useEffect, useState } from "react";
import Ticket from "../../lib/types/ticket";
import { getTicket } from "../../lib/utils/api/ticketsApi";
import useRequest from "../../lib/hooks/useRequest";
import { dateFormatter } from "../../lib/utils/dateFormater";
import { getBids, placeBid } from "../../lib/utils/api/bidsApi";
import Bid from "../../lib/types/bid";
import Image from "next/image";
import NotFound from "../../public/not-found.svg";
import { useUser } from "../../lib/context/user.context";

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

  const getBidsWrapper = (): Promise<Bid[]> | undefined => {
    if (router.isReady) {
      return getBids(ticketId as string);
    }
    return undefined;
  };

  const { user } = useUser();
  const [hasSubmittedKey, setHasSubmittedKey] = useState(0);
  let { result: bids } = useRequest(getBidsWrapper, hasSubmittedKey);
  const { loading, result: ticket } = useRequest<Ticket>(
    getTicketWrapper,
    hasSubmittedKey
  );
  const [bid, setBid] = useState(0);
  const handleSubmitBid = async (e: any) => {
    e.preventDefault();
    await placeBid(bid, user!.$id, user!.name, ticket!);
    setHasSubmittedKey(hasSubmittedKey + 1);
    setBid(0);
  };

  return (
    <Layout title="Ticket">
      <main className="mx-6 mt-20 max-w-2xl xl:mx-auto">
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
                  value={bid}
                  onChange={(val) => setBid(+val.target.value)}
                  placeholder={`${ticket.price + 5}`}
                  className="text-secondary max-w-min rounded p-2 text-xl border-2 border-secondary"
                />
                <button
                  disabled={bid < ticket.price}
                  onClick={handleSubmitBid}
                  className="text-white bg-primary rounded px-4"
                >
                  Place Bid
                </button>
              </div>
            </div>

            <section>
              <h2 className="text-2xl underline decoration-danger mt-12">
                Previous Bids
              </h2>
              {bids &&
                (bids.length === 0 ? (
                  <div className="-mt-8">
                    <Image
                      className="mx-auto"
                      src={NotFound}
                      height={300}
                      alt="Nothing here"
                    />
                    <p className="mx-auto text-center mt-2">No Bids Yet</p>
                  </div>
                ) : (
                  bids.map((bid) => (
                    <div
                      key={bid.$id}
                      className="flex my-4 flex-row justify-between"
                    >
                      <p className="text-xl">{bid.userName}</p>
                      <p className="text-xl">${bid.price}</p>
                    </div>
                  ))
                ))}
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
