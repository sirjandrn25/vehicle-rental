"use client";
import AddEditFolderForm from "@components/FileUpload/addEditFolderForm";
import { Button } from "@ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/DropdownMenu";
import { Icon } from "@ui/components/Icon";

const AddNewFileFolder = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add New</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-48" align="start">
        <DropdownMenuItem>
          <AddEditFolderForm />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon.file className="mr-2 h-4 w-4" /> Upload File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddNewFileFolder;
