"use client";
import { BrainCogIcon, Loader } from "lucide-react";
import { Button } from "./ui/button";
import llmObj, { opFoodlistPref } from "@/app/(AI)/init";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
const NewIdeas = ({
  similars,
  setData,
}: {
  similars?: string;
  setData: Dispatch<SetStateAction<opFoodlistPref[]>>;
}) => {
  const [load, setLoad] = useState(false);
  return (
    <Button
      className="text-lg p-4 rounded-md cursor-pointer hover:scale-105 hover:shadow-sm transition-all active:scale-[0.99] h-full"
      onClick={async () => {
        setLoad(true);
        const data = await llmObj.getFoodList("iamdk353@gmail.com");
        if (data) setData(data as opFoodlistPref[]);
        setLoad(false);
      }}
    >
      {!load && (
        <>
          <BrainCogIcon />
          New Ideas
        </>
      )}
      {load && <Loader className="animate-spin" />}
    </Button>
  );
};
export default NewIdeas;
