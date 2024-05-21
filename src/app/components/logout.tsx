import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <form action={logout} className="w-full">
      <Button className="w-full" variant="destructive" type="submit">
        Logout
      </Button>
    </form>
  );
};
