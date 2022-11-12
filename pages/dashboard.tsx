"use client";

import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import useLockedRoute from "../lib/hooks/useLockedRoute";
import useRequest from "../lib/hooks/useRequest";
import { getSports } from "../lib/utils/api/sportsApi";
import { useState } from "react";
import Sport from "../lib/types/sport";

const Dashboard = () => {
  const { user } = useUser();
  const { loading, result: sportsData } = useRequest(getSports());
  const [sport, setSport] = useState<Sport | undefined>(undefined);

  useLockedRoute();
  return (
    <Layout title="Dashboard">
      <div className="mt-20 max-w-2xl mx-auto">
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
              <p>Loading...</p>
            ) : (
              sportsData!.sports.map((s) => (
                <option className="text-xl" value={s.name}>
                  {s.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
