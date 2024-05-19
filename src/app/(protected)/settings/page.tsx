import { auth } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return <div>Setting Page: {JSON.stringify(session)}</div>;
};

export default SettingPage;
