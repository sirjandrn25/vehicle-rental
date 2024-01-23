"use client";
import { useFolder } from "@hooks/useFolder.hook";
import { Button } from "@ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/DropdownMenu";
import { Icon } from "@ui/components/Icon";
import AddEditFolderForm from "./addEditFolderForm";
import Link from "next/link";
const FolderList = () => {
  const { folders, onDelete, onEdit } = useFolder();
  return (
    <div className=" grid grid-cols-4 gap-4 items-center w-full ">
      {folders?.map((el: any) => (
        <FolderItem {...{ onDelete, onEdit }} key={el?.id} folder={el} />
      ))}
    </div>
  );
};

const FolderItem = ({ folder, onDelete, onEdit }: any) => {
  return (
    <Link
      href={`/app/files/${folder?.id}`}
      className="bg-yellow-50 hover:bg-muted/50 cursor-pointer  shadow px-2 py-2 w-full  rounded flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <Icon.folder className="ml-2" />{" "}
        <div className="text-sm capitalize">{folder?.name}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" data-test="color-mode-toggle">
            <Icon.more size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(folder?.id);
            }}
          >
            <Icon.delete className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AddEditFolderForm onSubmit={async (data) => onEdit(data)}>
              <div className="flex items-center">
                <Icon.pen className="mr-2 h-4 w-4" /> Rename
              </div>
            </AddEditFolderForm>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
};

export default FolderList;
