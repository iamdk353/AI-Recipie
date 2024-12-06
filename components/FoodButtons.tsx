"use client";

import { opFoodlistPref } from "@/app/(AI)/init";
import NewIdeas from "./NewIdeas";
import { useState } from "react";

const FoodButtons = ({ data }: { data: opFoodlistPref[] }) => {
  const [uiData, setData] = useState<opFoodlistPref[]>(data);
  let similiars = "";
  return (
    <>
      {uiData?.map((idea, index) => {
        similiars += idea.foodname + ",";
        return (
          <div
            key={index}
            className="text-lg p-4 bg-slate-200 rounded-md cursor-pointer hover:scale-105 hover:shadow-sm transition-all active:scale-[0.99]"
          >
            {idea.foodname}
          </div>
        );
      })}
      <NewIdeas similars={similiars} setData={setData} />
    </>
  );
};
export default FoodButtons;
