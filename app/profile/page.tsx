"use client";
import { useUser } from "@clerk/nextjs";

const page = () => {
  const { user } = useUser();
  console.log(user?.fullName);
  return <div></div>;
};
export default page;
