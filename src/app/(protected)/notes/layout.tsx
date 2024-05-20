import SideBar from "@/app/components/sidebar/SideBar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

interface NoteLayoutProps {
  children: React.ReactNode;
}

const NoteLayout: React.FC<NoteLayoutProps> = async ({ children }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main>
        <div className="flex">
          <SideBar />
          <div className="">{children}</div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default NoteLayout;
