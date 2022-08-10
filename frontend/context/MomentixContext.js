import { createContext, useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanityClient";

export const MomentixContext = createContext();

export const MomentixProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const query = `
            *[_type == "event"] {
                _id,
                title,
                startTime,
                endTime,
                transferDate,
                link,
                slug,
                mainImage,
                approved,
                description,
                summmary,
                users -> {
                  userName,
                  organizer,
                }
              }
                `;

      const clientRes = await client.fetch(query);

      console.log("clientRes:", clientRes);
      setEvents(clientRes);
      console.log("logging events in context:", events);
    })();
  }, []);

  return (
    <MomentixContext.Provider
      value={{
        events,
      }}
    >
      {children}
    </MomentixContext.Provider>
  );
};
