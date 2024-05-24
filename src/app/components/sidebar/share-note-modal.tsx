"use client";
import React from "react";
import { MdShare } from "react-icons/md";
import { SearchUsers } from "@/app/components/sidebar/search-users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useContext } from "react";
import { ShareNoteContext } from "@/context/ShareNotesContext";
import { getUsersSharedWithNote } from "@/actions/notes/share-note";
import { set } from "lodash";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
interface Props {}

export const ShareButton: React.FC<Props> = ({}) => {
  const { noteId, sharedNotesData, setSharedNotesData } =
    useContext(ShareNoteContext);

  useEffect(() => {
    const getSharedWith = async () => {
      const res = await getUsersSharedWithNote(noteId);
      if (!res) {
        return;
      }
      const users = res as UserData[];
      setSharedNotesData((prev) => {
        return {
          ...prev,
          [noteId!]: users,
        };
      });
    };
    getSharedWith();
  }, [noteId, setSharedNotesData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MdShare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Select the user of nextnotes you want to share this note with.
          </DialogDescription>
        </DialogHeader>
        <SearchUsers sharedWith={sharedNotesData[noteId!]} />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};