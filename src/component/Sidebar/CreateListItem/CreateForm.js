import { Add, Cancel } from '@mui/icons-material';
import {
	List,
	FormControl,
	InputLabel,
	ListItem,
	IconButton,
	Input,
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addProjectCat } from '../../../store/projectCatSlice';
import { addProjectIntoGanttData } from '../../../store/ganttDataSlice';

const CreateForm = ({ clickCreate, setClickCreate }) => {
	const cancelCreateHandler = () => setClickCreate(!clickCreate);
	const [isInputError, setIsInputError] = useState(false);
	const dispatch = useDispatch();

	const [catData, setCatData] = useState({});

	const inputHandler = (e) => {
		if (
			e.target.value.match(
				/^[\u4e00-\u9fa5_a-zA-Z0-9_\x20_\u3105-\u3129\u02CA\u02C7\u02CB\u02D9_-]+$/
			) !== null &&
			e.target.value.trim() !== ''
		) {
			setIsInputError(false);
			setCatData({
				projectName: e.target.value.trim(),
				name: e.target.value.replace(/\s*/g, ''),
				id: uuidv4(),
			});
		} else {
			setIsInputError(true);
			console.log(e.target.value);
			console.log('isInputError', isInputError);
		}
	};

	const createProjectHandler = (e) => {
		e.preventDefault();
		dispatch(addProjectCat(catData));
		dispatch(
			addProjectIntoGanttData({
				projectName: catData.projectName,
				name: catData.name,
				id: catData.id,
				list: [],
			})
		);
		setCatData({
			projectName: '',
			name: '',
			id: null,
		});
		setClickCreate(!clickCreate);
	};

	return (
		<List sx={{ display: 'flex', mt: 1.5 }}>
			<form
				style={{ display: 'flex', margin: 'auto' }}
				onSubmit={createProjectHandler}>
				<FormControl sx={{ maxWidth: '120px', mr: 1.25 }} error={isInputError}>
					<InputLabel htmlFor='component-outlined'>新專案名稱</InputLabel>
					<Input
						id='component-outlined'
						label='新事項名稱'
						placeholder='輸入新事項名稱...'
						// inputRef={inputProjectRef}
						onChange={inputHandler}
					/>
				</FormControl>
				<ListItem sx={{ pl: 0, pr: 0, maxWidth: '60px' }}>
					<IconButton size='small' type='submit' disabled={isInputError}>
						<Add />
					</IconButton>
					<IconButton size='small' onClick={cancelCreateHandler}>
						<Cancel />
					</IconButton>
				</ListItem>
			</form>
		</List>
	);
};

export default CreateForm;
