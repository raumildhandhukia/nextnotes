"use server";
import { persistence } from "@/lib/try";

export const setDoc = async (docName: string, update: Uint8Array) => {
  console.log("get break point");
  try {
    const res = await persistence.storeUpdate(docName, update);
    console.log("res", res);
    return res;
  } catch (e) {
    console.log("errrrr", e);
  }
};

export const getDoc = async (docName: string) => {
  try {
    return await persistence.getYDoc(docName);
  } catch (e) {
    console.log("err", e);
  }
};
