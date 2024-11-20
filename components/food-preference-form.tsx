"use client";

import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { localUse } from "./localUser";
import axios from "axios";
import { toast } from "sonner";
export default function FoodPreferenceForm({
  setEdit,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [dietaryPreference, setDietaryPreference] = useState("veg");
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);
  const [spiciness, setSpiciness] = useState([3]);
  const [sweetness, setSweetness] = useState([3]);
  const [excludeItems, setExcludeItems] = useState<string[]>([]);
  const [otherExclusions, setOtherExclusions] = useState("");
  const { user } = localUse();
  const cuisines = [
    "Indian",
    "Chinese",
    "American",
    "Italian",
    "Mexican",
    "Japanese",
    "Thai",
    "Mediterranean",
  ];

  const allergies = [
    "Nuts",
    "Dairy",
    "Eggs",
    "Soy",
    "Wheat",
    "Fish",
    "Shellfish",
  ];

  const handleCuisineChange = (cuisine: string) => {
    setCuisinePreferences((prev) =>
      prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleExcludeChange = (item: string) => {
    setExcludeItems((prev) =>
      prev.includes(item)
        ? prev.filter((excludeItem) => excludeItem !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      dietaryPreference,
      cuisinePreferences,
      spiciness: spiciness[0],
      sweetness: sweetness[0],
      excludeItems,
      otherExclusions,
      createdBy: user.emailAddresses[0].emailAddress,
    };
    console.log("Form submitted with data:", formData);
    try {
      const data = await axios.post(
        `api/create-pref/${user.emailAddresses[0].emailAddress}`,
        formData
      );
      console.log(data);
      toast.success("updated");
      setEdit(true);
    } catch (error) {
      toast.error("error in fething");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="bg-zinc-800 text-white">
            <CardTitle className="text-2xl">Food Preference Form</CardTitle>
            <CardDescription className="text-zinc-400">
              Tell us about your culinary preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 space-y-10">
            <div className="space-y-7">
              <Label className="text-2xl ">Dietary Preference</Label>
              <RadioGroup
                value={dietaryPreference}
                onValueChange={setDietaryPreference}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="size-4 md:size-6"
                    value="vegetarian"
                    id="vegetarian"
                  />
                  <Label className="text-sm md:text-xl" htmlFor="vegetarian">
                    Vegetarian
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="size-4 md:size-6"
                    value="non-vegetarian"
                    id="non-vegetarian"
                  />
                  <Label
                    className="text-sm md:text-xl"
                    htmlFor="non-vegetarian"
                  >
                    Non-Vegetarian
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="size-4 md:size-6"
                    value="both"
                    id="both"
                  />
                  <Label className="text-sm md:text-xl" htmlFor="both">
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-7">
              <Label className="text-2xl ">Cuisine Preferences</Label>
              <div className="grid grid-cols-2 gap-2">
                {cuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine.toLowerCase()}
                      className="md:size-6 size-4"
                      checked={cuisinePreferences.includes(cuisine)}
                      onCheckedChange={() => handleCuisineChange(cuisine)}
                    />
                    <Label
                      htmlFor={cuisine.toLowerCase()}
                      className="text-sm md:text-[1.1rem]"
                    >
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-7">
              <Label className="text-2xl ">Spiciness Preference</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={spiciness}
                onValueChange={setSpiciness}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Mild</span>
                <span>Medium</span>
                <span>Hot</span>
              </div>
            </div>

            <div className="space-y-7">
              <Label className="text-2xl ">Sweetness Preference</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={sweetness}
                onValueChange={setSweetness}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Not Sweet</span>
                <span>Medium</span>
                <span>Very Sweet</span>
              </div>
            </div>

            <div className="space-y-7">
              <Label className="text-2xl ">Exclude</Label>
              <div className="grid grid-cols-2 gap-2">
                {allergies.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${allergy.toLowerCase()}`}
                      className="md:size-6 size-4"
                      checked={excludeItems.includes(allergy)}
                      onCheckedChange={() => handleExcludeChange(allergy)}
                    />
                    <Label
                      htmlFor={`allergy-${allergy.toLowerCase()}`}
                      className="text-sm md:text-[1.1rem]"
                    >
                      {allergy}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-7">
              <Label htmlFor="other-allergies" className="text-2xl ">
                Others
              </Label>
              <Input
                id="other-allergies"
                placeholder="Enter any other Excluding items"
                className="bg-zinc-100"
                value={otherExclusions}
                onChange={(e) => setOtherExclusions(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-700"
            >
              Submit Preferences
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
