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
import { useDispatch, useSelector } from 'react-redux';
import { addProjectCat } from '../../../store/projectCatSlice';
import { addProjectIntoGanttData } from '../../../store/ganttDataSlice';
import { API } from 'aws-amplify';

const CreateForm = ({ clickCreate, setClickCreate }) => {
	const cancelCreateHandler = () => setClickCreate(!clickCreate);
	const [isInputError, setIsInputError] = useState(true);
	const dispatch = useDispatch();
	const projectCatsData = useSelector((state) => state.projectCategories);

	const [catData, setCatData] = useState({});

	const inputHandler = (e) => {
		const result = projectCatsData.cats.some(
			(projectCat) => projectCat.name === e.target.value.replace(/\s*/g, '')
		);
		if (
			e.target.value.match(
				/^[\u4e00-\u9fa5_a-zA-Z0-9_\x20_\u3105-\u3129\u02CA\u02C7\u02CB\u02D9_-]+$/
			) !== null &&
			e.target.value.trim() !== '' &&
			result === false
		) {
			setIsInputError(false);
			setCatData({
				linkName: e.target.value.replace(/\s*/g, ''),
				name: e.target.value.trim(),
				id: uuidv4(),
				createdAt: new Date().toJSON(),
				updatedAt: new Date().toJSON(),
			});
		} else {
			setIsInputError(true);
		}
	};

	const createProjectHandler = (e) => {
		e.preventDefault();
		API.post('projectCats', '/projectcats/', {
			body: {
				name: catData.name,
				createdAt: catData.createdAt,
				updatedAt: catData.updatedAt,
				id: catData.id,
			},
		});
		dispatch(addProjectCat(catData));
		dispatch(
			addProjectIntoGanttData({
				linkName: catData.linkName,
				name: catData.name,
				id: catData.id,
				createdAt: catData.createdAt,
				updatedAt: catData.updatedAt,
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
						onChange={inputHandler}
						autoFocus={true}
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
