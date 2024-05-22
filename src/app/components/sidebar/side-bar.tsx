// Desc: This file contains the SideBar component which is responsible for rendering the sidebar of the application.
"use client";
import React, { useState, useContext } from "react";
import { NoteList } from "./note-list";
import { SharedNoteList } from "./shared-notes-list";
import { AddButton } from "./add-button";
import { Profile } from "@/app/components/sidebar/profile-section";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { SideBarItem } from "@/app/components/sidebar/sidebar-item";
import { MdNotes } from "react-icons/md";
import { GrDocumentNotes } from "react-icons/gr";
import Image from "next/image";
import { Notes_Context } from "@/context/Context";
import { useTheme } from "@/hooks/use-theme";

export const SideBar: React.FC = () => {
  const [yourNotesState, setYourNotesState] = useState<boolean>(true);
  const [shareNotesState, setShareNotesState] = useState<boolean>(false);
  const [prevStates, setPrevStates] = useState<boolean[]>([]);

  const { isExpanded, setIsExpanded } = useContext(Notes_Context);
  const { theme } = useTheme();

  const handleExpansion = () => {
    if (isExpanded) {
      setPrevStates([yourNotesState, shareNotesState]);
      setYourNotesState(false);
      setShareNotesState(false);
    } else {
      setYourNotesState(prevStates[0]);
      setShareNotesState(prevStates[1]);
    }
    setIsExpanded((curr) => !curr);
  };

  return (
    <aside className="w-max">
      <nav className="h-screen flex flex-col border-r shadow-sm ">
        {/* 10vh height */}
        <div className="p-4 pb-2 flex justify-between items-center h-[10vh] ">
          <Image
            src={`/next-notes${theme === "dark" ? "-dark" : ""}.png`}
            alt="next-notes-logo"
            width="150"
            height="20"
            className={`overflow-hidden transition-all ${
              isExpanded ? "w-max mx-2" : "w-0"
            }`}
          ></Image>

          <Button
            onClick={handleExpansion}
            variant="outline"
            size="icon"
            className="w-max h-max p-4 "
          >
            {isExpanded ? (
              <SlArrowLeft className="w-[1.4em] h-[1.4em]" />
            ) : (
              <SlArrowRight className="w-[1.4em] h-[1.4em]" />
            )}
          </Button>
        </div>
        {/* ???vh height */}
        <ul
          className={`flex-1 px-3 ${
            isExpanded ? "w-[25vw] scrollbar-hidden" : ""
          }`}
        >
          <hr />
          <SideBarItem
            icon={<MdNotes size={20} />}
            text="Your Notes"
            isExpanded={isExpanded}
            active={yourNotesState}
            onClick={setYourNotesState}
            otherItemState={setShareNotesState}
          >
            <NoteList />
          </SideBarItem>
          <hr />
          <SideBarItem
            icon={<GrDocumentNotes size={20} />}
            text="Shared Notes"
            isExpanded={isExpanded}
            active={shareNotesState}
            onClick={setShareNotesState}
            otherItemState={setYourNotesState}
          >
            <SharedNoteList />
          </SideBarItem>
          <hr />
        </ul>

        <div className="border-t flex p-3">
          <Profile />
          <div
            className={`flex justify-end items-center overflow-hidden transition-all ${
              isExpanded ? "w-full ml-3" : "w-0"
            }`}
          >
            <AddButton className="rounded-xl h-[4vh]" />
          </div>
        </div>
      </nav>
    </aside>
  );
};
