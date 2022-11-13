import Layout from "../components/Layout";
import useLockedRoute from "../lib/hooks/useLockedRoute";
import { getEventsPaginated } from "../lib/utils/api/eventsApi";
import { dateFormatter } from "../lib/utils/dateFormater";
import ListTile from "../components/ListTile";
import Image from "next/image";
import { getSportIcon } from "../lib/types/sport";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { MyEvent } from "../lib/types/event";
import { Form, Formik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const Sell = () => {
  const [page, setPage] = useState(0);
  const [event, setEvent] = useState<MyEvent | undefined>(undefined);
  const [file, setFile] = useState<undefined | File | null>(undefined);
  useLockedRoute();

  const handleEventSelected = (e: MyEvent) => {
    setEvent(e);
    setPage(1);
  };

  const handleFileSubmitted = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    setFile(file);
  };
  return (
    <Layout title="Sell">
      <main className="mx-6 mt-20 max-w-2xl xl:mx-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl mb-4">Sell Tickets</h1>
          <div>
            <span
              onClick={() => setPage(0)}
              className={`h-5 w-5 ${
                page === 0 ? "bg-danger" : "border cursor-pointer border-danger"
              } rounded-full inline-block  mx-2`}
            />
            <span
              className={`h-5 w-5 ${
                page === 1 ? "bg-danger" : "border border-danger"
              } rounded-full inline-block`}
            />
          </div>
        </div>

        {page === 0 && (
          <div>
            <h3 className="text-2xl">Pick Event</h3>
            <div className="mt-4">
              <Pagination
                getData={getEventsPaginated}
                itemBuilder={(day) => (
                  <div key={day.day.getSeconds()} className="my-6">
                    <h3 className="text-2xl underline decoration-danger underline-offset-3 mb-2">
                      {dateFormatter(day.day)}
                    </h3>
                    {day.events.map((ev) => (
                      <div
                        onClick={() => handleEventSelected(ev)}
                        className="my-2"
                        key={ev.$id}
                      >
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
                    ))}
                  </div>
                )}
              />
            </div>
          </div>
        )}

        {page === 1 && (
          <div className="mt-4">
            <h3 className="text-2xl">Sell Tickets</h3>
            <p className="text-xl">{event?.name}</p>

            <Formik
              initialValues={{ price: 0, location: "" }}
              validate={({ price, location }) => {
                const errors: { price?: string; location?: string } = {};
                if (!price) {
                  errors.price = "required";
                } else if (price <= 0) {
                  errors.price = "Must be greater than 0";
                }
                if (!location) {
                  errors.location = "Required";
                }
                if (file === null || file === undefined) {
                  errors.price = "Invalid file submission. Must be < 5mb";
                }
                return errors;
              }}
              onSubmit={async (
                { price, location },
                { setSubmitting, setErrors }
              ) => {
                if (file === null || file === undefined) {
                  setErrors({ price: "Invalid file submission for ticket" });
                  setSubmitting(false);
                  return;
                }
                setSubmitting(true);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="my-4">
                    <TextInput
                      label="Starting Bid:"
                      placeholder="80"
                      name="price"
                      type="number"
                    />
                  </div>
                  <div className="my-4">
                    <TextInput
                      label="Location:"
                      placeholder="Section 10 Seat 4"
                      name="location"
                      type="text"
                    />
                  </div>
                  <div className="my-4">
                    <p className="text-xl">Ticket:</p>
                    <input
                      onChange={handleFileSubmitted}
                      placeholder="Drag and drop file"
                      type="file"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    Go Live!
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Sell;
