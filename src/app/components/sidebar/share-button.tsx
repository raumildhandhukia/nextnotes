import { MdShare } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Props {}
export const ShareButton: React.FC<Props> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <MdShare />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Feature Coming Soon</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
