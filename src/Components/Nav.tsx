import { LucideIceCreamBowl } from "lucide-react";
import { useNavigate } from "react-router";

const Nav = () => {
  const link = useNavigate();
  return (
    <div className="navbar bg-base-300" data-theme="light">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => {
            link("/");
          }}
        >
          FlavorBot
          <LucideIceCreamBowl />
        </a>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};
export default Nav;
