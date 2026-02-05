import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

async function getResponse(query: string, cookmode?: boolean) {
  try {
    const apiKey = import.meta.env.VITE_AI_API;

    if (!apiKey) {
      throw new Error("No API key found");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // correct model
    });

    const Aiquery = cookmode
      ? `Generate the recipe for ${query}.
         Return only HTML inside a single <div>.
         No extra text. No images.`
      : `${query}
         Add required items, give short names.
         If not vegetable or fruit, return:

         {
           "error": "message"
         }

         Otherwise return:

         [
           {
             "recipeName": "name"
           }
         ]`;

    const result = await model.generateContent(Aiquery);

    const text = result.response.text();

    return text.replace(/```json|```html|```/g, "").trim();
  } catch (error) {
    console.error(error);
    toast.error("Error connecting to AI model");
    return null;
  }
}

export default getResponse;
