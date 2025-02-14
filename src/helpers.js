const generateRandomColor = () => {
  const existingGoalLength = fetchData("goals")?.length || 0;

  const lightness = Math.max(5, Math.min(25, 30 - existingGoalLength * 2));

  return `254 30% ${lightness}%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) || [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key) || [];
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage;
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
export const createTask = ({ name, estimatedTime, goalId, completed }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    estimatedTime: +estimatedTime,
    goalId: goalId,
    completed: completed,
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
