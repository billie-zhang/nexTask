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

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
