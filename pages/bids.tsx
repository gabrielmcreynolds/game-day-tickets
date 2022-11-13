import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import useLockedRoute from "../lib/hooks/useLockedRoute";
import Bid from "../lib/types/bid";
import { deleteBid, getUserBids } from "../lib/utils/api/bidsApi";
import useRequest from "../lib/hooks/useRequest";
import ListTile from "../components/ListTile";
import Image from "next/image";
import Trash from "../public/trash.svg";
import Link from "next/link";
import { useState } from "react";
import { downloadTicket } from "../lib/utils/api/ticketsApi";

const Bids = () => {
  useLockedRoute();
  const { user } = useUser();
  const bidsWrapper = (): Promise<Bid[]> | undefined => {
    if (user) {
      return getUserBids(user!.$id);
    }
    return undefined;
  };
  const [refreshBids, setRefreshBids] = useState(0);

  const { loading, result: bids } = useRequest(bidsWrapper, user, refreshBids);
  const handleDeleteBid = async (bid: Bid) => {
    await deleteBid(bid);
    // refresh bids
    setRefreshBids(refreshBids + 1);
  };

  return (
    <Layout title="Bids">
      <main className="mt-20 max-w-2xl xl:mx-auto">
        <h1 className="text-4xl my-auto">Your Bids</h1>

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
                  {bid.accepted ? (
                    <p
                      onClick={() => downloadTicket(bid.ticketId)}
                      className="my-auto cursor-pointer mx-4"
                    >
                      Accepted. Click to download
                    </p>
                  ) : (
                    <Image
                      onClick={() => handleDeleteBid(bid)}
                      src={Trash}
                      alt="delete"
                      height={25}
                    />
                  )}
                </div>
              </div>
            </ListTile>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Bids;
