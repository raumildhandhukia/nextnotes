import React from "react";

import { ExpandNote } from "./expand-note";
import { getAvailableNotesForUser } from "@/data/available-notes";
import { auth } from "@/auth";

interface Props {
  params: { _id: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const session = await auth();
  const userId = session?.user.id;
  const noteIds = await getAvailableNotesForUser(userId);

  if (!params._id) {
    return null;
  }
  if (!noteIds) {
    return null;
  }
  if (noteIds.includes(params._id)) {
    return <ExpandNote />;
  } else {
    console.log("Note not found");
  }
};

export default Page;
