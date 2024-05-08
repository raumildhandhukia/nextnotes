"use client";

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

const AddButton: React.FC = () => {
  return (
    <Button variant="outline" className="m-auto w-swx my-3">
      <PlusIcon className="mr-2 h-4 w-4" />
      add a note
    </Button>
  );
};

export default AddButton;
