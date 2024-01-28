"use client";
import { useFolder } from "@hooks/useFolder.hook";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/DropdownMenu";
import { Icon } from "@ui/components/Icon";
import Link from "next/link";
import { useState } from "react";
import AddEditFolderForm from "./addEditFolderForm";
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

const FolderItem = ({ folder, onDelete }: any) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  return (
    <div className="bg-yellow-50 hover:bg-muted/50 cursor-pointer  shadow px-2 py-2 w-full  rounded flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon.folder className="ml-2" />{" "}
        <div className="text-sm capitalize">{folder?.name}</div>
      </div>
      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-test="color-mode-toggle">
              <Icon.more size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/app/files/${folder?.id}`}
                className="flex items-center"
              >
                <Icon.show className="mr-2 h-4 w-4" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenEdit(true);
              }}
            >
              <Icon.pen className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(folder?.id);
              }}
            >
              <Icon.delete className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
          </DialogHeader>
          <AddEditFolderForm
            callback={() => {
              setIsOpenEdit(false);
            }}
            data={folder}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FolderList;
