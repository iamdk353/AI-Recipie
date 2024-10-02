import { createRoot } from "react-dom/client";
import "./index.css";

import { Toaster } from "react-hot-toast";
import Chat from "./Components/Chat";

createRoot(document.getElementById("root")!).render(
  <div className="max-w-[2460px] mx-auto">
    <Toaster />
    <Chat />
  </div>
);
