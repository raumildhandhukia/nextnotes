import SideBar from "@/components/SideBar/SideBar";

interface NoteLayoutProps {
  children: React.ReactNode;
}

const NoteLayout: React.FC<NoteLayoutProps> = ({ children }) => {
  return (
    <main>
      <aside className="fixed">
        <SideBar />
      </aside>
      <div className="mx-[20vw]">{children}</div>
    </main>
  );
};

export default NoteLayout;
