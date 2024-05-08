"use client";

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  className?: string;
}

const AddButton: React.FC<Props> = ({ className }) => {
  const handleClick = () => {
    console.log(process.env.NEXT_PUBLIC_DB_URL);
  };

  return (
    <Button variant="outline" className={className} onClick={handleClick}>
      <PlusIcon className="mr-2 h-4 w-4" />
      add a note
    </Button>
  );
};

export default AddButton;
