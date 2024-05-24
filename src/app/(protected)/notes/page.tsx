"use client";
import { useContext } from "react";
import { Notes_Context } from "@/context/Context";

const NotesLanding = () => {
  const { isExpanded } = useContext(Notes_Context);
  return (
    <div
      className={`flex transition-all ${
        isExpanded ? "w-0 overflow-hidden md:w-[80vw]" : "w-[90vw] md:w-[95vw]"
      } h-screen justify-center items-center `}
    >
      <p className="md:text-3xl font-semibold text-zinc-600">
        please create or select a note
      </p>
    </div>
  );
};
export default NotesLanding;
