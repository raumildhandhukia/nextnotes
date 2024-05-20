import Editor from "@/app/components/editor/Editor";
import { useContext } from "react";
import { Notes_Context } from "@/context/Context";
interface EditorProps {
  throttledUpdate: Function;
}
const EditorPage = ({ throttledUpdate }: EditorProps) => {
  const { selectedNote } = useContext(Notes_Context);
  return (
    <>
      {selectedNote && (
        <div>
          <div className="flex my-1 mx-2 h-[99vh]">
            <Editor throttledUpdate={throttledUpdate} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditorPage;
