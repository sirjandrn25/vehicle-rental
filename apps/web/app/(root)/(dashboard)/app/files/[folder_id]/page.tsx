import FileList from "@components/FileUpload/fileList.component";
import FolderList from "@components/FileUpload/folderList.component";
const Folder = () => {
  return (
    <div className="flex flex-col gap-4">
      <FolderList />
      <FileList />
    </div>
  );
};

export default Folder;
