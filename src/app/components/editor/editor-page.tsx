import { Editor } from "@/app/components/editor/text-editor";
import { useContext } from "react";
import { Notes_Context } from "@/context/Context";
import { useCurrentUser } from "@/hooks/use-current-user";
interface EditorProps {
  throttledUpdate: Function;
}
const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
  "#F8D5A3",
  "#F9B9F2",
  "#C3ABF4",
  "#F4A3C3",
  "#A3F4F1",
];
const getRandomElement = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const getRandomColor = () => getRandomElement(colors);

const EditorPage = ({ throttledUpdate }: EditorProps) => {
  const { selectedNote } = useContext(Notes_Context);
  const user = useCurrentUser();
  const getInitialUser = () => {
    return (
      JSON.parse("" + localStorage.getItem("currentUser")) || {
        name: user?.name || "Anonymous",
        color: getRandomColor(),
      }
    );
  };
  return (
    <>
      {selectedNote && (
        <div>
          <div className="flex my-1 mx-2 h-[calc(99dvh)]">
            <Editor
              throttledUpdate={throttledUpdate}
              getInitialUser={getInitialUser}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditorPage;
