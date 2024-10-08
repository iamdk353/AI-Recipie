import Nav from "./Nav";
import Main from "./Main";
import { useEffect, useState } from "react";

const Chat = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return (
    <div data-theme="dark" className="flex flex-col md:h-screen min-h-screen ">
      <Nav />
      <Main Online={isOnline} />
    </div>
  );
};
export default Chat;
