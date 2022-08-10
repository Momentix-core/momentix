import sanityClient from "@sanity/client";
import { createClient } from "next-sanity";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-04-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});
