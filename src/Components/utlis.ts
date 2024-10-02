import { GoogleGenerativeAI } from "@google/generative-ai";
async function getResponse(query: string, cookmode?: boolean) {
  if (import.meta.env.API_KEY) {
    throw new Error("no api key");
  }
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const Aiquery = cookmode
    ? `generate the recipie for ${query} only html inside single div no extra text `
    : `${query}
      add required items , give short names  
      JSON schema:
  Recipe = {'recipeName': string}
  Return: Array<Recipe>
  in this format

[
  {
    "recipeName": "name"
  }
]

   if vegetable not provide simple give a text message saying vegetable not provided`;
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
}

export default getResponse;
