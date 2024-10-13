import { ArrowUp, CookingPot, Copy, Loader, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import getResponse from "./utlis";
import formatter from "./formatter";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AiResponse = ({
  query,
  cookMode,
  last,
}: {
  query: string;
  cookMode: boolean;
  last: boolean;
}) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const [preparing, setPreparing] = useState(true);
  const [ytLoad, setytLoad] = useState(false);
  const respDiv = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<string>();
  useEffect(() => {
    if (respDiv.current) {
      respDiv.current.scrollIntoView();
    }
    async function getData() {
      const resp = await getResponse(query, cookMode);
      setData(formatter(resp));
      setPreparing(false);
    }
    getData();
  }, []);
  return (
    <>
      <motion.div className={`chat chat-end `}>
        <div
          className={preparing ? "chat-bubble skeleton" : "chat-bubble"}
          ref={respDiv}
        >
          {!preparing ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                dangerouslySetInnerHTML={{ __html: data as string }}
                ref={copyRef}
              ></motion.div>
              <div>
                <button
                  className="m-5"
                  type="button"
                  onClick={() => {
                    const getText = () => {
                      if (copyRef.current) {
                        return (
                          (copyRef.current.innerText as string) ||
                          (copyRef.current.textContent as string)
                        );
                      }
                      return "";
                    };
                    navigator.clipboard
                      .writeText(getText())
                      .then(() => {
                        toast.success("Recipie copied to clipboard!");
                      })
                      .catch((err) => {
                        toast.error("Failed to copy text: ", err);
                      });
                  }}
                >
                  {" "}
                  <Copy />
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setytLoad(true);
                    toast.loading("Redirecting to Youtube ", {
                      duration: 1300,
                    });
                    setTimeout(() => {
                      window.open(
                        `https://www.youtube.com/results?search_query=${query.replace(
                          "&",
                          "and"
                        )}`,
                        "_blank"
                      );
                      setytLoad(false);
                    }, 1500);
                  }}
                >
                  {ytLoad ? <Loader className="animate-spin" /> : <Youtube />}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center ">
              <CookingPot />
              <p>Preparing...</p>
            </div>
          )}
          {last && (
            <a href="#prompt" className=" m-2 md:hidden">
              <ArrowUp size={20} />
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
};
export default AiResponse;
