export const getGanttData = async(id) => {
  const ganttDatas = await localStorage.getItem("ganttDatas");
  const ganttData = JSON.parse(ganttDatas);
  const result = ganttData.some(project => id === project.name);
  if (!result) {
    console.log('something went wrong in the getGanttData session, plz check...');
  } else {
    const filteredGanttData = ganttData.filter(project => project.name === id);
    const dataList = filteredGanttData[0].list;
    filteredGanttData[0].list = dataList.map(task => {
      return {
        ...task,
        start: new Date(task.start),
        end: new Date(task.end),
      }
    })
    return filteredGanttData;
  };
};

export const getTotalGanttData = async() => {
  const ganttDatas = await localStorage.getItem("ganttDatas");
  const ganttData = JSON.parse(ganttDatas);
  const newData = ganttData.map(project => {
    return {
      ...project,
      list: project.list.map(task => {
        console.log(task);
        return {
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        };
      }),
    }
  });
  console.log(newData);
  return newData;
};