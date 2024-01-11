import AddNewFileFolder from "@components/dashboard/addNew.fileFolder";

const FilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <AddNewFileFolder />
      </div>
    </div>
  );
};

export default FilePage;
