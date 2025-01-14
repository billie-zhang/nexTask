import { useLoaderData } from "react-router-dom";
import { createTask, fetchData } from "../helpers";
import Intro from "../components/Intro";
import AddTaskForm from "../components/AddTaskForm";
import AddBreakdownTaskForm from "../components/AddBreakdownTaskForm";
import { toast } from "react-toastify";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const tasks = fetchData("tasks");
  return { userName, tasks };
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

  if (_action === "createTask") {
    try {
      // create task
      createTask({
        name: values.taskName,
        priorityLevel: values.priorityLevel,
      });

      return toast.success(`Task created: ${values.taskName}`);
    } catch (error) {
      throw new Error("There was a problem creating your task.");
    }
  }
}

const Dashboard = () => {
  const { userName, tasks } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {tasks && tasks.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddTaskForm />
                  <AddBreakdownTaskForm tasks={tasks} />
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>prioritization is the secret to getting things done</p>
                <p>create a task to get started</p>
                <AddTaskForm />
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
