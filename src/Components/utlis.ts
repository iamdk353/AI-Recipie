import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";
async function getResponse(query: string, cookmode?: boolean) {
  if (import.meta.env.API_KEY) {
    throw new Error("no api key");
  }
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const Aiquery = cookmode
      ? `generate the recipie for ${query} 
only html inside single div no extra text no images`
      : `${query}
      add required items , give short names  ,
      if it is not vegetable or fruit give error message in text schema
      text schema :
      error = string
      JSON schema:
  Recipe = {'recipeName': string}
  Return: Array<Recipe>
  in this format

[
  {
    "recipeName": "name"
  }
]
`;
    // console.log(Aiquery);
    const result = await model.generateContent(Aiquery);
    // console.log(result.response.text());
    return result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .replace("```html", "")
      .replace("html", "")
      .replace("```", "")
      .trim();
  } catch (error) {
    toast.error("error in connecting to model");
  }
}

export default getResponse;
