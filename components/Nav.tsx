"use client";
import { SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { Menu } from "lucide-react";
import { NavIterators } from "./iterators";
import Link from "next/link";

const Nav = () => {
  const [activeTab, setActiveTab] = useState(-1);
  return (
    <Menubar className="h-[4rem] md:px-10 px-4">
      <Link href={"/"}>
        <Button
          variant={"ghost"}
          className="focus:outline-none text-md md:text-2xl my-2 md:my-4"
          onClick={() => {
            setActiveTab(-1);
          }}
        >
          FLAVOUR BOT
        </Button>
      </Link>
      <div className="flex-1"></div>
      <div className="space-x-6 hidden md:flex">
        {NavIterators.map((i, id) => {
          return (
            <Tab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              id={id}
              text={i}
              key={id}
            />
          );
        })}
        {/* <Button
          variant={activeTab !== 1 ? "ghost" : "default"}
          className="text-xl"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Home
        </Button>
        <Button
          variant={activeTab !== 2 ? "ghost" : "default"}
          className="text-xl"
          onClick={() => {
            setActiveTab(2);
          }}
        >
          Chat-bot
        </Button>
        <Button
          variant={activeTab !== 3 ? "ghost" : "default"}
          className="text-xl"
          onClick={() => {
            setActiveTab(3);
          }}
        >
          Profile
        </Button> */}
      </div>
      <div className="md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            <Menu />
          </MenubarTrigger>
          <MenubarContent>
            {NavIterators.map((i, id) => {
              return (
                <Link key={id} href={i}>
                  <MenubarItem>{i}</MenubarItem>
                  <MenubarSeparator />
                </Link>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};
export default Nav;

const Tab = ({ activeTab, setActiveTab, id, text }: tab) => {
  return (
    <Link href={text}>
      <Button
        variant={activeTab !== id ? "ghost" : "default"}
        className="text-xl capitalize"
        onClick={() => {
          setActiveTab(id);
        }}
      >
        {text}
      </Button>
    </Link>
  );
};

interface tab {
  activeTab: number;
  setActiveTab: (value: SetStateAction<number>) => void;
  id: number;
  text: string;
}
