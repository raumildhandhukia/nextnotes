import type { Metadata } from "next";
import { Inter } from "next/font/google";
import YourNotesProvider from "@/context/Provider";
import SharedNotesProvider from "@/context/SharedNotesContextProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Notes",
  description:
    "Sharing notes made easy. Collaborate with your friends and family on notes.",
  metadataBase: new URL("https://nextnotes-omega.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen dark">
        <YourNotesProvider>
          <SharedNotesProvider>{children}</SharedNotesProvider>
        </YourNotesProvider>
      </body>
    </html>
  );
}
