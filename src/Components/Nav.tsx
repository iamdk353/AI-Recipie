import { LucideIceCreamBowl } from "lucide-react";

const Nav = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          FlavorBot
          <LucideIceCreamBowl />
        </a>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};
export default Nav;
