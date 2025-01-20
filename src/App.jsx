import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import TasksPage, { tasksAction, tasksLoader } from "./pages/TasksPage";
import GoalPage, { goalLoader } from "./pages/GoalPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "goal/:name",
        element: <GoalPage />,
        loader: goalLoader,
        // action: tasksAction,
        errorElement: <Error />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
        loader: tasksLoader,
        action: tasksAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
