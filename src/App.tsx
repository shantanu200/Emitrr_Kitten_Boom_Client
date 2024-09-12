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
    path: "/",
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
        path: "/dashboard",
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
    element: (
      <AuthContext>
        <Instruction />
      </AuthContext>
    ),
  },
  {
    path: "/game/:id",
    element: (
      <AuthContext>
        <Game />
      </AuthContext>
    ),
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
