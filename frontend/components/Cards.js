import React, { useContext } from "react";
import { MomentixContext } from "../context/MomentixContext";
import { client } from "../lib/sanityClient";
import createImageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";

const styles = {
  container: ` container mx-auto flex max-w-7xl flex-col py-24 px-3 sm:py-60`,
  title: `py-3 text-3xl font-semibold uppercase text-lightgrey md:text-6xl`,
  cards: `grid grid-cols-1 gap-3  md:gap-6 lg:grid-cols-3`,
};

const Cards = () => {
  const { events } = useContext(MomentixContext);
  const timeNow = new Date();

  const builder = createImageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  console.log("events in cards:", events);
  function showEventDate(eventStart, eventEnd) {
    if (new Date(eventEnd) < timeNow) {
      return (
        <span>
          [Event Ended]{" "}
          {new Date(eventStart).toLocaleString("en-US", {
            weekday: "short",
          })}{" "}
          {new Date(eventStart).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    } else if (new Date(eventStart) < timeNow && timeNow < new Date(eventEnd)) {
      return `Happening now! Event ends at ${new Date(eventEnd).toLocaleString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
        }
      )}`;
    } else if (
      new Date(eventStart).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) ==
      timeNow.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    ) {
      return `Today ${new Date(eventStart).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })} - ${new Date(eventEnd).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`;
    } else if (timeNow.getDate() + 1 == new Date(eventStart).getDate()) {
      return `Tomorrow ${new Date(eventStart).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })} - ${new Date(eventEnd).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`;
    } else {
      return `${new Date(eventStart).toLocaleString("en-US", {
        weekday: "short",
      })} ${new Date(eventStart).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })} - ${new Date(eventEnd).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Events</div>
      <div className={styles.cards}>
        {events &&
          events?.map((event) => {
            return (
              <div>
                {event && (
                  <Link key={event._id} href={`/events/${event.slug.current}`}>
                    <div className="flex h-full flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-md shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
                      <div>
                        {" "}
                        {event.mainImage && (
                          <img
                            className="h-60 w-full object-cover "
                            src={urlFor(event.mainImage).url()}
                            alt=""
                          />
                        )}
                        <div className="flex items-center bg-white px-3 pt-3 md:px-5 md:pt-5">
                          <div className="flex h-full w-full flex-1 flex-col ">
                            <div className=" ">
                              <p className="text-sm text-darkteal">
                                {showEventDate(event.startTime, event.endTime)}
                              </p>
                              <p className="text-xl font-semibold text-darkblue md:text-lg">
                                {event?.title}
                              </p>
                              <p className="text-sm leading-6 text-black">
                                {console.log(event.summary)}
                                {event?.summary}
                              </p>
                              <p className="text-sm leading-6 text-black">
                                {console.log(event.transferDate)}
                                {event?.transferDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 md:p-5">
                        <div>
                          {/* <p className="text-xs text-black">
                          <span className="font-semibold">Organizer:</span>{" "}
                          {console.log("logged event:", event)}
                          {event.users.username}
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cards;
