import Header from "../../components/Header";
import React from "react";

import { client } from "../../lib/sanityClient";
import createImageUrlBuilder from "@sanity/image-url";
import PortableText from "react-portable-text";

function Event({ event }) {
  const builder = createImageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <main>
      <Header />

      <img
        className="h-80 w-full object-cover"
        src={urlFor(event.mainImage).url()}
        alt=""
      />
      <article className="p5 mx-auto max-w-3xl">
        <div className=" mt-7 flex items-center space-x-2">
          <img
            className="object-fit h-16 w-auto rounded-lg shadow"
            src={urlFor(event.mainImage).url()}
            alt=""
          />
          <div>
            <h1 className="pb-1 text-3xl">{event.name}</h1>
          </div>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={event.description}
            serializers={{
              h1: (props) => (
                <h1
                  className="my-5 text-2xl font-bold text-red-500"
                  {...props}
                />
              ),
              h2: (props) => (
                <h1
                  className="my-5 text-xl font-bold text-blue-500"
                  {...props}
                />
              ),
              li: ({ children }) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              p: ({ children }) => <p className="py-5 leading-3">{children}</p>,
              link: ({ href, children }) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <a href={`${event.link}`}>
          <button className="mt-4 rounded  border bg-darkteal px-1 py-1 text-xs  uppercase text-white transition duration-150 ease-in-out  hover:bg-darkblue focus:outline-none focus:ring-2 focus:ring-darkteal focus:ring-offset-2 sm:px-10 sm:py-4 bg-orange-600 lg:font-bold transition-transform duration-200 ease-in-out hover:scale-105">
            Purchase ticket
          </button>
        </a>
      </article>
    </main>
  );
}

export default Event;

export const getStaticPaths = async () => {
  const query = `*[_type == "event"] {
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
  }`;

  const events = await client.fetch(query);

  const paths = events.map((event) => ({
    params: {
      slug: event.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "event" && slug.current == $slug][0]{
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
  }`;

  const event = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
    revalidate: 60,
  };
};
