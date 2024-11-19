"use client";
import { localUse } from "@/components/localUser";
import FoodPreferenceForm from "@/components/food-preference-form";
import UserProfileForm from "@/components/user-profile-form";
const page = () => {
  const { user, isLoaded } = localUse();
  // console.log(user);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      {
        <>
          <UserProfileForm />
          <FoodPreferenceForm />
        </>
      }
    </div>
  );
};
export default page;
