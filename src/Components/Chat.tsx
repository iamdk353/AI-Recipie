import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoderIcon from "./LoderIcon";
const ApiKey = import.meta.env.VITE_AI_API;
const Chat = ({ Req }: { Req: string; Res?: string }) => {
  if (!ApiKey) {
    throw new Error("no api key");
    return;
  }
  const [res, setRes] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    async function getResponse(req?: string) {
      const genAI = new GoogleGenerativeAI(ApiKey as string);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      if (req) {
        console.log(req);
        const result = await model.generateContent(req);
        setRes(result.response.text());
        setLoading(false);
      } else return "";
    }
    getResponse(Req);
    scrollToBottom();
  }, []);
  return (
    <div ref={messagesEndRef}>
      <div className="chat chat-end ">
        <div className="chat-bubble">{Req}</div>
      </div>
      <div className="chat chat-start max-w-[100%] md:max-w-[80%]">
        <div className="chat-bubble">
          {loading ? <LoderIcon /> : <ResParser str={res} />}
        </div>
      </div>
    </div>
  );
};
export default Chat;

// function resParser(str:string){
//   return (
//     <div>
//       ## Spicy Garlic Tomato Shrimp Skewers (1 Serving) This recipe offers a
//       quick and flavorful meal for one, using a classic combination of tomato,
//       garlic, and onion. **Ingredients:** * 6-8 large shrimp, peeled and
//       deveined * 1 tablespoon olive oil * 1 clove garlic, minced * 1/2 small
//       onion, chopped * 1/2 cup chopped tomatoes * 1 teaspoon chili powder * 1/2
//       teaspoon cumin * Pinch of cayenne pepper (optional) * Salt and pepper to
//       taste * 1/4 cup chopped cilantro, for garnish **Equipment:** * Skewers *
//       Small skillet or pan * Cutting board * Knife **Instructions:** 1.
//       **Prepare the Shrimp:** Thread the shrimp onto skewers. 2. **Sauté the
//       Base:** Heat olive oil in a skillet over medium heat. Add garlic and
//       onion, sauté for 2-3 minutes until softened. 3. **Add Tomatoes and
//       Spices:** Stir in chopped tomatoes, chili powder, cumin, and cayenne
//       pepper (if using). Season with salt and pepper. Cook for 5 minutes,
//       allowing the sauce to thicken slightly. 4. **Grill or Pan-Fry:** If using
//       a grill, preheat to medium heat. Grill the shrimp skewers for 2-3 minutes
//       per side until pink and cooked through. If pan-frying, cook the skewers in
//       the skillet for 2-3 minutes per side, until pink and cooked through. 5.
//       **Serve:** Serve the skewers immediately, drizzled with the tomato sauce
//       and garnished with chopped cilantro. **Tips:** * You can substitute the
//       shrimp with chicken or tofu for a different flavor profile. * For a richer
//       sauce, add a tablespoon of butter to the skillet before adding the garlic
//       and onion. * Feel free to adjust the spice level to your preference. * If
//       you don't have cilantro, you can use parsley or chives as a garnish. Enjoy
//       your delicious and easy one-serving meal!
//     </div>

//   );
// }
function ResParser({ str }: { str: string }) {
  // Convert **text** to <b>text</b>
  const boldReplaced = str.replace(/\*\*(.*?)\*\*/g, "<br/><b>$1</b>");

  // Convert * list items to <ul><li>list item</li></ul>
  const listReplaced = boldReplaced.replace(
    /\* (.*?)\n/g,
    "<ul><li>$1</li></ul>\n"
  );

  // Convert ## heading to <h2>heading</h2>
  const headingReplaced = listReplaced.replace(
    /## (.*?)\n/g,
    `<h2 style="font-weight:600;font-size:1rem">$1</h2>\n`
  );

  // Convert numbered instructions to <li> inside <ol>
  const numberedListReplaced = headingReplaced.replace(
    /\d+\.\s*(.*?)(?=\d+\.|$)/gs,
    "<li>$1</li>"
  );

  // Wrap numbered list items with <ol> tags
  const finalResult = numberedListReplaced.replace(
    /(<li>.*<\/li>)/gs,
    "<ol>$1</ol>"
  );

  return <div dangerouslySetInnerHTML={{ __html: finalResult }} />;
}
