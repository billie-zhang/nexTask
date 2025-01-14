const generateRandomColor = () => {
  const existingTaskLength = fetchData("tasks")?.length || 0;
  return `${existingTaskLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create task
export const createTask = ({ name, priorityLevel }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    priorityLevel: +priorityLevel,
    color: generateRandomColor(),
  };
  const tasks = fetchData("tasks") || [];
  return localStorage.setItem("tasks", JSON.stringify([...tasks, newItem]));
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
