"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image, MessageCircle, UtensilsCrossed } from "lucide-react";

export function TabComponent() {
  return (
    <Tabs defaultValue="image" className="md:w-[60%] w-full mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="image" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          Image
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Chat
        </TabsTrigger>
        <TabsTrigger value="recipe" className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          Recipe
        </TabsTrigger>
      </TabsList>
      <TabsContent value="image">
        <Card>
          <CardHeader>
            <CardTitle>Image</CardTitle>
            <CardDescription>Upload or view images here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Upload Image</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="chat">
        <Card>
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>Start a conversation here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-40 bg-muted rounded-md p-2 overflow-y-auto">
              <p className="text-sm text-muted-foreground">
                Chat messages will appear here.
              </p>
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recipe">
        <Card>
          <CardHeader>
            <CardTitle>Recipe</CardTitle>
            <CardDescription>Create or view recipes here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="recipe-name">Recipe Name</Label>
              <Input id="recipe-name" placeholder="Enter recipe name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="recipe-description">Description</Label>
              <Textarea
                id="recipe-description"
                placeholder="Enter recipe description"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Recipe</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
