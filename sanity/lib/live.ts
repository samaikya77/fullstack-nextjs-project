// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import "server-only" 
import { defineLive } from "next-sanity";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN
if(!token){
  throw new Error("SANITY_API_READ_TOKEN is not defined. Please set it in your environment variables.")
}

export const { sanityFetch, SanityLive } = defineLive({ 
  client,
  serverToken: token, //ensure you have a valid api token for server-side operations
  browserToken: token, // ensure you have a vlid api token for client-side
  fetchOptions:{
    revalidate: 0, //revalidate evry 60 seconds
  },
}) 
