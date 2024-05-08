import React from "react";
import NoteType from "../app/types/Note";
import Note from "./Note";
import AddButton from "./AddButton";
import Profile from "./Profile";

const notes: NoteType[] = [
  {
    _id: "1",
    title: "First Note",
    content:
      "This is the first note This is the first note This is the first note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
  {
    _id: "2",
    title: "Second Note",
    content: "This is the second note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
  {
    _id: "3",
    title: "Third Note",
    content: "This is the third note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
  {
    _id: "4",
    title: "Fourth Note",
    content: "This is the fourth note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
  {
    _id: "5",
    title: "Fifth Note",
    content: "This is the fifth note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
  {
    _id: "6",
    title: "Sixth Note",
    content: "This is the sixth note",
    createdAt: "2021-10-01T00:00:00.000",
    updatedAt: "2021-10-01T00:00:00.000",
  },
];

const NoteList: React.FC = () => {
  return (
    <div className="w-[20vw] h-screen bg-slate-200">
      <div className="w-full h-[92vh] flex flex-col items-center flex-grow p-2 overflow-y-scroll scrollbar-hidden">
        {notes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </div>
      <div className="w-full h-[8vh] flex justify-around items-center bg-slate-300 flex-shrink ">
        <Profile />
        <AddButton className="rounded-xl h-[4vh]" />
      </div>
    </div>
  );
};

export default NoteList;
