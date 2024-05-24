"use server";

import { getUsersByName } from "@/data/user";

export const getSearchResult = async (query: string) => {
  try {
    return await getUsersByName(query);
  } catch (error) {
    return null;
  }
};
