import ModalDialog from "@ui/components/modal.dialog";
import React, { useRef } from "react";
import AddEditFolderForm from "./addEditFolderForm";
import { Button } from "@ui/components/Button";

const AddNewFolder = () => {
  const modalRef = useRef<any>(null);
  return (
    <ModalDialog
      displayLabel={<Button>Create Folder</Button>}
      title="Create New Folder"
      ref={modalRef}
    >
      <AddEditFolderForm callback={() => modalRef.current.handleClose()} />
    </ModalDialog>
  );
};

export default AddNewFolder;
