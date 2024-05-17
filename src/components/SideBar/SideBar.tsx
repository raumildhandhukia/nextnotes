// Desc: This file contains the SideBar component which is responsible for rendering the sidebar of the application.
import React from "react";
import NoteList from "./NoteList";
import AddButton from "./AddButton";
import Profile from "./Profile";

const SideBar: React.FC = () => {
  return (
    <div className="w-[20vw] h-screen bg-slate-200">
      <NoteList />
      <div className="w-full h-[8vh] flex justify-between items-center bg-slate-300 px-[2vw]">
        <Profile />
        <AddButton className="rounded-xl h-[4vh]" />
      </div>
    </div>
  );
};

export default SideBar;
