import React from "react";

import { ExpandNote } from "./expand-note";

interface Props {
  params: { _id: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  return <ExpandNote />;
};

export default Page;
