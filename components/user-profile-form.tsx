import { useState, ChangeEvent, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function UserProfileForm() {
  const { user } = useUser();
  // use useUser
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="bg-zinc-800 text-white">
          <CardTitle className="text-2xl">{user?.fullName}</CardTitle>
        </CardHeader>
        <form>
          <CardContent className="mt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-4 justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.imageUrl} alt="Profile photo" />
                  <AvatarFallback className="bg-zinc-300 text-zinc-600">
                    {user?.fullName
                      ? user?.fullName.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="size-7" />
                <span className="text-xl">Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                inert
                defaultValue={user?.emailAddresses[0].emailAddress}
                placeholder="Enter your email"
                className="bg-zinc-100"
                required
              />
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
