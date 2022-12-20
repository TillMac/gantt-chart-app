import { Box, Typography } from '@mui/material';
import { Gantt, ViewMode } from 'gantt-task-react';
import React from 'react';
import 'gantt-task-react/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTaskFromGanttData,
	editTaskNameInGanttData,
} from '../../store/ganttDataSlice';
import { API } from 'aws-amplify';
import {
	deleteSuccessed,
	putSuccessed,
	updatePopUpStatus,
} from '../../store/popUpBarInfoSlice';

export const GanttGroup = ({ project }) => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userData.userData);
	const popUpBarInfo = useSelector((state) => state.popUpBarInfo);
	const timeView = useSelector((state) => state.timeView);
	const isListOpen = useSelector((state) => state.listOpen);

	let columnWidth = 65;
	if (timeView.view === ViewMode.Year) {
		columnWidth = 350;
	} else if (timeView.view === ViewMode.Month) {
		columnWidth = 300;
	} else if (timeView.view === ViewMode.Week) {
		columnWidth = 250;
	}

	const deleteTaskHandler = (task) => {
		console.log(task, 'task');
		const conf = window.confirm(`Are you sure about delete ${task.name} ?`);
		if (!!conf) {
			if (userData[0].photoLink !== null) {
				fetch(
					`https://www.googleapis.com/calendar/v3/calendars/primary/events/${task.id.replace(
						/-/g,
						''
					)}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userData[0].accessToken}`,
						},
					}
				)
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
						throw new Error('Google 認證已過期，請重新登入');
					})
					.then((data) => {
						console.log(data);
						API.del('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
							response: true,
						})
							.then((response) => {
								console.log(response, 'from del API');
								dispatch(deleteTaskFromGanttData(task));
								if (
									!!popUpBarInfo.connection.isAwsDel &&
									!!popUpBarInfo.connection.isGapiDel
								) {
									dispatch(
										deleteSuccessed({
											type: task.type,
											name: task.name,
										})
									);
								}
							})
							.catch((error) => {
								dispatch(
									updatePopUpStatus({
										isAwsDel: false,
										msg: '無法更新至資料庫，請檢查連線。',
									})
								);
							});
					})
					.catch((error) => {
						dispatch(
							updatePopUpStatus({
								isGapiDel: false,
								msg: 'Google 認證已過期，請重新登入',
							})
						);
					});
			} else {
				API.del('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
					response: true,
				})
					.then((response) => {
						console.log(response, 'from del API');
						dispatch(deleteTaskFromGanttData(task));
						if (
							!!popUpBarInfo.connection.isAwsDel &&
							!!popUpBarInfo.connection.isGapiDel
						) {
							dispatch(
								deleteSuccessed({
									type: task.type,
									name: task.name,
								})
							);
						}
					})
					.catch((error) => {
						dispatch(
							updatePopUpStatus({
								isAwsDel: false,
								msg: '無法更新至資料庫，請檢查連線。',
							})
						);
					});
			}
		}
	};

	const editTaskHandler = (task) => {
		let editedTask = {};
		const prompt = window.prompt('Please enter a new task name：').trim();
		if (prompt !== undefined && prompt !== '') {
			editedTask = {
				name: prompt,
				project: task.project,
				projectId: task.projectId,
				id: task.id,
			};
		}
		if (userData[0].photoLink !== null) {
			fetch(
				`https://www.googleapis.com/calendar/v3/calendars/primary/events/${editedTask.id.replace(
					/-/g,
					''
				)}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userData[0].accessToken}`,
					},
					body: JSON.stringify({
						summary: editedTask.name,
					}),
				}
			)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Google 認證已過期，請重新登入');
				})
				.then(() => {
					API.put('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
						body: {
							name: editedTask.name,
						},
					})
						.then(() => {
							dispatch(editTaskNameInGanttData(editedTask));
							if (
								!!popUpBarInfo.connection.isAwsPut &&
								!!popUpBarInfo.connection.isGapiPatch
							) {
								dispatch(
									putSuccessed({
										newName: editedTask.name,
										oldName: task.name,
										type: task.type,
									})
								);
							}
						})
						.catch((error) => {
							dispatch(
								updatePopUpStatus({
									isAwsPut: false,
									msg: '無法更新至資料庫，請檢查連線。',
								})
							);
						});
				})
				.catch(() => {
					dispatch(
						updatePopUpStatus({
							isGapiPatch: false,
							msg: 'Google 認證已過期，請重新登入',
						})
					);
				});
		} else {
			API.put('ganttTasksApi', `/gantttasks/userId/${task.id}`, {
				body: {
					name: editedTask.name,
				},
			})
				.then(() => {
					dispatch(editTaskNameInGanttData(editedTask));
					if (
						!!popUpBarInfo.connection.isAwsPut &&
						!!popUpBarInfo.connection.isGapiPatch
					) {
						dispatch(
							putSuccessed({
								newName: editedTask.name,
								oldName: task.name,
								type: task.type,
							})
						);
					}
				})
				.catch((error) => {
					dispatch(
						updatePopUpStatus({
							isAwsPut: false,
							msg: '無法更新至資料庫，請檢查連線。',
						})
					);
				});
		}
	};

	return (
		<Box
			key={project.id}
			sx={{ maxWidth: '90%', ml: 'auto', mr: 'auto', mt: 1.5 }}>
			<Typography variant='h3' sx={{ fontSize: '32px' }}>
				{project.name}
			</Typography>
			{project.list.length !== 0 ? (
				<Gantt
					tasks={project.list}
					onDelete={deleteTaskHandler}
					onDoubleClick={editTaskHandler}
					viewMode={timeView.view}
					listCellWidth={isListOpen.status ? '155px' : ''}
					columnWidth={columnWidth}
				/>
			) : (
				<p>There's no data yet!</p>
			)}
		</Box>
	);
};
