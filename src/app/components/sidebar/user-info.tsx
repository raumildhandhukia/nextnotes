import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useContext } from "react";
import { ShareNoteContext } from "@/context/ShareNotesContext";
import { shareNote } from "@/actions/notes/share-note";
import { UserData } from "@/app/types/Note";

interface UserInfoProps {
  user: UserData;
  setSearchResults: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  setSearchResults,
}) => {
  const { noteId, setSharedNotesData } = useContext(ShareNoteContext);

  const handleShareNote = () => {
    shareNote(noteId, user.id!);
    setSharedNotesData((prev) => {
      let prevNoteUsers = prev[noteId!];
      if (!prevNoteUsers) {
        prevNoteUsers = [];
      }
      return {
        ...prev,
        [noteId!]: [...prevNoteUsers, user],
      };
    });
    setSearchResults((prev) => prev.filter((u) => u.id !== user.id));
  };
  return (
    <div className="flex justify-start my-1" onClick={handleShareNote}>
      <div
        className="cursor-pointer flex justify-start border rounded-md p-2 dark:text-white text-black w-full"
        key={user.id}
      >
        <Avatar className="my-1">
          <AvatarImage src={user?.image || ""} />
        </Avatar>
        <div className="mx-5">
          <p>{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
