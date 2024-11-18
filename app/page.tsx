import HeroCarousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { ChefHat, ChevronRight, Salad, Sparkles, Utensils } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <Salad size={32} className="text-zinc-700" />,
      title: "Smart Ingredient Matching",
      description:
        "Our AI analyzes your available vegetables and creates perfectly balanced recipes.",
    },
    {
      icon: <ChefHat size={32} className="text-zinc-700" />,
      title: "Personalized Cuisine",
      description:
        "Get tailored recipes that match your dietary preferences and cooking skills.",
    },
    {
      icon: <Utensils size={32} className="text-zinc-700" />,
      title: "Endless Creativity",
      description:
        "Never run out of meal ideas. Generate unique recipes with just a few ingredients.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 ">
      <div className="grid grid-cols-1 md:grid-cols-2  py-4">
        <div className="min-h-screen w-full bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center">
          <div className="container mx-auto px-4 py-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-zinc-200/50 px-4 py-2 rounded-full">
                <Sparkles className="text-zinc-600 mr-2" size={20} />
                <span className="text-zinc-800 font-medium">
                  AI-Powered Culinary Innovation
                </span>
              </div>

              <h1 className="text-5xl font-bold text-zinc-900 leading-tight">
                Your Personal AI Chef Transforms Ingredients into Meals
              </h1>

              <p className="text-xl text-zinc-700 leading-relaxed">
                Discover endless culinary possibilities. Upload your
                ingredients, and our intelligent AI creates unique, delicious
                recipes tailored to your kitchen.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <HeroCarousel />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Sparkles className="text-zinc-600" size={32} />
            <h2 className="text-2xl font-semibold text-zinc-800">
              How It Works
            </h2>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mb-6">
            Transforming Vegetables into Culinary Masterpieces
          </h1>

          <p className="text-xl text-zinc-700 mb-12">
            Our AI-powered platform takes the vegetables you have and turns them
            into delicious, nutritious, and innovative recipes in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-zinc-800 text-white text-center py-8 mt-8">
        <p>&copy; 2024 Flavour Bot</p>
      </footer>
    </div>
  );
}
