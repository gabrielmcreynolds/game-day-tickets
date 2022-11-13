"use client";

import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import useLockedRoute from "../lib/hooks/useLockedRoute";
import useRequest from "../lib/hooks/useRequest";
import { getSports } from "../lib/utils/api/sportsApi";
import { useState } from "react";
import Sport, { getSportIcon } from "../lib/types/sport";
import Pagination from "../components/Pagination";
import { getEventsPaginated } from "../lib/utils/api/eventsApi";
import { dateFormatter } from "../lib/utils/dateFormater";
import ListTile from "../components/ListTile";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useUser();
  const { loading, result: sportsData } = useRequest(getSports);
  const [sport, setSport] = useState<Sport | undefined>(undefined);

  useLockedRoute();
  return (
    <Layout title="Dashboard">
      <main className="mx-4 mt-20 max-w-2xl xl:mx-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl my-auto">Events</h1>
          <select
            onChange={(val) =>
              setSport(
                val.target.value === "all"
                  ? undefined
                  : sportsData!.sports.filter(
                      (s) => s.name === val.target.value
                    )[0]
              )
            }
            className="my-auto"
            name="sport"
            id="sport"
          >
            <option key="0" className="text-xl" value="all">
              Sport
            </option>
            {loading ? (
              <option key="550" value="-1">
                Loading...
              </option>
            ) : (
              sportsData!.sports.map((s) => (
                <option key={s.$id} className="text-xl" value={s.name}>
                  {s.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mt-4">
          <Pagination
            getData={getEventsPaginated}
            itemBuilder={(day) => (
              <div key={day.day.getSeconds()} className="my-6">
                <h3 className="text-2xl underline decoration-danger underline-offset-3 mb-2">
                  {dateFormatter(day.day)}
                </h3>
                {day.events.map((ev) =>
                  sport === undefined || ev.sport.$id === sport.$id ? (
                    <Link key={ev.$id} href={`/event/${ev.$id}`}>
                      <div className="my-2">
                        <ListTile>
                          <div className="flex flex-row justify-between my-4">
                            <p className="text-xl text-primary">{ev.name}</p>
                            <Image
                              height={35}
                              src={getSportIcon(ev.sport)}
                              alt={ev.sport.name}
                            />
                          </div>
                        </ListTile>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </div>
            )}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
