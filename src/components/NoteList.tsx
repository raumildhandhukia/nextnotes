import React from "react";
import NoteType from "../app/types/Note";
import Note from "./Note";
import AddButton from "./AddButton";

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
    <div className="w-64 top-0 h-screen p-2 bg-slate-200 overflow-y-auto">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl">Personal Notes</p>
        <AddButton />
        <div className="">
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
