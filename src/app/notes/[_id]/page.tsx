import React from "react";
import ExpandNote from "./ExpandNote";
import NoteType from "@/app/types/Note";
import SideBar from "@/components/SideBar/SideBar";
interface Props {
  params: { _id: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  return (
    <>
      {/* <SideBar /> */}
      <ExpandNote />
    </>
  );
};

export default Page;
