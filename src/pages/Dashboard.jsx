import { useLoaderData } from "react-router-dom";
import { createGoal, fetchData, createTask } from "../helpers";
import Intro from "../components/Intro";
import AddGoalForm from "../components/AddGoalForm";
import GoalItem from "../components/GoalItem";
import AddBreakdownTaskForm from "../components/AddBreakdownTaskForm";
import { toast } from "react-toastify";
import Table from "../components/Table";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const goals = fetchData("goals");
  const tasks = fetchData("tasks");
  return { userName, goals, tasks };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createGoal") {
    try {
      // create goal
      createGoal({
        name: values.goalName,
        priorityLevel: values.priorityLevel,
      });

      return toast.success(`Goal created: ${values.goalName}`);
    } catch (error) {
      throw new Error("There was a problem creating your goal.");
    }
  }

  if (_action === "createTask") {
    try {
      // create task
      createTask({
        name: values.taskName,
        estimatedTime: values.estimatedTime,
        goalId: values.newBreakdownTaskGoal,
      });

      return toast.success(`Task created: ${values.taskName}`);
    } catch (error) {
      throw new Error("There was a problem creating your task.");
    }
  }
}

const Dashboard = () => {
  const { userName, goals, tasks } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {goals && goals.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddGoalForm />
                  <AddBreakdownTaskForm goals={goals} />
                </div>
                <h2>Existing Goals</h2>
                <div className="budgets">
                  {goals.map((goal) => (
                    <GoalItem key={goal.id} goal={goal} />
                  ))}
                </div>
                {tasks && tasks.length > 0 && (
                  <div className="grid-md">
                    <h2>Current Tasks</h2>
                    <Table
                      tasks={tasks.sort((a, b) => b.createdAt - a.createdAt)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>prioritization is the secret to getting things done</p>
                <p>create a goal to get started</p>
                <AddGoalForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
