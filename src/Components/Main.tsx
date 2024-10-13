import { useEffect, useState } from "react";
import getResponse from "./utlis";
import { BrainCircuit, Loader } from "lucide-react";
import ChatTab from "./ChatTab";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./Animation";
import toast from "react-hot-toast";
import NoInternet from "./NoInternet";
import AnimeLoad from "./AnimeLoad";

const Main = ({ Online }: { Online: boolean }) => {
  const [vegetables, setVegetables] = useState("");
  const [veg, setVeg] = useState(false);
  const [prompt, setPrompt] = useState<string>();
  const [time, setTime] = useState(0);
  const [place, setPlace] = useState(0);
  const [ideas, setIdeas] = useState<{ recipeName: string }[]>();
  const [loadIdea, setIdeaLoad] = useState(false);
  const [chat, setChat] = useState<string[]>();
  const [limit, setLimit] = useState(5);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (!Online) {
      toast.error("No network");
    }
  }, [Online]);
  return (
    <>
      <div
        className="w-full  h-full flex flex-col md:flex-row flex-1 p-4"
        id="prompt"
      >
        <form
          className="md:w-[60rem] md:h-[90%] w-full  bg-base-300 form-control items-center  px-0.5 py-2 md:p-4 relative"
          onSubmit={async (e) => {
            setIdeaLoad(true);
            e.preventDefault();

            try {
              const resp = await getResponse(prompt as string);
              setIdeas(JSON.parse(resp));
              setIdeaLoad(false);
              setSubmit(false);
              toast.success("Ideas Generated");
            } catch (error) {
              toast.error("provide correct query");
              setIdeaLoad(false);
              setIdeas(undefined);
              setVegetables("");
              setSubmit(false);
            }
          }}
        >
          {!Online && <NoInternet />}
          <div className="flex w-[90%]">
            <input
              type="text"
              required
              placeholder="vegetables"
              value={vegetables}
              className="input input-bordered w-full max-w-[80%] bg-base-100"
              onChange={(e) => {
                setVegetables(e.target.value.split(" ").join(",").trimEnd());
                if (vegetables.split(",").length >= 3) {
                  setSubmit(true);
                } else {
                  setSubmit(false);
                }
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                setPrompt(
                  `generate 10 ${
                    place === 0
                      ? "indian"
                      : place === 1
                      ? "chineese"
                      : "american"
                  } ${
                    veg ? "veg" : "non veg (only chicken and lamb)"
                  } food for ${
                    time === 0 ? "breakfast" : time === 1 ? "lunch" : "dinner"
                  } using ${vegetables}`
                );
              }}
              disabled={!submit}
            >
              {loadIdea ? (
                <Loader className="animate-spin"></Loader>
              ) : (
                <BrainCircuit />
              )}
            </button>
          </div>
          <div
            className={
              vegetables.split(",").length < 3
                ? "flex space-x-2 flex-wrap justify-center items-center bg-base-200 p-2 m-2 rounded-sm w-[95%] opacity-25 pointer-events-none"
                : "flex space-x-2 flex-wrap justify-center items-center bg-base-200  p-2 m-2 rounded-sm w-[95]"
            }
          >
            <div
              className={
                "flex space-x-2 flex-wrap justify-center items-center bg-base-200 p-2 m-2 rounded-sm w-[95%]"
              }
            >
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">VEG</span>
                <input
                  type="radio"
                  name="radio-1"
                  className="radio"
                  onChange={() => {
                    setVeg(true);
                    setSubmit(true);
                  }}
                />
              </label>
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">NON VEG</span>
                <input
                  type="radio"
                  name="radio-1"
                  className="radio"
                  onChange={() => {
                    setVeg(false);
                    setSubmit(true);
                  }}
                  defaultChecked
                />
              </label>
            </div>

            <div className="flex space-x-2 flex-wrap justify-center items-center bg-base-200 p-2 m-2 rounded-sm w-[95%]">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">BREAK FAST</span>
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  checked={time === 0}
                  onChange={(_e) => {
                    setTime(0);
                    setSubmit(true);
                  }}
                />
              </label>
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">LUNCH</span>
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  checked={time === 1}
                  onChange={(_e) => {
                    setTime(1);
                    setSubmit(true);
                  }}
                />
              </label>
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">DINNER</span>
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  checked={time === 2}
                  onChange={(_e) => {
                    setTime(2);
                    setSubmit(true);
                  }}
                />
              </label>
            </div>
            <div className="flex space-x-2 flex-wrap justify-center items-center bg-base-200 p-2 m-2 rounded-sm w-[95%]">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">INDIAN</span>
                <input
                  type="radio"
                  name="radio-3"
                  className="radio"
                  checked={place === 0}
                  onChange={(_e) => {
                    setPlace(0);
                    setSubmit(true);
                  }}
                />
              </label>
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">CHINEESE</span>
                <input
                  type="radio"
                  name="radio-3"
                  className="radio"
                  checked={place === 1}
                  onChange={(_e) => {
                    setPlace(1);
                    setSubmit(true);
                  }}
                />
              </label>
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">AMERICAN</span>
                <input
                  type="radio"
                  name="radio-3"
                  className="radio"
                  checked={place === 2}
                  onChange={(_e) => {
                    setPlace(2);
                    setSubmit(true);
                  }}
                />
              </label>
            </div>
          </div>
          {ideas != undefined && (
            <motion.div
              className="w-full md:grid md:grid-cols-2 p-2 md:gap-2 space-y-2 md:space-y-0 overflow-y-scroll"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {ideas.slice(0, limit).map((i, index) => (
                <motion.button
                  className="btn btn-ghost w-full bg-base-200 "
                  type="button"
                  variants={itemVariants}
                  key={index}
                  // disabled={preparing}
                  onClick={() => {
                    setChat((prev) => {
                      if (prev) {
                        return [...prev, i.recipeName];
                      } else {
                        return [i.recipeName];
                      }
                    });
                  }}
                >
                  {i.recipeName}
                </motion.button>
              ))}

              <div className="space-x-2 flex justify-center ">
                <button
                  className="bg-warning-content btn"
                  type="button"
                  onClick={() => {
                    setLimit((prev) => {
                      if (prev > 5) return 5;
                      else return 10;
                    });
                  }}
                  disabled={loadIdea}
                >
                  {limit > 5 ? "SHOW LESS" : "SHOW MORE"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setPrompt(
                      `generate 10 ${
                        place === 0
                          ? "indian"
                          : place === 1
                          ? "chineese"
                          : "american"
                      } ${
                        veg ? "veg" : "non veg (only chicken and lamb)"
                      } food for ${
                        time === 0
                          ? "breakfast"
                          : time === 1
                          ? "lunch"
                          : "dinner"
                      } using ${vegetables}`
                    );
                  }}
                  disabled={!(vegetables.length > 0)}
                >
                  {loadIdea ? (
                    <Loader className="animate-spin"></Loader>
                  ) : (
                    "DIFFRENT IDEAS"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full h-[90%] relative"
        >
          {chat?.length === 0 || (chat === undefined && <AnimeLoad />)}
          <div className="flex flex-col  overflow-y-scroll  h-[82vh]">
            {(chat?.length as number) > 0 &&
              chat != undefined &&
              chat.map((i, id) => {
                // console.log(chat.length - 1 === id);
                return (
                  <ChatTab
                    query={i}
                    cookMode={true}
                    last={chat.length - 1 === id}
                    key={id}
                  ></ChatTab>
                );
              })}
          </div>
        </form>
      </div>
    </>
  );
};
export default Main;
