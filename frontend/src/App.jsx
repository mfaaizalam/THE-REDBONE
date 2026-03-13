import { RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import createRouter from "./Router";

export default function App() {

  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
}