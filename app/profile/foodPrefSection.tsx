"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ChefHat, Flame, Candy, Ban } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Preference {
  _id: string;
  dietaryPreference: string;
  cuisinePreferences: string[];
  spiciness: number;
  sweetness: number;
  excludeItems: string[];
  otherExclusions: string;
  createdBy: string;
}

export default function FoodPrefSection({
  id,
  setEdit,
}: {
  id: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [data, setData] = useState<Preference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newUser, setNewUser] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/get-pref/${id}`);
        if (!resp.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await resp.json();
        if ((result.msg = "user not found")) {
          console.log("user is new");
          setNewUser(true);
        }
        setNewUser(false);
        setData(result);
        console.log(result);
      } catch (err) {
        setError(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Skeleton className="size-[30rem]  mx-auto" />;
  if (error) return <p>Error fetching data</p>;

  return (
    <>
      <Card className="w-full max-w-md overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-100 md:h-[70%] mx-auto">
        <CardHeader className="bg-gradient-to-r from-zinc-700 to-zinc-800 pb-4">
          <CardTitle className="text-2xl font-bold text-zinc-100">
            Created by: {data?.createdBy}
          </CardTitle>
          <p className="text-sm text-zinc-300 capitalize">
            {data?.dietaryPreference}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center text-lg font-semibold mb-2">
                <ChefHat className="w-5 h-5 mr-2" />
                Cuisine Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {(data?.cuisinePreferences.length as number) > 0 ? (
                  data?.cuisinePreferences.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant="secondary"
                      className="bg-zinc-700 text-zinc-100"
                    >
                      {cuisine}
                    </Badge>
                  ))
                ) : (
                  <p className="text-zinc-400">
                    No cuisine preferences specified
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Flame className="w-5 h-5 mr-2" />
                  Spiciness
                </h3>
                <Slider
                  defaultValue={[data?.spiciness || 0]}
                  max={5}
                  step={1}
                  className="w-full"
                  inert
                />
              </div>
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Candy className="w-5 h-5 mr-2" />
                  Sweetness
                </h3>
                <Slider
                  defaultValue={[data?.sweetness || 0]}
                  max={5}
                  step={1}
                  className="w-full"
                  inert
                />
              </div>
            </div>

            <div>
              <h3 className="flex items-center text-lg font-semibold mb-2">
                <Ban className="w-5 h-5 mr-2" />
                Exclusions
              </h3>
              <div className="flex flex-wrap gap-2">
                {(data?.excludeItems.length as number) > 0 ||
                data?.otherExclusions ? (
                  <>
                    {data?.excludeItems.map((item) => (
                      <Badge
                        key={item}
                        variant="destructive"
                        className="bg-zinc-600 text-zinc-100 cursor-default"
                      >
                        {item}
                      </Badge>
                    ))}
                    {data?.otherExclusions.split(",").map(
                      (item) =>
                        item !== "" && (
                          <Badge
                            key={item}
                            variant="destructive"
                            className="bg-zinc-600 text-zinc-100 capitalize cursor-default"
                          >
                            {item.trim()}
                          </Badge>
                        )
                    )}
                  </>
                ) : (
                  <p className="text-zinc-400">No exclusions specified</p>
                )}
              </div>
            </div>
            <Button
              onClick={() => {
                setEdit(false);
              }}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      {newUser && <p>this is new user</p>}
    </>
  );
}
