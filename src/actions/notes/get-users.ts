"use server";

import { getUsersByName } from "@/data/user";

export const getSearchResult = async (query: string) => {
  try {
    console.log("query", query);
    return await getUsersByName(query);
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
