import { ArrowUp, CookingPot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import getResponse from "./utlis";
import formatter from "./formatter";
import { motion } from "framer-motion";

const AiResponse = ({
  query,
  cookMode,
  last,
}: {
  query: string;
  cookMode: boolean;
  last: boolean;
}) => {
  const [preparing, setPreparing] = useState(true);
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
    <motion.div className={`chat chat-end `}>
      <div
        className={preparing ? "chat-bubble skeleton" : "chat-bubble"}
        ref={respDiv}
      >
        {!preparing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            dangerouslySetInnerHTML={{ __html: data as string }}
          ></motion.div>
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
  );
};
export default AiResponse;
