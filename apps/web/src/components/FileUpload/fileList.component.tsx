"use client";
import { useFileContext } from "@context/file.provider";
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
import { Zoom } from "@ui/components/zoom-image";
import { DateUtils, DictionaryType } from "core";
import Link from "next/link";
import { useState } from "react";
import RenameFileNameForm from "./renameFileName.form";

const FileList = () => {
  const { uploadedFiles, onDelete } = useFileContext();

  return (
    <div className="flex flex-col gap-4">
      <div className=" grid grid-cols-4 gap-4 items-center w-full ">
        {uploadedFiles?.map((file: any) => {
          return <FileListItem file={file} {...{ onDelete }} />;
        })}
      </div>
    </div>
  );
};

const FileListItem = ({
  file,
  onDelete,
}: {
  file: DictionaryType;
  onDelete?: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <div
      key={file?.id}
      className="flex flex-col  bg-mutated/50 shadow rounded-lg  border"
    >
      <div className="px-2 flex items-center justify-between py-3 text-sm">
        <div>{file?.name}</div>
        <Dialog key={file?.id} open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-test="color-mode-toggle">
                <Icon.more size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <Icon.pen className="mr-2 h-4 w-4" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Link
                  target="_blank"
                  className="flex items-center "
                  href={file?.url}
                >
                  <Icon.downloadCloud className="mr-2 h-4 w-4" />{" "}
                  <span>Download</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(file?.id);
                }}
              >
                <Icon.delete className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent key={file?.id}>
            <DialogHeader>
              <DialogTitle>Change File Name</DialogTitle>
            </DialogHeader>
            <RenameFileNameForm
              key={file?.id}
              callback={() => {
                setIsOpen(false);
              }}
              data={file}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white mx-4 h-[150px] rounded  items-center flex justify-center ">
        <FileIcon fileUrl={file.url} />
      </div>
      <div className="px-5  py-3 text-sm text-gray-500">
        {DateUtils.displayDate(file.created_at)}
      </div>
    </div>
  );
};
const FileIcon = ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl) return <></>;
  const fileDetail = getFileSourceDetail(fileUrl);

  switch (fileDetail.extension) {
    case "png":
    case "jpg":
    case "jpeg":
      return (
        <Zoom className="h-full w-full">
          <img
            src={fileUrl}
            alt={fileDetail.name as string}
            className="w-full h-full object-cover"
          />
        </Zoom>
      );
    default:
      return <Icon.file className="text-gray-400" size={100} />;
  }
};

const getFileSourceDetail = (fileUrl: string) => {
  let fileName = new URL(fileUrl || "").pathname.split("/").pop();
  const extension = fileName?.split(".").pop();

  return {
    extension,
    url: fileUrl,
    name: fileName,
  };
};
export default FileList;
