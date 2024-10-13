import { createRoot } from "react-dom/client";
import "./index.css";
import Nav from "./Components/Nav";
import { Toaster } from "react-hot-toast";
import Chat from "./Components/Chat";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Hero from "./Components/Hero";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Hero />}></Route>
      <Route path="chat" element={<Chat />}></Route>
    </Route>
  )
);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={AppRouter}></RouterProvider>
);

function Layout() {
  return (
    <div className="max-w-[2460px] mx-auto">
      <Toaster />
      <Nav></Nav>
      <Outlet />
    </div>
  );
}
