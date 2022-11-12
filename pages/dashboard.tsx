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

const Dashboard = () => {
  const { user } = useUser();
  const { loading, result: sportsData } = useRequest(getSports);
  const [sport, setSport] = useState<Sport | undefined>(undefined);
  useLockedRoute();
  return (
    <Layout title="Dashboard">
      <main className="mt-20 max-w-2xl mx-auto">
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
            <option className="text-xl" value="all">
              Sport
            </option>
            {loading ? (
              <option value="-1">Loading...</option>
            ) : (
              sportsData!.sports.map((s) => (
                <option className="text-xl" value={s.name}>
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
              <div>
                <h3 className="text-2xl">{dateFormatter(day.day)}</h3>
                <span className="h-4 w-64 bg-primary"></span>

                {day.events.map((ev) => (
                  <ListTile key={ev.$id}>
                    <div className="flex flex-row justify-between my-4">
                      <p className="text-xl text-primary">{ev.name}</p>
                      <Image
                        height={35}
                        src={getSportIcon(ev.sport)}
                        alt={ev.sport.name}
                      />
                    </div>
                  </ListTile>
                ))}
              </div>
            )}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
