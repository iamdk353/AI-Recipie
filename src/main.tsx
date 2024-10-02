import { createRoot } from "react-dom/client";
import "./index.css";

import Chat from "./Components/Chat";

createRoot(document.getElementById("root")!).render(
  <div className="max-w-[2460px] mx-auto">
    <Chat />
  </div>
);
