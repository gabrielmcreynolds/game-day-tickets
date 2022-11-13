import useLockedRoute from "../lib/hooks/useLockedRoute";
import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import Bid from "../lib/types/bid";
import { acceptBid, getUserOffers } from "../lib/utils/api/bidsApi";
import { useState } from "react";
import useRequest from "../lib/hooks/useRequest";
import Link from "next/link";
import ListTile from "../components/ListTile";
import Image from "next/image";
import Check from "../public/check.svg";

const Offers = () => {
  useLockedRoute();
  const { user } = useUser();
  const offersWrapper = (): Promise<Bid[]> | undefined => {
    if (user) {
      return getUserOffers(user!.$id);
    }
    return undefined;
  };
  const [refreshBids, setRefreshBids] = useState(0);

  const { loading, result: bids } = useRequest(
    offersWrapper,
    user,
    refreshBids
  );
  const handleAcceptBid = async (bid: Bid) => {
    await acceptBid(bid);
    // refresh bids
    setRefreshBids(refreshBids + 1);
  };

  return (
    <Layout title="Offers">
      <main className="mt-20 max-w-2xl xl:mx-auto">
        <h1 className="text-4xl my-auto">Offers</h1>
        {bids?.map((bid) => (
          <div key={bid.$id} className="my-8">
            <h3 className="text-2xl underline decoration-danger">
              {bid.eventName}
            </h3>
            <ListTile>
              <div className="flex flex-row justify-between">
                <Link href={`/ticket/${bid.ticketId}`}>
                  <p className="text-xl my-auto">{bid.ticketLocation}</p>
                </Link>
                <div className="text-xl flex py-2">
                  <p className="my-auto mx-4">${bid.price}</p>
                  <Image
                    onClick={() => handleAcceptBid(bid)}
                    src={Check}
                    alt="delete"
                    height={25}
                  />
                </div>
              </div>
            </ListTile>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Offers;
