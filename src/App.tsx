import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.page";
import { ModeToggle } from "./components/mode-toggle";
import Dashboard from "./pages/Dashboard.page";
import { Layout } from "./Layout/Layout";
import React, { Suspense } from "react";
import PageLoading from "./pages/PageLoading";
import Leaderboard from "./pages/Leaderboard.page";
import AuthContext from "./context/AuthContext";

const Instruction = React.lazy(() => import("@/pages/Instruction.page"));
const Game = React.lazy(() => import("@/pages/Game/Game.page"));

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: (
      <AuthContext>
        <Layout>
          <Outlet />
        </Layout>
      </AuthContext>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/instruction",
    element: <Instruction />,
  },
  {
    path: "/game/:id",
    element: <Game />,
  },
]);

function App() {
  return (
    <main>
      <Suspense fallback={<PageLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      <div className="fixed bottom-8 right-8">
        <ModeToggle />
      </div>
    </main>
  );
}

export default App;
