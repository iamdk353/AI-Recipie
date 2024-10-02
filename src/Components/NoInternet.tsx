import { BotOffIcon, WifiLowIcon } from "lucide-react";

const NoInternet = () => {
  return (
    <div className="w-screen h-[95vh] flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col">
        <div className="relative">
          <BotOffIcon size={105} />
          <WifiLowIcon
            className="absolute top-[-3rem] right-[-3rem] animate-ping"
            size={70}
          />
        </div>
        <p>OFFLINE...</p>
      </div>
    </div>
  );
};
export default NoInternet;
