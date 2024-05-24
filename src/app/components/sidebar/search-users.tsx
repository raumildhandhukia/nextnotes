import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { MdShare } from "react-icons/md";
import { getSearchResult } from "@/actions/notes/get-users";
import { UserInfo } from "@/app/components/sidebar/user-info";
import { SharedWithUserTags } from "@/app/components/sidebar/shared-with-user-tags";
import { UserData } from "@/app/types/Note";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SearchUsersProps {
  sharedWith: UserData[];
}

export const SearchUsers: React.FC<SearchUsersProps> = ({ sharedWith }) => {
  const currentUser = useCurrentUser();
  const [searchResults, setSearchResults] = React.useState<UserData[]>([]);
  if (!sharedWith) {
    sharedWith = [];
  }
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "e.target.value");
    const res = await getSearchResult(e.target.value);
    if (!res) {
      return;
    }
    const users = res as UserData[];
    const filteredUsers = users.filter((user) => {
      return (
        !sharedWith.some((u) => u.id === user.id) && user.id !== currentUser?.id
      );
    });
    setSearchResults(filteredUsers);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {sharedWith.map((user) => (
          <SharedWithUserTags key={user.id} user={user} />
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Input onChange={handleSearch} id="name" placeholder="John Wick" />
        <Button size="sm" className="px-3">
          <MdShare className="h-4 w-4" />
        </Button>
      </div>
      <div className="max-h-[25vh] overflow-y-scroll my-3">
        {searchResults.map((user) => (
          <UserInfo
            user={user}
            key={user.id}
            setSearchResults={setSearchResults}
          />
        ))}
      </div>
    </>
  );
};
