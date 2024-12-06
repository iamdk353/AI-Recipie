import llmObj from "../(AI)/init";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import NewIdeas from "@/components/NewIdeas";
import FoodButtons from "@/components/FoodButtons";
import Chat from "@/components/chat";

const page = async () => {
  const data = await llmObj.getFoodList("iamdk353@gmail.com");
  let similars = "";
  console.log(data);
  return (
    <>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-zinc-100 to-zinc-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4 my-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-zinc-800">
                  Delicious {llmObj.TimeString()} Ideas
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-600 md:text-xl capitalize">
                  here are your nutritious and tasty {llmObj.TimeString()}{" "}
                  options.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data && <FoodButtons data={data} />}
              </div>
            </div>
          </div>
        </section>
      </Suspense>
      <section className="w-full">
        <Chat />
      </section>
    </>
  );
};
export default page;
