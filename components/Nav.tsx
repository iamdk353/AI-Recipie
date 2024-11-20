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
import { ChevronRight, Menu } from "lucide-react";
import { NavIterators } from "./iterators";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
const Nav = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const { isSignedIn, isLoaded, user } = useUser();
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
      {isSignedIn && (
        <div className="space-x-6 hidden md:flex">
          {NavIterators.map((i, id) => {
            return i == "logout" ? (
              <SignOutButton key={id} redirectUrl="/">
                Logout
              </SignOutButton>
            ) : (
              <Tab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                id={id}
                text={i}
                key={id}
              />
            );
          })}
        </div>
      )}
      <div className="md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            <Menu />
          </MenubarTrigger>
          <MenubarContent>
            {NavIterators.map((i, id) => {
              return i == "logout" ? (
                <SignOutButton key={id}>Logout</SignOutButton>
              ) : (
                <Link key={id} href={i}>
                  <MenubarItem className="capitalize">{i}</MenubarItem>
                  <MenubarSeparator />
                </Link>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </div>
      {!isSignedIn && (
        <Link href={"sign-up"}>
          <Button className="group  justify-center hidden md:flex">
            SIGN UP{" "}
            <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
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
