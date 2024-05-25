import { Input } from "@/components/ui/input";
import React from "react";
import { getSearchResult } from "@/actions/notes/get-users";
import { UserInfo } from "@/app/components/sidebar/user-info";
import { SharedWithUserTags } from "@/app/components/sidebar/shared-with-user-tags";
import { UserData } from "@/app/types/Note";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import _ from "lodash";
import { ClipLoader, SyncLoader } from "react-spinners";

const emailSchema = z.string().email();

interface SearchUsersProps {
  sharedWith: UserData[];
}

export const SearchUsers: React.FC<SearchUsersProps> = ({ sharedWith }) => {
  const currentUser = useCurrentUser();
  const [loaderState, setloaderState] = React.useState<"inactive" | "active">(
    "inactive"
  );
  const [searchResults, setSearchResults] = React.useState<UserData[]>([]);
  if (!sharedWith) {
    sharedWith = [];
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setloaderState("active");
    const search = async (query: string) => {
      const results = emailSchema.safeParse(query);
      if (!results.success) {
        setloaderState("inactive");
        return null;
      }
      const debouncedGetUsersByName = _.debounce(
        async (query, resolve, reject) => {
          try {
            const result = await getSearchResult(query);
            resolve(result);
            setloaderState("inactive");
          } catch (error) {
            reject(error);
          }
        },
        500
      );
      const getUsersByNameWithDebounce = (query: string) => {
        return new Promise((resolve, reject) => {
          debouncedGetUsersByName(query, resolve, reject);
        });
      };
      const res = (async () => {
        try {
          const res = await getUsersByNameWithDebounce(query);
          return res;
        } catch (error) {
          console.error("Error:", error);
        }
      })();
      return res;
    };

    const res = await search(e.target.value);
    console.log(res, "res");
    if (!res) {
      return;
    }
    debugger;
    const users = res as UserData[];

    const filteredUsers = users.filter((user) => {
      return (
        !sharedWith.some((u) => u.id === user.id) && user.id !== currentUser?.id
      );
    });
    setSearchResults(filteredUsers);
  };
  const setLoader = () => {
    if (loaderState === "active") {
      return (
        <div className="flex justify-center">
          <ClipLoader color="white dark: black" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {sharedWith.map((user) => (
          <SharedWithUserTags key={user.id} user={user} />
        ))}
      </div>
      <div className="flex items-center">
        <form autoComplete="off" className="w-[100%]">
          <Input
            className="w-[100%]"
            onChange={handleSearch}
            id="name"
            placeholder="example@domain.com"
          />
        </form>
        {/* <Button size="sm" className="px-3">
          <MdShare className="h-4 w-4" />
        </Button> */}
      </div>
      {setLoader()}
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
