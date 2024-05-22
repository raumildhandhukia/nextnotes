import { createContext, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface ShareNoteContextType {
  sharedWith: User[];
  setSharedWith: React.Dispatch<React.SetStateAction<User[]>>;
  searchResults: User[];
  setSearchResults: React.Dispatch<React.SetStateAction<User[]>>;
  noteId: string | undefined;
  setNoteId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const defaultContext: ShareNoteContextType = {
  sharedWith: [],
  setSharedWith: () => {},
  searchResults: [],
  setSearchResults: () => {},
  noteId: "",
  setNoteId: () => {},
};

export const ShareNoteContext = createContext(defaultContext);

interface SharedNoteProviderProps {
  children: React.ReactNode;
}

const ShareNote: React.FC<SharedNoteProviderProps> = ({ children }) => {
  const [sharedWith, setSharedWith] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [noteId, setNoteId] = useState<string | undefined>("");

  return (
    <ShareNoteContext.Provider
      value={{
        sharedWith,
        setSharedWith,
        searchResults,
        setSearchResults,
        noteId,
        setNoteId,
      }}
    >
      {children}
    </ShareNoteContext.Provider>
  );
};

export default ShareNote;
