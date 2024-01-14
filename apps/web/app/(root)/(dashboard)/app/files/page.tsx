"use client";
import AddNewFileFolder from "@components/dashboard/addNew.fileFolder";
import { useFileUpload } from "@hooks/useFileUpload.hook";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Icon } from "@ui/components/Icon";
import { FileDialog } from "@ui/file-dialog";
import { FileWithPreview } from "@ui/types";
import { ApiService } from "core";
import React, { useMemo } from "react";

const FilePage = () => {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
  const { isUploading, startToUpload } = useFileUpload();

  const { data, refetch } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest("/folders");
      if (success) return response;
      return [];
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <AddNewFileFolder
          callback={() => {
            refetch();
          }}
        />
        <FileDialog
          files={files}
          name="images"
          maxFiles={3}
          setFiles={setFiles}
          setValue={() => {}}
          maxSize={1024 * 1024 * 4}
        />
      </div>
      <div className=" grid grid-cols-4 gap-4 items-center w-full ">
        {data?.map((el: any) => <FolderItem folder={el} />)}
      </div>
    </div>
  );
};

const FolderItem = ({ folder }: any) => {
  const folderName = useMemo(() => {
    return (
      folder?.metadata?.name || folder?.Key?.replace("/", "").replace("-", " ")
    );
  }, [folder]);
  return (
    <div className="bg-yellow-50 shadow px-2 py-2 w-full  rounded flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon.folder className="ml-2" />{" "}
        <div className="text-sm capitalize">{folderName}</div>
      </div>
      <Button variant="ghost" size="icon" data-test="color-mode-toggle">
        <Icon.more size={18} />
      </Button>
    </div>
  );
};

export default FilePage;
