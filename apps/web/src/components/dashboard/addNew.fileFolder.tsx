"use client";
import AddEditFolderForm from "@components/FileUpload/addEditFolderForm";
import { Button } from "@ui/components/Button";

const AddNewFileFolder = ({ callback }: any) => {
  return (
    <AddEditFolderForm callback={callback}>
      <Button>Add New</Button>
    </AddEditFolderForm>
  );
};

export default AddNewFileFolder;
