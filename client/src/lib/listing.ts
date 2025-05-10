import { fetcher } from "@/lib/fetch";
import { Params } from "react-router-dom";
import { APIResponse } from "../lib/types";

export async function listingLoader() {
  const response: APIResponse = await fetcher("/listings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response) {
    const { data } = response;
    console.log(response);
    return data;
  }
}

export async function getListingById(listingId: string) {
  const response: APIResponse = await fetcher(`/listings/${listingId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response) {
    const { data } = response;

    return data[0];
  }
}
