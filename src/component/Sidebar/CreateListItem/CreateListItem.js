import CreateBtn from "./CreateBtn";
import CreateForm from "./CreateForm";

const CreateListItem = ({ clickCreate, setClickCreate, ganttData, setGanttData }) => {
  return (
    <>
    {(!clickCreate)
      ? <CreateBtn clickCreate={clickCreate} setClickCreate={setClickCreate} />
      : <CreateForm clickCreate={clickCreate} setClickCreate={setClickCreate} ganttData={ganttData} setGanttData={setGanttData} />
    }
    </>
  )
};

export default CreateListItem;
