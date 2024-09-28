import { useState } from "react";
import AIresponse from "./AIresponse";

const Options = () => {
  const [search, setSearch] = useState("");
  const [isVeg, setIsveg] = useState(false);
  const [people, setPeople] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <form
        className="w-[80%] md:w-[60%] mx-auto space-y-3 p-5 bg-base-300 m-4 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="text-2xl font-semibold text-center">ADD YOUR PROMPT </p>
        <div className="flex items-center ">
          <input
            type="text"
            placeholder="Vegetables"
            className="input input-bordered w-full max-w-xs mx-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row space-x-2  justify-center">
          <label className="label cursor-pointer space-x-2">
            <span className="label-text font-semibold"> VEG</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={isVeg}
              onChange={() => {
                setIsveg((p) => !p);
              }}
            />
          </label>
          <label className="label cursor-pointer space-x-2">
            <span className="label-text font-semibold">NON-VEG</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={!isVeg}
              onChange={() => {
                setIsveg((p) => !p);
              }}
            />
          </label>
        </div>
        <div>
          <label className="label cursor-pointer space-x-2">
            <span className="label-text font-semibold">Number Of People</span>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mx-2"
              value={people}
              onChange={(e) => {
                setPeople(Math.abs(Number(e.target.value)));
              }}
            />
          </label>
        </div>
      </form>
      <AIresponse
        search={search}
        isVeg={isVeg}
        people={people}
        setSearch={setSearch}
      />
    </div>
  );
};
export default Options;
