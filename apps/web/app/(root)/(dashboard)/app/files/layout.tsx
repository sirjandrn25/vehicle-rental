"use client";
import AddEditFolderForm from "@components/FileUpload/addEditFolderForm";
import FileProvider, {
  useFileContext,
  withFileProviderExport,
} from "@context/file.provider";
import { useFolder } from "@hooks/useFolder.hook";
import { Button } from "@ui/components/Button";
import { FileDialog } from "@ui/components/file-dialog";
import { ReactNode } from "react";

const FileLayout = ({ children }: { children: ReactNode }) => {
  const { onCreate, folder_id } = useFolder();
  const { uploadingFiles, setUploadingFiles, isUploading, startToUpload } =
    useFileContext();

  return (
    <FileProvider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <AddEditFolderForm
            onSubmit={async (data) =>
              onCreate({ ...data, parent_id: folder_id })
            }
          >
            <Button>Add New</Button>
          </AddEditFolderForm>
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
    </FileProvider>
  );
};

export default withFileProviderExport(FileLayout);
