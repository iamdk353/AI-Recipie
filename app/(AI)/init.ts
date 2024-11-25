import { ChatGroq } from "@langchain/groq";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

class llm {
  public model;
  constructor() {
    this.model = new ChatGroq({
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
      apiKey: process.env.GROQ_KEY,
    });
  }
  async getFoodList(email: string) {
    try {
      const curUserPref = await this.getCurrentUser(email);
      const parser = new JsonOutputParser<opFoodlistPref[]>();
      const resp = await this.model
        .pipe(parser)
        .invoke(this.foodListPrompt(curUserPref as Pref));
      return resp;
    } catch (error) {}
  }
  foodListPrompt(pref: Pref): string {
    return `
    ## role as a food chat bot ouput only in json no note
    ## goal print food list of 10 for ${this.TimeString()} a ${
      pref.dietaryPreference
    } with spice preference ${pref.spiciness}/5 and sweet preference ${
      pref.sweetness
    }/5 cusines includes like ${
      pref.cuisinePreferences
    } exclude food that has ${
      (pref.excludeItems, pref.otherExclusions)
    } and food that should decrease ${pref.healthCondition}
    ## conditions no preamble no extra text only no cusine no Note
    ## ouput only json format [{foodname:string,spice:number,sweet:number}]
    `;
  }
  async getCurrentUser(email: string) {
    try {
      const data = await fetch(`${process.env.BASE_URL}api/get-pref/${email}`);
      return (await data.json()) as Pref;
    } catch (error) {
      console.log(null);
    }
  }
  TimeString() {
    const hours = new Date().getHours();
    if (hours >= 0 && hours <= 11) {
      return "Break fast";
    } else if (hours >= 12 && hours <= 18) {
      return "Lunch";
    } else {
      return "Dinner";
    }
  }
}

const llmObj = new llm();
export default llmObj;

interface Pref {
  dietaryPreference: string;
  cuisinePreferences: string[];
  spiciness: number;
  sweetness: number;
  excludeItems: string[];
  otherExclusions: string;
  healthCondition: string[];
}

interface opFoodlistPref {
  foodname: string;
  cusine: string;
  sweet: string;
  spice: string;
}
// "mixtral-8x7b-32768";
