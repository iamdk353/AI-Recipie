import { ChevronRight } from "lucide-react";
import { TypewriterEffectSmooth } from "./animations/Type";
import typeWordSplit from "./animations/typeWordSplit";
import { TextGenerateEffect } from "./TextAnime";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
const Hero = () => {
  const link = useNavigate();
  return (
    <div
      className="w-full md:h-[90vh] flex justify-center items-center"
      data-theme="dark"
    >
      <div className="w-[60%] flex flex-col items-center justify-center">
        <TextGenerateEffect
          words="Flavour Bot"
          className="text-[2rem] md:text-[4rem]"
        />
        <p className="p-4 text-justify text-sm md:text-xl ">
          Transform your everyday meals with the ultimate
          <TypewriterEffectSmooth
            className="text-lg text-center capitalize md:text-4xl"
            words={typeWordSplit("AI-powered recipe generator")}
          ></TypewriterEffectSmooth>
          Designed to cater to all tastes and skill levels, this innovative tool
          crafts unique, mouth-watering recipes based on your favorite
          ingredients, dietary restrictions, and even the time you have to cook.
          Whether you're experimenting with new flavors or trying to make the
          most of what's in your pantry, our AI adapts to your needs, offering
          personalized meal ideas that are both simple and exciting. Elevate
          your cooking experience with smart suggestions and creative twists,
          and never run out of inspiration in the kitchen!
        </p>
        <motion.button
          className="btn shadow-md p-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => {
            link("/chat");
          }}
        >
          GET STARTED <ChevronRight />
        </motion.button>
      </div>
    </div>
  );
};
export default Hero;
