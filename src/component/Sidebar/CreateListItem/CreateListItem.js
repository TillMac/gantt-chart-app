import CreateBtn from './CreateBtn';
import CreateForm from './CreateForm';

const CreateListItem = ({ clickCreate, setClickCreate }) => {
	return (
		<>
			{!clickCreate ? (
				<CreateBtn clickCreate={clickCreate} setClickCreate={setClickCreate} />
			) : (
				<CreateForm clickCreate={clickCreate} setClickCreate={setClickCreate} />
			)}
		</>
	);
};

export default CreateListItem;
