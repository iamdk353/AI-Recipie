import { createRoot } from "react-dom/client";
import "./index.css";
import Nav from "./Components/Nav";
import Main from "./Components/Main";

createRoot(document.getElementById("root")!).render(
  <div className="max-w-[2460px] mx-auto">
    <Nav />
    <Main />
  </div>
);
