"use client";
import FoodPreferenceForm from "@/components/food-preference-form";
import UserProfileForm from "@/components/user-profile-form";
import { useState } from "react";
import FoodPrefSection from "./foodPrefSection";
import { Edit, ScanEye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
const page = () => {
  const { user, isLoaded } = useUser();
  const [edit, setEdit] = useState(true);
  // console.log(user);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 relative place-content-center">
      <UserProfileForm />
      {!edit && <FoodPreferenceForm setEdit={setEdit} />}
      {edit && (
        <FoodPrefSection
          id={user?.emailAddresses[0]?.emailAddress as string}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};
export default page;
