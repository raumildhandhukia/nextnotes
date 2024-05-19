import SideBar from "@/app/components/sidebar/SideBar";
import { auth } from "@/auth";

interface NoteLayoutProps {
  children: React.ReactNode;
}

const NoteLayout: React.FC<NoteLayoutProps> = async ({ children }) => {
  const session = await auth();
  return (
    <main>
      <aside className="fixed">
        <SideBar userInfo={session?.user} />
      </aside>
      <div className="mx-[20vw]">{children}</div>
    </main>
  );
};

export default NoteLayout;
