const generateRandomColor = () => {
  const existingGoalLength = fetchData("goals")?.length || 0;
  return `${existingGoalLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create goal
export const createGoal = ({ name, priorityLevel }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    priorityLevel: +priorityLevel,
    color: generateRandomColor(),
  };
  const goals = fetchData("goals") || [];
  return localStorage.setItem("goals", JSON.stringify([...goals, newItem]));
};

// create task
export const createTask = ({ name, estimatedTime, goalId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    estimatedTime: +estimatedTime,
    goalId: goalId,
  };
  const existingTasks = fetchData("tasks") || [];
  return localStorage.setItem(
    "tasks",
    JSON.stringify([...existingTasks, newItem])
  );
};

// total tasks completed
export const totalTasksCompleted = (goalId) => {
  const tasks = fetchData("tasks") || [];
  return tasks.filter((task) => task.goalId === goalId).length;
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

// FORMATTING
export const formatDateToLocaleString = (date) =>
  new Date(date).toLocaleDateString();

// formating percentages
export const formatPercentage = (value) => {
  return value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
