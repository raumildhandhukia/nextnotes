import { NewVerification } from "@/app/components/auth/new-verification";
import { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense>
      <NewVerification />
    </Suspense>
  );
};
export default NewVerificationPage;
