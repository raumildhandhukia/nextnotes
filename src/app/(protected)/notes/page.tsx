"use client";
import { useContext } from "react";
import { Notes_Context } from "@/context/Context";

const NotesLanding = () => {
  const { isExpanded } = useContext(Notes_Context);
  return (
    <div
      className={`flex transition-all ${
        isExpanded ? "w-[80vw]" : "w-[95vw]"
      } h-screen justify-center items-center `}
    >
      <p className="text-3xl font-semibold text-zinc-600">
        please create or select a note
      </p>
    </div>
  );
};
export default NotesLanding;
