import React from "react";

import ExpandNote from "./ExpandNote";

interface Props {
  params: { _id: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  return (
    <>
      <p className="text-2xl"></p>
      <ExpandNote />
    </>
  );
};

export default Page;
