"use client";
import AddNewFolder from "@components/FileUpload/addNewFolder";
import FileProvider, {
  useFileContext,
  withFileProviderExport,
} from "@context/file.provider";
import FolderProvider from "@context/folder.provider";
import { useFolder } from "@hooks/useFolder.hook";
import { FileDialog } from "@ui/components/file-dialog";
import { ReactNode } from "react";

const FileLayout = ({ children }: { children: ReactNode }) => {
  const { onCreate, folder_id } = useFolder();
  const { uploadingFiles, setUploadingFiles, isUploading, startToUpload } =
    useFileContext();

  return (
    <FileProvider>
      <FolderProvider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <AddNewFolder />
            <FileDialog
              files={uploadingFiles}
              name="images"
              maxFiles={3}
              setFiles={setUploadingFiles}
              setValue={() => {}}
              isUploading={isUploading}
              maxSize={1024 * 1024 * 4}
              onSave={(callback) => {
                startToUpload?.({ files: uploadingFiles, callback });
              }}
            />
          </div>

          {children}
        </div>
      </FolderProvider>
    </FileProvider>
  );
};

export default withFileProviderExport(FileLayout);
